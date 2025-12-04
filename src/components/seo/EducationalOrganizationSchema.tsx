import React from 'react'

interface EducationalOrganizationSchemaProps {
  includePrograms?: boolean
}

export function EducationalOrganizationSchema({ includePrograms = true }: EducationalOrganizationSchemaProps) {
  const currentYear = new Date().getFullYear()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://admi.africa/#organization',
    name: 'Africa Digital Media Institute',
    alternateName: ['ADMI', 'Africa Digital Media Institute Kenya'],
    description:
      "Eastern Africa's premier creative media and technology training institution. ADMI offers diploma and certificate programs in film, animation, graphic design, music production, and digital content creation.",
    url: 'https://admi.africa',
    logo: 'https://admi.africa/logo.png',
    image: 'https://admi.africa/images/admi-campus.jpg',

    // Contact Information
    telephone: '+254 772 913 811',
    email: 'info@admi.africa',

    // Physical Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: '25 Caxton House 3rd Floor, Kenyatta Avenue',
      postOfficeBoxNumber: 'P.O. Box 35447',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi County',
      postalCode: '00100',
      addressCountry: {
        '@type': 'Country',
        name: 'Kenya'
      }
    },

    // Geographic Coverage
    areaServed: [
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

    // Accreditations and Recognition
    accreditedBy: [
      {
        '@type': 'Organization',
        name: 'Pearson Assured',
        url: 'https://www.pearson.com'
      },
      {
        '@type': 'Organization',
        name: 'Woolf University',
        url: 'https://woolf.university'
      }
    ],

    // Educational Focus
    educationalCredentialAwarded: [
      'Diploma in Film and Television Production',
      'Diploma in Animation & Motion Graphics',
      'Diploma in Graphic Design',
      'Diploma in Music Production',
      'Diploma in Sound Engineering',
      'Professional Certificate in Digital Content Creation',
      'Professional Certificate in Video Production',
      'Professional Certificate in Photography',
      'Professional Certificate in Digital Marketing',
      'Professional Certificate in Graphic Design'
    ],

    // Institution Type and Level
    institutionType: 'Private',
    educationalLevel: ['Diploma', 'Certificate'],

    // Academic Calendar
    academicCalendar: {
      '@type': 'EducationalEvent',
      name: 'Academic Year',
      description: 'Three intakes per year: January, May, and September',
      startDate: `${currentYear}-01-15`,
      endDate: `${currentYear}-12-15`
    },

    // Programs and Departments
    ...(includePrograms && {
      department: [
        {
          '@type': 'EducationalOrganization',
          name: 'Film and Television Production',
          description: 'Comprehensive training in cinematography, editing, directing, and production management'
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Animation and Motion Graphics',
          description: '2D and 3D animation, visual effects, and motion graphics design'
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Graphic Design and Visual Communication',
          description: 'Brand identity, print design, digital graphics, and visual storytelling'
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Audio Production and Sound Engineering',
          description: 'Music production, sound design, recording, and audio post-production'
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Digital Content Creation',
          description: 'Social media content, digital marketing, and multimedia production'
        }
      ]
    }),

    // Industry Partnerships
    partner: [
      {
        '@type': 'Organization',
        name: 'Safaricom',
        description: 'Leading telecommunications company in Kenya'
      },
      {
        '@type': 'Organization',
        name: 'Nation Media Group',
        description: "East Africa's largest media house"
      },
      {
        '@type': 'Organization',
        name: 'Standard Group',
        description: 'Leading media and communications company'
      },
      {
        '@type': 'Organization',
        name: 'Royal Media Services',
        description: "Kenya's largest radio and television network"
      },
      {
        '@type': 'Organization',
        name: 'Rubika',
        description: 'Top-ranked animation, game, and industrial design school'
      }
    ],

    // Alumni and Employment Outcomes
    alumni: {
      '@type': 'QuantitativeValue',
      value: '2000+',
      description: 'Graduates working in creative industries across Africa'
    },

    // Employment Statistics
    employmentRate: {
      '@type': 'QuantitativeValue',
      value: 85,
      unitText: 'percent',
      description: 'Graduate employment rate within 6 months'
    },

    // Social Media Presence
    sameAs: [
      'https://www.facebook.com/ADMIAFRICA',
      'https://x.com/ADMIafrica',
      'https://www.instagram.com/admiafrica/',
      'https://www.linkedin.com/school/admiafrica/',
      'https://www.tiktok.com/@admiafrica'
    ],

    // Facilities and Resources
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Professional Film Studios',
        description: 'State-of-the-art film production facilities with professional lighting and equipment'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Audio Recording Studios',
        description: 'Professional-grade recording studios with industry-standard equipment'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Computer Labs',
        description: 'Modern computer labs with latest creative software and high-performance workstations'
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Animation Suites',
        description: 'Specialized animation workstations with professional graphics tablets and software'
      }
    ],

    // Awards and Recognition
    award: [
      'Best Creative Media Training Institution East Africa 2023',
      'Excellence in Digital Education Award 2022',
      'Innovation in Creative Training Award 2021'
    ],

    // Founded
    foundingDate: '2012',

    // Mission and Values
    mission:
      "To be Eastern Africa's premier creative media and technology training institution, empowering the next generation of creative professionals.",

    // Student Services
    studentServices: [
      'Career Placement Support',
      'Industry Internship Programs',
      'Portfolio Development',
      'Alumni Network Access',
      'Equipment Rental Services',
      'Student Accommodation Assistance'
    ]
  }

  return (
    <script
      id="educational-organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
