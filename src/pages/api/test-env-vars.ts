import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Get all environment variables that start with certain prefixes
  const envVars: Record<string, any> = {}

  // Check all environment variables
  Object.keys(process.env).forEach((key) => {
    if (key.includes('S3') || key.includes('AWS') || key.includes('BUCKET')) {
      envVars[key] = process.env[key] || 'undefined'
    }
  })

  return res.status(200).json({
    nodeEnv: process.env.NODE_ENV,
    // Show all relevant env vars
    envVars,
    // Show what we're specifically looking for
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'not found',
    S3_ARCHIVE_BUCKET: process.env.S3_ARCHIVE_BUCKET || 'not found',
    S3_REGION: process.env.S3_REGION || 'not found',
    AWS_REGION: process.env.AWS_REGION || 'not found',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'present' : 'not found',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'present' : 'not found',
    timestamp: new Date().toISOString()
  })
}
