import React, { useEffect, useState } from 'react'
import { DiplomaSchema, CMSFAQSchema } from '@/components/shared/StructuredData'
import { generateDiplomaKeywords } from '@/utils/diploma-seo-config'
import { ICourseFAQ, IFAQResponse } from '@/types'
import { CourseIntakeEventSchema } from '@/components/seo/CourseIntakeEventSchema'
import { getCoursePricing } from '@/utils/course-pricing'
import { CourseViewEvent } from '@/components/analytics/MetaPixelEvents'

interface DiplomaEnhancedSEOProps {
  course: any
  slug: string
  employmentRate?: number
  averageSalary?: string
  industryPartners?: string[]
  accreditation?: string
}

export function DiplomaEnhancedSEO({
  course,
  slug,
  employmentRate = 85,
  averageSalary = 'KES 45,000 - 120,000',
  industryPartners = ['Safaricom', 'Nation Media Group', 'Standard Group', 'Royal Media Services'],
  accreditation = 'Pearson Assured & Woolf University'
}: DiplomaEnhancedSEOProps) {
  const [cmsFaqs, setCmsFaqs] = useState<ICourseFAQ[]>([])

  // Fetch CMS FAQs for this course
  useEffect(() => {
    const fetchCMSFAQs = async () => {
      try {
        const response = await fetch(`/api/v3/course-faqs?slug=${slug}`)
        if (response.ok) {
          const data: IFAQResponse = await response.json()
          setCmsFaqs(data.items)
        }
      } catch (error) {
        console.error('Error fetching CMS FAQs for SEO:', error)
      }
    }

    if (slug) {
      fetchCMSFAQs()
    }
  }, [slug])

  // Use only CMS FAQs
  const activeFaqs = cmsFaqs

  // Note: Enhanced keywords are generated via generateDiplomaKeywords utility when needed

  // Enhanced description for diploma programs
  const enhancedDescription = `${course.name} - 2-year comprehensive diploma program at Africa Digital Media Institute, the leading Creative Media and Technology Training Institution across Africa. Industry-recognized qualification with ${employmentRate}% employment rate. Hands-on training with professional equipment, internships, and career placement assistance. Serving students across Africa with flexible learning options.`

  // Extract learning outcomes and career options
  const learningOutcomes =
    course.learningOutcomes?.content
      ?.map((block: any) => block.content?.map((content: any) => content.value).join(' '))
      .filter(Boolean) || []

  const careerOptions =
    course.careerOptions?.content
      ?.map((block: any) => block.content?.map((content: any) => content.value).join(' '))
      .filter(Boolean) || []

  // Get pricing information for this course (used for analytics tracking only)
  const pricing = getCoursePricing(slug, course.awardLevel)

  const courseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses/${slug}`
  const courseImage = course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined

  return (
    <>
      {/* Enhanced Diploma Schema */}
      <DiplomaSchema
        name={course.name}
        description={enhancedDescription}
        provider={{
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa'
        }}
        url={courseUrl}
        image={courseImage}
        awardLevel={course.awardLevel}
        // Remove creditHours as it's not supported by Course schema
        tuitionFees={course.tuitionFees}
        duration={course.programType?.fields?.duration}
        deliveryMode={course.programType?.fields?.deliveryMode}
        educationalLevel="Diploma"
        learningOutcomes={learningOutcomes}
        careerOptions={careerOptions}
        employmentRate={employmentRate}
        averageSalary={averageSalary}
        industryPartners={industryPartners}
        accreditation={accreditation}
        transferCredits={true}
        courseVideo={course.courseVideo}
        courseSlug={slug}
        price={pricing?.price}
        currency={pricing?.currency}
      />

      {/* CMS FAQ Schema for SEO - Only render if CMS FAQs exist */}
      {activeFaqs.length > 0 && (
        <CMSFAQSchema faqs={activeFaqs} courseName={course.name} schemaId="diploma-faq-schema" />
      )}

      {/* Course Intake Events Schema */}
      <CourseIntakeEventSchema courseName={course.name} courseType="diploma" targetIntake="all" />

      {/* Meta Pixel ViewContent Event for Remarketing */}
      {pricing && (
        <CourseViewEvent
          courseId={`admi-diploma-${slug}`}
          courseName={course.name}
          price={pricing.price}
          currency={pricing.currency}
          category="Education & Training > Higher Education > Diploma Programs"
        />
      )}

      {/* Enhanced meta tags for diploma programs */}
      <script
        id="diploma-enhanced-meta"
        dangerouslySetInnerHTML={{
          __html: `
            // Add diploma-specific tracking and meta information
            if (typeof window !== 'undefined') {
              // Track diploma page views
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'event': 'diploma_page_view',
                'course_name': '${course.name}',
                'program_type': 'diploma',
                'duration': '2_years',
                'award_level': '${course.awardLevel || 'diploma'}',
                'delivery_mode': '${course.programType?.fields?.deliveryMode || 'hybrid'}'
              });
            }
          `
        }}
      />
    </>
  )
}

// Component for diploma-specific meta tags
export function DiplomaSEOTags({
  course,
  programId,
  keywords = []
}: {
  course: any
  programId?: string
  keywords?: string[]
}) {
  const diplomaKeywords = programId ? generateDiplomaKeywords(programId) : []
  const allKeywords = [...diplomaKeywords, ...keywords].join(', ')

  return (
    <>
      <meta name="keywords" content={allKeywords} />
      <meta
        name="description"
        content={`${course.name} - 2-year diploma program with industry placement. ${course.programType?.fields?.deliveryMode} learning across Africa.`}
      />

      {/* Diploma-specific meta tags */}
      <meta name="education.level" content="diploma" />
      <meta name="education.duration" content="2 years" />
      <meta name="education.mode" content={course.programType?.fields?.deliveryMode?.toLowerCase() || 'hybrid'} />
      <meta name="education.accreditation" content="Pearson Assured, Woolf University" />
      <meta name="education.employment_rate" content="85%" />

      {/* Geographic and market targeting */}
      <meta name="geo.region" content="AF" />
      <meta name="coverage" content="Africa" />
      <meta name="target.market" content="African students, career changers, creative professionals" />

      {/* Social proof and credibility */}
      <meta name="institution.type" content="private higher education" />
      <meta name="institution.recognition" content="international" />
      <meta name="program.outcomes" content="industry placement, portfolio development, career advancement" />
    </>
  )
}
