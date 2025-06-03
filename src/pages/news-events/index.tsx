import { Box, Tabs } from '@mantine/core'
import { PageSEO } from '@/components/shared/v3'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { AnnouncementCard, EmptyCard, EventAnnouncementCard, NewsItemCard } from '@/components/cards'

import ImageNews from '@/assets/images/featured-news.svg'
import IconDiary from '@/assets/icons/Diary'
import { IContentfulEntry } from '@/types'
import { Paragraph } from '@/components/ui'

export default function NewsEventsLandingPage({ news, events, featuredNews, featuredEvent }: any) {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="News & Events" />
      <Box className="w-full">
        <Tabs defaultValue="news">
          <Tabs.List w={'100%'} bg={'#002A23'}>
            <Tabs.Tab
              value="news"
              rightSection={<IconDiary width={32} height={32} color="white" />}
              className="grow transition hover:bg-admiRed"
              w={'50%'}
              h={60}
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
            >
              <Paragraph className="text-white" fontFamily="font-nexa" fontWeight={900}>
                Events
              </Paragraph>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="news">
            <Box className="mx-auto w-full max-w-screen-xl">
              {/* HEADLINE */}
              <Box className="w-full px-4 py-16 xl:px-0">
                {featuredNews && (
                  <AnnouncementCard
                    destination="news-events/news"
                    announcement={featuredNews.fields}
                    bgColor="admiShamrok"
                    ribbonColor="admiRed"
                    image={ImageNews}
                    featured
                  />
                )}
              </Box>
              {/* NEWS */}
              <Box className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">
                {news
                  .filter((article: IContentfulEntry) => !article.fields.featured)
                  .map((article: IContentfulEntry) => (
                    <Box key={article.sys.id} className="mb-4 h-[400px]">
                      <NewsItemCard item={article} />
                    </Box>
                  ))}
              </Box>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="events" w={'100%'} h={'100%'} className="flex items-center justify-center">
            <Box className="mx-auto w-full">
              {events.length === 0 ? (
                <Box className="flex h-full w-full justify-center pt-[10vh]">
                  <EmptyCard
                    title="No events available!"
                    subtext="Hello there! Seems like we currently don’t have any event ongoing. Kindly check again"
                  />
                </Box>
              ) : (
                <Box className="sm:h-min-[900px] w-full">
                  <div className="w-full bg-[#002A23] sm:h-[320px]"></div>
                  {featuredEvent && (
                    <Box className="w-full" bg={'#F5FFFD'}>
                      <Box className="z-0 mx-auto h-fit w-full max-w-screen-xl transform px-4 py-16 sm:absolute sm:left-1/2 sm:top-[180px] sm:-translate-x-1/2 xl:px-0">
                        <EventAnnouncementCard
                          announcement={featuredEvent.fields}
                          bgColor="linear-gradient(0deg, #FEFFF5, #FEFFF5),linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.1) 100%)"
                          image={ImageNews}
                          featured
                        />
                      </Box>
                    </Box>
                  )}
                  {/* EVENTS */}
                  <Box className="mx-auto w-full max-w-screen-xl px-4 sm:mt-[320px] xl:px-0">
                    {events
                      .filter((_event: IContentfulEntry, index: number) => index != 0)
                      .map((event: IContentfulEntry) => (
                        <EventAnnouncementCard
                          key={event.sys.id}
                          announcement={event.fields}
                          bgColor="linear-gradient(0deg, #FEFFF5, #FEFFF5),linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.1) 100%)"
                          image={ImageNews}
                        />
                      ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  try {
    const [newsRes, eventsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/news`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/events`)
    ])

    if (!newsRes.ok || !eventsRes.ok) throw new Error('Failed to fetch data')

    const [news, events] = await Promise.all([newsRes.json(), eventsRes.json()])
    const sortedEvents = events.reverse()

    return {
      props: {
        news: news,
        events: sortedEvents,
        featuredNews: news.find((article: IContentfulEntry) => article.fields.featured) || null,
        featuredEvent: sortedEvents[0] || null
      }
    }
  } catch (error) {
    console.error('Error fetching news & events:', error)
    return { props: { news: [], events: [], featuredNews: null, featuredEvent: null } }
  }
}
