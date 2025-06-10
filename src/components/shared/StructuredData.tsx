import React from 'react'
import Script from 'next/script'
import { ICourseFAQ } from '@/types'

interface OrganizationProps {
  name?: string
  logo?: string
  url?: string
  contactPoint?: {
    telephone: string
    email: string
  }
  sameAs?: string[]
}

export function OrganizationSchema({
  name = 'Africa Digital Media Institute',
  logo = 'https://admi.africa/logo.png',
  url = 'https://admi.africa',
  contactPoint = {
    telephone: '+254-700-000-000',
    email: 'info@admi.africa'
  },
  sameAs = [
    'https://www.facebook.com/ADMIAFRICA',
    'https://x.com/ADMIafrica',
    'https://www.instagram.com/admiafrica/',
    'https://www.linkedin.com/school/admiafrica/'
  ]
}: OrganizationProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    logo: {
      '@type': 'ImageObject',
      url: logo
    },
    url,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
      postOfficeBoxNumber: 'P.O. Box 35447',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactPoint.telephone,
      email: contactPoint.email,
      contactType: 'customer service'
    },
    foundingDate: '2012',
    description:
      'Africa Digital Media Institute - Leading Creative Media and Technology Training Institution across Africa. Empowering creative professionals through industry-relevant education and training.',
    areaServed: [
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Tanzania' },
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Country', name: 'Rwanda' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Country', name: 'Ethiopia' },
      { '@type': 'Country', name: 'Cameroon' },
      { '@type': 'Country', name: 'Senegal' },
      { '@type': 'Continent', name: 'Africa' }
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Higher Education'
    }
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface LocalBusinessProps {
  name?: string
  image?: string
  logo?: string
  telephone?: string
  email?: string
  url?: string
  description?: string
  address?: {
    streetAddress: string
    postOfficeBoxNumber?: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  openingHours?: string[]
}

export function LocalBusinessSchema({
  name = 'Africa Digital Media Institute',
  image = 'https://admi.africa/campus.jpg',
  logo = 'https://admi.africa/logo.png',
  telephone = '+254 772 913 811',
  email = 'info@admi.ac.ke',
  url = 'https://admi.africa',
  description = 'Africa Digital Media Institute (ADMI) is a leading creative media and technology training institution based in Nairobi, Kenya.',
  address = {
    streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
    postOfficeBoxNumber: 'P.O. Box 35447',
    addressLocality: 'Nairobi',
    addressRegion: 'Nairobi',
    postalCode: '00100',
    addressCountry: 'KE'
  },
  geo = {
    latitude: -1.2833,
    longitude: 36.8167
  },
  openingHours = ['Monday-Friday 08:00-17:00', 'Saturday 09:00-13:00']
}: LocalBusinessProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    image,
    logo,
    telephone,
    email,
    url,
    description,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...geo
    },
    openingHoursSpecification: openingHours.map((hours) => {
      const [days, time] = hours.split(' ')
      const [opens, closes] = time.split('-')
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.split('-').map((day) => `https://schema.org/${day}`),
        opens,
        closes
      }
    })
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface ArticleProps {
  headline: string
  description: string
  image?: string
  author?: string | { name: string; url?: string }
  datePublished: string
  dateModified?: string
  url: string
  keywords?: string[]
  articleSection?: string
  articleBody?: string
  publisher?: {
    name: string
    logo: string
  }
}

export function ArticleSchema({
  headline,
  description,
  image,
  author = 'ADMI Editorial Team',
  datePublished,
  dateModified,
  url,
  keywords,
  articleSection,
  articleBody,
  publisher = {
    name: 'Africa Digital Media Institute',
    logo: 'https://admi.africa/logo.png'
  }
}: ArticleProps) {
  const authorData =
    typeof author === 'string'
      ? { '@type': 'Person', name: author }
      : author
        ? { '@type': 'Person', name: author.name, url: author.url }
        : { '@type': 'Person', name: 'ADMI Editorial Team' }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    author: authorData,
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    ...(keywords && { keywords: keywords.join(', ') }),
    ...(articleSection && { articleSection }),
    ...(articleBody && { articleBody }),
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo
      }
    }
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// CMS-driven FAQ Schema
interface CMSFAQSchemaProps {
  faqs: ICourseFAQ[] | any[]
  courseName?: string
}

export function CMSFAQSchema({ faqs, courseName }: CMSFAQSchemaProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: courseName ? `${courseName} - Frequently Asked Questions` : 'Course FAQs',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.fields?.question || faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.fields?.answer || faq.answer
      }
    }))
  }

  return (
    <Script
      id="cms-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface CourseProps {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  url: string
  image?: string
  awardLevel?: string
  creditHours?: number
  tuitionFees?: string
  duration?: string
  deliveryMode?: string
  educationalLevel?: string
  learningOutcomes?: string[]
  careerOptions?: string[]
  intakes?: string
  applicationDeadline?: string
  courseCode?: string
  prerequisites?: string[]
}

