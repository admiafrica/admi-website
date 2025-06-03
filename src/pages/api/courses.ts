import { IContentfulEntry, IContentfulResponse } from '@/types'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (req.method === 'GET') {
    try {
      const { slug } = req.query

      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=campaigns&fields.slug=${slug}&include=10`
      )
      const data = response.data

      if (!data.items.length) {
        return res.status(404).json({ message: `No course found for slug: ${slug}` })
      }

      const mainItem = data.items[0] // The primary course item
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Helper function to resolve references
      const resolveReferences = (fields: Record<string, IContentfulEntry>) => {
        const resolveField: any = (field: any) => {
          if (Array.isArray(field)) {
            return field.map((item) => resolveField(item))
          }
          if (field?.sys?.type === 'Link') {
            const linkedId = field.sys.id
            const linkedType = field.sys.linkType

            if (linkedType === 'Asset') {
              return assets.find((asset) => asset.sys.id === linkedId) || field
            }
            if (linkedType === 'Entry') {
              return entries.find((entry) => entry.sys.id === linkedId) || field
            }
          }
          return field
        }

        return Object.entries(fields).reduce<Record<string, IContentfulEntry>>((resolvedFields, [key, value]) => {
          resolvedFields[key] = resolveField(value)
          return resolvedFields
        }, {})
      }

      // Resolve references in the main item
      const resolvedMainItem = {
        ...mainItem,
        fields: resolveReferences(mainItem.fields),
        assets,
        entries
      }

      res.status(200).json(resolvedMainItem)
    } catch (error) {
      console.error('Failed to get courses', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
