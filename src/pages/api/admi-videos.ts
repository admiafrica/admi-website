import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache, readVideoCacheRaw, getCacheStats } from '@/utils/video-cache'
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

// Filter videos by duration and publish date (consistent with sitemap filtering)
function filterVideos(videos: any[]) {
  const twentyFourMonthsAgo = new Date()
  twentyFourMonthsAgo.setMonth(twentyFourMonthsAgo.getMonth() - 24)

  return videos.filter((video) => {
    const durationInSeconds = convertDurationToSeconds(video.duration)
    const publishedDate = new Date(video.publishedAt)

    // Filter out videos that might be private or problematic
    const viewCount = parseInt(video.viewCount) || 0
    const hasValidThumbnail = video.thumbnail?.high || video.thumbnail?.medium

    // Exclude videos that show signs of being private/unavailable:
    // - Very low view counts (< 5 views) combined with recent publish dates
    // - Missing or invalid thumbnails
    const recentlyPublished = Date.now() - publishedDate.getTime() < 30 * 24 * 60 * 60 * 1000 // 30 days
    const suspiciouslyLowViews = viewCount < 5 && recentlyPublished

    // Same filters as sitemap: >60 seconds AND within 24 months AND not private
    return (
      durationInSeconds >= 60 &&
      durationInSeconds <= 7200 &&
      publishedDate >= twentyFourMonthsAgo &&
      !suspiciouslyLowViews &&
      hasValidThumbnail
    )
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
    console.log('🔧 Environment check:', {
      hasYouTubeKey: !!process.env.YOUTUBE_API_KEY,
      hasChannelId: !!process.env.ADMI_YOUTUBE_CHANNEL_ID,
      nodeEnv: process.env.NODE_ENV,
      cwd: process.cwd()
    })

    // Check for environment variables first
    const hasYouTubeCredentials = !!(process.env.YOUTUBE_API_KEY && process.env.ADMI_YOUTUBE_CHANNEL_ID)
    let cache: any
    let cacheStats: any

    if (!hasYouTubeCredentials) {
      console.log('⚠️ YouTube API credentials not available, using committed cache')
      cache = readVideoCacheRaw()
      if (!cache) {
        console.log('❌ No committed cache available either')
        throw new Error('No YouTube API credentials and no cache available')
      }
    } else {
      // Check cache first
      cache = readVideoCache()
      cacheStats = getCacheStats()

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
            cache = readVideoCacheRaw()
          } else {
            throw error
          }
        }
      } else {
        console.log('📚 Using cached data')
      }
    }

    if (!cache || !cache.videos) {
      throw new Error('No video data available')
    }

    // Filter videos by duration, publish date, and quality (consistent with sitemap)
    const filteredVideos = filterVideos(cache.videos)
    console.log(
      `🎬 Filtered ${cache.videos.length - filteredVideos.length} videos (keeping 60s-2hrs, 24 months, quality filtered)`
    )

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

    // Enhanced error details for debugging
    const errorDetails = {
      message: (error as Error).message,
      stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
      hasYouTubeKey: !!process.env.YOUTUBE_API_KEY,
      hasChannelId: !!process.env.ADMI_YOUTUBE_CHANNEL_ID,
      nodeEnv: process.env.NODE_ENV
    }

    console.error('📋 Error details:', errorDetails)

    return res.status(500).json({
      message: 'Failed to fetch videos',
      videos: [],
      total: 0,
      error: process.env.NODE_ENV === 'development' ? errorDetails : 'Internal server error'
    })
  }
}
