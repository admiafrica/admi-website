import Image from 'next/image'
import { Box, Card } from '@mantine/core'
import { useRouter } from 'next/router'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO, SocialShare } from '@/components/shared/v3'
import { EducationalResourceSchema } from '@/components/seo/ArticleSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Button, Paragraph, ParagraphContentful } from '@/components/ui'
import { ArticleMetadata, RelatedArticles } from '@/components/articles/ArticleMetadata'
import { useIsMobile } from '@/hooks/useIsMobile'

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'

// Helper: Extract plain text from Contentful rich text
function extractPlainText(richText: any): string {
  if (!richText || !richText.content) return ''
  const text: string[] = []

  const walkContent = (nodes: any[]) => {
    nodes.forEach((node) => {
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

// Helper: Calculate reading time (200 words per minute)
function calculateReadingTime(richText: any): number {
  const plainText = extractPlainText(richText)
  if (!plainText) return 0
  const wordCount = plainText.trim().split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

export default function ResourceArticlePage({
  article,
  slug,
  relatedArticles = []
}: {
  article: any
  slug: string
  relatedArticles?: any[]
}) {
  const isMobile = useIsMobile()
  const router = useRouter()

  // Calculate article metrics
  const readingTime = calculateReadingTime(article?.body)
  const wordCount = extractPlainText(article?.body).trim().split(/\s+/).length
  const tagKeywords = article?.tags?.join(', ') || ''

  const navigateToResources = () => {
    router.push('/resources')
  }

  return (
    <MainLayout footerBgColor="white">
      {article && (
        <>
          <PageSEO
            title={`${article.title} - Resources | ADMI Kenya`}
            description={article.summary || article.excerpt}
            keywords={`${article.category}, ${tagKeywords}, ADMI, Kenya, career guide`}
            url={`/resources/${slug}`}
            image={`https://${article.coverImage?.fields.file.url}`}
          />
          <BreadcrumbSchema title={article.title} slug={slug} category={article.category} />
          <EducationalResourceSchema
            title={article.title}
            description={
              article.summary || article.excerpt || 'Educational resource from Africa Digital Media Institute'
            }
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
      <div className="h-[16em] w-full bg-[#002A23]">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[62%] top-[20vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full justify-end pr-[10%]">
            <Image src={IconBgImageYellow} alt={'background image'} />
          </div>
        </div>

        <div className="absolute left-1/2 top-[5vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full">
            <Image src={IconBgImageRed} alt={'background image'} />
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 pt-24 2xl:px-0">
          <Box className="w-fit">
            <Button label="Back to Resources" size="lg" onClick={navigateToResources} />
          </Box>
        </div>
      </div>
      <Box className="relative h-full w-full" bg={'white'}>
        <Box className="mx-auto flex h-full w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
          <Box className="h-full sm:w-[200px]">
            <SocialShare item={article} />
          </Box>
          {article && (
            <Card className="mb-6 min-h-[80vh] w-full sm:ml-8" withBorder>
              <Box className="relative" h={isMobile ? '200px' : '540px'}>
                <Image
                  src={`https:${article.coverImage.fields.file.url}`}
                  alt={article.title}
                  style={{ borderRadius: 8 }}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </Box>

              {/* Article Metadata: Author, Date, Category, Tags */}
              <ArticleMetadata
                tags={article.tags}
                readingTime={readingTime}
                publishedDate={article.publishDate || article.sys?.createdAt}
                modifiedDate={article.sys?.updatedAt}
                category={article.category}
                author="ADMI Editorial Team"
              />

              <Paragraph fontFamily="font-nexa" fontWeight={400} size="26px" className="py-6">
                {article.title}
              </Paragraph>
              <ParagraphContentful fontFamily="font-nexa">{article.body}</ParagraphContentful>

              {/* Related Articles Widget */}
              {relatedArticles.length > 0 && (
                <RelatedArticles
                  currentArticleId={article.sys?.id}
                  currentArticleTags={article.tags || []}
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

export async function getServerSideProps(context: any) {
  const { slug } = context.params
  const baseUrl = `http://${context.req.headers.host}`

  try {
    // Fetch main article
    const response = await fetch(`${baseUrl}/api/v3/resource-details?slug=${slug}`)
    if (!response.ok) throw new Error('Failed to fetch article')

    const data = await response.json()
    const article = data.fields

    // Fetch related articles based on tags and category
    const relatedResponse = await fetch(
      `${baseUrl}/api/v3/related-articles?tags=${encodeURIComponent((article.tags || []).join(','))}&category=${encodeURIComponent(article.category || '')}&excludeId=${data.sys.id}&limit=3`
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
    console.error('Error fetching resource:', error)

    return {
      notFound: true // Show 404 page if article is not found
    }
  }
}
