// Course-specific video data for enhanced video integration
// This includes YouTube videos, student showcases, and related content

export interface CourseVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views?: string
  url: string
  type: 'youtube' | 'internal' | 'vimeo'
  category: string
  courseSlug: string
  tags: string[]
  featured?: boolean
}

// YouTube videos organized by course category
export const COURSE_RELATED_VIDEOS: Record<string, CourseVideo[]> = {
  // Film & TV Production Videos
  'film-and-television-production-diploma': [
    {
      id: 'film-1',
      title: 'ADMI Film Students Create Award-Winning Short Film',
      description:
        'Watch how our Film & TV Production students collaborated to create this award-winning short film using industry-standard equipment.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '5:42',
      views: '12K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Student Showcase',
      courseSlug: 'film-and-television-production-diploma',
      tags: ['film', 'student work', 'award winning'],
      featured: true
    },
    {
      id: 'film-2',
      title: 'Behind the Scenes: ADMI Film Production Studio',
      description:
        'Take a tour of our state-of-the-art film production facilities and see the equipment our students use daily.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '3:28',
      views: '8.5K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Facilities Tour',
      courseSlug: 'film-and-television-production-diploma',
      tags: ['facilities', 'equipment', 'studio tour']
    },
    {
      id: 'film-3',
      title: 'ADMI Graduate Working at Nation Media Group',
      description:
        'Meet Sarah, an ADMI Film & TV graduate now working as a producer at Nation Media Group. Hear her success story.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '4:15',
      views: '15K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Alumni Success',
      courseSlug: 'film-and-television-production-diploma',
      tags: ['alumni', 'career success', 'testimonial']
    }
  ],

  // Music Production Videos
  'music-production-diploma': [
    {
      id: 'music-1',
      title: 'Student Produces Hit Song in ADMI Studio',
      description:
        'Watch how our music production student created this chart-topping song using our professional recording studio.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '6:30',
      views: '25K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Student Showcase',
      courseSlug: 'music-production-diploma',
      tags: ['music', 'production', 'hit song'],
      featured: true
    },
    {
      id: 'music-2',
      title: 'ADMI Recording Studio Tour - Professional Equipment',
      description:
        'Explore our world-class recording studio with industry-standard equipment including Pro Tools, SSL consoles, and more.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '4:45',
      views: '18K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Facilities Tour',
      courseSlug: 'music-production-diploma',
      tags: ['studio', 'equipment', 'pro tools']
    }
  ],

  // Graphic Design Videos
  'graphic-design-diploma': [
    {
      id: 'design-1',
      title: 'ADMI Student Designs Brand Identity for Major Company',
      description:
        'See how our graphic design student created a complete brand identity that was adopted by a major Kenyan company.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '5:20',
      views: '22K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Student Showcase',
      courseSlug: 'graphic-design-diploma',
      tags: ['graphic design', 'branding', 'client work'],
      featured: true
    },
    {
      id: 'design-2',
      title: 'Digital Design Lab Tour - Adobe Creative Suite',
      description:
        'Tour our digital design labs equipped with the latest Adobe Creative Suite and professional design workstations.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '3:55',
      views: '14K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Facilities Tour',
      courseSlug: 'graphic-design-diploma',
      tags: ['design lab', 'adobe', 'workstations']
    }
  ],

  // Animation Videos
  'animation-and-motion-graphics-diploma': [
    {
      id: 'animation-1',
      title: 'ADMI Student Creates Viral Animation for Social Media',
      description:
        'Watch this amazing 3D animation created by our student that went viral on social media with over 1M views.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '4:12',
      views: '35K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Student Showcase',
      courseSlug: 'animation-and-motion-graphics-diploma',
      tags: ['animation', '3d', 'viral content'],
      featured: true
    }
  ],

  // Digital Marketing Videos
  'digital-marketing-certificate': [
    {
      id: 'marketing-1',
      title: 'ADMI Student Runs Successful Social Media Campaign',
      description:
        'Learn how our digital marketing student created and executed a social media campaign that generated 500% ROI.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '7:15',
      views: '28K',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      type: 'youtube',
      category: 'Student Showcase',
      courseSlug: 'digital-marketing-certificate',
      tags: ['digital marketing', 'social media', 'roi'],
      featured: true
    }
  ]
}

// General ADMI videos that can be shown on any course page
export const GENERAL_ADMI_VIDEOS: CourseVideo[] = [
  {
    id: 'general-1',
    title: 'ADMI Campus Tour - Creative Learning Environment',
    description:
      'Take a virtual tour of our Nairobi campus and see why ADMI is the premier creative media institute in East Africa.',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '8:30',
    views: '45K',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube',
    category: 'Campus Tour',
    courseSlug: 'general',
    tags: ['campus', 'facilities', 'tour']
  },
  {
    id: 'general-2',
    title: 'Why Choose ADMI? - Student Testimonials',
    description:
      'Hear from current students and recent graduates about their experience at ADMI and career success stories.',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '6:45',
    views: '32K',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube',
    category: 'Testimonials',
    courseSlug: 'general',
    tags: ['testimonials', 'student experience', 'success stories']
  },
  {
    id: 'general-3',
    title: 'ADMI Industry Partnerships & Job Placement',
    description:
      'Learn about our partnerships with leading media companies and our 90% job placement rate for graduates.',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '5:20',
    views: '19K',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube',
    category: 'Industry Partnerships',
    courseSlug: 'general',
    tags: ['partnerships', 'job placement', 'career support']
  }
]

// Utility functions for video management
export const getRelatedVideos = (courseSlug: string, limit: number = 6): CourseVideo[] => {
  const courseVideos = COURSE_RELATED_VIDEOS[courseSlug] || []
  const generalVideos = GENERAL_ADMI_VIDEOS

  // Combine course-specific and general videos
  const allVideos = [...courseVideos, ...generalVideos]

  // Prioritize featured videos
  const sortedVideos = allVideos.sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })

  return sortedVideos.slice(0, limit)
}

export const getFeaturedVideos = (courseSlug?: string): CourseVideo[] => {
  if (courseSlug && COURSE_RELATED_VIDEOS[courseSlug]) {
    return COURSE_RELATED_VIDEOS[courseSlug].filter((video) => video.featured)
  }

  // Return featured videos from all courses
  const allFeatured: CourseVideo[] = []
  Object.values(COURSE_RELATED_VIDEOS).forEach((videos) => {
    allFeatured.push(...videos.filter((video) => video.featured))
  })

  return allFeatured
}

export const getVideosByCategory = (category: string, limit: number = 10): CourseVideo[] => {
  const allVideos: CourseVideo[] = []

  Object.values(COURSE_RELATED_VIDEOS).forEach((videos) => {
    allVideos.push(...videos.filter((video) => video.category === category))
  })

  allVideos.push(...GENERAL_ADMI_VIDEOS.filter((video) => video.category === category))

  return allVideos.slice(0, limit)
}
