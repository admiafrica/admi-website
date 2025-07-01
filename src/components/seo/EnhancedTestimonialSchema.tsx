import React from 'react'
import Script from 'next/script'

interface EnhancedTestimonialSchemaProps {
  author: {
    name: string
    image?: string
    jobTitle?: string
    worksFor?: string
    graduationDate?: string
    program?: string
    currentSalary?: string
    careerProgression?: string
    linkedInProfile?: string
    location?: string
  }
  reviewBody: string
  reviewRating: number
  datePublished?: string
  programCompleted?: {
    name: string
    duration: string
    graduationYear: string
    specialization?: string
  }
  careerOutcome?: {
    employmentStatus: 'employed' | 'self-employed' | 'entrepreneur' | 'further-education'
    timeToEmployment?: string // e.g., "2 months after graduation"
    salaryIncrease?: string // e.g., "150% salary increase"
    industryRole?: string
    companyType?: string
  }
  skillsGained?: string[]
  recommendationScore?: number // 1-10 scale
  wouldRecommend?: boolean
  helpfulVotes?: number
  verifiedGraduate?: boolean
}

export function EnhancedTestimonialSchema({
  author,
  reviewBody,
  reviewRating,
  datePublished,
  programCompleted,
  careerOutcome,
  skillsGained = [],
  recommendationScore,
  wouldRecommend = true,
  helpfulVotes = 0,
  verifiedGraduate = true
}: EnhancedTestimonialSchemaProps) {
  const currentDate = new Date().toISOString()
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `https://admi.africa/testimonials/${author.name.replace(/\s+/g, '-').toLowerCase()}`,
    
    // Review content
    reviewBody: reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating,
      bestRating: 5,
      worstRating: 1
    },
    
    // Author information (enhanced)
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.image && { image: author.image }),
      ...(author.jobTitle && { jobTitle: author.jobTitle }),
      ...(author.location && { address: author.location }),
      ...(author.linkedInProfile && { sameAs: author.linkedInProfile }),
      ...(author.worksFor && {
        worksFor: {
          '@type': 'Organization',
          name: author.worksFor
        }
      }),
      // Educational background
      ...(programCompleted && {
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa',
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: programCompleted.name,
            dateCreated: programCompleted.graduationYear,
            ...(programCompleted.specialization && {
              educationalCredentialAwarded: programCompleted.specialization
            })
          }
        }
      })
    },

    // What's being reviewed
    itemReviewed: {
      '@type': 'EducationalOrganization',
      name: 'Africa Digital Media Institute',
      url: 'https://admi.africa',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi County',
        postalCode: '00100',
        addressCountry: 'KE'
      },
      // Aggregate rating data
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.8,
        reviewCount: 150,
        bestRating: 5,
        worstRating: 1
      },
      // Programs offered
      ...(programCompleted && {
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'ADMI Programs',
          itemListElement: {
            '@type': 'EducationalOccupationalProgram',
            name: programCompleted.name,
            description: `${programCompleted.duration} program in ${programCompleted.name}`,
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Africa Digital Media Institute'
            }
          }
        }
      })
    },

    // Review metadata
    datePublished: datePublished || currentDate,
    ...(helpfulVotes > 0 && {
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: helpfulVotes
      }
    }),

    // Additional review properties
    ...(recommendationScore && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Recommendation Score',
          value: recommendationScore,
          maxValue: 10,
          description: 'How likely to recommend ADMI to others (1-10 scale)'
        }
      ]
    }),

    // Career outcome data (as additional context)
    ...(careerOutcome && {
      about: [
        {
          '@type': 'Thing',
          name: 'Career Outcomes',
          description: `Graduate achieved ${careerOutcome.employmentStatus} status${careerOutcome.timeToEmployment ? ` within ${careerOutcome.timeToEmployment}` : ''}`,
          additionalProperty: [
            ...(careerOutcome.salaryIncrease ? [{
              '@type': 'PropertyValue',
              name: 'Salary Improvement',
              value: careerOutcome.salaryIncrease
            }] : []),
            ...(careerOutcome.industryRole ? [{
              '@type': 'PropertyValue',
              name: 'Industry Role',
              value: careerOutcome.industryRole
            }] : []),
            ...(careerOutcome.companyType ? [{
              '@type': 'PropertyValue',
              name: 'Company Type',
              value: careerOutcome.companyType
            }] : [])
          ]
        }
      ]
    }),

    // Skills and competencies gained
    ...(skillsGained.length > 0 && {
      teaches: skillsGained.join(', ')
    }),

    // Verification status
    ...(verifiedGraduate && {
      additionalType: 'VerifiedReview'
    }),

    // Review helpfulness
    positiveNotes: wouldRecommend ? 'Graduate recommends ADMI to others' : undefined,

    // Geographic relevance
    spatialCoverage: {
      '@type': 'Place',
      name: 'Kenya',
      containedInPlace: {
        '@type': 'Place',
        name: 'East Africa'
      }
    },

    // Industry context
    industry: 'Creative Media and Technology Education',
    
    // Content language
    inLanguage: 'en-KE'
  }

  return (
    <Script
      id={`enhanced-testimonial-${author.name.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Aggregate testimonial schema for multiple reviews
interface AggregateTestimonialSchemaProps {
  testimonials: EnhancedTestimonialSchemaProps[]
  organizationName?: string
}

export function AggregateTestimonialSchema({
  testimonials,
  organizationName = 'Africa Digital Media Institute'
}: AggregateTestimonialSchemaProps) {
  const averageRating = testimonials.reduce((sum, t) => sum + t.reviewRating, 0) / testimonials.length
  const totalReviews = testimonials.length

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: organizationName,
    url: 'https://admi.africa',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Math.round(averageRating * 10) / 10,
      reviewCount: totalReviews,
      bestRating: 5,
      worstRating: 1
    },
    review: testimonials.map((testimonial, index) => ({
      '@type': 'Review',
      '@id': `https://admi.africa/testimonials/review-${index + 1}`,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.reviewRating
      },
      author: {
        '@type': 'Person',
        name: testimonial.author.name
      },
      reviewBody: testimonial.reviewBody,
      datePublished: testimonial.datePublished || new Date().toISOString()
    }))
  }

  return (
    <Script
      id="aggregate-testimonial-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
