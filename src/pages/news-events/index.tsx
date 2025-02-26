import { Box, Tabs } from '@mantine/core';

import { PageSEO } from '@/components/shared/v3';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { AnnouncementCard, EmptyCard, EventAnnouncementCard, NewsItemCard } from '@/components/cards';

import ImageNews from '@/assets/images/featured-news.svg';
import { useCallback, useEffect, useState } from 'react';
import IconDiary from '@/assets/icons/Diary';
import { IContentfulEntry } from '@/types';
import { Paragraph } from '@/components/ui';

export default function NewsEventsLandingPage() {
  const [news, setNews] = useState<Array<any>>([]);
  const [events, setEvents] = useState<Array<any>>([]);
  const [featuredNews, setFeaturedNews] = useState<IContentfulEntry>();
  const [featuredEvent, setFeaturedEvent] = useState<IContentfulEntry>();

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/news`);
      const data = await response.json();
      setNews(data);
      const featuredArticle = data.find((article: IContentfulEntry) => article.fields.featured);
      setFeaturedNews(featuredArticle);
    } catch (error) {
      console.log('Error fetching news:', error);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/events`);
      const data = await response.json();
      setEvents(data);
      // const result = data.find((event: IContentfulEntry) => event.fields.featured);
      setFeaturedEvent(data[0]);
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchEvents();
  }, [fetchCourses, fetchEvents]);

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="News & Events" />
      <Box className="w-full">
        <Tabs defaultValue="news">
          <Tabs.List w={'100%'} bg={'#002A23'}>
            <Tabs.Tab
              value="news"
              rightSection={<IconDiary width={32} height={32} color="white" />}
              className="grow"
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
              className="grow"
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
                    image={ImageNews}
                    featured
                  />
                )}
              </Box>
              {/* NEWS */}
              <Box className="mx-auto flex w-full max-w-screen-xl flex-wrap justify-between pl-4 xl:px-0">
                {news
                  .filter((article) => !article.fields.featured)
                  .map((article) => (
                    <Box key={article.sys.id} className="mb-4 h-[400px] w-[33%]">
                      <NewsItemCard item={article} />
                    </Box>
                  ))}
              </Box>
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="events" w={'100%'} h={'100%'} className="flex items-center justify-center">
            <Box className="mx-auto w-full">
              {/* HEADLINE */}
              {events.length == 0 ? (
                <Box className="flex h-full w-full justify-center pt-[10vh]">
                  <EmptyCard
                    title="No events available!"
                    subtext="Hello there! Seems like we currently don’t have any event ongoing. Kindly check again"
                  />
                </Box>
              ) : (
                <Box className="w-full">
                  <div className="h-[450px] w-full bg-[#002A23]"></div>
                  {featuredEvent && (
                    <Box className="w-full" bg={'#F5FFFD'}>
                      <Box className="absolute left-1/2 top-[300px] z-0 mx-auto h-fit w-full max-w-screen-xl -translate-x-1/2 transform px-4 py-16 xl:px-0">
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
                  {/* <Box className="relative mx-auto flex w-full max-w-screen-xl flex-wrap justify-between pl-4 xl:px-0">
                    <Box className="w-full pt-[240px]">
                      {events
                        .filter((event) => !event.fields.featured)
                        .map((event) => (
                          <Box key={event.sys.id} className="mb-4 h-[400px] w-fit">
                            <NewsItemCard item={event} isEvent />
                          </Box>
                        ))}
                    </Box>
                  </Box> */}
                </Box>
              )}
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </MainLayout>
  );
}
