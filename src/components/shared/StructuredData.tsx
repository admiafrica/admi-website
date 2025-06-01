import React from 'react'
import Script from 'next/script'

interface OrganizationProps {
  name?: string
  logo?: string
  url?: string
  sameAs?: string[]
}

export function OrganizationSchema({
  name = 'Africa Digital Media Institute',
  logo = 'https://admi.africa/logo.png',
  url = 'https://admi.africa',
  sameAs = [
    'https://www.facebook.com/africadigitalmediainstitute',
    'https://twitter.com/admi_ke',
    'https://www.instagram.com/admi_ke/',
    'https://www.linkedin.com/school/africa-digital-media-institute/'
  ]
}: OrganizationProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    logo,
    url,
    sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Caxton House, Standard Street',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE'
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
  openingHours = [
    'Monday-Friday 08:00-17:00',
    'Saturday 09:00-13:00'
  ]
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
    openingHoursSpecification: openingHours.map(hours => {
      const [days, time] = hours.split(' ');
      const [opens, closes] = time.split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.split('-').map(day => `https://schema.org/${day}`),
        opens,
        closes
      };
    })
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
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
  const authorData = typeof author === 'string'
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
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
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
      teaches: learningOutcomes.map(outcome => ({
        '@type': 'DefinedTerm',
        name: outcome
      }))
    }),
    offers: {
      '@type': 'Offer',
      category: 'Educational',
      ...(tuitionFees && { price: tuitionFees, priceCurrency: 'KES' }),
      ...(applicationDeadline && { validThrough: applicationDeadline }),
      availability: 'https://schema.org/InStock'
    },
    ...(duration && { timeRequired: duration }),
    ...(deliveryMode && {
      courseMode: deliveryMode.toLowerCase().includes('online') ? 'online' :
                  deliveryMode.toLowerCase().includes('hybrid') ? 'blended' : 'onsite'
    }),
    ...(intakes && { startDate: intakes }),
    ...(awardLevel && { educationalCredentialAwarded: awardLevel }),
    ...(careerOptions.length > 0 && {
      occupationalCredentialAwarded: careerOptions.map(career => ({
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

// Add more structured data components as needed for other content types.
