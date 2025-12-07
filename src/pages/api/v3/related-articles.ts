import { IContentfulResponse } from '@/types'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (req.method === 'GET') {
    try {
      const { tags, category, excludeId, limit = 10 } = req.query

      if (!tags && !category) {
        return res.status(400).json({ message: 'Either tags or category parameter is required' })
      }

      // Build query parameters
      let query = `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&include=2`

      // If tags provided, filter by category first, then match by tags in client
      if (category) {
        query += `&fields.category=${category}`
      }

      const response = await axiosContentfulClient.get<IContentfulResponse>(query)
      const data = response.data

      if (!data.items.length) {
        return res.status(200).json({ items: [] })
      }

      // Resolve all articles
      const resolvedArticles = data.items.map((item) => ({
        id: item.sys.id,
        slug: item.fields.slug,
        title: item.fields.title,
        summary: item.fields.summary || item.fields.excerpt || '',
        coverImage: item.fields.coverImage?.fields?.file?.url
          ? `https:${item.fields.coverImage.fields.file.url}`
          : undefined,
        tags: item.fields.tags || [],
        category: item.fields.category,
        readingTime: Math.ceil(
          (item.fields.body?.content?.reduce((acc: number, node: any) => {
            if (node.nodeType === 'text' && node.value) {
              return acc + node.value.trim().split(/\s+/).length
            }
            return acc
          }, 0) || 0) / 200
        )
      }))

      // Filter out the current article
      let filtered = resolvedArticles.filter((a) => a.id !== excludeId)

      // Score by tag overlap if tags provided
      if (tags) {
        const tagsArray = (typeof tags === 'string' ? tags.split(',') : tags).map((t: string) => t.trim())

        filtered = filtered
          .map((article) => {
            const matchedTags = article.tags.filter((tag: string) => tagsArray.includes(tag))
            return {
              ...article,
              relevanceScore: matchedTags.length,
              matchedTags
            }
          })
          .filter((a) => a.relevanceScore > 0)
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
      }

      // Limit results
      const limitNum = parseInt(typeof limit === 'string' ? limit : '10', 10)
      const items = filtered.slice(0, limitNum)

      res.status(200).json({ items })
    } catch (error) {
      console.error('Failed to get related articles', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
