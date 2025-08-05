import { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

import { Paragraph, Title } from '@/components/ui'
import { MainLayout } from '@/layouts/v3/MainLayout'

import { PageSEO, Ribbon, Timeline } from '@/components/shared/v3'
import { FacilityItemCard, SectorItemCard, CompanyValuesCard, UserProfileCard } from '@/components/cards'
import {
  ADMI_ABOUT_SECTORS,
  ADMI_ACADEMIC_TEAM_SUMMARY,
  ADMI_DIRECTORS,
  ADMI_FACILITIES,
  ADMI_HISTORY,
  ADMI_VALUES
} from '@/utils'

import ImageAboutLanding from '@/assets/images/about-landing.svg'
import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'
import IconArrowTipRight from '@/assets/icons/ArrowTipRight'

export default function AboutPage() {
  const router = useRouter()
  const autoplayFacilities = useRef(Autoplay({ delay: 4000 }))

  const handleViewCourses = () => {
    router.push('/courses')
  }

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="About Us"
        description="Learn about Africa Digital Media Institute (ADMI) - Eastern Africa's premier creative media and technology training institution based in Nairobi, Kenya. Discover our history, values, academic team, and state-of-the-art facilities."
        keywords="ADMI about, Africa Digital Media Institute history, creative media training Kenya, digital media education Nairobi, ADMI values, academic team, board of directors, campus facilities"
      />
      {/* HEADER */}
      <div className="relative h-[30vh] w-full overflow-hidden bg-[#002A23] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] xl:h-[50vh]">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[85%] top-[6vh] z-0 h-fit w-full -translate-x-1/2 transform sm:left-[70%] sm:top-[8vh] md:left-[65%] md:top-[10vh] lg:top-[12vh]">
          <div className="flex w-full justify-end pr-[5%] sm:pr-[8%] md:pr-[10%]">
            <Image src={IconBgImageYellow} alt={'background image'} priority />
          </div>
        </div>

        <div className="absolute left-1/2 top-[3vh] z-0 h-fit w-full -translate-x-1/2 transform sm:top-[4vh] md:top-[5vh] lg:top-[6vh]">
          <div className="flex w-full pl-[3%] sm:pl-[4%] md:pl-[5%]">
            <Image src={IconBgImageRed} alt={'background image'} priority />
          </div>
        </div>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-lg items-center justify-center px-4 2xl:px-0">
          <div className="text-center font-nexa text-white">
            <div className="font-nexa text-lg font-black leading-tight text-white sm:text-xl md:text-4xl lg:text-6xl xl:text-8xl 2xl:text-9xl">
              Africa Digital Media <br></br> Institute <span className="text-admiShamrok">(ADMI)</span>
            </div>
          </div>
        </div>
      </div>
      {/* WHO WE ARE */}
      <Box className="relative z-10 w-full bg-[#002A23]">
        <Box className="relative h-[460px] w-full">
          <Image src={ImageAboutLanding} alt={'background image'} fill sizes="100vw" objectFit="cover" priority />
        </Box>
        <Ribbon />
        <Box className="mx-auto flex w-full max-w-screen-xl flex-col sm:flex-row">
          <Box className="px-4 py-32 font-nexa text-white sm:w-[50%]">
            <Paragraph className="mb-8" fontFamily="font-nexa">
              Africa Digital Media Institute (ADMI) based in Nairobi, Kenya, is Eastern Africa’s premier creative media
              and technology training institution.{' '}
            </Paragraph>

            <Paragraph className="mb-8" fontFamily="font-nexa">
              It is an innovative career accelerator where creatives and techies receive training, mentorship, and a
              platform to turn their passion into a profession.
            </Paragraph>

            <Paragraph fontFamily="font-nexa" fontWeight={900}>
              Our programs combine high-spec technical training in creative media and technology with intensive digital
              and soft-skills coaching, along with a rigorous internship process, helping to achieve above-market
              placement rates.
            </Paragraph>
          </Box>
          <Box className="py-16 sm:w-[50%]">
            <Box className="flex w-full flex-wrap">
              {ADMI_ABOUT_SECTORS.map((sector: any) => (
                <Box key={sector.title} className="m-4">
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
                className="m-4 flex w-[160px] cursor-pointer flex-col items-center justify-center rounded-lg bg-admiRed"
                onClick={handleViewCourses}
              >
                <IconArrowTipRight width={48} height={48} color="white" />
                <Paragraph className="text-white" fontFamily="font-nexa" fontWeight={900} size="14px">
                  View all courses
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* OUR HISTORY */}
      <Box className="1xl:px-0 w-full px-4 py-8" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-xl">
          <Box className="flex w-full flex-col sm:flex-row">
            <Box className="sm:w-[30%]">
              <Title label="Our History" color="black" />
            </Box>
            <Box className="h-[180px] sm:w-[70%]">
              <Timeline data={ADMI_HISTORY} />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* OUR VALUES */}
      <Box className="1xl:px-0 relative w-full px-4 pb-16" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-xl pb-10">
          <Box className="flex w-full flex-col sm:flex-row">
            <Box className="sm:w-[30%]">
              <Title label="Our Values" color="black" />
            </Box>
            <Box className="sm:w-[70%]">
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
          <div className="z-10 w-full max-w-screen-xl sm:absolute sm:left-1/2 sm:top-[10vh] sm:-translate-x-1/2 sm:transform sm:px-4 2xl:px-0">
            <CompanyValuesCard values={ADMI_VALUES} />
          </div>
        </div>
      </Box>
      {/* ACADEMIC TEAM */}
      <Box className="1xl:px-0 w-full px-4 sm:pt-56" bg={'admiRed'}>
        <Box className="mx-auto w-full max-w-screen-xl">
          <Box className="flex w-full flex-col sm:flex-row">
            <Box className="sm:w-[30%]">
              <Title label="Academic Team" color="white" />
            </Box>
          </Box>
          <Box className="flex w-full flex-row flex-wrap py-8">
            {ADMI_ACADEMIC_TEAM_SUMMARY.map((member, index) => (
              <div className="mb-4 mr-4 w-fit" key={`academic-member-${index}`}>
                <UserProfileCard user={member} />
              </div>
            ))}
          </Box>
        </Box>
      </Box>
      {/* BOARD OF DIRECTORS */}
      <Box className="1xl:px-0 w-full px-4 py-8" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-xl">
          <Box className="flex w-full flex-col sm:flex-row">
            <Title label="Board of Directors" color="black" />
          </Box>
          <Box className="flex w-full flex-row flex-wrap py-8">
            {ADMI_DIRECTORS.map((member, index) => (
              <div className="mb-4 mr-4 w-fit" key={`academic-member-${index}`}>
                <UserProfileCard user={member} />
              </div>
            ))}
          </Box>
        </Box>
      </Box>
      {/* FACILITIES */}
      <Box className="1xl:px-0 w-full px-4 py-8" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-xl">
          <Box className="flex w-full flex-col pb-12 sm:flex-row">
            <Box className="sm:w-[30%]">
              <Title label="Facilities" color="black" />
            </Box>
            <Box className="sm:w-[70%]">
              <Paragraph className="pt-4" fontFamily="font-nexa">
                ADMI&apos;s campus is a vibrant, creatively designed workspace conveniently located right next to the
                GPO in Nairobi&apos;s Central Business District. The campus boasts extensive facilities including
                classrooms, animation and graphics labs, TV and sound production studios, Mac and PC labs, and a film
                equipment vault.
              </Paragraph>
            </Box>
          </Box>
        </Box>
        <Box className="w-full overflow-hidden">
          <Carousel
            slideSize={{ base: '90%', sm: '70%', md: 600 }}
            height={480}
            slideGap="md"
            loop
            align="start"
            slidesToScroll={1}
            withControls={false}
            plugins={[autoplayFacilities.current]}
            onMouseEnter={autoplayFacilities.current.stop}
            onMouseLeave={autoplayFacilities.current.reset}
          >
            {ADMI_FACILITIES.map((facility) => (
              <Carousel.Slide key={facility.name}>
                <FacilityItemCard facility={facility} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </MainLayout>
  )
}
