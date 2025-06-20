import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Card, Tabs } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO, SocialShare } from '@/components/shared/v3'
import { ArticleSchema } from '@/components/shared/StructuredData'
import { EmptyCard } from '@/components/cards'
import { Paragraph, ParagraphContentful } from '@/components/ui'

import IconDiary from '@/assets/icons/Diary'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function NewsArticlePage({ article, slug }: { article: any; slug: string }) {
  const isMobile = useIsMobile()
  const router = useRouter()

  const navigateToPage = (value: string) => {
    router.push(value)
  }

  if (!article) {
    return (
      <MainLayout footerBgColor="white">
        <Box className="flex h-[80vh] w-full items-center justify-center">
          <Paragraph fontFamily="font-nexa" size="24px">
            Resource not found.
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
          url={`/news-events/news/${slug}`}
          image={`https://${article.coverImage?.fields.file.url}`}
        />
        <ArticleSchema
          headline={article.title}
          description={article.summary || article.excerpt || 'Latest news from Africa Digital Media Institute'}
          image={`https:${article.coverImage?.fields.file.url}`}
          author="ADMI Editorial Team"
          datePublished={article.publishDate || article.sys?.createdAt}
          dateModified={article.sys?.updatedAt}
          publisher={{
            name: 'Africa Digital Media Institute',
            logo: 'https://admi.africa/logo.png'
          }}
          url={`https://admi.africa/news-events/news/${slug}`}
          articleSection="News"
          keywords={[
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
        <Tabs defaultValue="news">
          <Tabs.List w={'100%'} bg={'#002A23'}>
            <Tabs.Tab
              value="news"
              rightSection={<IconDiary width={32} height={32} color="white" />}
              className="grow transition hover:bg-admiRed"
              w={'50%'}
              h={60}
              onClick={() => navigateToPage('/news-events')}
            >
              <Paragraph className="text-white" fontFamily="font-nexa" fontWeight={900}>
                News
              </Paragraph>
            </Tabs.Tab>
            <Tabs.Tab
              value="events"
              rightSection={<IconDiary width={32} height={32} color="white" />}
              className="grow transition hover:bg-admiRed"
              w={'50%'}
              h={60}
              onClick={() => navigateToPage('/news-events')}
            >
              <Paragraph className="text-white" fontFamily="font-nexa" fontWeight={900}>
                Events
              </Paragraph>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="news">
            <Box className="mx-auto flex w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
              <Box className="sm:w-[200px]">
                <SocialShare item={article} />
              </Box>
              <Card className="mb-6 min-h-[80vh] w-full sm:ml-8" withBorder>
                <Box className="relative" h={isMobile ? '200px' : '540px'}>
                  <Image
                    src={`https:${article.coverImage.fields.file.url}`}
                    alt={article.title}
                    style={{ borderRadius: 8 }}
                    fill
                    priority
                  />
                </Box>
                <Paragraph fontFamily="font-nexa" fontWeight={400} size="26px" className="py-6">
                  {article.title}
                </Paragraph>
                <ParagraphContentful fontFamily="font-nexa">{article.body}</ParagraphContentful>
              </Card>
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="events" w={'100%'} h={'80vh'} className="flex items-center justify-center px-4">
            <EmptyCard
              title="No events available!"
              subtext="Hello there! Seems like we currently don’t have any event ongoing. Kindly check again"
            />
          </Tabs.Panel>
        </Tabs>
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
    return { props: { article: null } }
  }
}
