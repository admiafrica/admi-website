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
      const response = await axiosContentfulClient.get<IContentfulResponse>(
        `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=program&select=sys.id,fields.name,fields.description,fields.duration,fields.deliveryMode&include=0`
      )
      const data = response.data

      const programItems = data.items
      const assets = data.includes?.Asset || []
      const entries = data.includes?.Entry || []

      // Resolve references in the main item
      const resolvedPrograms = programItems.map((program: any) => {
        return {
          ...program,
          fields: resolveReferences(program.fields, entries, assets),
          assets
        }
      })

      res.status(200).json(resolvedPrograms)
    } catch (error) {
      console.error('Failed to get Course Programs', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
