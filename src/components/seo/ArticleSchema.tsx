import React from 'react'
import Script from 'next/script'

interface ArticleSchemaProps {
  title: string
  description: string
  content?: string
  author?: {
    name: string
    title?: string
    bio?: string
  }
  publishedDate: string
  modifiedDate?: string
  category: string
  tags?: string[]
  image?: string
  url: string
  readingTime?: number
  wordCount?: number
  isEducational?: boolean
}

export function ArticleSchema({
  title,
  description,
  content,
  author = {
    name: 'ADMI Editorial Team',
    title: 'Creative Media Educators',
    bio: 'Expert educators and industry professionals at Africa Digital Media Institute'
  },
  publishedDate,
  modifiedDate,
  category,
  tags = [],
  image,
  url,
  readingTime,
  wordCount,
  isEducational = true
}: ArticleSchemaProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': isEducational ? 'EducationalArticle' : 'Article',
    '@id': url,
    headline: title,
    description: description,
    ...(content && { articleBody: content }),
    // Author information
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.title && { jobTitle: author.title }),
      ...(author.bio && { description: author.bio }),
      affiliation: {
        '@type': 'EducationalOrganization',
        name: 'Africa Digital Media Institute',
        url: 'https://admi.africa'
      }
    },

    // Publisher information
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Africa Digital Media Institute',
      url: 'https://admi.africa',
      logo: {
        '@type': 'ImageObject',
        url: 'https://admi.africa/logo.png',
        width: 200,
        height: 60
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi County',
        postalCode: '00100',
        addressCountry: 'KE'
      },
      sameAs: [
        'https://www.facebook.com/ADMIAFRICA',
        'https://x.com/ADMIafrica',
        'https://www.instagram.com/admiafrica/',
        'https://www.linkedin.com/school/admiafrica/',
        'https://www.tiktok.com/@admiafrica'
      ]
    },

    // Dates
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,

    // Content categorization
    articleSection: category,
    ...(tags.length > 0 && { keywords: tags.join(', ') }),

    // Image
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
        width: 1200,
        height: 630
      }
    }),

    // Content metrics
    ...(readingTime && { timeRequired: `PT${readingTime}M` }),
    ...(wordCount && { wordCount: wordCount }),

    // Educational content specific properties
    ...(isEducational && {
      educationalLevel: 'Higher Education',
      educationalUse: 'Professional Development',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: ['student', 'professional'],
        audienceType: 'Creative Media Students and Professionals'
      },
      teaches: category,
      learningResourceType: 'Article',
      isAccessibleForFree: true,
      inLanguage: 'en-KE'
    }),

    // Content quality indicators
    isPartOf: {
      '@type': 'Website',
      name: 'ADMI Resources',
      url: 'https://admi.africa/resources'
    },

    // Geographic relevance
    spatialCoverage: [
      {
        '@type': 'Country',
        name: 'Kenya'
      },
      {
        '@type': 'Place',
        name: 'East Africa'
      },
      {
        '@type': 'Place',
        name: 'Africa'
      }
    ],

    // Industry relevance
    about: [
      {
        '@type': 'Thing',
        name: 'Creative Media Education',
        description: 'Professional training in creative media and technology'
      },
      {
        '@type': 'Thing',
        name: category,
        description: `Educational content about ${category.toLowerCase()}`
      }
    ],

    // Content licensing
    license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    copyrightHolder: {
      '@type': 'EducationalOrganization',
      name: 'Africa Digital Media Institute'
    },
    copyrightYear: new Date(publishedDate).getFullYear(),

    // Interaction statistics (can be updated dynamically)
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ReadAction',
        userInteractionCount: 0
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ShareAction',
        userInteractionCount: 0
      }
    ],

    // Content accessibility
    accessibilityFeature: ['structuredNavigation', 'readingOrder', 'alternativeText'],
    accessibilityHazard: 'none',
    accessibilityControl: ['fullKeyboardControl', 'fullMouseControl', 'fullTouchControl'],

    // Content format
    encodingFormat: 'text/html',
    genre: isEducational ? 'Educational Content' : 'Informational Content',

    // Related content
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }

  return (
    <Script
      id={`article-schema-${title.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Specialized component for blog posts
export function BlogPostSchema(props: Omit<ArticleSchemaProps, 'isEducational'>) {
  return <ArticleSchema {...props} isEducational={false} />
}

// Specialized component for educational resources
export function EducationalResourceSchema(props: Omit<ArticleSchemaProps, 'isEducational'>) {
  return <ArticleSchema {...props} isEducational={true} />
}
