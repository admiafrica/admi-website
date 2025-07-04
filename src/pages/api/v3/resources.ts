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
      // Check if pagination is requested
      const page = req.query.page ? parseInt(req.query.page as string) : null
      const limit = req.query.limit ? parseInt(req.query.limit as string) : null

      if (req.query.page || req.query.limit) {
        // NEW PAGINATION MODE
        const actualPage = page || 1
        const actualLimit = limit || 9
        const skip = (actualPage - 1) * actualLimit

        const response = await axiosContentfulClient.get<IContentfulResponse>(
          `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&order=-sys.createdAt&limit=${actualLimit}&skip=${skip}`
        )
        const data = response.data

        const resources = data.items
        const assets = data.includes?.Asset || []
        const entries = data.includes?.Entry || []

        // Resolve references in the main item
        const resolvedResources = resources.map((course: any) => {
          return {
            ...course,
            fields: resolveReferences(course.fields, entries, assets)
          }
        })

        // Get total count for pagination
        const totalResponse = await axiosContentfulClient.get<IContentfulResponse>(
          `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&limit=0`
        )

        const totalCount = (totalResponse.data as any).total || 0
        const totalPages = Math.ceil(totalCount / actualLimit)

        res.status(200).json({
          resources: resolvedResources,
          pagination: {
            page: actualPage,
            limit: actualLimit,
            totalCount,
            totalPages,
            hasNext: actualPage < totalPages,
            hasPrev: actualPage > 1
          }
        })
      } else {
        // OLD MODE - return all resources (for backward compatibility)
        const response = await axiosContentfulClient.get<IContentfulResponse>(
          `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&order=-sys.createdAt`
        )
        const data = response.data

        const resources = data.items
        const assets = data.includes?.Asset || []
        const entries = data.includes?.Entry || []

        // Resolve references in the main item
        const resolvedResources = resources.map((course: any) => {
          return {
            ...course,
            fields: resolveReferences(course.fields, entries, assets)
          }
        })

        res.status(200).json(resolvedResources)
      }
    } catch (error) {
      console.error('Failed to get resources', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
