import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Card, Divider, Tabs } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { PageSEO } from '@/components/shared/v3';
import { EmptyCard } from '@/components/cards';
import { Paragraph, ParagraphContentful } from '@/components/ui';

import IconDiary from '@/assets/icons/Diary';
import IconFacebook from '@/assets/icons/facebook-social.svg';
import IconWhatsapp from '@/assets/icons/whatsapp-social.svg';
import IconCopyContent from '@/assets/icons/copy-content.svg';
import IconShare from '@/assets/icons/share.svg';
import IconLinkedIn from '@/assets/icons/linkedin-social.svg';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function ResourceArticlePage() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const slug = router.query.slug;
  const [article, setArticle] = useState<any>();

  const fetchNewsArticle = useCallback(async () => {
    if (!slug) return;

    try {
      const response = await fetch(`/api/v3/resource-details?slug=${slug}`);
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
      {article && <PageSEO title={`Resources - ${article.title}`} />}
      <Box className="w-full">
        <Box className="mx-auto flex w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
          <Box className="flex flex-col sm:w-[200px]">
            <Box className="flex pb-6">
              <Image src={IconShare} alt="share" width={32} height={32} />
              <Paragraph className="my-auto" fontFamily="font-nexa">
                Share on:
              </Paragraph>
            </Box>
            <Card className="flex w-full flex-col" shadow="lg">
              <Box className="flex py-4">
                <Image src={IconFacebook} alt="facebook" width={24} height={24} />
                <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                  Facebook
                </Paragraph>
              </Box>
              <Divider />
              <Box className="flex py-4">
                <Image src={IconLinkedIn} alt="facebook" width={24} height={24} />
                <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                  LinkedIn
                </Paragraph>
              </Box>
              <Divider />
              <Box className="flex py-4">
                <Image src={IconWhatsapp} alt="facebook" width={24} height={24} />
                <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                  Whatsapp
                </Paragraph>
              </Box>
              <Divider />
              <Box className="flex py-4">
                <Image src={IconCopyContent} alt="facebook" width={24} height={24} />
                <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                  Copy Link
                </Paragraph>
              </Box>
            </Card>
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
      </Box>
    </MainLayout>
  );
}
