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
      const page = req.query.page ? parseInt(req.query.page as string) : null
      const limit = req.query.limit ? parseInt(req.query.limit as string) : null
      const search = (req.query.search as string) || ''

      const baseUrl = isPreview ? 'https://preview.contentful.com' : 'https://cdn.contentful.com'
      const baseParams = `access_token=${accessToken}&content_type=article&fields.category=Resources&order=-sys.createdAt&include=2`

      // Build search/filter params for Contentful
      let filterParams = ''
      if (isPreview) {
        filterParams += '&sys.publishedAt[exists]=false'
      }
      if (search) {
        filterParams += `&query=${encodeURIComponent(search)}`
      }

      if (req.query.page || req.query.limit) {
        const actualPage = page || 1
        const actualLimit = limit || 9
        const skip = (actualPage - 1) * actualLimit

        const apiUrl = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?${baseParams}&limit=${actualLimit}&skip=${skip}${filterParams}`

        const response = await fetch(apiUrl)
        const data = await response.json()

        const resources = data.items || []
        const assets = data.includes?.Asset || []
        const entries = data.includes?.Entry || []

        const resolvedResources = resources.map((item: any) => ({
          ...item,
          fields: resolveReferences(item.fields, entries, assets)
        }))

        const totalCount = data.total || 0
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
        // Return all resources (no pagination)
        const apiUrl = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?${baseParams}&limit=100${filterParams}`

        const response = await fetch(apiUrl)
        const data = await response.json()

        const resources = data.items || []
        const assets = data.includes?.Asset || []
        const entries = data.includes?.Entry || []

        const resolvedResources = resources.map((item: any) => ({
          ...item,
          fields: resolveReferences(item.fields, entries, assets)
        }))

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
