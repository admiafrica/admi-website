// Course-specific SEO enhancements for high-priority diploma programs

export interface CourseSpecificSEO {
  keywords: string[]
  metaDescription: string
  localKeywords: string[]
  industryKeywords: string[]
  careerKeywords: string[]
  competitorKeywords: string[]
}

// Music Production Diploma SEO
export const MUSIC_PRODUCTION_SEO: CourseSpecificSEO = {
  keywords: [
    'music production diploma Kenya',
    'music technology course Nairobi',
    'audio engineering diploma Africa',
    'music production school Kenya',
    'sound engineering course Nairobi',
    'music producer training Kenya',
    'audio production diploma East Africa',
    'music technology Kenya',
    'recording studio course Nairobi',
    'music production certification Kenya'
  ],
  metaDescription:
    'Music Production & Technology Diploma in Kenya - 2-year program at ADMI Nairobi. Learn music production, audio engineering, music technology, mixing & mastering. Industry partnerships with top Kenyan studios & radio stations. 85% employment rate.',
  localKeywords: [
    'music production Nairobi',
    'audio engineering Kenya',
    'music producer Kenya',
    'sound engineering Nairobi',
    'recording studio Kenya',
    'music school Nairobi',
    'audio production Kenya',
    'music technology Nairobi',
    'music technology Kenya'
  ],
  industryKeywords: [
    'Afrobeats production',
    'Amapiano production',
    'Gengetone production',
    'Bongo Flava production',
    'African music production',
    'Kenyan music industry',
    'East African music',
    'African record labels',
    'Kenyan radio stations',
    'African music streaming'
  ],
  careerKeywords: [
    'music producer salary Kenya',
    'audio engineer jobs Kenya',
    'sound engineer career Kenya',
    'music production jobs Nairobi',
    'recording engineer Kenya',
    'live sound engineer Kenya',
    'music technology jobs Kenya',
    'audio post production Kenya'
  ],
  competitorKeywords: [
    'best music production school Kenya',
    'top audio engineering course Kenya',
    'music production diploma vs certificate',
    'ADMI vs other music schools Kenya',
    'professional music training Kenya'
  ]
}

// Film & TV Production Diploma SEO
export const FILM_TV_PRODUCTION_SEO: CourseSpecificSEO = {
  keywords: [
    'film production diploma Kenya',
    'film production schools Kenya',
    'film production school Nairobi',
    'film school Kenya',
    'video production diploma Africa',
    'cinematography course Kenya',
    'filmmaking school Nairobi',
    'TV production training Kenya',
    'film and television diploma East Africa',
    'video editing course Kenya'
  ],
  metaDescription:
    'Film & Television Production Diploma at top film production school in Nairobi, Kenya. 2-year program at ADMI. Learn filmmaking, cinematography, editing & directing. Partnerships with Kenyan TV stations & production companies. 85% employment rate.',
  localKeywords: [
    'film production Nairobi',
    'video production Kenya',
    'filmmaking Kenya',
    'cinematography Nairobi',
    'TV production Kenya',
    'film school Nairobi',
    'video editing Kenya',
    'film director Kenya',
    'film production schools Kenya'
  ],
  industryKeywords: [
    'Nollywood film industry',
    'Riverwood Kenya films',
    'Kenyan film industry',
    'African cinema',
    'East African films',
    'Kenyan TV stations',
    'African film production',
    'documentary filmmaking Kenya',
    'Kenyan media houses',
    'African television'
  ],
  careerKeywords: [
    'film director salary Kenya',
    'video editor jobs Kenya',
    'cinematographer career Kenya',
    'film production jobs Nairobi',
    'TV producer Kenya',
    'video production jobs Kenya',
    'film industry jobs Kenya',
    'media production careers Kenya'
  ],
  competitorKeywords: [
    'best film school Kenya',
    'top film production schools Kenya',
    'film production diploma vs certificate',
    'ADMI vs other film schools Kenya',
    'professional film training Kenya'
  ]
}

// Generate course-specific meta tags
export function generateCourseSpecificMeta(courseSlug: string) {
  let seoData: CourseSpecificSEO | null = null

  if (courseSlug.includes('music') || courseSlug.includes('audio')) {
    seoData = MUSIC_PRODUCTION_SEO
  } else if (courseSlug.includes('film') || courseSlug.includes('television') || courseSlug.includes('video')) {
    seoData = FILM_TV_PRODUCTION_SEO
  }

  if (!seoData) return null

  const allKeywords = [
    ...seoData.keywords,
    ...seoData.localKeywords,
    ...seoData.industryKeywords,
    ...seoData.careerKeywords
  ].join(', ')

  return {
    keywords: allKeywords,
    description: seoData.metaDescription,
    additionalMeta: {
      'course.type': 'diploma',
      'course.duration': '2 years',
      'course.location': 'Nairobi, Kenya',
      'course.industry': courseSlug.includes('music') ? 'Music & Audio' : 'Film & Television',
      'course.employment_rate': '85%',
      'course.target_market': 'Kenya, East Africa, Africa'
    }
  }
}

// Enhanced structured data for specific courses
export function generateEnhancedCourseSchema(courseSlug: string, _courseName: string, baseSchema: any) {
  const specificMeta = generateCourseSpecificMeta(courseSlug)
  if (!specificMeta) return baseSchema

  return {
    ...baseSchema,
    keywords: specificMeta.keywords,
    description: specificMeta.description,
    // Add industry-specific properties
    industry: specificMeta.additionalMeta['course.industry'],
    targetAudience: {
      '@type': 'PeopleAudience',
      geographicArea: {
        '@type': 'Place',
        name: 'Kenya, East Africa'
      },
      audienceType: courseSlug.includes('music')
        ? 'Aspiring music producers, audio engineers, musicians'
        : 'Aspiring filmmakers, video editors, cinematographers'
    },
    // Add employment outcomes
    employmentOutcome: {
      '@type': 'EmploymentOutcome',
      employmentRate: '85%',
      averageSalary: courseSlug.includes('music') ? 'KES 40,000 - 100,000 monthly' : 'KES 50,000 - 120,000 monthly'
    }
  }
}
