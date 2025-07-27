import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('🔧 Testing video fetch in production...')
    
    // Test environment variables
    const API_KEY = process.env.YOUTUBE_API_KEY
    const CHANNEL_ID = process.env.ADMI_YOUTUBE_CHANNEL_ID || 'UCqLmokG6Req2pHn2p7D8WZQ'
    
    console.log('Environment check:', {
      hasApiKey: !!API_KEY,
      channelId: CHANNEL_ID,
      nodeEnv: process.env.NODE_ENV
    })
    
    if (!API_KEY) {
      return res.status(500).json({
        error: 'YouTube API key not configured',
        hasApiKey: false
      })
    }
    
    // Test YouTube API directly
    const testUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    console.log('Testing URL:', testUrl.replace(API_KEY, 'API_KEY_HIDDEN'))
    
    const response = await fetch(testUrl)
    const data = await response.json()
    
    if (!response.ok) {
      console.error('YouTube API error:', data)
      return res.status(response.status).json({
        error: 'YouTube API error',
        details: data,
        status: response.status
      })
    }
    
    console.log('YouTube API success:', data)
    
    // Test cache file access
    const { readVideoCache, getCacheStats } = await import('@/utils/video-cache')
    const cache = readVideoCache()
    const stats = getCacheStats()
    
    return res.json({
      success: true,
      environment: {
        hasApiKey: !!API_KEY,
        channelId: CHANNEL_ID,
        nodeEnv: process.env.NODE_ENV
      },
      youtubeApi: {
        channelData: data,
        status: response.status
      },
      cache: {
        hasCache: !!cache,
        stats: stats,
        videoCount: cache?.videos?.length || 0
      }
    })
    
  } catch (error) {
    console.error('Test error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: (error as Error).message,
      stack: (error as Error).stack
    })
  }
}