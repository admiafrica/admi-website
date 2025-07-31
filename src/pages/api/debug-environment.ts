import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const debug: any = {
      nodeEnv: process.env.NODE_ENV,
      cwd: process.cwd(),
      hasYouTubeApiKey: !!process.env.YOUTUBE_API_KEY,
      hasChannelId: !!process.env.ADMI_YOUTUBE_CHANNEL_ID,
      youtubeApiKeyLength: process.env.YOUTUBE_API_KEY?.length || 0,
      channelId: process.env.ADMI_YOUTUBE_CHANNEL_ID,
      tmpDirExists: fs.existsSync('/tmp'),
      tmpCacheExists: fs.existsSync('/tmp/admi-videos-cache.json'),
      dataDirExists: fs.existsSync(path.join(process.cwd(), 'data')),
      committedCacheExists: fs.existsSync(path.join(process.cwd(), 'data', 'admi-videos-cache.json')),
      timestamp: new Date().toISOString()
    }

    // Try to read committed cache
    try {
      const committedCachePath = path.join(process.cwd(), 'data', 'admi-videos-cache.json')
      if (fs.existsSync(committedCachePath)) {
        const cacheData = fs.readFileSync(committedCachePath, 'utf-8')
        const cache = JSON.parse(cacheData)
        debug.committedCacheVideos = cache.videos?.length || 0
        debug.committedCacheLastUpdated = cache.lastUpdated
      }
    } catch (error) {
      debug.committedCacheError = (error as Error).message
    }

    return res.status(200).json(debug)
  } catch (error) {
    console.error('Debug error:', error)
    return res.status(500).json({
      message: 'Debug failed',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    })
  }
}
