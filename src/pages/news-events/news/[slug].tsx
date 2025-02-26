import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Card, Tabs } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { PageSEO, SocialShare } from '@/components/shared/v3';
import { EmptyCard } from '@/components/cards';
import { Paragraph, ParagraphContentful } from '@/components/ui';

import IconDiary from '@/assets/icons/Diary';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function NewsArticlePage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const slug = router.query.slug;
  const [article, setArticle] = useState<any>();

  const fetchNewsArticle = useCallback(async () => {
    if (!slug) return;

    try {
      const response = await fetch(`/api/v3/news-details?slug=${slug}`);
      const data = await response.json();
      setArticle(data.fields);
    } catch (error) {
      console.log('Error fetching article:', error);
    }
  }, [slug]);

  useEffect(() => {
    fetchNewsArticle();
  }, [fetchNewsArticle]);

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
            <Box className="mx-auto flex w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
              <Box className="sm:w-[200px]">
                <SocialShare item={article} />
              </Box>
              {article && (
                <Card className="mb-6 min-h-[80vh] w-full sm:ml-8" withBorder>
                  <Box className="relative" h={isMobile ? '200px' : '600px'}>
                    <Image
                      src={`https:${article.coverImage.fields.file.url}`}
                      alt={article.title}
                      style={{ borderRadius: 8 }}
                      fill
                    />
                  </Box>
                  <Paragraph fontFamily="font-nexa" fontWeight={400} size="26px" className="py-6">
                    {article.title}
                  </Paragraph>
                  <ParagraphContentful fontFamily="font-nexa">{article.body}</ParagraphContentful>
                </Card>
              )}
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
