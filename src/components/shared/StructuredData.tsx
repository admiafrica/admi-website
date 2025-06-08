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
      streetAddress: 'Caxton House, Standard Street',
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
    streetAddress: 'Caxton House, Standard Street',
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
  creditHours,
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
}: DiplomaProps) {
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
        streetAddress: 'Caxton House, Standard Street',
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
    courseMode: deliveryMode?.toLowerCase().includes('online')
      ? 'online'
      : deliveryMode?.toLowerCase().includes('hybrid')
        ? 'blended'
        : 'onsite',
    timeRequired: duration === '2 years' ? 'P2Y' : duration,
    ...(creditHours && { creditHours: creditHours.toString() }),
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
      instructor: {
        '@type': 'Organization',
        name: provider.name
      },
      location: {
        '@type': 'Place',
        name: 'Africa Digital Media Institute',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Caxton House, Standard Street',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi',
          postalCode: '00100',
          addressCountry: 'KE'
        }
      }
    },
    ...(intakes && { startDate: intakes }),
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
  creditHours,
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
}: CourseProps) {
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
        streetAddress: 'Caxton House, Standard Street',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi',
        postalCode: '00100',
        addressCountry: 'KE'
      }
    },
    url,
    ...(image && { image }),
    ...(courseCode && { courseCode }),
    ...(educationalLevel && { educationalLevel }),
    ...(creditHours && { creditHours: creditHours.toString() }),
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
      instructor: {
        '@type': 'Organization',
        name: provider.name
      },
      location: {
        '@type': 'Place',
        name: 'Africa Digital Media Institute',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Caxton House, Standard Street',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi',
          postalCode: '00100',
          addressCountry: 'KE'
        }
      }
    },
    ...(duration && { timeRequired: duration }),
    ...(deliveryMode && {
      courseMode: deliveryMode.toLowerCase().includes('online')
        ? 'online'
        : deliveryMode.toLowerCase().includes('hybrid')
          ? 'blended'
          : 'onsite'
    }),
    ...(intakes && { startDate: intakes }),
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
    url: `https://admi.africa/${city.toLowerCase()}`,
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
    serviceType: 'Higher Education',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ADMI Course Catalog',
      itemListElement: courses.map((course, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: course
        },
        position: index + 1
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
