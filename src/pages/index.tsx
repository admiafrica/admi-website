import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { CMSFAQSchema } from '@/components/shared/StructuredData'
import { EastAfricaLocalSEO } from '@/components/seo/EastAfricaLocalSEO'
import { EnhancedTestimonialSchema, AggregateTestimonialSchema } from '@/components/seo/EnhancedTestimonialSchema'
import { MusicProductionSEOBoost } from '@/components/seo/MusicProductionSEOBoost'
import HeroSection from '@/components/homepage/HeroSection'
import StatsBar from '@/components/homepage/StatsBar'
import AccreditationTrust from '@/components/homepage/AccreditationTrust'
import ProgramCategories from '@/components/homepage/ProgramCategories'
import DegreePathway from '@/components/homepage/DegreePathway'
import WhyADMI from '@/components/homepage/WhyADMI'
import StudentShowcase from '@/components/homepage/StudentShowcase'
import AlumniStories from '@/components/homepage/AlumniStories'
import EventsIntakes from '@/components/homepage/EventsIntakes'
import IndustryPartners from '@/components/homepage/IndustryPartners'
import TestimonialsSection from '@/components/homepage/TestimonialsSection'
import FinalCTA from '@/components/homepage/FinalCTA'
import { IContentfulEntry } from '@/types'

// Hardcoded fallback hero content - used when Contentful is unavailable
const FALLBACK_HERO = {
  heroTitle: 'Launch your career in Creative',
  heroHighlightWord: 'Media & Technology',
  heroDescription:
    'ADMI (Africa Digital Media Institute) is a leading creative media and technology training institution based in Nairobi, Kenya. Our programmes are delivered through a flexible hybrid model that combines online learning with in person sessions, so you can study in a format that works for you. Explore our diploma and certificate courses and get started today.',
  ctaButtonText: 'Learn More',
  searchPlaceholder: 'What are you looking for?'
}

interface HomePageProps {
  content: any
  courses: Array<any>
  featuredNews: IContentfulEntry | null
  featuredResource: IContentfulEntry | null
  featuredAward: IContentfulEntry | null
  heroContent: any
}

export default function HomePage({ content, courses }: HomePageProps) {
  return (
    <MainLayout footerBgColor="#E6F608">
      <PageSEO
        title="ADMI - Africa Digital Media Institute | Leading Creative Media & Technology Training in East Africa"
        description="ADMI (Africa Digital Media Institute) - The premier creative media and technology training institution in East Africa. Digital Marketing, Graphic Design, Film Production, Music Production & Sound Engineering courses in Nairobi, Kenya. Competitive fee structure available. Apply for 2025 intake!"
        keywords="ADMI, Africa Digital Media Institute, ADMI Kenya, ADMI Nairobi, creative school Kenya, digital marketing course Kenya, graphic design diploma Kenya, film school Kenya, music production courses in kenya, music production kenya, sound engineering courses in kenya, ADMI fees, ADMI courses, best creative school Kenya"
      />

      {/* East Africa Local SEO for all major cities */}
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

      {/* Music Production SEO Boost */}
      <MusicProductionSEOBoost />

      {/* Visual Sections */}
      <HeroSection />
      <StatsBar />
      <AccreditationTrust />
      <ProgramCategories />
      <WhyADMI />
      <StudentShowcase />
      <DegreePathway />
      <AlumniStories />
      <IndustryPartners />
      <EventsIntakes />
      <TestimonialsSection />
      <FinalCTA />
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
      revalidate: 3600
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
      revalidate: 300
    }
  }
}
