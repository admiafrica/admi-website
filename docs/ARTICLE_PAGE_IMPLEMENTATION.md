// Quick implementation guide for article page improvements
// File: /src/pages/resources/[slug].tsx - Areas to update

import Image from 'next/image'
import { Box, Card } from '@mantine/core'
import { useRouter } from 'next/router'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO, SocialShare } from '@/components/shared/v3'
import { EducationalResourceSchema } from '@/components/seo/ArticleSchema'
import { Button, Paragraph, ParagraphContentful } from '@/components/ui'
import { useIsMobile } from '@/hooks/useIsMobile'
import { ArticleMetadata, RelatedArticles } from '@/components/articles/ArticleMetadata'

// ============================================
// HELPER FUNCTIONS TO ADD
// ============================================

/**
 * Extract plain text from Contentful rich text
 */
function extractPlainText(richText: any): string {
  if (!richText || !richText.content) return ''
  const text: string[] = []
  
  const walkContent = (nodes: any[]) => {
    nodes.forEach(node => {
      if (node.nodeType === 'text' && node.value) {
        text.push(node.value)
      } else if (node.content) {
        walkContent(node.content)
      }
    })
  }
  
  walkContent(richText.content)
  return text.join(' ')
}

/**
 * Calculate reading time (200 words per minute)
 */
function calculateReadingTime(richText: any): number {
  const plainText = extractPlainText(richText)
  if (!plainText) return 0
  const wordCount = plainText.trim().split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

/**
 * Count words in article
 */
function countWords(richText: any): number {
  const plainText = extractPlainText(richText)
  if (!plainText) return 0
  return plainText.trim().split(/\s+/).length
}

// ============================================
// UPDATED COMPONENT
// ============================================

export default function ResourceArticlePage({ 
  article, 
  slug,
  relatedArticles = [] // Add this param from getServerSideProps
}: { 
  article: any
  slug: string
  relatedArticles: any[]
}) {
  const isMobile = useIsMobile()
  const router = useRouter()
  const navigateToResources = () => router.push('/resources')

  // Calculate article metrics
  const readingTime = calculateReadingTime(article?.body)
  const wordCount = countWords(article?.body)
  const tagKeywords = article?.tags?.join(', ') || ''

  return (
    <MainLayout footerBgColor="white">
      {article && (
        <>
          {/* ============ UPDATED PageSEO ============ */}
          <PageSEO
            title={`${article.title} - Resources | ADMI`}
            description={article.summary || article.excerpt}
            keywords={`${article.category}, ${tagKeywords}, ADMI, Kenya`}
            url={`/resources/${slug}`}
            image={`https://${article.coverImage?.fields.file.url}`}
          />

          {/* ============ UPDATED ArticleSchema ============ */}
          <EducationalResourceSchema
            title={article.title}
            description={article.summary || article.excerpt}
            image={`https:${article.coverImage?.fields.file.url}`}
            publishedDate={article.publishDate || article.sys?.createdAt}
            modifiedDate={article.sys?.updatedAt}
            url={`https://admi.africa/resources/${slug}`}
            category={article.category || 'Educational Resources'}
            tags={article.tags || []}
            readingTime={readingTime}
            wordCount={wordCount}
          />
        </>
      )}

      {/* Header Section - unchanged */}
      <div className="h-[16em] w-full bg-[#002A23]">
        {/* ... existing background images ... */}
      </div>

      <Box className="relative h-full w-full" bg={'white'}>
        <Box className="mx-auto flex h-full w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
          <Box className="h-full sm:w-[200px]">
            <SocialShare item={article} />
          </Box>

          {article && (
            <Card className="mb-6 min-h-[80vh] w-full sm:ml-8" withBorder>
              {/* Cover Image */}
              <Box className="relative" h={isMobile ? '200px' : '540px'}>
                <Image
                  src={`https:${article.coverImage.fields.file.url}`}
                  alt={article.title}
                  style={{ borderRadius: 8 }}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </Box>

              {/* ============ NEW: Article Metadata ============ */}
              <ArticleMetadata
                tags={article.tags}
                readingTime={readingTime}
                publishedDate={article.publishDate || article.sys?.createdAt}
                modifiedDate={article.sys?.updatedAt}
                category={article.category}
                author="ADMI Editorial Team"
              />

              {/* Article Title */}
              <Paragraph fontFamily="font-nexa" fontWeight={400} size="26px" className="py-6">
                {article.title}
              </Paragraph>

              {/* Article Body */}
              <ParagraphContentful fontFamily="font-nexa">
                {article.body}
              </ParagraphContentful>

              {/* ============ NEW: Related Articles Section ============ */}
              {relatedArticles.length > 0 && (
                <RelatedArticles
                  currentArticleTags={article.tags || []}
                  currentArticleId={article.sys?.id}
                  articles={relatedArticles}
                />
              )}
            </Card>
          )}
        </Box>
      </Box>
    </MainLayout>
  )
}

// ============================================
// UPDATED getServerSideProps
// ============================================

export async function getServerSideProps(context: any) {
  const { slug } = context.params
  const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
  const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT
  const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN

  try {
    // Fetch current article
    const articleResponse = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.slug=${slug}&include=2`
    )
    const articleData = await articleResponse.json()
    const article = articleData.items?.[0]?.fields

    if (!article) {
      return { notFound: true }
    }

    // NEW: Fetch related articles (for Related Articles component)
    const relatedResponse = await fetch(
      `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=article&fields.category=${article.category}&limit=20&include=1`
    )
    const relatedData = await relatedResponse.json()
    const relatedArticles = relatedData.items
      ?.filter((item: any) => item.fields.slug !== slug)
      ?.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        summary: item.fields.summary,
        coverImage: item.fields.coverImage?.fields?.file?.url,
        tags: item.fields.tags || [],
        readingTime: calculateReadingTime(item.fields.body)
      }))
      ?.slice(0, 6)

    return {
      props: {
        article,
        slug,
        relatedArticles: relatedArticles || []
      },
      revalidate: 3600 // ISR: revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return { notFound: true }
  }
}

// ============================================
// COMPONENTS TO CREATE
// ============================================

/*
Create this component in: /src/components/articles/ArticleMetadata.tsx

See: /src/components/articles/ArticleMetadata.tsx for the complete component
*/
