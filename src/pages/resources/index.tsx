import Image from 'next/image';
import { Box } from '@mantine/core';

import { PageSEO } from '@/components/shared/v3';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { AnnouncementCard, NewsItemCard } from '@/components/cards';
import { SearchDropdown } from '@/components/ui';
import { IContentfulEntry } from '@/types';

import ImageNews from '@/assets/images/featured-news.svg';
import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';

export default function ResourcesPage({
  resources,
  featured,
}: {
  resources: IContentfulEntry[];
  featured: IContentfulEntry | null;
}) {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Resources" />
      <Box className="w-full overflow-x-hidden">
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
          <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
            <SearchDropdown
              destination="resources"
              items={resources}
              buttonLabel="Search"
              placeholder="Search for Resource"
            />
          </div>
        </div>

        <Box className="relative w-full" bg={'#F5FFFD'}>
          <Box className="mx-auto w-full max-w-screen-xl">
            {/* HEADLINE */}
            <Box className="w-full px-4 py-16 xl:px-0">
              {featured && (
                <AnnouncementCard
                  destination="resources"
                  announcement={featured.fields}
                  bgColor="#E43B07"
                  image={ImageNews}
                  textColor="white"
                  arrowColor="white"
                  ribbonColor="admiShamrok"
                  featured
                />
              )}
            </Box>
            {/* RESOURCES */}
            <Box className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">
              {resources
                .filter((article) => !article.fields.featured)
                .map((article) => (
                  <Box key={article.sys.id} className="mb-10 h-[400px]">
                    <NewsItemCard item={article} />
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/resources`);

    if (!res.ok) throw new Error('Failed to fetch resources');

    const resources: IContentfulEntry[] = await res.json();

    return {
      props: {
        resources,
        featured: resources.find((article) => article.fields.featured) || null,
      },
    };
  } catch (error) {
    console.error('Error fetching resources:', error);
    return { props: { resources: [], featured: null } };
  }
}
