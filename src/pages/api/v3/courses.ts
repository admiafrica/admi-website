import { IContentfulResponse } from '@/types'
import { resolveReferences } from '@/utils'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import type { NextApiRequest, NextApiResponse } from 'next'

// In-memory cache
let cachedData: any = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes (courses change less frequently)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (req.method === 'GET') {
    // Check cache first
    const now = Date.now()
    if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
      return res.status(200).json(cachedData)
    }

    try {
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=course&select=sys.id,fields.slug,fields.name,fields.description,fields.coverImage,fields.programType&order=sys.createdAt&include=2`
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

      res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200')
      res.status(200).json(resolvedCourses)
    } catch (error: any) {
      console.error('Failed to get courses:', error.message || error)

      // If we have cached data, return it even if expired
      if (cachedData) {
        console.log('Returning stale cache due to error')
        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
        return res.status(200).json(cachedData)
      }

      // Otherwise return empty array (handled by EnhancedEnquiryForm fix)
      console.log('Returning empty array due to Contentful error')
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      res.status(200).json([])
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
