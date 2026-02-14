import { ensureProtocol } from '@/utils'
import { PageSEO } from '@/components/shared/v3'
import { EducationalResourceSchema } from '@/components/seo/ArticleSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { VideoObjectSchema } from '@/components/seo/VideoObjectSchema'
import ArticleLayout, {
  extractPlainText,
  calculateReadingTime,
} from '@/components/articles/ArticleLayout'

export default function ResourceArticlePage({
  article,
  slug,
  relatedArticles = [],
  faqItems = [],
  hasVideo = false,
}: {
  article: any
  slug: string
  relatedArticles?: any[]
  faqItems?: any[]
  hasVideo?: boolean
}) {
  const readingTime = calculateReadingTime(article?.body)
  const wordCount = extractPlainText(article?.body).trim().split(/\s+/).length
  const tagKeywords = article?.tags?.join(', ') || ''

  return (
    <ArticleLayout
      article={article}
      slug={slug}
      relatedArticles={relatedArticles}
      section="resources"
      backLabel="Guides"
      backHref="/resources"
      seoSchemas={
        article ? (
          <>
            <PageSEO
              title={`${article.title} - Resources | ADMI Kenya`}
              description={article.summary || article.excerpt}
              keywords={`${article.category || 'Resources'}, ${tagKeywords}, ADMI, Kenya, career guide`}
              url={`/resources/${slug}`}
              image={
                article.coverImage?.fields?.file?.url
                  ? ensureProtocol(article.coverImage.fields.file.url)
                  : undefined
              }
            />
            <BreadcrumbSchema
              title={article.title}
              slug={slug}
              category={article.category || 'Educational Resources'}
            />
            {faqItems.length > 0 && <FAQSchema questions={faqItems} />}
            {hasVideo && (
              <VideoObjectSchema
                title={`${article.title} - Video Guide`}
                description={
                  article.summary || `Video guide: ${article.title}`
                }
                thumbnailUrl={ensureProtocol(
                  article.coverImage?.fields?.file?.url
                )}
                uploadDate={article.publishDate || article.sys?.createdAt}
                duration="PT3M00S"
                embedUrl={`https://admi.africa/resources/${slug}`}
              />
            )}
            <EducationalResourceSchema
              title={article.title}
              description={
                article.summary ||
                article.excerpt ||
                'Educational resource from Africa Digital Media Institute'
              }
              image={ensureProtocol(article.coverImage?.fields?.file?.url)}
              publishedDate={article.publishDate || article.sys?.createdAt}
              modifiedDate={article.sys?.updatedAt}
              url={`https://admi.africa/resources/${slug}`}
              category={article.category || 'Educational Resources'}
              tags={article.tags || []}
              readingTime={readingTime}
              wordCount={wordCount}
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
    const response = await fetch(
      `${baseUrl}/api/v3/resource-details?slug=${slug}`
    )
    if (!response.ok) throw new Error('Failed to fetch article')

    const data = await response.json()
    const article = { ...data.fields, sys: data.sys }

    const relatedResponse = await fetch(
      `${baseUrl}/api/v3/related-articles?tags=${encodeURIComponent((article.tags || []).join(','))}&category=${encodeURIComponent(article.category || '')}&excludeId=${data.sys?.id || ''}&limit=3`
    )

    let relatedArticles = []
    if (relatedResponse.ok) {
      const relatedData = await relatedResponse.json()
      relatedArticles = relatedData.items || []
    }

    let faqItems: any[] = []
    let hasVideo = false

    try {
      const { extractFAQFromArticle, isHowToArticle, hasVideoEmbed } =
        await import('@/utils/faq-schema-helper')

      if (isHowToArticle(article)) {
        faqItems = extractFAQFromArticle(article.body, article.title)
      }

      hasVideo = hasVideoEmbed(article.body)
    } catch (schemaError) {
      console.error('Error extracting schema data:', schemaError)
    }

    return {
      props: { article, slug, relatedArticles, faqItems, hasVideo },
    }
  } catch (error) {
    console.error('Error fetching resource:', error)
    return { notFound: true }
  }
}
