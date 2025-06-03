// Diploma-specific SEO configuration for ADMI
export const DIPLOMA_PROGRAMS = [
  {
    id: 'film-television',
    name: 'Diploma in Film and Television Production',
    slug: 'diploma-film-television-production',
    duration: '2 years',
    keywords: [
      'film diploma Africa',
      'television production diploma',
      'film school Kenya',
      'cinematography course',
      'video production training',
      'film editing diploma',
      'Nollywood training',
      'African film industry',
      'film production course',
      'television broadcasting diploma',
      'media production Africa'
    ],
    careerPaths: [
      'Film Director',
      'Cinematographer',
      'Video Editor',
      'Producer',
      'Camera Operator',
      'Sound Engineer',
      'Scriptwriter',
      'Post-Production Specialist'
    ],
    industries: ['Film Industry', 'Television Broadcasting', 'Advertising', 'Corporate Media', 'Documentary Production']
  },
  {
    id: 'animation-vfx',
    name: 'Diploma in Animation and Visual Effects',
    slug: 'diploma-animation-visual-effects',
    duration: '2 years',
    keywords: [
      'animation diploma Africa',
      'VFX course Kenya',
      '3D animation training',
      '2D animation diploma',
      'visual effects course',
      'motion graphics diploma',
      'character animation',
      'game animation course',
      'CGI training Africa',
      'digital animation school',
      'animation studio training'
    ],
    careerPaths: [
      '3D Animator',
      'VFX Artist',
      'Motion Graphics Designer',
      'Character Animator',
      'Compositing Artist',
      'Rigging Artist',
      'Lighting Artist',
      'Game Animator'
    ],
    industries: ['Animation Studios', 'Gaming Industry', 'Film & TV', 'Advertising', 'Architectural Visualization']
  },
  {
    id: 'graphic-design',
    name: 'Diploma in Graphic Design and Digital Media',
    slug: 'diploma-graphic-design-digital-media',
    duration: '2 years',
    keywords: [
      'graphic design diploma Africa',
      'digital design course Kenya',
      'brand design training',
      'logo design course',
      'print design diploma',
      'web design training',
      'UI UX design course',
      'advertising design diploma',
      'creative design Africa',
      'visual communication course',
      'digital marketing design'
    ],
    careerPaths: [
      'Graphic Designer',
      'Brand Designer',
      'UI/UX Designer',
      'Web Designer',
      'Art Director',
      'Creative Director',
      'Digital Marketing Designer',
      'Print Designer'
    ],
    industries: ['Advertising Agencies', 'Design Studios', 'Corporate Marketing', 'Publishing', 'Digital Marketing']
  },
  {
    id: 'audio-production',
    name: 'Diploma in Audio Production and Sound Engineering',
    slug: 'diploma-audio-production-sound-engineering',
    duration: '2 years',
    keywords: [
      'audio production diploma Africa',
      'sound engineering course Kenya',
      'music production training',
      'recording studio course',
      'audio mixing diploma',
      'sound design course',
      'podcast production training',
      'radio production diploma',
      'audio post-production',
      'music technology course',
      'broadcast audio training'
    ],
    careerPaths: [
      'Sound Engineer',
      'Audio Producer',
      'Music Producer',
      'Sound Designer',
      'Recording Engineer',
      'Mixing Engineer',
      'Mastering Engineer',
      'Broadcast Engineer'
    ],
    industries: ['Recording Studios', 'Radio Stations', 'Film & TV', 'Music Industry', 'Podcast Production']
  },
  {
    id: 'photography',
    name: 'Diploma in Photography and Digital Imaging',
    slug: 'diploma-photography-digital-imaging',
    duration: '2 years',
    keywords: [
      'photography diploma Africa',
      'digital photography course Kenya',
      'commercial photography training',
      'portrait photography course',
      'wedding photography diploma',
      'fashion photography training',
      'photojournalism course',
      'studio photography diploma',
      'photo editing course',
      'digital imaging training',
      'photography business course'
    ],
    careerPaths: [
      'Professional Photographer',
      'Commercial Photographer',
      'Wedding Photographer',
      'Fashion Photographer',
      'Photojournalist',
      'Studio Manager',
      'Photo Editor',
      'Photography Instructor'
    ],
    industries: ['Photography Studios', 'Media Houses', 'Fashion Industry', 'Advertising', 'Event Management']
  }
]

export const DIPLOMA_SEO_KEYWORDS = [
  // General diploma terms
  'diploma courses Africa',
  'diploma programs Kenya',
  '2 year diploma courses',
  'higher diploma Africa',
  'professional diploma courses',
  'accredited diploma programs',

  // Career-focused terms
  'career change diploma',
  'professional development Africa',
  'skills training diploma',
  'industry-ready training',
  'job-oriented courses',
  'practical training programs',

  // Location-based terms
  'diploma courses Nairobi',
  'diploma programs East Africa',
  'online diploma Africa',
  'distance learning diploma',
  'flexible diploma programs',
  'part-time diploma courses',

  // Industry terms
  'creative industry diploma',
  'media diploma courses',
  'digital media training',
  'entertainment industry courses',
  'creative arts diploma',
  'technology diploma programs',

  // Value proposition terms
  'affordable diploma courses',
  'quality education Africa',
  'international standard diploma',
  'industry-recognized diploma',
  'hands-on training',
  'practical skills development'
]

export const generateDiplomaKeywords = (programId: string) => {
  const program = DIPLOMA_PROGRAMS.find((p) => p.id === programId)
  if (!program) return DIPLOMA_SEO_KEYWORDS

  return [
    ...DIPLOMA_SEO_KEYWORDS,
    ...program.keywords,
    `${program.name} Africa`,
    `${program.name} Kenya`,
    `${program.name} online`,
    `${program.duration} ${program.name.toLowerCase()}`,
    ...program.careerPaths.map((career) => `${career} training`),
    ...program.industries.map((industry) => `${industry} courses`)
  ]
}

export const DIPLOMA_STRUCTURED_DATA_TEMPLATE = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  courseMode: 'blended',
  educationalLevel: 'Diploma',
  timeRequired: 'P2Y', // 2 years in ISO 8601 duration format
  isAccessibleForFree: false,
  inLanguage: 'en',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student'
  },
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Africa Digital Media Institute',
    url: 'https://admi.africa',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Caxton House, Standard Street',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE'
    }
  },
  offers: {
    '@type': 'Offer',
    category: 'Educational',
    priceCurrency: 'KES',
    availability: 'https://schema.org/InStock'
  }
}

export const DIPLOMA_FAQ_CATEGORIES = [
  'General Information',
  'Admission Requirements',
  'Course Content & Structure',
  'Career Prospects',
  'Fees & Payment',
  'Accreditation & Recognition',
  'Student Support',
  'Technology Requirements',
  'International Students',
  'Graduate Outcomes'
]
