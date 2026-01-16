import { useRouter } from 'next/router'
import Image from 'next/image'
import { Box, Indicator, Divider, NumberFormatter } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

import { AnimatedWordDisplay, Paragraph, SearchDropdown, Title } from '@/components/ui'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { Button } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'
import { CMSFAQSchema } from '@/components/shared/StructuredData'
import { EastAfricaLocalSEO } from '@/components/seo/EastAfricaLocalSEO'
import { EnhancedTestimonialSchema, AggregateTestimonialSchema } from '@/components/seo/EnhancedTestimonialSchema'
import { MusicProductionSEOBoost } from '@/components/seo/MusicProductionSEOBoost'
import LazySection from '@/components/shared/LazySection'
import {
  AnnouncementCard,
  CourseItemCard,
  FacilityItemCard,
  SectorItemCard,
  UserTestimonialCard
} from '@/components/cards'
import { ADMI_FACILITIES, ADMI_HOMEPAGE_SECTORS } from '@/utils'
import { IContentfulEntry } from '@/types'
import { useIsMobile } from '@/hooks/useIsMobile'

import { IconPlus } from '@tabler/icons-react'
import AnnouncementImage from '@/assets/images/announcement.svg'
import NewsImage from '@/assets/images/featured-news.svg'
import AwardsImage from '@/assets/images/awards.svg'

// Hardcoded fallback hero content - used when Contentful is unavailable
const FALLBACK_HERO = {
  heroTitle: 'Launch your career in Creative',
  heroHighlightWord: 'Media & Technology',
  heroDescription:
    'ADMI (Africa Digital Media Institute) is a leading creative media and technology training institution based in Nairobi, Kenya. Our programmes are delivered through a flexible hybrid model that combines online learning with in person sessions, so you can study in a format that works for you. Explore our diploma and certificate courses and get started today.',
  ctaButtonText: 'Learn More',
  searchPlaceholder: 'What are you looking for?'
}

interface HeroContent {
  heroTitle: string
  heroHighlightWord?: string
  heroDescription: string
  ctaButtonText?: string
  searchPlaceholder?: string
}

interface HomePageProps {
  content: any
  courses: Array<any>
  featuredNews: IContentfulEntry | null
  featuredResource: IContentfulEntry | null
  featuredAward: IContentfulEntry | null
  heroContent: HeroContent
}

