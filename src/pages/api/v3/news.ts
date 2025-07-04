import { IContentfulResponse } from '@/types'
import { resolveReferences } from '@/utils'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (req.method === 'GET') {
    try {
      // Try main query first
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category[match]=News&order=-sys.createdAt`
      )

      // Also try a broader query to catch any articles that might have different category formatting
      const fallbackResponse = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&order=-sys.createdAt&limit=50`
      )

      const data = response.data
      const fallbackData = fallbackResponse.data

      const items = data.items
      const fallbackItems = fallbackData.items.filter((item: any) => {
        const category = item.fields?.category?.toLowerCase?.() || ''
        return category.includes('news') || category.includes('announcement') || category.includes('award')
      })

      // Combine both sets of items, removing duplicates
      const allItems = [...items]
      fallbackItems.forEach((item: any) => {
        if (!items.find((existing: any) => existing.sys.id === item.sys.id)) {
          allItems.push(item)
        }
      })

      const assets = [...(data.includes?.Asset || []), ...(fallbackData.includes?.Asset || [])]
      const entries = [...(data.includes?.Entry || []), ...(fallbackData.includes?.Entry || [])]

      // Resolve references in the main item - exclude assets to reduce payload size
      const resolvedItems = allItems.map((course: any) => {
        const resolvedFields = resolveReferences(course.fields, entries, assets)

        // Debug logging for categories
        if (process.env.NODE_ENV === 'development') {
          console.log('Article category:', {
            title: resolvedFields.title,
            category: resolvedFields.category,
            slug: resolvedFields.slug
          })
        }

        return {
          ...course,
          fields: resolvedFields
          // Removed assets array to reduce payload size
        }
      })

      res.status(200).json(resolvedItems)
    } catch (error) {
      console.error('Failed to get news', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
