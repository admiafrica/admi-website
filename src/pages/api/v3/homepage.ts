import { getHomepageCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Static fallback data (minimal homepage data)
const FALLBACK_DATA = [
  {
    sys: { id: 'fallback', type: 'Entry' },
    fields: {
      title: 'Africa Digital Media Institute',
      heroTitle: 'Launch your career in Creative Media & Technology',
      heroDescription:
        'ADMI (Africa Digital Media Institute) is a leading creative media and technology training institution based in Nairobi, Kenya. Our programmes are delivered through a flexible hybrid model that combines online learning with in person sessions, so you can study in a format that works for you. Explore our diploma and certificate courses and get started today.',
      testimonials: []
    }
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Use S3-backed caching for reduced Contentful API calls
      const data = await getHomepageCached()

      // Set cache headers for CDN
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      res.status(200).json(data)
    } catch (error: any) {
      console.error('Failed to get homepage data:', error.message || error)

      // Return fallback data on error
      console.log('Returning fallback data due to Contentful error')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      res.status(200).json(FALLBACK_DATA)
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
