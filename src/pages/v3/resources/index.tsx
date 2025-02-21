import { Box, Tabs } from '@mantine/core';

import { PageSEO } from '@/components/shared/v3';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { AnnouncementCard, EmptyCard, NewsItemCard } from '@/components/cards';

import ImageNews from '@/assets/images/featured-news.svg';
import { useCallback, useEffect, useState } from 'react';
import IconDiary from '@/assets/icons/Diary';
import { IContentfulEntry } from '@/types';
import { Paragraph } from '@/components/ui';

export default function ResourcesPage() {
  const [news, setNews] = useState<Array<any>>([]);
  const [featured, setFeatured] = useState<IContentfulEntry>();

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/resources`);
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
      <PageSEO title="Resources" />
      <Box className="w-full">
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
              <Box key={article.sys.id} className="mx-auto mb-10 h-[400px] w-[32%]">
                <NewsItemCard item={article} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
