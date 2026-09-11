export default async function handler(req, res) {
  const { GoogleAuth } = await import('google-auth-library')
  const { google } = await import('googleapis')

  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing id' })

  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    })

    const drive = google.drive({ version: 'v3', auth })

    const meta = await drive.files.get({
      fileId: id,
      fields: 'mimeType',
    })

    const response = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    )

    res.setHeader('Content-Type', meta.data.mimeType)
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
    response.data.pipe(res)
  } catch (error) {
    console.error('Image proxy error:', error)
    res.status(500).json({ error: 'Failed to fetch image' })
  }
}