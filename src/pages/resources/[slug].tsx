import Image from 'next/image';
import { Box, Card } from '@mantine/core';
import { useRouter } from 'next/router';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { PageSEO, SocialShare } from '@/components/shared/v3';
import { Button, Paragraph, ParagraphContentful } from '@/components/ui';
import { useIsMobile } from '@/hooks/useIsMobile';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';

export default function ResourceArticlePage({ article }: { article: any }) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const navigateToResources = () => {
    router.push('/resources');
  };

  return (
    <MainLayout footerBgColor="white">
      {article && (
        <PageSEO
          title={`Resources - ${article.title}`}
          description={article.summary}
          image={`https://${article.coverImage?.fields.file.url}`}
        />
      )}
      <div className="h-[16em] w-full bg-[#002A23]">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[62%] top-[20vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full justify-end pr-[10%]">
            <Image src={IconBgImageYellow} alt={'background image'} />
          </div>
        </div>

        <div className="absolute left-1/2 top-[5vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full">
            <Image src={IconBgImageRed} alt={'background image'} />
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 pt-24 2xl:px-0">
          <Box className="w-fit">
            <Button label="Back to Resources" size="lg" onClick={navigateToResources} />
          </Box>
        </div>
      </div>
      <Box className="relative w-full" bg={'white'}>
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
      </Box>
    </MainLayout>
  );
}

export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  const baseUrl = `http://${context.req.headers.host}`;

  try {
    const response = await fetch(`${baseUrl}/api/v3/resource-details?slug=${slug}`);
    if (!response.ok) throw new Error('Failed to fetch article');

    const data = await response.json();

    return {
      props: { article: data.fields },
    };
  } catch (error) {
    console.error('Error fetching resource:', error);

    return {
      notFound: true, // Show 404 page if article is not found
    };
  }
}
