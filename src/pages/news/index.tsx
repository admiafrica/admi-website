import { Box } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { AnnouncementCard, NewsItemCard } from '@/components/cards'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'
import { IContentfulEntry } from '@/types'

import ImageNews from '@/assets/images/featured-news.svg'

type NewsPageProps = {
  news: IContentfulEntry[]
  featuredNews: IContentfulEntry | null
}

export default function NewsPage({ news, featuredNews }: NewsPageProps) {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="News"
        description="Latest ADMI news, updates, stories, and announcements."
        keywords="ADMI news, student stories, creative media news, ADMI announcements"
      />
      <InstitutionalFAQSchema faqType="general" />

      <Box className="w-full">
        <Box className="bg-[#0F2E2A] px-4 py-16 text-white xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/news</p>
            <h1 className="pt-4 font-fraunces text-[46px] font-bold leading-[1.15]">
              Inside ADMI: The Projects, People, and Partnerships Shaping Creative Education
            </h1>
            <p className="pt-4 font-nexa text-[18px] text-white/80">
              Follow the latest stories from our learning community, industry network, and campus life.
            </p>
          </Box>
        </Box>

        <Box className="border-y border-[#E8E8E8] bg-white">
          <Box className="mx-auto flex w-full max-w-screen-xl items-center justify-around px-4 py-6 xl:px-0">
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">78</p>
              <p className="font-nexa text-[14px] text-[#666]">News Posts This Year</p>
            </Box>
            <Box className="h-[44px] w-px bg-[#DADADA]" />
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">14</p>
              <p className="font-nexa text-[14px] text-[#666]">Feature Stories</p>
            </Box>
            <Box className="h-[44px] w-px bg-[#DADADA]" />
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">Weekly</p>
              <p className="font-nexa text-[14px] text-[#666]">Editorial Updates</p>
            </Box>
          </Box>
        </Box>

        <Box className="border-b border-[#E8E8E8] bg-white">
          <Box className="mx-auto flex w-full max-w-screen-xl items-center gap-2 px-4 xl:px-0">
            {['#top-story', '#program-news', '#campus-news', '#industry-updates'].map((tab, idx) => (
              <span
                key={tab}
                className={`px-4 py-4 font-nexa text-[14px] font-bold ${idx === 0 ? 'border-b-[3px] border-[#BA2E36] text-[#171717]' : 'text-[#666]'}`}
              >
                {tab}
              </span>
            ))}
          </Box>
        </Box>

        <Box className="mx-auto w-full max-w-screen-xl px-4 py-16 xl:px-0">
          {featuredNews && (
            <AnnouncementCard
              destination="news"
              announcement={featuredNews.fields}
              bgColor="#0A3D3D"
              textColor="white"
              arrowColor="white"
              image={ImageNews}
              featured
            />
          )}
        </Box>

        <Box className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">
          {news.length > 0 ? (
            news.map((article) => (
              <Box key={article.sys.id} className="mb-4 h-[400px]">
                <NewsItemCard item={article} />
              </Box>
            ))
          ) : (
            <Box className="col-span-full py-8 text-center">
              <p className="font-nexa">No news articles available at the moment.</p>
            </Box>
          )}
        </Box>

        <Box className="bg-[#F9F9F9] px-4 py-16 xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl">
            <h2 className="font-fraunces text-[38px] font-bold text-[#171717]">News Collections</h2>
            <Box className="grid grid-cols-2 gap-3 pt-6 md:grid-cols-4">
              {['Production News', 'Academic Life', 'Industry Pulse', 'Strategic Updates'].map((item, idx) => (
                <span
                  key={item}
                  className={`rounded-md border border-[#E8E8E8] bg-white px-4 py-2 font-nexa text-[13px] font-bold ${idx % 2 === 0 ? 'text-[#BA2E36]' : 'text-[#444]'}`}
                >
                  {item}
                </span>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/news`)
    if (!response.ok) throw new Error('Failed to fetch news')

    const data = await response.json()
    const news = (Array.isArray(data) ? data : data?.news || data?.resources || []).filter((entry: any) => entry?.fields)

    const featuredNews = news.find((entry: IContentfulEntry) => entry?.fields?.featured) || news[0] || null
    const regularNews = news.filter((entry: IContentfulEntry) => entry?.sys?.id !== featuredNews?.sys?.id)

    return {
      props: {
        news: regularNews,
        featuredNews
      }
    }
  } catch (error) {
    console.error('Error fetching news page data:', error)
    return {
      props: {
        news: [],
        featuredNews: null
      }
    }
  }
}
