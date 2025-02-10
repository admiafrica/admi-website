import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Box, Text, Indicator, Divider, NumberFormatter, Drawer, Input } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useDisclosure } from '@mantine/hooks';

import { Paragraph, Title } from '@/components/ui';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import {
  AnnouncementCard,
  CourseItemCard,
  FacilityItemCard,
  LearnMoreCard,
  SectorItemCard,
  UserTestimonialCard,
} from '@/components/cards';

import HeroBackgroundImage from '@/assets/images/homepage-hero.svg';
import AnnouncementImage from '@/assets/images/announcement.svg';
import NewsImage from '@/assets/images/featured-news.svg';
import AwardsImage from '@/assets/images/awards.svg';

import IconSearch from '@/assets/icons/Search';
import IconHome from '@/assets/icons/Home';
import IconTripodCamera from '@/assets/icons/TripodCamera';
import IconCamera from '@/assets/icons/Camera';
import IconMusic from '@/assets/icons/Music';
import IconSoundwave from '@/assets/icons/Soundwave';
import IconTruckSpeed from '@/assets/icons/TruckSpeed';
import IconTv from '@/assets/icons/Tv';
import { ADMI_FACILITIES } from '@/utils';

export default function HomePage() {
  const router = useRouter();
  const [content, setContent] = useState<any>();
  const [courses, setCourses] = useState<Array<any>>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const sectors = [
    {
      title: '2D and 3D animation',
      icon: <IconHome color="#B9C601" />,
    },
    {
      title: 'Film & TV Production',
      icon: <IconTripodCamera color="#F76335" />,
    },
    {
      title: 'Video Production',
      icon: <IconCamera color="#01C6A5" />,
    },
    {
      title: 'Music Production',
      icon: <IconMusic color="#F60834" />,
    },
    {
      title: 'Sound Engineering',
      icon: <IconSoundwave color="#B9C601" />,
    },
    {
      title: 'Animation & Digital Media',
      icon: <IconTruckSpeed color="#F76335" />,
    },
    {
      title: 'Graphic Design',
      icon: <IconTv color="#01C6A5" />,
    },
    {
      title: 'Video Game Design',
      icon: <IconTv color="#F60834" />,
    },
  ];

  const announcement = {
    title: 'Introducing Aquila Creative Scholars: Your Gateway to a Thriving Creative Career',
    description:
      'The Africa Digital Media Foundation, in partnership with a generous anonymous donor, is thrilled to announce the launch of the Aquila Creative Scholars program.',
  };
  const facilities = ADMI_FACILITIES;
  const news = {
    title: 'Ganjisha Content Program: Empowering Kenyan Youth Through Digital Skills and Entrepreneurship',
    description:
      'In response to Kenya’s high youth unemployment rates, the Ganjisha Content Program was established to equip young people with practical.',
  };
  const award = {
    title: 'ADMI Wins Best Creative Media and Tech Training Institution at the 7th Annual Digital Tech Awards 2024',
    description:
      'Named the Best Creative Media and Tech Training Institution at the prestigious 7th Annual Digital Tech Awards 2024!',
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

  const fetchContent = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/homepage`);
      const data = await response.json();
      setContent(data[0]);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }, []);

  const handleViewCourses = () => {
    router.push(`/v3/courses`);
  };

  useEffect(() => {
    fetchContent();
    fetchCourses();
  }, [fetchCourses, fetchContent]);

  return (
    <MainLayout footerBgColor="#E6F608">
      <PageSEO title="Home" />
      <Drawer offset={'100px'} radius="md" opened={opened} onClose={close} position="top" size={'100%'} padding={0}>
        <LearnMoreCard />
      </Drawer>
      <div className="w-full">
        {/* HERO */}
        <Box className="relative w-full">
          <Image
            src={HeroBackgroundImage}
            placeholder="empty"
            alt="Course Banner"
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

          <Box className="relative mx-auto flex h-[50vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-1/2 flex-col">
              <Title label="Launch your career in Creative Media" size="48px" color="white" />
              <Paragraph className="py-6 text-white">
                Africa Digital Media Institute (ADMI) based in Nairobi, Kenya, is Eastern Africa&apos;s premier creative
                and technology training institution.
              </Paragraph>
              <div className="flex w-full cursor-pointer rounded-xl bg-[#414438] py-4 text-white">
                <Box my={'auto'} pl={8}>
                  <IconSearch color="white" width={36} height={36} />
                </Box>
                <Input
                  className="grow pt-1 text-white"
                  placeholder="What are you looking for?"
                  styles={{
                    input: {
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    },
                  }}
                  onClick={open}
                />
                <div className="mx-4 my-auto">
                  <Button size="lg" backgroundColor="admiRed" label="Learn More" onClick={open} />
                </div>
              </div>
            </Box>
          </Box>
        </Box>
        {/* OFFERINGS */}
        <Box className="w-full">
          <Box className="w-full pt-20">
            <div className="mx-auto w-fit max-w-screen-md text-center">
              <Paragraph fontFamily="font-nexa">
                It is an innovative career accelerator where creatives and techies receive training, mentorship and a
                platform to turn their passion into a profession.
              </Paragraph>
            </div>
            <div className="mx-auto my-8 w-fit">
              <Title label="We offer practical courses in:" size="24px" color="black" />
            </div>
          </Box>
          <Box className="w-full">
            <Carousel slideSize={260} slideGap="md" loop align="start" slidesToScroll={1}>
              {sectors.map((sector: any) => (
                <Carousel.Slide key={sector.title} py={6}>
                  <SectorItemCard sector={sector} withBorder />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>
          <Box className="w-full">
            <div className="mx-auto w-fit max-w-screen-md py-12 text-center">
              <Paragraph fontFamily="font-nexa">
                Our programs combine high-spec technical training in creative media and technology with intensive
                digital and soft-skills coaching, along with a rigorous internship process, helping to achieve
                above-market placement rates.
              </Paragraph>
            </div>
          </Box>
        </Box>
        {/* IMPACT */}
        <Box className="w-full" bg={'#F5FFFD'}>
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col px-4 py-8 2xl:px-0">
            <Box className="flex w-full flex-row">
              <Box className="w-[30%]">
                <Title label="Our Impact" color="black" />
              </Box>
              <Box className="w-[70%]">
                <Paragraph fontFamily="font-nexa" className="pt-4">
                  Through our innovative programs and industry-focused training, we empower students to turn their
                  creative passions into successful careers. ADMI&apos;s impact extends beyond the classroom, fostering
                  a new generation of professionals ready to lead in the digital media industry.
                </Paragraph>
                <Box className="w-full">
                  <Divider color="admiShamrok" mt="xl"></Divider>
                  {content && (
                    <Box className="flex">
                      <div className="my-auto flex w-[30%] pr-4 font-proxima">
                        <Paragraph className="w-1/2" size="18px">
                          Student Satisfaction
                        </Paragraph>
                        <div>
                          <Text size="48px">{content.fields.employmentRate}</Text>
                        </div>
                      </div>
                      <Divider color="admiShamrok" orientation="vertical" h={100}></Divider>
                      <div className="my-auto flex w-[30%] px-4 font-proxima">
                        <Paragraph className="w-1/2" size="18px">
                          Enrolled Students
                        </Paragraph>
                        <div>
                          <Indicator
                            color="admiShamrok"
                            inline
                            label={<IconPlus size={16} color="black" />}
                            size={24}
                            offset={4}
                          >
                            <Paragraph size="48px">
                              <NumberFormatter value={content.fields.numberOfEnrolledStudents} thousandSeparator />
                            </Paragraph>
                          </Indicator>
                        </div>
                      </div>
                      <Divider color="admiShamrok" orientation="vertical"></Divider>
                      <div className="my-auto flex w-[30%] px-4 font-proxima">
                        <Paragraph className="w-2/3 pr-4" size="18px">
                          Employment Rate within 6 months of graduation
                        </Paragraph>
                        <div>
                          <Indicator
                            color="admiShamrok"
                            inline
                            label={<IconPlus size={16} color="black" />}
                            size={24}
                            offset={4}
                          >
                            <Text size="48px">{content.fields.studentSatisfactionRating}</Text>
                          </Indicator>
                        </div>
                      </div>
                    </Box>
                  )}
                  <Divider color="admiShamrok" mb={'md'}></Divider>
                </Box>
              </Box>
            </Box>

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
        {/* ANNOUNCEMENTS */}
        <Box className="w-full px-4 py-16 xl:px-0" bg={'admiOrangeDark'}>
          <AnnouncementCard
            announcement={announcement}
            title={'Announcements'}
            arrowColor={'#F60834'}
            image={AnnouncementImage}
          />
        </Box>
        {/* FACILITIES */}
        <Box className="1xl:px-0 w-full px-4 py-16" bg={'#F5FFFD'}>
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="flex w-full flex-row pb-12">
              <Box className="w-[30%]">
                <Title label="Facilities" color="black" />
              </Box>
              <Box className="w-[70%]">
                <Paragraph fontFamily="font-nexa" className="pt-4">
                  ADMI&apos;s campus is a vibrant, creatively designed workspace conveniently located right next to the
                  GPO in Nairobi&apos;s Central Business District. The campus boasts extensive facilities including
                  classrooms, animation and graphics labs, TV and sound production studios, Mac and PC labs, and a film
                  equipment vault.
                </Paragraph>
              </Box>
            </Box>
            <Box className="w-full">
              <Carousel
                slideSize={600}
                height={360}
                slideGap="md"
                loop
                align="start"
                slidesToScroll={1}
                controlsOffset={0}
              >
                {facilities.map((facility) => (
                  <Carousel.Slide key={facility.name}>
                    <FacilityItemCard facility={facility} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          </Box>
        </Box>
        {/* NEWS */}
        <Box className="w-full px-4 py-16 xl:px-0" bg={'#01C6A5'}>
          <AnnouncementCard announcement={news} bgColor="admiShamrok" image={NewsImage} featured />
        </Box>
        {/* COURSES */}
        <Box className="1xl:px-0 w-full px-4 py-16" bg={'#F5FFFD'}>
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="flex w-full flex-row pb-12">
              <Box className="w-[30%]">
                <Title label="Our Courses" color="black" />
              </Box>
              <Box className="w-[70%]">
                <Paragraph fontFamily="font-nexa" className="pt-4">
                  Explore ADMI&apos;s diverse range of courses designed to equip you with the skills and knowledge
                  needed to excel in the creative industries. Whether you&apos;re passionate about film, design, music,
                  or digital content, our programs offer hands-on training and expert guidance to help you succeed.
                </Paragraph>
              </Box>
            </Box>
            <Box className="w-full">
              <Carousel slideSize={260} slideGap="md" loop align="start" slidesToScroll={1}>
                {courses.map((course) => (
                  <Carousel.Slide key={course.sys.id}>
                    <CourseItemCard course={course} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
            <Box className="w-[200px] pt-8">
              <Button size="lg" backgroundColor="admiRed" label="Explore Courses" onClick={() => handleViewCourses()} />
            </Box>
          </Box>
        </Box>
        {/* AWARDS */}
        <Box className="w-full px-4 py-16 xl:px-0" bg={'#E6F608'}>
          <AnnouncementCard announcement={award} title="Awards" arrowColor="#F60834" image={AwardsImage} />
        </Box>
      </div>
    </MainLayout>
  );
}