export default function HomePage({
  content,
  courses,
  featuredNews,
  featuredResource,
  featuredAward,
  heroContent
}: HomePageProps) {
  const router = useRouter()
  const isMobile = useIsMobile()

  const autoplaySectors = Autoplay({ delay: 4000 })
  const autoplayTestimonials = Autoplay({ delay: 4000 })
  const autoplayFacilities = Autoplay({ delay: 4000 })
  const autoplayCourses = Autoplay({ delay: 4000 })

  const keyItems = [
    { word: 'Media', styles: 'text-[#F1FE38]' },
    { word: 'Technology', styles: 'text-[#01C6A5]' },
    { word: 'Production', styles: 'text-[#F76335]' },
    { word: 'Engineering', styles: 'text-[#F60834]' }
  ]

  const facilities = ADMI_FACILITIES

  const handleViewCourses = () => {
    router.push('/courses')
  }

  return (
    <MainLayout footerBgColor="#E6F608">
      <PageSEO
        title="ADMI - Africa Digital Media Institute | Leading Creative Media & Technology Training in East Africa"
        description="ADMI (Africa Digital Media Institute) - The premier creative media and technology training institution in East Africa. Digital Marketing, Graphic Design, Film Production, Music Production & Sound Engineering courses in Nairobi, Kenya. Competitive fee structure available. Apply for 2025 intake!"
        keywords="ADMI, Africa Digital Media Institute, ADMI Kenya, ADMI Nairobi, creative school Kenya, digital marketing course Kenya, graphic design diploma Kenya, film school Kenya, music production courses in kenya, music production kenya, sound engineering courses in kenya, ADMI fees, ADMI courses, best creative school Kenya"
      />

      {/* East Africa Local SEO for all major cities - Exclude FAQ schema to avoid duplication */}
      <EastAfricaLocalSEO showAll={true} excludeFAQSchema={true} />

      {/* Enhanced Testimonial Schemas for homepage testimonials */}
      {content &&
        content.fields.testimonials?.map((testimonial: any, index: number) => (
          <EnhancedTestimonialSchema
            key={`enhanced-testimonial-schema-${index}`}
            author={{
              name: testimonial.user?.fields?.name || 'ADMI Graduate',
              image: testimonial.user?.fields?.profileImage?.fields?.file?.url || undefined,
              jobTitle: testimonial.user?.fields?.jobTitle,
              worksFor: testimonial.user?.fields?.workplace,
              graduationDate: testimonial.user?.fields?.graduationDate,
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
              timeToEmployment: '3 months after graduation',
              salaryIncrease: '120% salary increase',
              industryRole: testimonial.user?.fields?.jobTitle || 'Creative Professional'
            }}
            skillsGained={[
              'Creative Media Production',
              'Digital Content Creation',
              'Industry Software Proficiency',
              'Professional Portfolio Development'
            ]}
            recommendationScore={9}
            wouldRecommend={true}
            verifiedGraduate={true}
          />
        ))}

      {/* Aggregate testimonial schema for overall rating */}
      {content && content.fields.testimonials && (
        <AggregateTestimonialSchema
          testimonials={content.fields.testimonials.map((testimonial: any) => ({
            author: {
              name: testimonial.user?.fields?.name || 'ADMI Graduate',
              jobTitle: testimonial.user?.fields?.jobTitle,
              worksFor: testimonial.user?.fields?.workplace,
              program: testimonial.user?.fields?.program || 'Creative Media Program'
            },
            reviewBody: testimonial.quote || testimonial.testimonial,
            reviewRating: 5,
            datePublished: testimonial.sys?.createdAt || new Date().toISOString()
          }))}
        />
      )}

      {/* FAQ Schema for "What is ADMI?" queries */}
      <CMSFAQSchema
        faqs={[
          {
            question: 'What is ADMI (Africa Digital Media Institute)?',
            answer:
              'ADMI (Africa Digital Media Institute) is a leading creative media and technology training institution based in Nairobi, Kenya. Our programmes are delivered through a flexible hybrid model that combines online learning with in person sessions, so you can study in a format that works for you. We offer diploma and certificate courses in Digital Marketing, Graphic Design, Film & TV Production, Music Production & Sound Engineering, Animation, and Photography.'
          },
          {
            question: 'What courses does ADMI offer?',
            answer:
              'ADMI offers diploma and certificate courses in Digital Marketing, Graphic Design, Film & TV Production, Music Production & Sound Engineering, Animation, and Photography with flexible payment plans and industry-standard equipment.'
          },
          {
            question: 'How much are ADMI fees?',
            answer:
              'ADMI offers competitive and flexible fee structures for all programs. For current 2025 rates, payment options, and detailed fee information, please visit https://admi.africa/student-support#fees or contact fee@admi.ac.ke.'
          }
        ]}
      />

      {/* Music Production SEO Boost - Hidden schema and content for better rankings */}
      <MusicProductionSEOBoost />

      <div className="w-full">
        {/* HERO */}
        <Box className="relative w-full">
          {(() => {
            // Use known working Contentful URL temporarily for testing
            const heroImageSrc =
              'https://images.ctfassets.net/qtu3mga6n6gc/6Mhj8yvqGYUNbHN9RZq6vD/4de22785a3034c1e768c12b8f11e95d7/homepage-hero-bg.png'
            const fallbackSrc = null

            if (heroImageSrc) {
              return (
                <Image
                  src={heroImageSrc}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  alt="ADMI Hero - Creative Media Training"
                  fill
                  priority
                  sizes="100vw"
                  className="absolute inset-0 z-0"
                  style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
                  onError={(e) => {
                    // If CloudFront fails, try Contentful fallback
                    if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
                      console.log('CloudFront hero image failed, falling back to Contentful')
                      e.currentTarget.src = fallbackSrc
                    } else {
                      console.warn('Both CloudFront and Contentful hero images failed to load')
                    }
                  }}
                />
              )
            }

            // Final fallback: Use gradient background
            return (
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%)'
                }}
              />
            )
          })()}
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background:
                'radial-gradient(38.35% 91.08% at 66.59% 45.79%, rgba(0, 0, 0, 0) 14.71%, rgba(0, 0, 0, 0.8) 100%)'
            }}
          ></div>

          <Box className="relative mx-auto flex h-[500px] w-full max-w-screen-xl flex-row px-4 sm:flex-row xl:px-0">
            <Box className="mt-[120px] flex w-full flex-col sm:w-1/2">
              <Box>
                <Paragraph
                  fontFamily="font-nexa"
                  fontWeight={900}
                  size={isMobile ? '30px' : '48px'}
                  className="text-white"
                >
                  {heroContent.heroTitle}
                </Paragraph>
                <Box className="flex">
                  <Paragraph
                    fontFamily="font-nexa"
                    fontWeight={900}
                    size={isMobile ? '30px' : '48px'}
                    className="pr-1 text-white"
                  >
                    Creative
                  </Paragraph>
                  <AnimatedWordDisplay
                    words={keyItems}
                    fontFamily="font-nexa"
                    fontWeight={900}
                    size={isMobile ? '30px' : '48px'}
                  />
                </Box>
              </Box>
              <Paragraph className="py-6 text-white">
                <strong>ADMI (Africa Digital Media Institute)</strong>{' '}
                {heroContent.heroDescription.replace(/^ADMI \(Africa Digital Media Institute\)\s*/i, '')}
              </Paragraph>

              <SearchDropdown
                destination="courses"
                items={courses}
                buttonLabel={heroContent.ctaButtonText || 'Learn More'}
                placeholder={heroContent.searchPlaceholder || 'What are you looking for?'}
                bg="#414438"
              />
            </Box>
          </Box>
        </Box>
        {/* OFFERINGS */}
        <Box className="w-full py-8 md:py-12">
          <Box className="w-full pt-8">
            <div className="mx-auto w-fit max-w-screen-md px-4 text-center">
              <Paragraph fontFamily="font-nexa">
                It is an innovative career accelerator where creatives and techies receive training, mentorship and a
                platform to turn their passion into a profession.
              </Paragraph>
            </div>
            <div className="mx-auto my-8 w-fit">
              <Title label="We offer practical courses in:" size="20px" color="black" />
            </div>
          </Box>
          <Box className="mx-auto w-full">
            <Carousel
              slideSize={160}
              slideGap="md"
              loop
              align="start"
              slidesToScroll={1}
              px={8}
              withControls={false}
              plugins={[autoplaySectors]}
              onMouseEnter={autoplaySectors.stop}
              onMouseLeave={autoplaySectors.reset}
            >
              {ADMI_HOMEPAGE_SECTORS.map((sector: any) => (
                <Carousel.Slide key={sector.title} py={6}>
                  <SectorItemCard sector={sector} withBorder />
                </Carousel.Slide>
              ))}
              {ADMI_HOMEPAGE_SECTORS.map((sector: any) => (
                <Carousel.Slide key={`${sector.title}-2`} py={6}>
                  <SectorItemCard sector={sector} withBorder />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>
          <Box className="w-full">
            <div className="mx-auto w-fit max-w-screen-md px-4 py-12 text-center">
              <Paragraph fontFamily="font-nexa">
                Our programs combine high-spec technical training in creative media and technology with intensive
                digital and soft-skills coaching, along with a rigorous internship process, helping to achieve
                above-market placement rates.
              </Paragraph>
            </div>
          </Box>
        </Box>
        {/* IMPACT */}
        <LazySection fallbackHeight="400px" skeletonType="card">
          <Box className="w-full py-8 md:py-12" bg={'#F5FFFD'}>
            <Box className="mx-auto flex w-full max-w-screen-xl flex-col px-4 py-8 2xl:px-0">
              <Box className="flex w-full flex-col sm:flex-row">
                <Box className="sm:w-[30%]">
                  <Title label="Our Impact" color="black" />
                </Box>
                <Box className="sm:w-[70%]">
                  <Paragraph fontFamily="font-nexa" className="pt-4">
                    Through our innovative programs and industry-focused training, we empower students to turn their
                    creative passions into successful careers. ADMI&apos;s impact extends beyond the classroom,
                    fostering a new generation of professionals ready to lead in the digital media industry.
                  </Paragraph>
                  <Box className="w-full">
                    {!isMobile && <Divider color="admiShamrok" mt="xl"></Divider>}
                    {content &&
                      (isMobile ? (
                        <Box className="flex flex-col">
                          <div className="my-auto flex py-6">
                            <Paragraph className="my-auto grow" size="18px" fontFamily="font-nexa">
                              Student Satisfaction
                            </Paragraph>
                            <div className="my-auto">
                              <Paragraph size="48px" fontFamily="font-nexa">
                                {content.fields?.studentSatisfactionRating || 'N/A'}
                              </Paragraph>
                            </div>
                          </div>
                          <Divider color="admiShamrok" orientation="horizontal"></Divider>
                          <div className="my-auto flex py-6">
                            <Paragraph className="my-auto grow" size="18px" fontFamily="font-nexa">
                              Enrolled Students
                            </Paragraph>
                            <div className="my-auto">
                              <Indicator
                                color="admiShamrok"
                                inline
                                label={<IconPlus size={16} color="black" />}
                                size={24}
                                offset={4}
                              >
                                <Paragraph size="48px" fontFamily="font-nexa">
                                  <NumberFormatter
                                    value={content.fields?.numberOfEnrolledStudents || 0}
                                    thousandSeparator
                                  />
                                </Paragraph>
                              </Indicator>
                            </div>
                          </div>
                          <Divider color="admiShamrok" orientation="horizontal"></Divider>
                          <div className="my-auto flex py-6">
                            <Paragraph className="my-auto grow pr-4" size="18px" fontFamily="font-nexa">
                              Employment Rate within 6 months of graduation
                            </Paragraph>
                            <div className="my-auto">
                              <Indicator
                                color="admiShamrok"
                                inline
                                label={<IconPlus size={16} color="black" />}
                                size={24}
                                offset={4}
                              >
                                <Paragraph size="48px" fontFamily="font-nexa">
                                  {content.fields?.employmentRate || 'N/A'}
                                </Paragraph>
                              </Indicator>
                            </div>
                          </div>
                        </Box>
                      ) : (
                        <Box className="flex">
                          <div className="my-auto flex w-[30%] pr-4 font-proxima">
                            <Paragraph className="w-1/2" size="18px" fontFamily="font-nexa">
                              Student Satisfaction
                            </Paragraph>
                            <div className="my-auto">
                              <Paragraph size="48px" fontFamily="font-nexa">
                                {content.fields?.studentSatisfactionRating || 'N/A'}
                              </Paragraph>
                            </div>
                          </div>
                          <Divider color="admiShamrok" orientation="vertical" h={100}></Divider>
                          <div className="my-auto flex w-[30%] px-4 font-proxima">
                            <Paragraph className="w-1/2" size="18px" fontFamily="font-nexa">
                              Enrolled Students
                            </Paragraph>
                            <div className="my-auto">
                              <Indicator
                                color="admiShamrok"
                                inline
                                label={<IconPlus size={16} color="black" />}
                                size={24}
                                offset={4}
                              >
                                <Paragraph size="48px" fontFamily="font-nexa">
                                  <NumberFormatter
                                    value={content.fields?.numberOfEnrolledStudents || 0}
                                    thousandSeparator
                                  />
                                </Paragraph>
                              </Indicator>
                            </div>
                          </div>
                          <Divider color="admiShamrok" orientation="vertical"></Divider>
                          <div className="my-auto flex w-[30%] px-4 font-proxima">
                            <Paragraph className="w-2/3 pr-4" size="18px" fontFamily="font-nexa">
                              Employment Rate within 6 months of graduation
                            </Paragraph>
                            <div className="my-auto">
                              <Indicator
                                color="admiShamrok"
                                inline
                                label={<IconPlus size={16} color="black" />}
                                size={24}
                                offset={4}
                              >
                                <Paragraph size="48px" fontFamily="font-nexa">
                                  {content.fields?.employmentRate || 'N/A'}
                                </Paragraph>
                              </Indicator>
                            </div>
                          </div>
                        </Box>
                      ))}
                    <Divider color="admiShamrok" mb={'md'}></Divider>
                  </Box>
                </Box>
              </Box>

              <Box className="flex w-full flex-col py-16 sm:flex-row">
                <Box className="sm:w-[30%]">
                  <Title label="Testimonials" color="black" />
                </Box>
                <Box className="sm:w-[70%]">
                  <Paragraph fontFamily="font-nexa" className="pt-4">
                    Discover how ADMI has transformed the careers of our students through their own stories of success
                    and growth. Hear firsthand how our hands-on training and industry connections have helped them
                    achieve their creative dreams.
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
                  plugins={[autoplayTestimonials]}
                  onMouseEnter={autoplayTestimonials.stop}
                  onMouseLeave={autoplayTestimonials.reset}
                >
                  {content &&
                    content.fields?.testimonials?.map((testimonial: any, index: number) => (
                      <Carousel.Slide key={`testimonial-${index}`}>
                        <UserTestimonialCard
                          user={testimonial.user}
                          testimonial={testimonial}
                          assets={content.assets || []}
                        />
                      </Carousel.Slide>
                    ))}
                </Carousel>
              </Box>
            </Box>
          </Box>
        </LazySection>
        {/* ANNOUNCEMENTS */}
        {featuredResource && (
          <Box className="w-full px-4 py-8 md:py-12 xl:px-0" bg={'admiOrangeDark'}>
            <AnnouncementCard
              destination="resources"
              announcement={featuredResource.fields}
              title={'Announcements'}
              arrowColor={'#F60834'}
              image={AnnouncementImage}
            />
          </Box>
        )}
        {/* FACILITIES */}
        <LazySection fallbackHeight="500px" skeletonType="card">
          <Box className="1xl:px-0 w-full px-4 py-8 md:py-12" bg={'#F5FFFD'}>
            <Box className="mx-auto w-full max-w-screen-xl">
              <Box className="flex w-full flex-col pb-12 sm:flex-row">
                <Box className="sm:w-[30%]">
                  <Title label="Facilities" color="black" />
                </Box>
                <Box className="sm:w-[70%]">
                  <Paragraph fontFamily="font-nexa" className="pt-4">
                    ADMI&apos;s campus is a vibrant, creatively designed workspace conveniently located right next to
                    the GPO in Nairobi&apos;s Central Business District. The campus boasts extensive facilities
                    including classrooms, animation and graphics labs, TV and sound production studios, Mac and PC labs,
                    and a film equipment vault.
                  </Paragraph>
                </Box>
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
                withControls={false}
                plugins={[autoplayFacilities]}
                onMouseEnter={autoplayFacilities.stop}
                onMouseLeave={autoplayFacilities.reset}
              >
                {facilities.map((facility) => (
                  <Carousel.Slide key={facility.name}>
                    <FacilityItemCard facility={facility} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Box>
          </Box>
        </LazySection>
        {/* NEWS */}
        {featuredNews && (
          <Box className="w-full px-4 py-8 md:py-12 xl:px-0" bg={'#01C6A5'}>
            <AnnouncementCard
              destination="news-events/news"
              announcement={featuredNews.fields}
              bgColor="admiShamrok"
              ribbonColor="admiRed"
              image={NewsImage}
              featured
            />
          </Box>
        )}
        {/* COURSES */}
        <LazySection fallbackHeight="600px" skeletonType="card">
          <Box className="1xl:px-0 w-full px-4 py-8 md:py-12" bg={'#F5FFFD'}>
            <Box className="mx-auto w-full max-w-screen-xl">
              <Box className="flex w-full flex-col pb-12 sm:flex-row">
                <Box className="sm:w-[30%]">
                  <Title label="Our Courses" color="black" />
                </Box>
                <Box className="sm:w-[70%]">
                  <Paragraph fontFamily="font-nexa" className="pt-4">
                    Explore ADMI&apos;s diverse range of courses designed to equip you with the skills and knowledge
                    needed to excel in the creative industries. Whether you&apos;re passionate about film, design,
                    music, or digital content, our programs offer hands-on training and expert guidance to help you
                    succeed.
                  </Paragraph>
                </Box>
              </Box>
              <Box className="w-full">
                <Carousel
                  slideSize={260}
                  slideGap="md"
                  loop
                  align="start"
                  slidesToScroll={1}
                  plugins={[autoplayCourses]}
                  onMouseEnter={autoplayCourses.stop}
                  onMouseLeave={autoplayCourses.reset}
                >
                  {courses.map((course) => (
                    <Carousel.Slide key={course.sys.id}>
                      <CourseItemCard course={course} />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Box>
              <Box className="w-[200px] pt-8">
                <Button
                  size="lg"
                  backgroundColor="admiRed"
                  label="Explore Courses"
                  onClick={() => handleViewCourses()}
                />
              </Box>
            </Box>
          </Box>
        </LazySection>
        {/* AWARDS */}
        {featuredAward && (
          <Box className="w-full px-4 py-8 md:py-12 xl:px-0" bg={'#E6F608'}>
            <AnnouncementCard
              destination="news-events/news"
              announcement={featuredAward.fields}
              title="Awards"
              arrowColor="#F60834"
              image={AwardsImage}
            />
          </Box>
        )}
        {/* WHAT IS ADMI FAQ */}
        <LazySection fallbackHeight="600px" skeletonType="text">
          <Box className="w-full py-8 md:py-12" bg={'white'}>
            <Box className="mx-auto w-full max-w-screen-xl px-4 2xl:px-0">
              <Box className="mb-12 text-center">
                <Title label="What is ADMI?" color="black" size="32px" />
                <Paragraph fontFamily="font-nexa" className="mx-auto max-w-3xl pt-4">
                  Common questions about Africa Digital Media Institute answered
                </Paragraph>
              </Box>

              <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                <Box className="rounded-lg bg-gray-50 p-6">
                  <Title label="What does ADMI stand for?" color="black" size="18px" className="mb-3" />
                  <Paragraph>
                    ADMI (Africa Digital Media Institute) is a leading creative media and technology training
                    institution based in Nairobi, Kenya. Our programmes are delivered through a flexible hybrid model
                    that combines online learning with in person sessions.
                  </Paragraph>
                </Box>

                <Box className="rounded-lg bg-gray-50 p-6">
                  <Title label="What courses does ADMI offer?" color="black" size="18px" className="mb-3" />
                  <Paragraph>
                    ADMI offers diploma and certificate courses in Digital Marketing, Graphic Design, Film & TV
                    Production, Music Production & Sound Engineering, Animation, and Photography with state-of-the-art
                    facilities.
                  </Paragraph>
                </Box>

                <Box className="rounded-lg bg-gray-50 p-6">
                  <Title label="How much are ADMI fees?" color="black" size="18px" className="mb-3" />
                  <Paragraph>
                    ADMI offers competitive fee structures for all diploma and certificate programs. For current rates,
                    payment options, and detailed fee information, please visit our student support page or contact our
                    finance office directly.
                  </Paragraph>
                </Box>

                <Box className="rounded-lg bg-gray-50 p-6">
                  <Title label="Where is ADMI located?" color="black" size="18px" className="mb-3" />
                  <Paragraph>
                    ADMI is located in Nairobi&apos;s Central Business District, right next to the GPO. Our campus
                    features state-of-the-art facilities and equipment.
                  </Paragraph>
                </Box>
              </div>

              <Box className="mt-8 text-center">
                <Button
                  size="lg"
                  backgroundColor="admiRed"
                  label="View All Courses & Fees"
                  onClick={() => router.push('/student-support#fees')}
                />
              </Box>
            </Box>
          </Box>
        </LazySection>
      </div>
    </MainLayout>
  )
}

// ISR: Pre-render at build time, revalidate every hour
export async function getStaticProps() {
  try {
    const [contentRes, coursesRes, newsRes, resourcesRes, awardsRes, heroRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/homepage`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/courses`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/news`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/resources`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/awards`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/homepage-hero`)
    ])

    const [contentData, coursesData, newsData, resourcesData, awardsData, heroData] = await Promise.all([
      contentRes.json(),
      coursesRes.json(),
      newsRes.json(),
      resourcesRes.json(),
      awardsRes.json(),
      heroRes.json()
    ])

    // Extract hero content from Contentful response or use fallback
    const heroContent = heroData?.fields || FALLBACK_HERO

    return {
      props: {
        content: contentData[0] || null,
        courses: coursesData || [],
        featuredNews:
          (Array.isArray(newsData) ? newsData.find((article: IContentfulEntry) => article.fields.featured) : null) ||
          null,
        featuredResource:
          (Array.isArray(resourcesData)
            ? resourcesData.find((article: IContentfulEntry) => article.fields.featured)
            : null) || null,
        featuredAward:
          (Array.isArray(awardsData)
            ? awardsData.find((article: IContentfulEntry) => article.fields.featured)
            : null) || null,
        heroContent
      },
      revalidate: 3600 // Regenerate page every 1 hour (3600 seconds)
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      props: {
        content: null,
        courses: [],
        featuredNews: null,
        featuredResource: null,
        featuredAward: null,
        heroContent: FALLBACK_HERO
      },
      revalidate: 300 // Retry in 5 minutes if there was an error
    }
  }
}
