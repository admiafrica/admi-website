import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache, getCacheStats, writeVideoCache } from '@/utils/video-cache'
import { fetchAllADMIVideos } from '@/utils/fetch-all-videos'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const { action = 'status' } = query

  try {
    switch (method) {
      case 'GET':
        if (action === 'status') {
          // Get cache status
          const stats = getCacheStats()
          const cache = readVideoCache()
          
          return res.status(200).json({
            ...stats,
            channelInfo: cache?.channelInfo || null
          })
        }
        
        if (action === 'refresh') {
          // Force refresh cache
          console.log('🔄 Manual cache refresh requested...')
          
          const newCache = await fetchAllADMIVideos()
          
          return res.status(200).json({
            message: 'Cache refreshed successfully',
            totalVideos: newCache.totalVideos,
            lastUpdated: newCache.lastUpdated,
            channelInfo: newCache.channelInfo
          })
        }
        
        return res.status(400).json({ error: 'Invalid action. Use ?action=status or ?action=refresh' })

      case 'POST':
        // Force refresh cache via POST
        console.log('🔄 POST cache refresh requested...')
        
        const newCache = await fetchAllADMIVideos()
        
        return res.status(200).json({
          message: 'Cache refreshed successfully',
          totalVideos: newCache.totalVideos,
          lastUpdated: newCache.lastUpdated,
          channelInfo: newCache.channelInfo
        })

      case 'DELETE':
        // Clear cache (for testing)
        try {
          const fs = require('fs')
          const path = require('path')
          const cacheFilePath = path.join(process.cwd(), 'data', 'admi-videos-cache.json')
          
          if (fs.existsSync(cacheFilePath)) {
            fs.unlinkSync(cacheFilePath)
            console.log('🗑️ Cache file deleted')
          }
          
          return res.status(200).json({
            message: 'Cache cleared successfully'
          })
        } catch (error) {
          return res.status(500).json({
            error: 'Failed to clear cache',
            details: (error as Error).message
          })
        }

      default:
        return res.status(405).json({ message: 'Method not allowed' })
    }

  } catch (error) {
    console.error('❌ Cache management error:', error)
    
    return res.status(500).json({
      error: 'Cache operation failed',
      message: (error as Error).message
    })
  }
}
