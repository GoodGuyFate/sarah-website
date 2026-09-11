export default async function handler(req, res) {
  const { GoogleAuth } = await import('google-auth-library')
  const { google } = await import('googleapis')

  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    })

    const drive = google.drive({ version: 'v3', auth })

    const response = await drive.files.list({
      q: `'${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, mimeType)',
      orderBy: 'name',
    })

    const files = response.data.files.map(file => ({
      id: file.id,
      name: file.name,
      url: `/api/image?id=${file.id}`,
      thumbnail: `/api/image?id=${file.id}`,
    }))

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(200).json({ files })
  } catch (error) {
    console.error('Drive API error:', error)
    res.status(500).json({ error: 'Failed to fetch images' })
  }
}