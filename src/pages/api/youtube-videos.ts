import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchADMIChannelVideos, getVideosForCourse, getVideosByCategory } from '@/utils/youtube-api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { course, category, limit = '20' } = req.query
    const maxResults = Math.min(parseInt(limit as string), 50) // Cap at 50 videos

    // Fetch all videos from ADMI channel
    const allVideos = await fetchADMIChannelVideos(maxResults)

    let filteredVideos = allVideos

    // Filter by course if specified
    if (course && typeof course === 'string') {
      filteredVideos = getVideosForCourse(allVideos, course)
    }

    // Filter by category if specified
    if (category && typeof category === 'string') {
      filteredVideos = getVideosByCategory(filteredVideos, category)
    }

    // Set cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')

    return res.status(200).json({
      videos: filteredVideos,
      total: filteredVideos.length,
      cached: false
    })
  } catch (error) {
    console.error('Error fetching YouTube videos:', error)

    return res.status(500).json({
      message: 'Failed to fetch videos',
      videos: [],
      total: 0,
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    })
  }
}
