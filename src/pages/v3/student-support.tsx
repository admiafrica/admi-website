import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Card, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { CollapsibleContent, PageSEO } from '@/components/shared/v3';
import { AdviceCard, ClipCard, UserProfileCard, UserTestimonialCard } from '@/components/cards';
import {
  ADMI_ACADEMIC_TEAM_MINIMAL,
  ADMI_CAREER_ADVICE,
  ADMI_FINANCIAL_PLANNING,
  ADMI_INTERNATIONAL_STUDENTS,
  ADMI_STUDENT_COUNCIL,
  ADMI_STUDENT_SUPPORT,
} from '@/utils';

import IconSpinner from '@/assets/icons/Spinner';
import IconUsersGroup from '@/assets/icons/UsersGroup';
import IconDashboardTabs from '@/assets/icons/DashboardTabs';
import { IconDownload } from '@tabler/icons-react';
import IconCalendarCheck from '@/assets/icons/CalendarCheck';
import ImageCalendar from '@/assets/images/calendar.svg';
import ImageSupportLanding from '@/assets/images/student-support-landing.png';

export default function StudentSupportPage() {
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
      <PageSEO title="Student Support" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'blue'}>
          <Image
            src={ImageSupportLanding}
            placeholder="empty"
            alt="Student Support Banner"
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
            <Box className="mt-[12vh] flex w-1/2 flex-col">
              <Title label="ADMI Student Support" color="white" />
              <Paragraph fontFamily="font-nexa" className="text-white">
                We are deeply commited to providing you with comprehensive support that ensures your academic and
                personal success
              </Paragraph>
              <Box className="flex items-center pt-12">
                <IconCalendarCheck color="white" />
                <Box>
                  <Paragraph size="16px" fontFamily="font-nexa" fontWeight={100} className="text-white">
                    Academic Calendar
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" fontWeight={900} className="text-white">
                    Download Calendar
                  </Paragraph>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* STUDENT SUPPORT */}
        <Box className="relative z-10 w-full bg-[#002A23] py-8">
          <Box className="mx-auto flex w-full max-w-screen-2xl">
            <Box className="w-[50%] px-4 text-white 2xl:px-0 2xl:pr-4">
              <Box>
                <Title label="Welcome to Student Support" color="#F1FE37" />
              </Box>
              <Paragraph className="py-4" fontFamily="font-nexa" fontWeight={900}>
                At Africa Digital Media Institute (ADMI), we are deeply committed to providing you with comprehensive
                support that ensures your academic and personal success. Our dedicated Student Affairs team works
                tirelessly to create a nurturing environment where you can thrive and reach your full potential.
              </Paragraph>

              <Paragraph className="py-4" fontFamily="font-nexa" fontWeight={100}>
                We understand that pursuing an education is not just about attending classes and completing assignments;
                it&apos;s about fostering a holistic experience that encompasses your personal growth, professional
                development, and well-being. That&apos;s why we have designed our support services to cater to your
                diverse needs, ensuring that you feel valued and empowered throughout your journey at ADMI.
              </Paragraph>
            </Box>
            <Box className="w-[50%]">
              <Carousel
                slideSize={300}
                height={400}
                slideGap="md"
                loop
                align="start"
                slidesToScroll={1}
                controlsOffset={0}
              >
                {ADMI_STUDENT_SUPPORT.map((support, index) => (
                  <Carousel.Slide key={`support-${index}`}>
                    <ClipCard support={support} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          </Box>
        </Box>
        {/* ACADEMIC CALENDAR */}
        <Box className="relative z-10 flex w-full py-8" bg={'#F5FFFD'}>
          <Box className="relative h-[600px] w-[50%]">
            <Image fill src={ImageCalendar} alt="about course" />
          </Box>
          <Box className="w-[50%]">
            <Box className="pt-12">
              <Title label="Academic Calendar" color="admiRed" />
            </Box>
            <Box className="font-nexa sm:w-[70%]">
              <Paragraph className="py-4" fontFamily="font-nexa" fontWeight={900}>
                Our Academic Calendar outlines important dates and deadlines for each academic term, ensuring that you
                stay informed and organized throughout your studies.
              </Paragraph>

              <Paragraph className="py-4" fontFamily="font-nexa" fontWeight={100}>
                Key dates include the start and end of each semester, examination periods, holidays, and registration
                deadlines. This structured timeline helps you manage your academic responsibilities effectively and plan
                your schedule accordingly.
              </Paragraph>
            </Box>
            <Box className="flex">
              <IconDownload color="#F60934" size={32} />{' '}
              <Paragraph fontFamily="font-nexa" fontWeight={900} className="text-admiRed">
                Download Calendar
              </Paragraph>
            </Box>
          </Box>
        </Box>
        {/* ACADEMIC SUPPORT */}
        <Box className="mx-auto w-full max-w-screen-2xl pb-8">
          <Box className="mt-20 w-full">
            <div className="mx-auto my-8 w-fit">
              <Title label="Academic Support" size="24px" color="black" />
            </div>
            <div className="mx-auto mb-8 w-fit max-w-screen-md text-center">
              <Paragraph fontFamily="font-nexa" className="py-4">
                Our academic support program offers you additional assistance to help you excel in your studies. This
                includes:
              </Paragraph>
            </div>
          </Box>

          <Box className="flex h-[28vh] w-full justify-between py-6">
            <Card
              className="flex w-[30%] flex-col items-center justify-between text-center"
              shadow="xl"
              withBorder
              py={32}
            >
              <Title label="Tutoring sessions" size="20px" color="black" className="mx-auto" />
              <IconSpinner width={64} height={64} color="#F60934" />
              <Paragraph>with experienced faculty members</Paragraph>
            </Card>
            <Card
              className="flex w-[30%] flex-col items-center justify-between text-center"
              shadow="xl"
              withBorder
              py={32}
            >
              <Title label="Study groups" size="20px" color="black" className="mx-auto" />
              <IconUsersGroup width={64} height={64} color="#01C6A5" />
              <Paragraph>and peer-to-peer learning opportunities</Paragraph>
            </Card>
            <Card
              className="flex w-[30%] flex-col items-center justify-between text-center"
              shadow="xl"
              withBorder
              py={32}
            >
              <Title label="Academic advising" size="20px" color="black" className="mx-auto" />
              <IconDashboardTabs width={72} height={72} color="#B9C601" />
              <Paragraph>to help you stay on track with your studies</Paragraph>
            </Card>
          </Box>

          <Box className="w-full">
            <div className="mx-auto my-8 w-fit max-w-screen-md text-center">
              <Paragraph fontFamily="font-nexa" className="py-4">
                We also provide support for students with special needs or learning difficulties, ensuring that everyone
                has access to the resources they need to succeed.
              </Paragraph>
            </div>
          </Box>
        </Box>
        {/* FINANCIAL PLANNING */}
        <Box className="w-full py-8" bg={'#F76335'}>
          <Box className="mx-auto flex w-full max-w-screen-2xl flex-col px-4 sm:flex-row 2xl:px-0">
            <Box className="flex flex-row flex-col sm:w-[40%]">
              <Title label="Financial Planning" color="white" />
              <Title
                label="Understanding financial planning is crucial for students at ADMI."
                color="white"
                size="24px"
              />
              <Paragraph fontFamily="font-nexa" className="py-4 text-white">
                Our financial planning workshops equip you with the knowledge to make informed decisions about your
                education financing, helping you navigate your financial commitments while pursuing your academic goals.
              </Paragraph>
            </Box>
            <Box className="sm:w-[60%]">
              {ADMI_FINANCIAL_PLANNING.map((process, index) => (
                <CollapsibleContent
                  key={`finance-plan-${index}`}
                  title={process.title}
                  content={<Paragraph>{process.description}</Paragraph>}
                />
              ))}
            </Box>
          </Box>
        </Box>
        {/* INTERNATIONAL STUDENTS */}
        <Box className="w-full py-8" bg={'#E43B07'}>
          <Box className="mx-auto flex w-full max-w-screen-2xl flex-col px-4 sm:flex-row 2xl:px-0">
            <Box className="flex flex-row flex-col sm:w-[40%]">
              <Title label="International Students" color="white" />
              <Paragraph fontFamily="font-nexa" className="py-4 text-white">
                ADMI welcomes international students from around the globe, providing a supportive environment that
                embraces diversity and fosters cultural exchange.
              </Paragraph>
              <Paragraph fontFamily="font-nexa" className="py-4 text-white">
                Our dedicated International Student Support team assists with your transition to studying in Kenya,
                offering guidance on visa applications, accommodation, and integration into campus life. We aim to
                ensure that every international student feels at home and has access to the resources they need to
                succeed academically and socially.
              </Paragraph>
            </Box>
            <Box className="sm:w-[60%]">
              {ADMI_INTERNATIONAL_STUDENTS.map((process, index) => (
                <CollapsibleContent
                  key={`finance-plan-${index}`}
                  title={process.title}
                  content={<Paragraph>{process.description}</Paragraph>}
                />
              ))}
            </Box>
          </Box>
        </Box>
        {/* COUNSELING AND CAREER */}
        <Box className="w-full py-8" bg={'#F5FFFD'}>
          <Box className="w-full">
            <Carousel
              slideSize={600}
              height={400}
              slideGap="md"
              loop
              align="start"
              slidesToScroll={1}
              controlsOffset={0}
            >
              {ADMI_CAREER_ADVICE.map((advice) => (
                <Carousel.Slide key={advice.title}>
                  <AdviceCard advice={advice} hasList />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>

          <Box className="mx-auto w-full max-w-screen-2xl px-4 2xl:px-0">
            <Box className="flex w-full flex-row py-8">
              <Box className="w-[30%]">
                <Title label="Testimonials" color="black" />
              </Box>
              <Box className="w-[70%]">
                <Paragraph fontFamily="font-nexa" className="pt-4">
                  Discover how ADMI has transformed the careers of our students through their own stories of success and
                  growth. Hear firsthand how our hands-on training and industry connections have helped them achieve
                  their creative dreams.
                </Paragraph>
              </Box>
            </Box>
            <Box className="w-full">
              <Carousel slideSize={360} slideGap="md" loop align="start" slidesToScroll={1}>
                {content &&
                  content.fields.testimonials.map((testimonial: any, index: number) => (
                    <Carousel.Slide key={`testimonial-${index}`}>
                      <UserTestimonialCard user={testimonial.user} testimonial={testimonial} assets={content.assets} />
                    </Carousel.Slide>
                  ))}
              </Carousel>
            </Box>
          </Box>
        </Box>
        {/* STUDENT COUNCIL */}
        <Box className="w-full bg-admiRed px-4 py-8">
          <Box className="mx-auto w-full max-w-screen-2xl">
            <Box className="flex w-full flex-row pb-4">
              <Box className="w-full">
                <Title label="Student Council" color="white" />
              </Box>
            </Box>
            <Box className="flex w-full flex-wrap">
              {ADMI_STUDENT_COUNCIL.map((member, index) => (
                <div className="mb-8 mr-8" key={`member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
        {/* ACADEMIC TEAM */}
        <Box className="w-full px-4 py-8">
          <Box className="mx-auto w-full max-w-screen-2xl">
            <Box className="flex w-full flex-row pb-4">
              <Box className="w-full">
                <Title label="Academic Team" color="black" />
              </Box>
            </Box>
            <Box className="flex w-full flex-wrap">
              {ADMI_ACADEMIC_TEAM_MINIMAL.map((member, index) => (
                <div className="mb-8 mr-8" key={`academic-member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
      </div>
    </MainLayout>
  );
}
