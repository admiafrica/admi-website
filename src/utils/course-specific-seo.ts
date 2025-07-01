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

// Digital Marketing Diploma SEO - HIGH PRIORITY
export const DIGITAL_MARKETING_SEO: CourseSpecificSEO = {
  keywords: [
    'digital marketing diploma Kenya',
    'digital marketing course Kenya',
    'digital marketing schools in Kenya',
    'digital marketing course Nairobi',
    'digital marketing schools in Nairobi',
    'best digital marketing schools in Kenya',
    'digital marketing institute Kenya',
    'digital marketing training Kenya',
    'online marketing course Kenya',
    'social media marketing course Kenya'
  ],
  metaDescription:
    'Digital Marketing Diploma in Kenya - Top-rated 2-year program at ADMI. Learn SEO, social media, Google Ads, analytics & content marketing. Flexible payment plans from KES 60,000/semester. Industry certifications included. Apply now!',
  localKeywords: [
    'digital marketing Nairobi',
    'digital marketing Kenya',
    'social media marketing Kenya',
    'SEO training Kenya',
    'Google Ads training Kenya',
    'digital marketing agency Kenya',
    'content marketing Kenya',
    'email marketing Kenya',
    'digital marketing East Africa'
  ],
  industryKeywords: [
    'Facebook marketing Kenya',
    'Instagram marketing Kenya',
    'LinkedIn marketing Kenya',
    'TikTok marketing Kenya',
    'YouTube marketing Kenya',
    'Google My Business Kenya',
    'Kenya digital economy',
    'e-commerce Kenya',
    'digital transformation Kenya'
  ],
  careerKeywords: [
    'digital marketing jobs Kenya',
    'digital marketer salary Kenya',
    'social media manager jobs Kenya',
    'SEO specialist Kenya',
    'content creator jobs Kenya',
    'digital marketing career Kenya',
    'marketing jobs Nairobi',
    'remote digital marketing jobs'
  ],
  competitorKeywords: [
    'ADMI vs Moringa School',
    'best digital marketing training Kenya',
    'digital marketing course fees Kenya',
    'digital marketing diploma vs certificate',
    'top marketing schools Kenya'
  ]
}

// Graphic Design Diploma SEO - HIGH PRIORITY
export const GRAPHIC_DESIGN_SEO: CourseSpecificSEO = {
  keywords: [
    'graphic design diploma Kenya',
    'graphic design schools in Kenya',
    'graphic design schools in Nairobi',
    'graphic design courses Kenya',
    'graphic design courses Nairobi',
    'diploma in graphic design requirements',
    'best graphic design schools Kenya',
    'graphic design colleges Kenya',
    'graphic design training Kenya',
    'graphic design course fees Kenya'
  ],
  metaDescription:
    'Diploma in Graphic Design Kenya - 2-year program at ADMI starting from KES 50,000/semester. Learn Adobe Creative Suite, UI/UX, branding & portfolio development. Meet diploma requirements: KCSE C- or equivalent. Apply for 2025 intake!',
  localKeywords: [
    'graphic designer Kenya',
    'graphic design Nairobi',
    'logo design Kenya',
    'brand design Kenya',
    'UI UX design Kenya',
    'web design Kenya',
    'print design Kenya',
    'packaging design Kenya',
    'graphic design services Kenya'
  ],
  industryKeywords: [
    'Adobe Photoshop training Kenya',
    'Adobe Illustrator course Kenya',
    'Adobe InDesign Kenya',
    'Figma training Kenya',
    'creative design Kenya',
    'visual communication Kenya',
    'brand identity Kenya',
    'design thinking Kenya',
    'portfolio development Kenya'
  ],
  careerKeywords: [
    'graphic designer jobs Kenya',
    'graphic designer salary Kenya',
    'UI UX designer jobs Kenya',
    'creative director Kenya',
    'art director jobs Kenya',
    'freelance graphic design Kenya',
    'design careers Kenya',
    'visual designer Kenya'
  ],
  competitorKeywords: [
    'ADMI vs Shang Tao',
    'best graphic design school Nairobi',
    'graphic design diploma cost Kenya',
    'graphic design course comparison',
    'top design schools Kenya'
  ]
}

