import React, { useEffect, useState } from 'react'
import { ensureProtocol } from '@/utils'
import { CourseSchema, CMSFAQSchema } from '@/components/shared/StructuredData'
import { ICourseFAQ, IFAQResponse } from '@/types'
import { CourseIntakeEventSchema } from '@/components/seo/CourseIntakeEventSchema'
import { getCoursePricing } from '@/utils/course-pricing'
import { CourseViewEvent } from '@/components/analytics/MetaPixelEvents'

interface CertificateEnhancedSEOProps {
  course: any
  slug: string
  employmentRate?: number
  averageSalary?: string
  industryPartners?: string[]
  accreditation?: string
}

export function CertificateEnhancedSEO({
  course,
  slug,
  employmentRate = 75,
  averageSalary = 'KES 25,000 - 80,000',
  industryPartners = ['Safaricom', 'Nation Media Group', 'Standard Group', 'Royal Media Services'],
  accreditation = 'Pearson Assured'
}: CertificateEnhancedSEOProps) {
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

  // Determine certificate type and duration
  const isFoundationCertificate = course.awardLevel?.toLowerCase().includes('foundation')
  const isProfessionalCertificate = course.awardLevel?.toLowerCase().includes('professional')
  const certificateType = isFoundationCertificate
    ? 'Foundation'
    : isProfessionalCertificate
      ? 'Professional'
      : 'Certificate'
  const duration = course.programType?.fields?.duration || '6 months'

  // Enhanced description for certificate programs
  const enhancedDescription = `${course.name} - ${duration} ${certificateType.toLowerCase()} program at Africa Digital Media Institute, the leading Creative Media and Technology Training Institution across Africa. ${accreditation} industry-recognized qualification with ${employmentRate}% employment rate. Graduates earn ${averageSalary} on average. Practical training with professional equipment and career placement assistance. Serving students across Africa with flexible learning options.`

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

  // Extract numeric price from tuitionFees string (e.g., "KES 50,000" -> 50000)
  const extractPriceFromString = (priceString: string): number | undefined => {
    if (!priceString) return undefined
    const match = priceString.match(/[\d,]+/)
    if (!match) return undefined
    return parseInt(match[0].replace(/,/g, ''), 10)
  }

  const tuitionFeesPrice = extractPriceFromString(course.tuitionFees)
  const finalPrice = tuitionFeesPrice || pricing?.price

  const courseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses/${slug}`
  const courseImage = course.coverImage?.fields?.file?.url
    ? ensureProtocol(course.coverImage.fields.file.url)
    : undefined

  return (
    <>
      {/* Enhanced Certificate Schema */}
      <CourseSchema
        name={course.name}
        description={enhancedDescription}
        provider={{
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa'
        }}
        url={courseUrl}
        image={courseImage}
        awardLevel={course.awardLevel}
        tuitionFees={course.tuitionFees}
        duration={duration}
        deliveryMode={course.programType?.fields?.deliveryMode}
        educationalLevel={certificateType}
        learningOutcomes={learningOutcomes}
        careerOptions={careerOptions}
        courseVideo={course.courseVideo}
        courseSlug={slug}
        price={finalPrice}
        currency={pricing?.currency || 'KES'}
      />

      {/* Certificate Program Structured Data */}
      <script
        id="certificate-program-schema"
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
              url: 'https://admi.africa',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
                addressLocality: 'Nairobi',
                addressRegion: 'Nairobi',
                postalCode: '00100',
                addressCountry: 'KE'
              }
            },
            programType: certificateType,
            timeToComplete: duration.includes('month') ? `P${duration.split(' ')[0]}M` : duration,
            occupationalCategory: careerOptions,
            programPrerequisites: isFoundationCertificate
              ? 'Basic computer literacy'
              : 'Secondary education completion or relevant experience',
            educationalProgramMode: course.programType?.fields?.deliveryMode?.toLowerCase().includes('online')
              ? 'online'
              : 'blended',
            offers: {
              '@type': 'Offer',
              category: 'Educational',
              price: 'Contact for pricing',
              priceCurrency: 'KES',
              availability: 'https://schema.org/InStock',
              validFrom: `${new Date().getFullYear()}-01-01`,
              validThrough: `${new Date().getFullYear() + 1}-12-31`,
              seller: {
                '@type': 'EducationalOrganization',
                name: 'Africa Digital Media Institute',
                url: 'https://admi.africa'
              }
            },
            hasCourse: {
              '@type': 'Course',
              name: course.name,
              courseCode: course.courseCode || slug.toUpperCase()
            },
            // Add employment and industry information
            ...(employmentRate && {
              occupationalCredentialAwarded: {
                '@type': 'EducationalOccupationalCredential',
                credentialCategory: `${certificateType} Certificate`,
                recognizedBy: industryPartners.map((partner) => ({
                  '@type': 'Organization',
                  name: partner
                }))
              }
            })
          })
        }}
      />

      {/* CMS FAQ Schema */}
      {activeFaqs.length > 0 && (
        <CMSFAQSchema
          faqs={activeFaqs}
          courseName={`${course.name} - Certificate Program Information`}
          schemaId="certificate-faq-schema"
        />
      )}

      {/* Course Intake Events Schema */}
      <CourseIntakeEventSchema courseName={course.name} courseType="certificate" targetIntake="all" />

      {/* Meta Pixel ViewContent Event for Remarketing */}
      {pricing && (
        <CourseViewEvent
          courseId={`admi-certificate-${slug}`}
          courseName={course.name}
          price={pricing.price}
          currency={pricing.currency}
          category="Education & Training > Professional Development"
        />
      )}

      {/* Video Schema for Certificate Course Preview */}
      {course.courseVideo && (
        <script
          id="certificate-video-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoObject',
              name: `${course.name} - Course Preview`,
              description: `Watch this comprehensive preview of ${course.name} at Africa Digital Media Institute. Learn about the curriculum, facilities, career opportunities, and what makes this ${certificateType.toLowerCase()} program special.`,
              thumbnailUrl: course.coverImage?.fields?.file?.url
                ? ensureProtocol(course.coverImage.fields.file.url)
                : 'https://admi.africa/logo.png',
              contentUrl: ensureProtocol(course.courseVideo.fields.file.url),
              embedUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/watch/${slug}`,
              uploadDate: course.sys?.updatedAt || new Date().toISOString(),
              duration: 'PT2M30S',
              publisher: {
                '@type': 'Organization',
                name: 'Africa Digital Media Institute',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://admi.africa/logo.png'
                },
                sameAs: [
                  'https://www.facebook.com/ADMIAFRICA',
                  'https://x.com/ADMIafrica',
                  'https://www.instagram.com/admiafrica/',
                  'https://www.linkedin.com/school/admiafrica/',
                  'https://www.tiktok.com/@admiafrica'
                ]
              }
            })
          }}
        />
      )}
    </>
  )
}
