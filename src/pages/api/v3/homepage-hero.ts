import { getHomepageHeroCached } from '@/utils/contentful-cached'
import type { NextApiRequest, NextApiResponse } from 'next'

// Hardcoded fallback data - used when Contentful is unavailable or content type doesn't exist
const FALLBACK_HERO = {
  sys: { id: 'fallback-hero', type: 'Entry' },
  fields: {
    internalName: 'Fallback Hero',
    heroTitle: 'Launch your career in Creative',
    heroHighlightWord: 'Media & Technology',
    heroDescription:
      'ADMI (Africa Digital Media Institute) is a leading creative media and technology training institution based in Nairobi, Kenya. Our programmes are delivered through a flexible hybrid model that combines online learning with in person sessions, so you can study in a format that works for you. Explore our diploma and certificate courses and get started today.',
    ctaButtonText: 'Learn More',
    searchPlaceholder: 'What are you looking for?',
    isActive: true
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Try to fetch from Contentful with caching
      const data = await getHomepageHeroCached()

      // If no content found in Contentful, return fallback
      if (!data) {
        console.log('No homepage hero content found in Contentful, using fallback')
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
        return res.status(200).json(FALLBACK_HERO)
      }

      // Set cache headers for CDN
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      res.status(200).json(data)
    } catch (error: any) {
      console.error('Failed to get homepage hero data:', error.message || error)

      // Return fallback data on error
      console.log('Returning fallback hero data due to Contentful error')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      res.status(200).json(FALLBACK_HERO)
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
