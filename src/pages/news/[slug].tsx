import { ensureProtocol } from '@/utils'
import { PageSEO } from '@/components/shared/v3'
import { BlogPostSchema } from '@/components/seo/ArticleSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import ArticleLayout from '@/components/articles/ArticleLayout'

export default function NewsArticlePage({
  article,
  slug,
  relatedArticles = []
}: {
  article: any
  slug: string
  relatedArticles?: any[]
}) {
  const tagKeywords = article?.tags?.join(', ') || ''

  return (
    <ArticleLayout
      article={article}
      slug={slug}
      relatedArticles={relatedArticles}
      section="news"
      backLabel="News"
      backHref="/news"
      seoSchemas={
        article ? (
          <>
            <PageSEO
              title={`${article.title} - News | ADMI Kenya`}
              description={article.summary || article.excerpt}
              keywords={`${article.category || 'News'}, ${tagKeywords}, ADMI, Kenya`}
              url={`/news/${slug}`}
              image={
                article.coverImage?.fields?.file?.url
                  ? ensureProtocol(article.coverImage.fields.file.url)
                  : undefined
              }
            />
            <BreadcrumbSchema
              title={article.title}
              slug={slug}
              category={article.category || 'News'}
            />
            <BlogPostSchema
              title={article.title}
              description={
                article.summary ||
                article.excerpt ||
                'Latest news from Africa Digital Media Institute'
              }
              image={
                article.coverImage?.fields?.file?.url
                  ? ensureProtocol(article.coverImage.fields.file.url)
                  : undefined
              }
              publishedDate={article.publishDate || article.sys?.createdAt}
              modifiedDate={article.sys?.updatedAt}
              url={`https://admi.africa/news/${slug}`}
              category={article.category || 'News'}
              tags={article.tags || ['ADMI', 'News']}
            />
          </>
        ) : undefined
      }
    />
  )
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params
  const baseUrl = `http://${context.req.headers.host}`

  try {
    const response = await fetch(`${baseUrl}/api/v3/news-details?slug=${slug}`)
    if (!response.ok) {
      return { notFound: true }
    }

    const data = await response.json()
    const article = { ...data.fields, sys: data.sys }

    const relatedResponse = await fetch(
      `${baseUrl}/api/v3/related-articles?tags=${encodeURIComponent((article.tags || []).join(','))}&category=${encodeURIComponent(article.category || 'News')}&excludeId=${data.sys?.id || ''}&limit=3`
    )

    let relatedArticles = []
    if (relatedResponse.ok) {
      const relatedData = await relatedResponse.json()
      relatedArticles = relatedData.items || []
    }

    return {
      props: { article, slug, relatedArticles }
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return { notFound: true }
  }
}
