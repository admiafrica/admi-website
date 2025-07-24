import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache, writeVideoCache } from '@/utils/video-cache'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Read the current cache
    const cache = readVideoCache()

    if (!cache || !cache.videos) {
      return res.status(400).json({ error: 'No cache found to fix' })
    }

    // Fix the cache structure if needed
    const fixedCache = {
      videos: cache.videos || [],
      totalVideos: cache.videos?.length || 0,
      lastUpdated: cache.lastUpdated || new Date().toISOString(),
      channelInfo: cache.channelInfo || {
        title: 'ADMI Africa',
        description: 'Africa Digital Media Institute',
        subscriberCount: 'N/A',
        videoCount: cache.videos?.length || 0
      }
    }

    // Write the fixed cache back
    writeVideoCache(fixedCache)

    return res.status(200).json({
      message: 'Cache structure fixed',
      totalVideos: fixedCache.totalVideos,
      lastUpdated: fixedCache.lastUpdated,
      channelInfo: fixedCache.channelInfo
    })
  } catch (error) {
    console.error('❌ Cache fix error:', error)
    return res.status(500).json({
      error: 'Failed to fix cache',
      details: (error as Error).message
    })
  }
}
