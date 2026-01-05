import { IContentfulResponse } from '@/types'
import { ensureProtocol } from '@/utils'
import axiosContentfulClient from '@/utils/axiosContentfulClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT

  if (req.method === 'GET') {
    try {
      const { tags, category, topic, limit = 10 } = req.query

      if (!tags && !category && !topic) {
        return res.status(400).json({ message: 'Either tags, category, or topic parameter is required' })
      }

      // Build query for articles in Resources category with higher include to resolve assets
      let query = `/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=Resources&include=10`

      // If topic provided, filter by it (NEW - preferred method)
      if (topic && topic !== 'all') {
        query += `&fields.topic=${topic}`
      }
      // If category provided, filter by it (LEGACY - for backward compatibility)
      else if (category && category !== 'all') {
        query += `&fields.category=${category}`
      }

      const response = await axiosContentfulClient.get<IContentfulResponse>(query)
      const data = response.data

      if (!data.items.length) {
        return res.status(200).json({ items: [] })
      }

      // Resolve all articles with proper asset reference resolution
      const resolvedArticles = data.items.map((item) => {
        let readingTime = 0
        if (item.fields.body?.content) {
          const wordCount = item.fields.body.content.reduce((acc: number, node: any) => {
            if (node.nodeType === 'text' && node.value) {
              return acc + node.value.trim().split(/\s+/).length
            }
            return acc
          }, 0)
          readingTime = Math.ceil(wordCount / 200)
        }

        // Extract cover image - handle both direct file URL and asset reference
        let coverImage: string | undefined
        if (item.fields.coverImage?.sys?.id && data.includes?.Asset) {
          // Asset is referenced by ID, find it in includes
          const asset = data.includes.Asset.find((a: any) => a.sys.id === item.fields.coverImage.sys.id)
          if (asset?.fields?.file?.url) {
            coverImage = ensureProtocol(asset.fields.file.url)
          }
        } else if (item.fields.coverImage?.fields?.file?.url) {
          // Asset is directly embedded (shouldn't happen with include=10, but handle just in case)
          coverImage = ensureProtocol(item.fields.coverImage.fields.file.url)
        }

        return {
          id: item.sys.id,
          slug: item.fields.slug,
          title: item.fields.title,
          summary: item.fields.summary || item.fields.excerpt || '',
          coverImage,
          tags: item.fields.tags || [],
          category: item.fields.category,
          topic: item.fields.topic, // NEW - include topic for SEO/display
          readingTime
        }
      })

      // Score by tag overlap if tags provided
      let filtered = resolvedArticles
      if (tags) {
        const tagsArray = (typeof tags === 'string' ? tags.split(',') : tags).map((t: string) => t.trim().toLowerCase())

        const scoredArticles = resolvedArticles.map((article) => {
          const matchedTags = article.tags.filter((tag: string) => tagsArray.includes(tag.toLowerCase()))
          return {
            ...article,
            relevanceScore: matchedTags.length,
            matchedTags
          }
        })

        // First, try to return articles with tag matches
        const withTagMatches = scoredArticles.filter((a) => a.relevanceScore > 0)
        if (withTagMatches.length > 0) {
          filtered = withTagMatches.sort((a, b) => b.relevanceScore - a.relevanceScore)
        } else {
          // If no tag matches, return all articles (fallback to category-only results)
          filtered = scoredArticles.sort(() => Math.random() - 0.5) // Random order as fallback
        }
      }

      // Limit results
      const limitNum = parseInt(typeof limit === 'string' ? limit : '10', 10)
      const items = filtered.slice(0, limitNum)

      res.status(200).json({ items })
    } catch (error) {
      console.error('Failed to get course articles', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
