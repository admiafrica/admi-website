import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check environment variables (without exposing the actual values)
  const envCheck = {
    YOUTUBE_API_KEY: !!process.env.YOUTUBE_API_KEY,
    YOUTUBE_API_KEY_length: process.env.YOUTUBE_API_KEY?.length || 0,
    ADMI_YOUTUBE_CHANNEL_ID: !!process.env.ADMI_YOUTUBE_CHANNEL_ID,
    NODE_ENV: process.env.NODE_ENV,
    // List all environment variables that start with YOUTUBE (without values)
    youtube_vars: Object.keys(process.env).filter((key) => key.includes('YOUTUBE'))
  }

  return res.status(200).json({
    message: 'Environment variable check',
    env: envCheck,
    timestamp: new Date().toISOString()
  })
}
