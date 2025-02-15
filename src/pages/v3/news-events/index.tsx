import { Box, Tabs } from '@mantine/core';

import { PageSEO } from '@/components/shared/v3';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { AnnouncementCard, EmptyCard, NewsItemCard } from '@/components/cards';

import ImageNews from '@/assets/images/featured-news.svg';
import { useCallback, useEffect, useState } from 'react';
import IconDiary from '@/assets/icons/Diary';
import { IContentfulEntry } from '@/types';
import { Paragraph } from '@/components/ui';

export default function NewsEventsLandingPage() {
  const [news, setNews] = useState<Array<any>>([]);
  const [featured, setFeatured] = useState<IContentfulEntry>();
  // const featured = {
  //   title: 'Ganjisha Content Program: Empowering Kenyan Youth Through Digital Skills and Entrepreneurship',
  //   description:
  //     'In response to Kenya’s high youth unemployment rates, the Ganjisha Content Program was established to equip young people with practical.',
  // };

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/news`);
      const data = await response.json();
      setNews(data);
      const featuredArticle = data.find((article: IContentfulEntry) => article.fields.featured);
      setFeatured(featuredArticle);
    } catch (error) {
      console.log('Error fetching news:', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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
                {featured && (
                  <AnnouncementCard announcement={featured.fields} bgColor="admiShamrok" image={ImageNews} featured />
                )}
              </Box>
              {/* NEWS */}
              <Box className="mx-auto flex w-full max-w-screen-xl flex-wrap pl-4 xl:px-0">
                {news.map((article) => (
                  <Box key={article.sys.id} className="mb-4 mr-4 h-[400px] w-[360px]">
                    <NewsItemCard item={article} />
                  </Box>
                ))}
              </Box>
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
  );
}
