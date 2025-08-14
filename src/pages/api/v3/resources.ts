import { resolveReferences } from '@/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  // Check if preview mode is requested
  const isPreview = req.query.preview === 'true'
  const accessToken = isPreview
    ? process.env.CONTENTFUL_PREVIEW_API_TOKEN // Preview API token shows drafts
    : process.env.ADMI_CONTENTFUL_ACCESS_TOKEN // Regular token shows published only

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

        // Use preview.contentful.com for drafts, cdn.contentful.com for published
        const baseUrl = isPreview ? 'https://preview.contentful.com' : 'https://cdn.contentful.com'

        // When in preview mode, only show unpublished draft articles
        let apiUrl = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&order=-sys.createdAt&limit=${actualLimit}&skip=${skip}&include=2`
        if (isPreview) {
          // Add filter to show only unpublished entries (drafts only)
          apiUrl += '&sys.publishedAt[exists]=false'
        }

        const response = await fetch(apiUrl)
        const data = await response.json()

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
        let totalUrl = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&limit=0`
        if (isPreview) {
          // Add filter to show only unpublished entries (drafts only) for total count
          totalUrl += '&sys.publishedAt[exists]=false'
        }

        const totalResponse = await fetch(totalUrl)
        const totalData = await totalResponse.json()
        const totalCount = totalData.total || 0
        const totalPages = Math.ceil(totalCount / actualLimit)

        res.status(200).json({
          resources: resolvedResources,
          isPreview,
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
        const baseUrl = isPreview ? 'https://preview.contentful.com' : 'https://cdn.contentful.com'

        // When in preview mode, only show unpublished draft articles
        let apiUrl = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&order=-sys.createdAt&include=2`
        if (isPreview) {
          // Add filter to show only unpublished entries (drafts only)
          apiUrl += '&sys.publishedAt[exists]=false'
        }

        const response = await fetch(apiUrl)
        const data = await response.json()

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

        res.status(200).json({ resources: resolvedResources, isPreview })
      }
    } catch (error) {
      console.error('Failed to get resources', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
