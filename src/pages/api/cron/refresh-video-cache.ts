import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllADMIVideos } from '@/utils/fetch-all-videos'
import { getCacheStats } from '@/utils/video-cache'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests for cron jobs
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify cron authorization (optional security header)
  const cronSecret = process.env.CRON_SECRET || 'default-secret'
  const authHeader = req.headers.authorization

  if (authHeader !== `Bearer ${cronSecret}`) {
    console.log('🔒 Unauthorized cron request')
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const startTime = Date.now()
  console.log('🕐 Starting automated video cache refresh at', new Date().toISOString())

  try {
    // Get current cache stats for logging
    const beforeStats = getCacheStats()
    console.log('📊 Cache before refresh:', beforeStats)

    // Refresh the cache
    const newCache = await fetchAllADMIVideos()

    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000

    console.log(`✅ Automated cache refresh completed in ${duration}s`)
    console.log(`📊 Refreshed cache: ${newCache.totalVideos} videos`)

    return res.status(200).json({
      success: true,
      message: 'Video cache refreshed successfully',
      stats: {
        totalVideos: newCache.totalVideos,
        lastUpdated: newCache.lastUpdated,
        refreshDuration: duration,
        previousCacheDate: beforeStats.lastUpdated || 'none',
        channelInfo: {
          title: newCache.channelInfo.title,
          videoCount: newCache.channelInfo.videoCount,
          subscriberCount: newCache.channelInfo.subscriberCount
        }
      }
    })
  } catch (error) {
    const endTime = Date.now()
    const duration = (endTime - startTime) / 1000

    console.error('❌ Automated cache refresh failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Video cache refresh failed',
      error: (error as Error).message,
      duration
    })
  }
}