interface DiplomaProps extends CourseProps {
  employmentRate?: number
  averageSalary?: string
  industryPartners?: string[]
  accreditation?: string
  transferCredits?: boolean
}

export function DiplomaSchema({
  name,
  description,
  provider = {
    name: 'Africa Digital Media Institute',
    url: 'https://admi.africa'
  },
  url,
  image,
  awardLevel,
  // Remove creditHours parameter as it's not used in schema
  tuitionFees,
  duration,
  deliveryMode,
  learningOutcomes = [],
  careerOptions = [],
  intakes,
  applicationDeadline,
  courseCode,
  prerequisites = [],
  employmentRate,
  industryPartners = [],
  accreditation
}: Omit<DiplomaProps, 'creditHours'>) {
  // Ensure description is never empty
  const diplomaDescription =
    description ||
    `Earn a ${name} diploma at Africa Digital Media Institute. 2-year comprehensive program with 85% employment rate and industry placement guarantee.`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description: diplomaDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: provider.name,
      url: provider.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
        postOfficeBoxNumber: 'P.O. Box 35447',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi',
        postalCode: '00100',
        addressCountry: 'KE'
      }
    },
    url,
    ...(image && { image }),
    ...(courseCode && { courseCode }),
    educationalLevel: 'Diploma',
    // Remove courseMode from main Course schema as it's not recognized by schema.org
    // This property is correctly placed in hasCourseInstance below
    timeRequired: duration === '2 years' ? 'P2Y' : duration,
    // Remove creditHours as it's not recognized by schema.org for Course type
    ...(prerequisites.length > 0 && { coursePrerequisites: prerequisites }),
    ...(learningOutcomes.length > 0 && {
      teaches: learningOutcomes.map((outcome) => ({
        '@type': 'DefinedTerm',
        name: outcome
      }))
    }),
    ...(careerOptions.length > 0 && {
      occupationalCredentialAwarded: careerOptions.map((career) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: career
      }))
    }),
    offers: {
      '@type': 'Offer',
      category: 'Educational',
      ...(tuitionFees && { price: tuitionFees, priceCurrency: 'KES' }),
      ...(applicationDeadline && { validThrough: applicationDeadline }),
      availability: 'https://schema.org/InStock'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: deliveryMode?.toLowerCase().includes('online')
        ? 'online'
        : deliveryMode?.toLowerCase().includes('hybrid')
          ? 'blended'
          : 'onsite',
      ...(intakes && { startDate: intakes }),
      duration: duration === '2 years' ? 'P2Y' : duration,
      courseWorkload: convertToISO8601Duration(duration),
      courseSchedule: {
        '@type': 'Schedule',
        scheduleTimezone: 'Africa/Nairobi',
        repeatFrequency: 'Weekly',
        repeatCount: 104,
        byDay: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday'
        ]
      },
      // Remove instructor as Organization is not a valid target type for instructor property
      location: {
        '@type': 'Place',
        name: 'Africa Digital Media Institute',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
          postOfficeBoxNumber: 'P.O. Box 35447',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi',
          postalCode: '00100',
          addressCountry: 'KE'
        }
      }
    },
    // Remove startDate from main Course schema as it's not recognized by schema.org
    // This property is correctly placed in hasCourseInstance above
    ...(awardLevel && { educationalCredentialAwarded: awardLevel }),
    inLanguage: 'en',
    isAccessibleForFree: false,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student'
    },
    ...(employmentRate && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: employmentRate / 20, // Convert percentage to 5-star scale
        bestRating: 5,
        worstRating: 1,
        ratingCount: 100
      }
    }),
    ...(accreditation && {
      accreditedBy: {
        '@type': 'Organization',
        name: accreditation
      }
    }),
    ...(industryPartners.length > 0 && {
      sponsor: industryPartners.map((partner) => ({
        '@type': 'Organization',
        name: partner
      }))
    })
  }

  return (
    <Script
      id="diploma-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function CourseSchema({
  name,
  description,
  provider = {
    name: 'Africa Digital Media Institute',
    url: 'https://admi.africa'
  },
  url,
  image,
  awardLevel,
  // Remove creditHours parameter as it's not used in schema
  tuitionFees,
  duration,
  deliveryMode,
  educationalLevel,
  learningOutcomes = [],
  careerOptions = [],
  intakes,
  applicationDeadline,
  courseCode,
  prerequisites = []
}: Omit<CourseProps, 'creditHours'>) {
  // Ensure description is never empty
  const courseDescription =
    description ||
    `Learn ${name} at Africa Digital Media Institute. ${awardLevel || 'Professional'} level course with practical training and industry placement.`

  // Parse tuition fees for offers
  const parseTuitionFees = (fees: string | undefined) => {
    if (!fees) return { price: '0', currency: 'KES' }
    const match = fees.match(/(\d+(?:,\d+)*)/)
    return {
      price: match ? match[1].replace(/,/g, '') : '0',
      currency: 'KES'
    }
  }

  const feeInfo = parseTuitionFees(tuitionFees)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description: courseDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: provider.name,
      url: provider.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
        postOfficeBoxNumber: 'P.O. Box 35447',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi',
        postalCode: '00100',
        addressCountry: {
          '@type': 'Country',
          name: 'KE'
        }
      }
    },
    url,
    ...(image && { image }),
    ...(courseCode && { courseCode }),
    ...(educationalLevel && { educationalLevel }),
    // Remove creditHours as it's not recognized by schema.org for Course type
    ...(prerequisites.length > 0 && { coursePrerequisites: prerequisites }),
    ...(learningOutcomes.length > 0 && {
      teaches: learningOutcomes.map((outcome) => ({
        '@type': 'DefinedTerm',
        name: outcome
      }))
    }),
    offers: {
      '@type': 'Offer',
      category: 'Educational',
      price: feeInfo.price,
      priceCurrency: feeInfo.currency,
      ...(applicationDeadline && { validThrough: applicationDeadline }),
      availability: 'https://schema.org/InStock'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: deliveryMode?.toLowerCase().includes('online')
        ? 'online'
        : deliveryMode?.toLowerCase().includes('hybrid')
          ? 'blended'
          : 'onsite',
      ...(intakes && { startDate: intakes }),
      ...(duration && { duration: duration }),
      courseWorkload: convertToISO8601Duration(duration),
      courseSchedule: {
        '@type': 'Schedule',
        scheduleTimezone: 'Africa/Nairobi',
        repeatFrequency: 'Weekly',
        repeatCount: 104,
        byDay: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday'
        ]
      },
      // Remove instructor as Organization is not a valid target type for instructor property
      location: {
        '@type': 'Place',
        name: 'Africa Digital Media Institute',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
          postOfficeBoxNumber: 'P.O. Box 35447',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi',
          postalCode: '00100',
          addressCountry: 'KE'
        }
      }
    },
    ...(duration && { timeRequired: duration }),
    // Remove courseMode and startDate from main Course schema as they're not recognized by schema.org
    // These properties are correctly placed in hasCourseInstance above
    ...(awardLevel && { educationalCredentialAwarded: awardLevel }),
    ...(careerOptions.length > 0 && {
      occupationalCredentialAwarded: careerOptions.map((career) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: career
      }))
    }),
    inLanguage: 'en-KE',
    isAccessibleForFree: false,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student'
    }
  }

  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Video Schema for Course Previews
