import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { DiplomaSchema, CMSFAQSchema } from '@/components/shared/StructuredData'
import { generateDiplomaKeywords } from '@/utils/diploma-seo-config'
import { generateFAQSchema } from '@/data/diploma-faqs'
import { ICourseFAQ, IFAQResponse } from '@/types'

interface DiplomaEnhancedSEOProps {
  course: any
  slug: string
  faqs?: any[]
  employmentRate?: number
  averageSalary?: string
  industryPartners?: string[]
  accreditation?: string
}

export function DiplomaEnhancedSEO({
  course,
  slug,
  faqs = [],
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

  // Use CMS FAQs if available, otherwise use provided FAQs
  const activeFaqs = cmsFaqs.length > 0 ? cmsFaqs : faqs

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

  // Generate FAQ schema if FAQs are provided (now using CMS FAQs when available)
  const faqSchema = activeFaqs.length > 0 ? generateFAQSchema(activeFaqs) : null

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
        url={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses/${slug}`}
        image={course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined}
        awardLevel={course.awardLevel}
        creditHours={course.creditHours}
        tuitionFees={course.tuitionFees}
        duration={course.programType?.fields?.duration}
        deliveryMode={course.programType?.fields?.deliveryMode}
        educationalLevel="Diploma"
        learningOutcomes={learningOutcomes}
        careerOptions={careerOptions}
        intakes={course.intakes}
        employmentRate={employmentRate}
        averageSalary={averageSalary}
        industryPartners={industryPartners}
        accreditation={accreditation}
        transferCredits={true}
      />

      {/* CMS FAQ Schema for SEO */}
      <CMSFAQSchema faqs={activeFaqs} courseName={course.name} />

      {/* Fallback FAQ Schema for SEO (if no CMS FAQs) */}
      {activeFaqs.length === 0 && faqSchema && (
        <Script
          id="diploma-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Enhanced meta tags for diploma programs */}
      <Script
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

      {/* Rich snippets for diploma programs */}
      <Script
        id="diploma-rich-snippets"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOccupationalProgram',
            name: course.name,
            description: enhancedDescription,
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Africa Digital Media Institute',
              url: 'https://admi.africa'
            },
            programType: 'Diploma',
            timeToComplete: 'P2Y',
            occupationalCategory: careerOptions,
            programPrerequisites: 'Secondary education completion',
            educationalProgramMode: course.programType?.fields?.deliveryMode?.toLowerCase().includes('online')
              ? 'online'
              : 'blended',
            offers: {
              '@type': 'Offer',
              category: 'Educational',
              price: course.tuitionFees,
              priceCurrency: 'KES'
            },
            hasCourse: {
              '@type': 'Course',
              name: course.name,
              courseCode: course.courseCode || slug.toUpperCase(),
              numberOfCredits: course.creditHours
            }
          })
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
