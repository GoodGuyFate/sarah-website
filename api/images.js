import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  try {
    const result = await cloudinary.search
      .expression('folder:gallery')
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute()

    const files = result.resources.map(file => ({
      id: file.asset_id,
      name: file.display_name || file.filename,
      url: file.secure_url,
      thumbnail: cloudinary.url(file.public_id, {
        width: 400,
        height: 400,
        crop: 'fill',
        quality: 'auto',
        fetch_format: 'auto',
      }),
    }))

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json({ files })
  } catch (error) {
    console.error('Cloudinary error:', error)
    res.status(500).json({ error: 'Failed to fetch images' })
  }
}