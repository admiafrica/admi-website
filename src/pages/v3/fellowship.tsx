import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Card, Divider, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { CollapsibleContent, PageSEO } from '@/components/shared/v3';
import { AdviceCard, ClipCard, CompanyValuesCard, UserProfileCard, UserTestimonialCard } from '@/components/cards';
import { ADMI_FELLOWSHIP_VALUES, ADMI_FELLOWSHIP_DEPARTMENTS } from '@/utils';

import IconSpinner from '@/assets/icons/Spinner';
import IconUsersGroup from '@/assets/icons/UsersGroup';
import IconDashboardTabs from '@/assets/icons/DashboardTabs';
import { IconDownload } from '@tabler/icons-react';
import IconCalendarCheck from '@/assets/icons/CalendarCheck';
import ImageCalendar from '@/assets/images/calendar.svg';
import ImageFellowshipLanding from '@/assets/images/fellowship-landing.png';

export default function FellowshipPage() {
  const [content, setContent] = useState<any>();

  const fetchContent = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/homepage`);
      const data = await response.json();
      setContent(data[0]);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Fellowship" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'blue'}>
          <Image
            src={ImageFellowshipLanding}
            placeholder="empty"
            alt="Fellowship Banner"
            fill
            priority
            className="absolute inset-0 z-0"
            style={{ objectFit: 'cover' }}
          />
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 80%)`,
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[50vh] w-full max-w-screen-2xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Title label="Fellowship" color="admiShamrok" size="64px" />
              <Title label="Opportunities" color="#B9C601" size="64px" />
              <Box className="flex w-full pt-12">
                <Paragraph fontFamily="font-nexa" className="pr-6 text-white">
                  We are deeply commited to providing you with comprehensive support that ensures your academic and
                  personal success
                </Paragraph>
                <Divider orientation="vertical" />
                <Paragraph fontFamily="font-nexa" className="pl-6 text-white">
                  We are deeply commited to providing you with comprehensive support that ensures your academic and
                  personal success
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="w-full px-4 2xl:px-0">
          <div className="absolute left-1/2 top-[10vh] z-10 w-full max-w-screen-2xl -translate-x-1/2 transform px-4 sm:top-[50vh] 2xl:px-0">
            <CompanyValuesCard values={ADMI_FELLOWSHIP_VALUES} showRightIcons={false} />
          </div>
        </div>
        {/* ACADEMIC CONTRIBUTION */}
        <Box className="mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-96 lg:pt-64 xl:pt-32 2xl:px-0">
          <Box className="mt-20 w-full">
            <div className="my-8 w-fit">
              <Title label="Areas of Contribution" size="24px" color="black" />
            </div>
            <div className="mb-8 w-full max-w-screen-md">
              <Paragraph fontFamily="font-nexa" className="py-4">
                Fellows at ADMI can serve in various departments, including but not limited to:
              </Paragraph>
            </div>
          </Box>

          <div className="relative z-20 flex flex-col justify-between sm:flex-row sm:flex-wrap">
            {ADMI_FELLOWSHIP_DEPARTMENTS.map((dept, index) => (
              <Card
                shadow="md"
                className={ADMI_FELLOWSHIP_DEPARTMENTS.length > 3 ? 'mb-8 sm:w-[22%]' : 'mb-8 sm:w-[30%]'}
                key={`dept-${index}`}
              >
                <div className="flex px-4 pt-4">
                  <dept.icon width={48} height={48} />
                  <div className="min-h-[3em] pl-4 font-nexa">
                    <Text size="1.2em" fw={900}>
                      {dept.name}
                    </Text>
                  </div>
                </div>
                <Paragraph className="py-6" fontFamily="font-nexa">
                  {dept.description}
                </Paragraph>
              </Card>
            ))}
          </div>

          <Box className="w-full">
            <div className="mx-auto my-8 w-fit max-w-screen-md text-center">
              <Paragraph fontFamily="font-nexa" className="py-4">
                We also provide support for students with special needs or learning difficulties, ensuring that everyone
                has access to the resources they need to succeed.
              </Paragraph>
            </div>
          </Box>
        </Box>
      </div>
    </MainLayout>
  );
}
