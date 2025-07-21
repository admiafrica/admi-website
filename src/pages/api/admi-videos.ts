import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache, getCacheStats } from '@/utils/video-cache'
import { fetchAllADMIVideos } from '@/utils/fetch-all-videos'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { limit = '50', refresh = 'false' } = req.query
    const maxResults = Math.min(parseInt(limit as string), 500) // Allow up to 500 videos
    const forceRefresh = refresh === 'true'

    console.log('📡 ADMI Videos API called - limit:', maxResults, 'refresh:', forceRefresh)

    // Check cache first
    let cache = readVideoCache()
    const cacheStats = getCacheStats()

    console.log('📊 Cache stats:', cacheStats)

    // If no valid cache or force refresh, fetch from YouTube
    if (!cache || forceRefresh) {
      console.log('🔄 Cache miss or refresh requested, fetching from YouTube...')

      try {
        cache = await fetchAllADMIVideos()
        console.log('✅ Fresh data fetched and cached')
      } catch (error) {
        console.error('❌ Error fetching fresh data:', error)

        // If we have expired cache, use it as fallback
        if (cacheStats.exists) {
          console.log('📚 Using expired cache as fallback')
          cache = readVideoCache()
        } else {
          throw error
        }
      }
    } else {
      console.log('📚 Using cached data')
    }

    if (!cache || !cache.videos) {
      throw new Error('No video data available')
    }

    // Apply limit to videos
    const limitedVideos = cache.videos.slice(0, maxResults)

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

    console.log(`✅ Returning ${limitedVideos.length} of ${cache.totalVideos} videos`)

    return res.status(200).json({
      videos: limitedVideos,
      total: limitedVideos.length,
      totalAvailable: cache.totalVideos,
      cached: !forceRefresh,
      lastUpdated: cache.lastUpdated,
      channelInfo: cache.channelInfo,
      cacheStats
    })

  } catch (error) {
    console.error('❌ Error in ADMI Videos API handler:', error)

    return res.status(500).json({
      message: 'Failed to fetch videos',
      videos: [],
      total: 0,
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    })
  }
}
