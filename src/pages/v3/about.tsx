import Image from 'next/image';
import { Box, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { Paragraph, Title } from '@/components/ui';
import { MainLayout } from '@/layouts/v3/MainLayout';

import { PageSEO, Timeline } from '@/components/shared/v3';
import { FacilityItemCard, SectorItemCard, CompanyValuesCard, UserProfileCard } from '@/components/cards';
import { ADMI_ACADEMIC_TEAM, ADMI_DIRECTORS, ADMI_FACILITIES, ADMI_HISTORY, ADMI_VALUES } from '@/utils';

import ImageAboutLanding from '@/assets/images/about-landing.svg';
import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';

import IconHome from '@/assets/icons/Home';
import IconTripodCamera from '@/assets/icons/TripodCamera';
import IconCamera from '@/assets/icons/Camera';
import IconArrowTipRight from '@/assets/icons/ArrowTipRight';
import IconSoundwave from '@/assets/icons/Soundwave';
import IconTv from '@/assets/icons/Tv';
import { useRouter } from 'next/router';

export default function AboutPage() {
  const router = useRouter();
  const sectors = [
    {
      title: '2D and 3D animation',
      icon: <IconHome color="#B9C601" />,
    },
    {
      title: 'Video Production',
      icon: <IconCamera color="#01C6A5" />,
    },
    {
      title: 'Graphic Design',
      icon: <IconTv color="#01C6A5" />,
    },
    {
      title: 'Film & TV Production',
      icon: <IconTripodCamera color="#F76335" />,
    },
    {
      title: 'Sound Engineering',
      icon: <IconSoundwave color="#B9C601" />,
    },
  ];

  const handleViewCourses = () => {
    router.push('/v3/courses');
  };

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO title="About Us" />
      {/* HEADER */}
      <div className="h-[24vh] w-full bg-[#002A23]">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[63%] top-[10vh] z-0 h-fit w-full -translate-x-1/2 transform">
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
          <div className="text-center font-nexa text-white">
            <Text fw={900} size="46px">
              Africa Digital Media <br></br> Institute <span className="text-admiShamrok">(ADMI)</span>
            </Text>
          </div>
        </div>
      </div>
      {/* WHO WE ARE */}
      <Box className="relative z-10 w-full bg-[#002A23]">
        <Box className="relative h-[460px] w-full">
          <Image src={ImageAboutLanding} alt={'background image'} fill objectFit="cover" />
        </Box>
        <Box className="mx-auto flex w-full max-w-screen-2xl">
          <Box className="w-[50%] py-32 font-nexa text-white pr-4">
            <Paragraph className="mb-8" fontFamily='font-nexa'>
              Africa Digital Media Institute (ADMI) based in Nairobi, Kenya, is Eastern Africa’s premier creative media
              and technology training institution.{' '}
            </Paragraph>

            <Paragraph className="mb-8" fontFamily='font-nexa'>
              It is an innovative career accelerator where creatives and techies receive training, mentorship, and a
              platform to turn their passion into a profession.{' '}
            </Paragraph>

            <Paragraph fontFamily='font-nexa' fontWeight={900}>
              Our programs combine high-spec technical training in creative media and technology with intensive digital
              and soft-skills coaching, along with a rigorous internship process, helping to achieve above-market
              placement rates.
            </Paragraph>
          </Box>
          <Box className="w-[50%] py-16">
            <Box className="flex w-full flex-wrap">
              {sectors.map((sector: any) => (
                <Box key={sector.title} className="mb-4 mr-4">
                  <SectorItemCard
                    sector={sector}
                    textColor="white"
                    bgColor="#092E28"
                    withBorder
                    defaultBorder={false}
                  />
                </Box>
              ))}
              <Box
                className="mb-4 mr-4 flex w-[240px] cursor-pointer flex-col items-center justify-center rounded-lg bg-admiRed"
                onClick={handleViewCourses}
              >
                <IconArrowTipRight width={48} height={48} color="white" />
                <Paragraph className="text-white" fontFamily="font-nexa" fontWeight={900}>
                  View all courses
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* OUR HISTORY */}
      <Box className="1xl:px-0 w-full px-4 py-8" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-2xl">
          <Box className="flex w-full flex-row">
            <Box className="w-[30%]">
              <Title label="Our History" color="black" />
            </Box>
            <Box className="w-[70%]">
              <Timeline data={ADMI_HISTORY} />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* OUR VALUES */}
      <Box className="1xl:px-0 relative w-full px-4 pb-16" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-2xl pb-10">
          <Box className="flex w-full flex-row">
            <Box className="w-[30%]">
              <Title label="Our Values" color="black" />
            </Box>
            <Box className="w-[70%]">
              <Paragraph className="pt-4" fontFamily="font-nexa">
                Our values at ADMI guide everything we do, from fostering creativity and innovation to ensuring
                excellence and integrity in all our programs. We are committed to nurturing the next generation of
                creative professionals with passion and purpose.
              </Paragraph>
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="w-full px-1">
          <div className="absolute left-1/2 top-[10vh] z-10 w-full max-w-screen-2xl -translate-x-1/2 transform px-4 sm:top-[10vh] 2xl:px-0">
            <CompanyValuesCard values={ADMI_VALUES} />
          </div>
        </div>
      </Box>
      {/* ACADEMIC TEAM */}
      <Box className="1xl:px-0 w-full px-4 pt-56" bg={'admiRed'}>
        <Box className="mx-auto w-full max-w-screen-2xl">
          <Box className="flex w-full flex-row">
            <Box className="w-[30%]">
              <Title label="Academic Team" color="white" />
            </Box>
          </Box>
          <Box className="flex w-full flex-row flex-wrap py-8">
            {ADMI_ACADEMIC_TEAM.map((member, index) => (
              <div className="mr-8 w-fit" key={`academic-member-${index}`}>
                <UserProfileCard user={member} />
              </div>
            ))}
          </Box>
        </Box>
      </Box>
      {/* BOARD OF DIRECTORS */}
      <Box className="1xl:px-0 w-full px-4 py-8" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-2xl">
          <Box className="flex w-full flex-row">
            <Box className="w-[30%]">
              <Title label="Board of Directors" color="black" />
            </Box>
          </Box>
          <Box className="flex w-full flex-row flex-wrap py-8">
            {ADMI_DIRECTORS.map((member, index) => (
              <div className="mr-8 w-fit" key={`academic-member-${index}`}>
                <UserProfileCard user={member} />
              </div>
            ))}
          </Box>
        </Box>
      </Box>
      {/* FACILITIES */}
      <Box className="1xl:px-0 w-full px-4 py-8" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-2xl">
          <Box className="flex w-full flex-row pb-12">
            <Box className="w-[30%]">
              <Title label="Facilities" color="black" />
            </Box>
            <Box className="w-[70%]">
              <Paragraph className="pt-4" fontFamily="font-nexa">
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
              {ADMI_FACILITIES.map((facility) => (
                <Carousel.Slide key={facility.name}>
                  <FacilityItemCard facility={facility} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
