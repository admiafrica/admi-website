import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache, getCacheStats } from '@/utils/video-cache'
import { fetchAllADMIVideos } from '@/utils/fetch-all-videos'

// Helper function to convert duration to seconds
function convertDurationToSeconds(duration: string): number {
  if (!duration || duration === 'N/A') return 0

  const parts = duration.split(':').map(Number)
  let totalSeconds = 0

  if (parts.length === 2) {
    // MM:SS format
    totalSeconds = parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // HH:MM:SS format
    totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2]
  }

  return totalSeconds
}

// Filter out videos longer than 2 hours (7200 seconds)
function filterLongVideos(videos: any[]) {
  return videos.filter((video) => {
    const durationInSeconds = convertDurationToSeconds(video.duration)
    return durationInSeconds > 0 && durationInSeconds <= 7200
  })
}

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

    // Filter out videos longer than 2 hours first
    const filteredVideos = filterLongVideos(cache.videos)
    console.log(`🎬 Filtered ${cache.videos.length - filteredVideos.length} long videos (>${2} hours)`)

    // Apply limit to filtered videos
    const limitedVideos = filteredVideos.slice(0, maxResults)

    // Set cache headers
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

    console.log(
      `✅ Returning ${limitedVideos.length} of ${filteredVideos.length} filtered videos (${cache.totalVideos} total in cache)`
    )

    return res.status(200).json({
      videos: limitedVideos,
      total: limitedVideos.length,
      totalAvailable: filteredVideos.length, // Total after filtering
      totalInCache: cache.totalVideos, // Original total in cache
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
