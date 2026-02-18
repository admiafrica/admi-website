import React, { useMemo } from 'react'

interface ArticleMetadataProps {
  tags?: string[]
  readingTime?: number
  publishedDate?: string
  modifiedDate?: string
  category?: string
  author?: string
}

/**
 * Enhanced article metadata component
 * Displays tags, reading time, and dates with SEO optimization
 */
export function ArticleMetadata({
  tags = [],
  readingTime = 0,
  publishedDate,
  category,
  author = 'ADMI Editorial Team'
}: ArticleMetadataProps) {
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <div className="mb-8 flex flex-col gap-4">
      {/* Publishing info */}
      <div className="flex flex-wrap gap-4">
        {author && <p className="text-sm text-gray-500">By {author}</p>}
        {formattedDate && <p className="text-sm text-gray-500">{formattedDate}</p>}
        {readingTime > 0 && <p className="text-sm text-gray-500">{readingTime} min read</p>}
      </div>

      {/* Category badge */}
      {category && (
        <div className="flex flex-wrap gap-1">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
            {category}
          </span>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <a
              key={tag}
              href={`/resources?tag=${encodeURIComponent(tag)}`}
              className="inline-flex cursor-pointer items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800 hover:bg-gray-50"
            >
              {tag}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

interface RelatedArticleProps {
  id: string
  title: string
  slug: string
  summary: string
  coverImage?: string
  tags?: string[]
  readingTime?: number
}

interface RelatedArticlesProps {
  currentArticleTags?: string[]
  currentArticleId?: string
  articles?: RelatedArticleProps[]
}

/**
 * Related articles widget
 * Shows 3-4 related articles based on tag similarity
 * Improves internal linking and reduces bounce rate
 */
export function RelatedArticles({ currentArticleTags = [], currentArticleId, articles = [] }: RelatedArticlesProps) {
  // Calculate relevance score based on tag overlap (case-insensitive)
  const scoredArticles = useMemo(() => {
    const normalizedCurrentTags = currentArticleTags.map((tag) => tag.toLowerCase())

    return articles
      .filter((a) => a.id !== currentArticleId)
      .map((article) => {
        const matchedTags = (article.tags || []).filter((tag) => normalizedCurrentTags.includes(tag.toLowerCase()))
        return {
          ...article,
          relevanceScore: matchedTags.length,
          matchedTags
        }
      })
      .filter((a) => a.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3)
  }, [articles, currentArticleTags, currentArticleId])

  if (scoredArticles.length === 0) return null

  return (
    <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
      <p className="mb-4 text-lg text-gray-700" style={{ fontWeight: 600 }}>
        Related Articles
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {scoredArticles.map((article) => (
          <a
            key={article.id}
            href={`/resources/${article.slug}`}
            className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            style={{ cursor: 'pointer', textDecoration: 'none', borderRadius: '0.375rem' }}
          >
            {article.coverImage && (
              <div
                style={{
                  height: '150px',
                  backgroundImage: `url(${article.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}
              />
            )}

            <p
              className="mb-2 text-sm text-gray-700"
              style={{
                fontWeight: 600,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {article.title}
            </p>

            <p
              className="mb-4 text-xs text-gray-500"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {article.summary}
            </p>

            <div className="flex flex-wrap justify-between gap-1">
              <div className="flex flex-wrap gap-1">
                {article.readingTime && <p className="text-xs text-gray-500">{article.readingTime} min</p>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ArticleMetadata
