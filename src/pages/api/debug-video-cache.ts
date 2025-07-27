import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('🔧 Debug: Testing video cache in production...')
    
    // Test environment variables
    const API_KEY = process.env.YOUTUBE_API_KEY
    const CHANNEL_ID = process.env.ADMI_YOUTUBE_CHANNEL_ID || 'UCqLmokG6Req2pHn2p7D8WZQ'
    
    const env = {
      hasApiKey: !!API_KEY,
      apiKeyLength: API_KEY ? API_KEY.length : 0,
      channelId: CHANNEL_ID,
      nodeEnv: process.env.NODE_ENV,
      platform: process.platform
    }
    
    console.log('Environment check:', env)
    
    if (!API_KEY) {
      return res.status(500).json({
        error: 'YouTube API key not configured',
        environment: env
      })
    }
    
    // Test cache file access
    let cacheResult = null
    try {
      const { readVideoCache, readVideoCacheRaw, getCacheStats } = await import('@/utils/video-cache')
      const validCache = readVideoCache()
      const rawCache = readVideoCacheRaw()
      const stats = getCacheStats()
      
      cacheResult = {
        hasValidCache: !!validCache,
        hasRawCache: !!rawCache,
        stats: stats,
        validCacheVideoCount: validCache?.videos?.length || 0,
        rawCacheVideoCount: rawCache?.videos?.length || 0,
        lastUpdated: rawCache?.lastUpdated || null
      }
    } catch (cacheError) {
      cacheResult = {
        error: 'Cache access failed',
        message: (cacheError as Error).message
      }
    }
    
    console.log('Cache result:', cacheResult)
    
    // Test YouTube API directly with a simple call
    let apiResult = null
    try {
      const testUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
      console.log('Testing YouTube API...')
      
      const response = await fetch(testUrl)
      const data = await response.json()
      
      apiResult = {
        success: response.ok,
        status: response.status,
        hasItems: !!(data.items && data.items.length > 0),
        channelTitle: data.items?.[0]?.snippet?.title || null,
        subscriberCount: data.items?.[0]?.statistics?.subscriberCount || null,
        videoCount: data.items?.[0]?.statistics?.videoCount || null,
        error: !response.ok ? data : null
      }
    } catch (apiError) {
      apiResult = {
        success: false,
        error: 'API call failed',
        message: (apiError as Error).message
      }
    }
    
    console.log('API result:', apiResult)
    
    return res.json({
      timestamp: new Date().toISOString(),
      environment: env,
      cache: cacheResult,
      youtubeApi: apiResult,
      diagnosis: {
        canAccessCache: !!cacheResult && !cacheResult.error,
        canCallYouTubeAPI: !!apiResult && apiResult.success,
        hasValidVideos: (cacheResult?.validCacheVideoCount || 0) > 0,
        recommendation: getRecommendation(env, cacheResult, apiResult)
      }
    })
    
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: (error as Error).message,
      timestamp: new Date().toISOString()
    })
  }
}

function getRecommendation(env: any, cache: any, api: any): string {
  if (!env.hasApiKey) {
    return 'Missing YouTube API key in environment variables'
  }
  
  if (api && !api.success) {
    return 'YouTube API call failed - check API key validity and quota'
  }
  
  if (cache?.error) {
    return 'Cache file access failed - check file system permissions'
  }
  
  if (!cache?.hasValidCache && !cache?.hasRawCache) {
    return 'No cache file exists - need to fetch videos from YouTube API'
  }
  
  if (cache?.hasRawCache && !cache?.hasValidCache) {
    return 'Cache exists but is expired - using fallback or refresh needed'
  }
  
  if (cache?.validCacheVideoCount === 0) {
    return 'Cache exists but contains no videos - data issue'
  }
  
  return 'System appears healthy - check videos page logic'
}