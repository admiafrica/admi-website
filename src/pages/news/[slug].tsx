import Image from 'next/image'
import { ensureProtocol } from '@/utils'
import { useRouter } from 'next/router'
import { Box, Card } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO, SocialShare } from '@/components/shared/v3'
import { BlogPostSchema } from '@/components/seo/ArticleSchema'
import { Paragraph, ParagraphContentful } from '@/components/ui'

import { useIsMobile } from '@/hooks/useIsMobile'

export default function NewsArticlePage({ article, slug }: { article: any; slug: string }) {
  const isMobile = useIsMobile()
  const router = useRouter()

  if (!article) {
    return (
      <MainLayout footerBgColor="white">
        <Box className="flex h-[80vh] w-full items-center justify-center">
          <Paragraph fontFamily="font-nexa" size="24px">
            Article not found.
          </Paragraph>
        </Box>
      </MainLayout>
    )
  }

  return (
    <MainLayout footerBgColor="white">
      <>
        <PageSEO
          title={`News - ${article.title}`}
          url={`/news/${slug}`}
          image={
            article.coverImage?.fields?.file?.url
              ? ensureProtocol(article.coverImage.fields.file.url)
              : undefined
          }
        />
        <BlogPostSchema
          title={article.title}
          description={article.summary || article.excerpt || 'Latest news from Africa Digital Media Institute'}
          image={article.coverImage?.fields?.file?.url ? ensureProtocol(article.coverImage.fields.file.url) : undefined}
          publishedDate={article.publishDate || article.sys?.createdAt}
          modifiedDate={article.sys?.updatedAt}
          url={`https://admi.africa/news/${slug}`}
          category="News"
          tags={[
            'ADMI',
            'Africa Digital Media Institute',
            'news',
            'creative media',
            'technology training',
            'digital media education',
            'Kenya',
            'Africa'
          ]}
        />
      </>
      <Box className="w-full">
        <Box className="mx-auto flex w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
          <Box className="sm:w-[200px]">
            <SocialShare item={article} />
          </Box>
          <Card className="mb-6 min-h-[80vh] w-full sm:ml-8" withBorder>
            <Box className="relative" h={isMobile ? '220px' : '540px'}>
              <Image
                src={ensureProtocol(article.coverImage?.fields?.file?.url || '')}
                alt={article.title}
                style={{ borderRadius: 8, objectFit: 'cover' }}
                fill
                priority
              />
            </Box>
            <Paragraph fontFamily="font-nexa" fontWeight={400} size="26px" className="py-6">
              {article.title}
            </Paragraph>
            <ParagraphContentful fontFamily="font-nexa">{article.body}</ParagraphContentful>
            <Box className="pt-8">
              <button
                type="button"
                onClick={() => router.push('/news')}
                className="font-nexa text-[15px] font-bold text-[#BA2E36]"
              >
                Back to News
              </button>
            </Box>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  )
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/news-details?slug=${slug}`)

    if (!response.ok) {
      return { notFound: true }
    }

    const data = await response.json()

    return {
      props: { article: data.fields, slug }
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return { props: { article: null, slug } }
  }
}