interface VideoProps {
  name: string
  description: string
  thumbnailUrl: string
  contentUrl: string
  uploadDate: string
  duration?: string
  embedUrl?: string
  publisher?: {
    name: string
    logo: string
  }
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  uploadDate,
  duration,
  embedUrl,
  publisher = {
    name: 'Africa Digital Media Institute',
    logo: 'https://admi.africa/logo.png'
  }
}: VideoProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    contentUrl,
    embedUrl,
    uploadDate,
    ...(duration && { duration }),
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo
      }
    }
  }

  return (
    <Script
      id="video-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Testimonial/Review Schema for Student Success Stories
interface TestimonialProps {
  author: {
    name: string
    image?: string
    jobTitle?: string
    worksFor?: string
  }
  reviewBody: string
  reviewRating: number
  datePublished?: string
  about?: {
    name: string
    type: string
  }
}

export function TestimonialSchema({
  author,
  reviewBody,
  reviewRating,
  datePublished,
  about = {
    name: 'Africa Digital Media Institute',
    type: 'EducationalOrganization'
  }
}: TestimonialProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.image && { image: author.image }),
      ...(author.jobTitle && { jobTitle: author.jobTitle }),
      ...(author.worksFor && {
        worksFor: {
          '@type': 'Organization',
          name: author.worksFor
        }
      })
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating,
      bestRating: 5,
      worstRating: 1
    },
    ...(datePublished && { datePublished }),
    itemReviewed: {
      '@type': about.type,
      name: about.name
    }
  }

  return (
    <Script
      id="testimonial-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Enhanced Local Business Schema for Multiple Cities
interface MultiCityLocalBusinessProps {
  city: string
  country: string
  region: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  serviceArea?: string[]
  courses?: string[]
}

// Helper function to convert duration to ISO 8601 format
const convertToISO8601Duration = (duration: string | undefined): string => {
  if (!duration) return 'P2Y'

  // Convert common duration formats to ISO 8601
  const durationLower = duration.toLowerCase()

  if (durationLower.includes('2 year') || durationLower.includes('diploma')) {
    return 'P2Y'
  }
  if (durationLower.includes('1 year')) {
    return 'P1Y'
  }
  if (durationLower.includes('6 month')) {
    return 'P6M'
  }
  if (durationLower.includes('3 month')) {
    return 'P3M'
  }
  if (durationLower.includes('4-5 term') || durationLower.includes('certificate')) {
    return 'P6M' // Assume 6 months for certificate programs
  }

  // If already in ISO format, return as is
  if (duration.match(/^P(\d+Y)?(\d+M)?(\d+D)?$/)) {
    return duration
  }

  // Default fallback
  return 'P2Y'
}

// Course descriptions for schema markup
const getCourseDescription = (courseName: string): string => {
  const courseDescriptions: Record<string, string> = {
    'Film and Television Production Diploma':
      'Comprehensive 2-year diploma program covering cinematography, directing, editing, and production management for film and television industry.',
    'Animation & Motion Graphics Diploma':
      '2-year diploma program in 2D/3D animation, motion graphics, visual effects, and character animation for entertainment and advertising industries.',
    'Graphic Design Diploma':
      '2-year diploma program in visual communication, brand design, digital graphics, and creative design for print and digital media.',
    'Music Production Diploma':
      '2-year diploma program in music production, audio engineering, sound design, and music technology for recording and entertainment industries.',
    'Sound Engineering Diploma':
      '2-year diploma program in audio engineering, live sound, studio recording, and broadcast audio for music and media industries.',
    'Digital Content Creation Certificate':
      'Professional certificate program in digital content creation, social media content, and multimedia production for digital marketing.',
    'Graphic Design Certificate':
      'Professional certificate program in graphic design fundamentals, digital design tools, and visual communication principles.',
    'Video Production Certificate':
      'Professional certificate program in video production, editing, and post-production for corporate and creative content.',
    'Photography Certificate':
      'Professional certificate program in digital photography, photo editing, and commercial photography techniques.',
    'Digital Marketing Certificate':
      'Professional certificate program in digital marketing strategies, social media marketing, and online brand management.',
    'Music Production and Sound Engineering Certificate':
      'Professional certificate program combining music production techniques with sound engineering fundamentals.'
  }

  return (
    courseDescriptions[courseName] ||
    `Professional training program in ${courseName.toLowerCase()} at Africa Digital Media Institute.`
  )
}

export function MultiCityLocalBusinessSchema({
  city,
  country,
  region,
  coordinates,
  serviceArea = [],
  courses = []
}: MultiCityLocalBusinessProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://admi.africa/${city.toLowerCase()}-campus`,
    name: `Africa Digital Media Institute - ${city} Campus`,
    alternateName: `ADMI ${city}`,
    description: `Leading Creative Media and Technology Training Institution in ${city}, ${country}. Offering diploma courses in film, animation, graphic design, audio production, and photography.`,
    url: 'https://admi.africa/',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: region,
      addressCountry: country
    },
    ...(coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }
    }),
    telephone: city === 'Nairobi' ? '+254 772 913 811' : '+254 772 913 811',
    email: 'info@admi.ac.ke',
    areaServed: serviceArea.length > 0 ? serviceArea : [city, region, country],
    // Remove serviceType as it's not recognized by schema.org for LocalBusiness
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ADMI Course Catalog',
      itemListElement: courses.map((course) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: course,
          description: getCourseDescription(course),
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Africa Digital Media Institute',
            url: 'https://admi.africa'
          },
          educationalLevel: course.includes('Diploma') ? 'Diploma' : 'Certificate',
          inLanguage: 'en-KE',
          isAccessibleForFree: false,
          audience: {
            '@type': 'EducationalAudience',
            educationalRole: 'student'
          }
        }
        // Remove position as it's not recognized by schema.org for Offer type
      }))
    },
    sameAs: [
      'https://www.facebook.com/ADMIAFRICA',
      'https://x.com/ADMIafrica',
      'https://www.instagram.com/admiafrica/',
      'https://www.linkedin.com/school/admiafrica/'
    ]
  }

  return (
    <Script
      id={`local-business-${city.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Add more structured data components as needed for other content types.