// Animation & VFX Diploma SEO
export const ANIMATION_VFX_SEO: CourseSpecificSEO = {
  keywords: [
    'animation diploma Kenya',
    'animation courses Kenya',
    'animation schools Kenya',
    'VFX course Kenya',
    'motion graphics course Kenya',
    '3D animation Kenya',
    'animation training Nairobi',
    'visual effects diploma Kenya',
    'motion design school Kenya',
    'animation and multimedia courses'
  ],
  metaDescription:
    'Animation & Motion Graphics Diploma Kenya - 2-year program at ADMI. Learn 2D/3D animation, VFX, motion design & character animation. Industry-standard software training. KES 70,000/semester. Limited seats for 2025!',
  localKeywords: [
    'animator Kenya',
    'motion designer Kenya',
    'VFX artist Kenya',
    '3D artist Kenya',
    'animation studio Kenya',
    'motion graphics Nairobi',
    'character animation Kenya',
    'visual effects Kenya',
    'animation company Kenya'
  ],
  industryKeywords: [
    'Maya training Kenya',
    'Blender course Kenya',
    'After Effects training Kenya',
    'Cinema 4D Kenya',
    'animation industry Kenya',
    'game design Kenya',
    'animated films Kenya',
    'motion design trends',
    'VFX industry Africa'
  ],
  careerKeywords: [
    'animator jobs Kenya',
    'motion designer salary Kenya',
    'VFX artist jobs Kenya',
    '3D animator career Kenya',
    'animation studio jobs',
    'freelance animator Kenya',
    'motion graphics jobs',
    'animation careers Africa'
  ],
  competitorKeywords: [
    'best animation school Kenya',
    'animation diploma vs degree',
    'ADMI animation program',
    'top VFX schools Africa',
    'animation course fees Kenya'
  ]
}

// Photography Certificate SEO
export const PHOTOGRAPHY_SEO: CourseSpecificSEO = {
  keywords: [
    'photography courses Kenya',
    'photography school Kenya',
    'photography courses Nairobi',
    'photography schools in Nairobi',
    'photography certificate Kenya',
    'photography training Kenya',
    'professional photography course',
    'photography classes Kenya',
    'camera course Kenya',
    'photography workshop Kenya'
  ],
  metaDescription:
    'Photography Certificate Course Kenya - 6-month program at ADMI for KES 80,000. Learn camera techniques, lighting, editing & studio photography. Professional equipment provided. Start your photography career today!',
  localKeywords: [
    'photographer Kenya',
    'photography Nairobi',
    'wedding photographer Kenya',
    'portrait photography Kenya',
    'event photography Kenya',
    'studio photography Kenya',
    'fashion photography Kenya',
    'commercial photography Kenya',
    'photography services Kenya'
  ],
  industryKeywords: [
    'DSLR training Kenya',
    'Lightroom course Kenya',
    'Photoshop for photographers',
    'studio lighting Kenya',
    'photography business Kenya',
    'photo editing Kenya',
    'photography equipment Kenya',
    'photography trends Kenya',
    'social media photography'
  ],
  careerKeywords: [
    'photographer jobs Kenya',
    'photographer salary Kenya',
    'freelance photography Kenya',
    'photography business Kenya',
    'photo editor jobs Kenya',
    'photography careers',
    'event photographer Kenya',
    'photography income Kenya'
  ],
  competitorKeywords: [
    'best photography school Kenya',
    'photography course comparison',
    'ADMI photography program',
    'photography training cost',
    'professional photography Kenya'
  ]
}

// Enhanced structured data for specific courses
export function generateEnhancedCourseSchema(courseSlug: string, _courseName: string, baseSchema: any) {
  const specificMeta = generateCourseSpecificMeta(courseSlug)
  if (!specificMeta) return baseSchema

  const feeMapping: { [key: string]: string } = {
    'digital-marketing': 'KES 60,000 - 120,000 yearly',
    'graphic-design': 'KES 50,000 - 100,000 yearly',
    animation: 'KES 70,000 - 140,000 yearly',
    film: 'KES 75,000 - 150,000 yearly',
    music: 'KES 60,000 - 120,000 yearly',
    photography: 'KES 80,000 total'
  }

  const audienceMapping: { [key: string]: string } = {
    'digital-marketing': 'Aspiring digital marketers, social media managers, content creators, entrepreneurs',
    'graphic-design': 'Creative individuals, aspiring designers, artists, brand enthusiasts',
    animation: 'Aspiring animators, VFX artists, motion designers, 3D modelers',
    film: 'Aspiring filmmakers, video editors, cinematographers, content creators',
    music: 'Aspiring music producers, audio engineers, musicians, sound designers',
    photography: 'Photography enthusiasts, aspiring photographers, content creators'
  }

  const courseType = Object.keys(audienceMapping).find((key) => courseSlug.includes(key)) || 'creative'

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
      audienceType: audienceMapping[courseType] || 'Creative professionals'
    },
    // Add employment outcomes
    employmentOutcome: {
      '@type': 'EmploymentOutcome',
      employmentRate: '85%',
      averageSalary: courseType === 'photography' ? 'KES 30,000 - 80,000 monthly' : 'KES 40,000 - 120,000 monthly'
    },
    // Add fee information
    offers: {
      '@type': 'Offer',
      price: feeMapping[courseType] || 'Contact for pricing',
      priceCurrency: 'KES',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString()
    }
  }
}
