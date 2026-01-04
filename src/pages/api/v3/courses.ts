import { getCoursesCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Use S3-backed caching for reduced Contentful API calls
      const data = await getCoursesCached()

      // Set cache headers for CDN
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
      res.status(200).json(data)
    } catch (error: any) {
      console.error('Failed to get courses:', error.message || error)

      // Return empty array on error (handled gracefully by frontend)
      console.log('Returning empty array due to Contentful error')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      res.status(200).json([])
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
