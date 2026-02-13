import { IContentfulResponse } from '@/types'
import { resolveReferences } from '@/utils'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import type { NextApiRequest, NextApiResponse } from 'next'

// Map section names to Contentful content type IDs
const SECTION_CONTENT_TYPES: Record<string, string> = {
  testimonials: 'courseTestimonial',
  mentors: 'courseMentor',
  facilities: 'courseFacility',
  leader: 'courseLeader',
  industryQuote: 'industryQuote',
  benefits: 'courseBenefit',
  semesters: 'courseSemester',
  paymentPlans: 'coursePaymentPlan',
  careers: 'courseCareer',
  alumni: 'courseAlumniStory'
}

const ORDERED_SECTIONS = ['testimonials', 'mentors', 'benefits', 'semesters', 'careers']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { slug, section } = req.query

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'slug parameter is required' })
  }

  if (!section || typeof section !== 'string') {
    return res.status(400).json({ message: 'section parameter is required' })
  }

  const contentTypeId = SECTION_CONTENT_TYPES[section]
  if (!contentTypeId) {
    return res.status(400).json({
      message: `Invalid section: ${section}. Valid sections: ${Object.keys(SECTION_CONTENT_TYPES).join(', ')}`
    })
  }

  try {
    // First get the course by slug
    const courseResponse = await axiosContentfulClient.get<IContentfulResponse>(
      `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=course&fields.slug=${slug}&select=sys.id`
    )

    if (!courseResponse.data.items.length) {
      return res.status(404).json({ message: `No course found for slug: ${slug}` })
    }

    const courseId = courseResponse.data.items[0].sys.id

    // Build query for section entries linked to this course
    const orderParam = ORDERED_SECTIONS.includes(section) ? '&order=fields.displayOrder' : ''
    const query = `content_type=${contentTypeId}&fields.course.sys.id=${courseId}${orderParam}`

    const response = await axiosContentfulClient.get<IContentfulResponse>(
      `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&${query}&include=2`
    )

    const data = response.data
    const items = data.items || []
    const assets = data.includes?.Asset || []
    const entries = data.includes?.Entry || []

    // Resolve references
    const resolvedItems = items.map((item: any) => ({
      ...item,
      fields: resolveReferences(item.fields, entries, assets)
    }))

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')

    res.status(200).json({
      items: resolvedItems,
      total: resolvedItems.length
    })
  } catch (error: any) {
    console.error(`Failed to get course ${section}`, error)

    // If content type doesn't exist yet, return empty array
    if (error?.response?.status === 400 && error?.response?.data?.message?.includes('content_type')) {
      console.warn(`Course ${section} content type not found in Contentful, returning empty array`)
      return res.status(200).json({ items: [], total: 0 })
    }

    res.status(500).json({
      message: 'Internal Server Error',
      items: [],
      total: 0
    })
  }
}
