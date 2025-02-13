import { Box, Tabs } from '@mantine/core';

import { PageSEO } from '@/components/shared/v3';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { AnnouncementCard, EmptyCard, NewsItemCard } from '@/components/cards';

import ImageNews from '@/assets/images/featured-news.svg';
import { useCallback, useEffect, useState } from 'react';
import IconDiary from '@/assets/icons/Diary';

export default function NewsEventsLandingPage() {
  const [courses, setCourses] = useState<Array<any>>([]);
  const news = {
    title: 'Ganjisha Content Program: Empowering Kenyan Youth Through Digital Skills and Entrepreneurship',
    description:
      'In response to Kenya’s high youth unemployment rates, the Ganjisha Content Program was established to equip young people with practical.',
  };

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.log('Error fetching courses:', error);
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
          <Tabs.List w={'100%'}>
            <Tabs.Tab value="news" rightSection={<IconDiary width={12} height={12} />} className="grow" w={'50%'}>
              News
            </Tabs.Tab>
            <Tabs.Tab value="events" rightSection={<IconDiary width={12} height={12} />} className="grow" w={'50%'}>
              Events
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="news">
            <Box className="mx-auto w-full max-w-screen-xl">
              {/* HEADLINE */}
              <Box className="w-full px-4 py-16 xl:px-0">
                <AnnouncementCard announcement={news} bgColor="admiShamrok" image={ImageNews} featured />
              </Box>
              {/* NEWS */}
              <Box className="mx-auto flex w-full max-w-screen-lg flex-wrap pl-4">
                {courses.map((course) => (
                  <Box key={course.sys.id} className="mb-4 mr-4 h-[350px] w-[300px]">
                    <NewsItemCard course={course} />
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
