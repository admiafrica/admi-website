import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Test endpoint for environment variables
  res.status(200).json({
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}
