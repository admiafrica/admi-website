/**
 * Cache Health Check API
 *
 * Returns status of the caching system including:
 * - S3 connection status
 * - Memory cache statistics
 * - Individual cache entry status
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { getCacheHealth } from '@/utils/contentful-cached'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const health = await getCacheHealth()

    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      cache: {
        s3: {
          enabled: health.s3Enabled,
          connected: health.s3Connected,
          bucket: process.env.S3_CACHE_BUCKET || 'admi-contentful-cache'
        },
        memory: {
          entries: health.stats.memoryEntries,
          sizeEstimate: health.stats.memorySizeEstimate
        },
        entries: health.stats.entries.map((entry) => ({
          key: entry.key,
          ageSeconds: Math.round(entry.age / 1000),
          expiresInSeconds: Math.round(entry.expiresIn / 1000),
          status: entry.expiresIn > 0 ? 'valid' : 'expired'
        }))
      },
      config: {
        s3CacheEnabled: process.env.ENABLE_S3_CACHE !== 'false',
        s3Bucket: process.env.S3_CACHE_BUCKET || 'admi-contentful-cache',
        region: process.env.AWS_REGION || 'us-east-1'
      }
    })
  } catch (error: any) {
    console.error('Cache health check failed:', error)
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}
