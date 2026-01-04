import { IContentfulResponse } from '@/types'
import { resolveReferences } from '@/utils'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import type { NextApiRequest, NextApiResponse } from 'next'

// In-memory cache
let cachedData: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Static fallback data (minimal homepage data)
const FALLBACK_DATA = [
  {
    sys: { id: 'fallback', type: 'Entry' },
    fields: {
      title: 'Africa Digital Media Institute',
      heroTitle: 'Launch your career in Creative Media & Technology',
      heroDescription:
        'ADMI stands for Africa Digital Media Institute - based in Nairobi, Kenya, we are the premier and leading training institution in creative media and technology in the region, offering diploma and certificate courses.',
      testimonials: []
    }
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (req.method === 'GET') {
    // Check cache first
    const now = Date.now()
    if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
      // Set cache headers
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      return res.status(200).json(cachedData)
    }

    try {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=homepage&include=10`
      )
      const data = response.data

      const courseItems = data.items
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Resolve references in the main item
      const resolvedCourses = courseItems.map((course: any) => {
        return {
          ...course,
          fields: resolveReferences(course.fields, entries, assets),
          assets
        }
      })

      // Update cache
      cachedData = resolvedCourses
      cacheTimestamp = now

      // Set cache headers
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      res.status(200).json(resolvedCourses)
    } catch (error: any) {
      console.error('Failed to get homepage data:', error.message || error)

      // If we have cached data, return it even if expired
      if (cachedData) {
        console.log('Returning stale cache due to error')
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
        return res.status(200).json(cachedData)
      }

      // Otherwise return fallback data
      console.log('Returning fallback data due to Contentful error')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      res.status(200).json(FALLBACK_DATA)
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
