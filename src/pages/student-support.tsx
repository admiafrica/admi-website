import { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Box, Card } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'
import { AdviceCard, ClipCard, UserProfileCard, UserTestimonialCard } from '@/components/cards'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'
import { EnhancedTestimonialSchema } from '@/components/seo/EnhancedTestimonialSchema'
import {
  ADMI_ACADEMIC_TEAM_MINIMAL,
  ADMI_CAREER_ADVICE,
  ADMI_STUDENT_COUNCIL,
  ADMI_STUDENT_SUPPORT,
  CALENDAR_DOWNLOAD_LINK,
  CALENDAR_DOWNLOAD_NAME,
  ensureProtocol
} from '@/utils'

import { IconDownload } from '@tabler/icons-react'
import IconSpinner from '@/assets/icons/Spinner'
import IconUsersGroup from '@/assets/icons/UsersGroup'
import IconDashboardTabs from '@/assets/icons/DashboardTabs'
import IconCalendarCheck from '@/assets/icons/CalendarCheck'
import ImageCalendar from '@/assets/images/calendar.svg'
import ImageSupportLanding from '@/assets/images/student-support-landing.png'
import { FinancialPlanning, InternationalStudents } from '@/components/student-support'

export default function StudentSupportPage() {
  const [content, setContent] = useState<any>()
  const autoplaySupport = useRef(Autoplay({ delay: 4000 }))
  const autoplayTestimonials = useRef(Autoplay({ delay: 4000 }))
  const autoplayFacilities = useRef(Autoplay({ delay: 4000 }))

  const fetchContent = useCallback(async () => {
    try {
      const response = await fetch('/api/v3/homepage')
      const data = await response.json()
      setContent(data[0])
    } catch (error) {
      console.log('Error fetching courses:', error)
    }
  }, [])

  const handleCalendarDownload = async () => {
    try {
      const response = await fetch(CALENDAR_DOWNLOAD_LINK)
      if (!response.ok) throw new Error('Failed to fetch file')

      const blob = await response.blob()
      const link = document.createElement('a')

      link.href = URL.createObjectURL(blob)
      link.download = CALENDAR_DOWNLOAD_NAME
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [fetchContent])

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Student Support" />

      {/* Career FAQ Schema for student support page */}
      <InstitutionalFAQSchema faqType="career" />

      {/* Enhanced testimonial schemas for student support testimonials */}
      {content &&
        content.fields.testimonials?.map((testimonial: any, index: number) => (
          <EnhancedTestimonialSchema
            key={`student-support-testimonial-${index}`}
            author={{
              name: testimonial.user?.fields?.name || 'ADMI Graduate',
              image: testimonial.user?.fields?.profileImage?.fields?.file?.url
                ? ensureProtocol(testimonial.user.fields.profileImage.fields.file.url)
                : undefined,
              jobTitle: testimonial.user?.fields?.jobTitle,
              worksFor: testimonial.user?.fields?.workplace,
              program: testimonial.user?.fields?.program || 'Creative Media Program',
              location: 'Nairobi, Kenya'
            }}
            reviewBody={testimonial.quote || testimonial.testimonial}
            reviewRating={5}
            datePublished={testimonial.sys?.createdAt || new Date().toISOString()}
            programCompleted={{
              name: testimonial.user?.fields?.program || 'Creative Media Diploma',
              duration: '2 years',
              graduationYear: testimonial.user?.fields?.graduationYear || '2023'
            }}
            careerOutcome={{
              employmentStatus: 'employed',
              timeToEmployment: '2 months after graduation',
              industryRole: testimonial.user?.fields?.jobTitle || 'Creative Professional',
              companyType: 'Media & Entertainment'
            }}
            skillsGained={[
              'Professional Portfolio Development',
              'Industry Networking',
              'Career Planning',
              'Interview Skills'
            ]}
            recommendationScore={10}
            wouldRecommend={true}
            verifiedGraduate={true}
          />
        ))}
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
            style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
          />
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0, 42, 35, 1) 100%)'
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[500px] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[120px] flex flex-col sm:w-1/2">
              <Title label="ADMI Student" color="white" size="48px" />
              <Title label="Support" color="admiShamrok" size="48px" />
              <Paragraph fontFamily="font-nexa" className="py-6 text-white">
                We are deeply committed to providing you with comprehensive support that ensures your academic and
                personal success
              </Paragraph>
              <Box className="flex w-fit cursor-pointer items-center pt-12" onClick={handleCalendarDownload}>
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
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col sm:flex-row">
            <Box className="px-4 text-white sm:w-[50%] 2xl:px-0 2xl:pr-4">
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
            <Box className="sm:w-[50%]">
              <Carousel
                slideSize={300}
                height={400}
                slideGap="md"
                loop
                withControls={false}
                align="start"
                slidesToScroll={1}
                plugins={[autoplaySupport.current]}
                onMouseEnter={autoplaySupport.current.stop}
                onMouseLeave={autoplaySupport.current.reset}
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
        <Box className="relative z-10 flex w-full flex-col px-4 py-8 sm:flex-row" bg={'#F5FFFD'}>
          <Box className="relative h-[240px] sm:h-[600px] sm:w-[50%]">
            <Image fill sizes="(max-width: 768px) 100vw, 400px" src={ImageCalendar} alt="about course" />
          </Box>
          <Box className="sm:w-[50%]">
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
            <Box className="mt-6 flex w-fit cursor-pointer" onClick={handleCalendarDownload}>
              <IconDownload color="#F60934" size={32} />{' '}
              <Paragraph fontFamily="font-nexa" fontWeight={900} className="my-auto px-2 text-admiRed">
                Download Calendar
              </Paragraph>
            </Box>
          </Box>
        </Box>
        {/* ACADEMIC SUPPORT */}
        <Box className="mx-auto w-full max-w-screen-xl pb-8">
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

          <Box className="flex h-fit w-full flex-col justify-between px-4 py-6 sm:h-[28vh] sm:flex-row sm:px-0">
            <Card
              className="flex flex-col items-center justify-between text-center sm:w-[30%]"
              shadow="xl"
              withBorder
              py={32}
              mb={8}
            >
              <Title label="Tutoring sessions" size="20px" color="black" className="mx-auto" />
              <IconSpinner width={64} height={64} color="#F60934" />
              <Paragraph>with experienced faculty members</Paragraph>
            </Card>
            <Card
              className="flex flex-col items-center justify-between text-center sm:w-[30%]"
              shadow="xl"
              withBorder
              py={32}
              mb={8}
            >
              <Title label="Study groups" size="20px" color="black" className="mx-auto" />
              <IconUsersGroup width={64} height={64} color="#01C6A5" />
              <Paragraph>and peer-to-peer learning opportunities</Paragraph>
            </Card>
            <Card
              className="flex flex-col items-center justify-between text-center sm:w-[30%]"
              shadow="xl"
              withBorder
              py={32}
              mb={8}
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
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col px-4 sm:flex-row 2xl:px-0">
            <Box className="flex flex-row flex-col sm:w-[40%] sm:pr-4">
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
              <FinancialPlanning />
            </Box>
          </Box>
        </Box>
        {/* INTERNATIONAL STUDENTS */}
        <Box className="w-full py-8" bg={'#E43B07'}>
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col px-4 sm:flex-row 2xl:px-0">
            <Box className="flex flex-row flex-col sm:w-[40%] sm:pr-4">
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
              <InternationalStudents />
            </Box>
          </Box>
        </Box>
        {/* COUNSELING AND CAREER */}
        <Box className="w-full py-8" bg={'#F5FFFD'}>
          <Box className="mx-auto w-full">
            <Carousel
              slideSize={600}
              height={400}
              slideGap="md"
              loop
              align="start"
              slidesToScroll={1}
              withControls={false}
              plugins={[autoplayFacilities.current]}
              onMouseEnter={autoplayFacilities.current.stop}
              onMouseLeave={autoplayFacilities.current.reset}
            >
              {ADMI_CAREER_ADVICE.map((advice) => (
                <Carousel.Slide key={advice.title}>
                  <AdviceCard advice={advice} hasList />
                </Carousel.Slide>
              ))}
              {ADMI_CAREER_ADVICE.map((advice) => (
                <Carousel.Slide key={`${advice.title}-2`}>
                  <AdviceCard advice={advice} hasList />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>

          <Box className="mx-auto w-full max-w-screen-xl px-4 2xl:px-0">
            <Box className="flex w-full flex-col py-8 sm:flex-row">
              <Box className="sm:w-[30%]">
                <Title label="Testimonials" color="black" />
              </Box>
              <Box className="sm:w-[70%]">
                <Paragraph fontFamily="font-nexa" className="pt-4">
                  Discover how ADMI has transformed the careers of our students through their own stories of success and
                  growth. Hear firsthand how our hands-on training and industry connections have helped them achieve
                  their creative dreams.
                </Paragraph>
              </Box>
            </Box>
            <Box className="w-full">
              <Carousel
                slideSize={360}
                slideGap="md"
                loop
                align="start"
                slidesToScroll={1}
                withControls={false}
                plugins={[autoplayTestimonials.current]}
                onMouseEnter={autoplayTestimonials.current.stop}
                onMouseLeave={autoplayTestimonials.current.reset}
              >
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
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="flex w-full flex-row pb-4">
              <Box className="w-full">
                <Title label="Student Council" color="white" />
              </Box>
            </Box>
            <Box className="flex w-full flex-wrap">
              {ADMI_STUDENT_COUNCIL.map((member, index) => (
                <div className="mb-4 mr-4" key={`member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
        {/* ACADEMIC TEAM */}
        <Box className="w-full px-4 py-8">
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="flex w-full flex-row pb-4">
              <Box className="w-full">
                <Title label="Academic Team" color="black" />
              </Box>
            </Box>
            <Box className="flex w-full flex-wrap">
              {ADMI_ACADEMIC_TEAM_MINIMAL.map((member, index) => (
                <div className="mb-4 mr-4" key={`academic-member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
      </div>
    </MainLayout>
  )
}
