import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mantine/core';

import { PageSEO } from '@/components/shared/v3';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { AnnouncementCard, NewsItemCard } from '@/components/cards';
import { IContentfulEntry } from '@/types';

import ImageNews from '@/assets/images/featured-news.svg';

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
          <Box className="mx-auto flex w-full max-w-screen-xl flex-wrap px-4 xl:px-0">
            {news
              .filter((article) => !article.fields.featured)
              .map((article) => (
                <Box key={article.sys.id} className="mx-auto mb-10 h-[400px] sm:w-[32%]">
                  <NewsItemCard item={article} />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
