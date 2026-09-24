import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const MAX_IMAGES = 500

export default async function handler(req, res) {
  try {
    const resources = []
    let cursor

    do {
      let query = cloudinary.search
        .expression('folder:gallery')
        .sort_by('created_at', 'desc')
        .with_field('context')
        .max_results(100)

      if (cursor) query = query.next_cursor(cursor)

      const result = await query.execute()
      resources.push(...result.resources)
      cursor = result.next_cursor
    } while (cursor && resources.length < MAX_IMAGES)

    const files = resources.map((file) => {
      const ctx = file.context?.custom ?? file.context ?? {}
      return {
        id: file.asset_id,
        name: file.display_name || file.filename,
        size: ctx.size || null,
        url: cloudinary.url(file.public_id, {
          width: 2400,
          crop: 'limit',
          quality: 'auto',
          fetch_format: 'auto',
        }),
        thumbnail: cloudinary.url(file.public_id, {
          width: 400,
          height: 400,
          crop: 'fill',
          quality: 'auto',
          fetch_format: 'auto',
        }),
      }
    })

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400')
    res.status(200).json({ files })
  } catch (error) {
    console.error('Cloudinary error:', error)
    res.status(500).json({ error: 'Failed to fetch images' })
  }
}