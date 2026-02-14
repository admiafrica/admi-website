import React from 'react'
import Link from 'next/link'

interface CourseArticleProps {
  id: string
  title: string
  slug: string
  summary: string
  coverImage?: string
  tags?: string[]
  readingTime?: number
  category?: string
}

interface CourseArticlesProps {
  courseName: string
  courseTags?: string[]
  articles?: CourseArticleProps[]
}

/**
 * CourseArticles component
 * Displays relevant articles on course detail pages
 * Improves engagement and internal linking
 * Articles are matched by course tags or category
 */
export function CourseArticles({ courseName, articles = [] }: CourseArticlesProps) {
  if (!articles || articles.length === 0) return null

  return (
    <div className="mt-6 pb-8 pt-8" style={{ borderTop: '1px solid #dee2e6' }}>
      <p className="mb-4 text-xl font-bold text-gray-700">Learn More: Related Articles & Guides</p>

      <p className="mb-6 text-sm text-gray-500">
        Deepen your understanding of {courseName} with these complementary resources
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/resources/${article.slug}`} style={{ textDecoration: 'none' }}>
            <div
              className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              style={{ cursor: 'pointer' }}
            >
              {article.coverImage && (
                <div
                  style={{
                    height: '160px',
                    backgroundImage: `url(${article.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}
                />
              )}

              <p className="mb-2 line-clamp-2 text-sm font-semibold text-gray-700">{article.title}</p>

              <p className="mb-4 line-clamp-2 text-xs text-gray-500">{article.summary}</p>

              <div className="flex flex-wrap justify-between gap-1">
                <div className="flex flex-wrap gap-1">
                  {article.readingTime && <p className="text-xs text-gray-500">{article.readingTime} min read</p>}
                </div>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 2 && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                      +{article.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CourseArticles
