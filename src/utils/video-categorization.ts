import { YouTubeVideo } from './youtube-api'

// Advanced categorization system using multiple YouTube data sources
export interface VideoCategory {
  id: string
  label: string
  description: string
  icon: string
  keywords: string[]
  titlePatterns: RegExp[]
  tagPatterns: string[]
  priority: number // Higher priority categories are checked first
}

// Comprehensive ADMI video categories
export const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    id: 'student-showcase',
    label: 'Student Showcase',
    description: 'Student projects, portfolios, and creative work',
    icon: '🎨',
    keywords: ['student', 'showcase', 'project', 'portfolio', 'work', 'assignment', 'final project'],
    titlePatterns: [
      /student.*showcase/i,
      /student.*work/i,
      /student.*project/i,
      /portfolio.*showcase/i,
      /final.*project/i
    ],
    tagPatterns: ['student work', 'portfolio', 'showcase', 'student project'],
    priority: 10
  },
  {
    id: 'course-content',
    label: 'Course Content',
    description: 'Educational content and course materials',
    icon: '📚',
    keywords: ['course', 'lesson', 'tutorial', 'learn', 'education', 'training', 'class'],
    titlePatterns: [
      /course.*content/i,
      /lesson.*\d+/i,
      /tutorial/i,
      /how.*to/i,
      /learn.*\w+/i
    ],
    tagPatterns: ['tutorial', 'education', 'course', 'lesson', 'training'],
    priority: 9
  },
  {
    id: 'facilities-tour',
    label: 'Facilities & Campus',
    description: 'Campus tours, facilities, and equipment showcases',
    icon: '🏢',
    keywords: ['tour', 'facilities', 'studio', 'lab', 'equipment', 'campus', 'building'],
    titlePatterns: [
      /facilities.*tour/i,
      /campus.*tour/i,
      /studio.*tour/i,
      /lab.*tour/i,
      /equipment.*showcase/i
    ],
    tagPatterns: ['facilities', 'campus tour', 'studio', 'equipment'],
    priority: 8
  },
  {
    id: 'testimonials',
    label: 'Testimonials & Success Stories',
    description: 'Graduate testimonials and success stories',
    icon: '⭐',
    keywords: ['testimonial', 'graduate', 'alumni', 'success', 'story', 'experience', 'journey'],
    titlePatterns: [
      /testimonial/i,
      /success.*story/i,
      /graduate.*story/i,
      /alumni.*story/i,
      /my.*experience/i,
      /this.*is.*admi/i
    ],
    tagPatterns: ['testimonial', 'success story', 'graduate', 'alumni'],
    priority: 9
  },
  {
    id: 'events',
    label: 'Events & Activities',
    description: 'Campus events, workshops, and activities',
    icon: '🎉',
    keywords: ['event', 'workshop', 'seminar', 'conference', 'activity', 'celebration'],
    titlePatterns: [
      /event/i,
      /workshop/i,
      /seminar/i,
      /conference/i,
      /graduation/i,
      /open.*day/i
    ],
    tagPatterns: ['event', 'workshop', 'seminar', 'graduation'],
    priority: 7
  },
  {
    id: 'music-production',
    label: 'Music Production',
    description: 'Music production, audio engineering, and sound design',
    icon: '🎵',
    keywords: ['music', 'audio', 'sound', 'production', 'recording', 'mixing', 'mastering', 'beat'],
    titlePatterns: [
      /music.*production/i,
      /audio.*production/i,
      /sound.*design/i,
      /recording/i,
      /mixing/i,
      /mastering/i,
      /beat.*making/i
    ],
    tagPatterns: ['music production', 'audio', 'sound design', 'recording'],
    priority: 8
  },
  {
    id: 'film-tv',
    label: 'Film & TV Production',
    description: 'Film making, video production, and television content',
    icon: '🎬',
    keywords: ['film', 'movie', 'video', 'television', 'tv', 'production', 'cinematography', 'editing'],
    titlePatterns: [
      /film.*production/i,
      /video.*production/i,
      /tv.*production/i,
      /cinematography/i,
      /film.*making/i,
      /video.*editing/i
    ],
    tagPatterns: ['film production', 'video production', 'cinematography', 'film making'],
    priority: 8
  },
  {
    id: 'animation-vfx',
    label: 'Animation & VFX',
    description: 'Animation, visual effects, and motion graphics',
    icon: '🎭',
    keywords: ['animation', 'vfx', 'visual effects', 'motion graphics', '3d', 'after effects'],
    titlePatterns: [
      /animation/i,
      /vfx/i,
      /visual.*effects/i,
      /motion.*graphics/i,
      /3d.*animation/i,
      /after.*effects/i
    ],
    tagPatterns: ['animation', 'vfx', 'visual effects', 'motion graphics'],
    priority: 8
  },
  {
    id: 'graphic-design',
    label: 'Graphic Design',
    description: 'Graphic design, branding, and visual communication',
    icon: '🎨',
    keywords: ['graphic', 'design', 'branding', 'logo', 'visual', 'photoshop', 'illustrator'],
    titlePatterns: [
      /graphic.*design/i,
      /logo.*design/i,
      /branding/i,
      /visual.*design/i,
      /photoshop/i,
      /illustrator/i
    ],
    tagPatterns: ['graphic design', 'branding', 'logo design', 'visual design'],
    priority: 7
  },
  {
    id: 'digital-marketing',
    label: 'Digital Marketing',
    description: 'Digital marketing, social media, and content strategy',
    icon: '📱',
    keywords: ['marketing', 'digital marketing', 'social media', 'content', 'strategy', 'seo'],
    titlePatterns: [
      /digital.*marketing/i,
      /social.*media/i,
      /content.*marketing/i,
      /marketing.*strategy/i,
      /seo/i
    ],
    tagPatterns: ['digital marketing', 'social media', 'content marketing', 'seo'],
    priority: 7
  },
  {
    id: 'photography',
    label: 'Photography',
    description: 'Photography techniques, equipment, and portfolios',
    icon: '📸',
    keywords: ['photography', 'photo', 'camera', 'portrait', 'landscape', 'studio photography'],
    titlePatterns: [
      /photography/i,
      /photo.*shoot/i,
      /camera.*techniques/i,
      /portrait.*photography/i,
      /studio.*photography/i
    ],
    tagPatterns: ['photography', 'photo shoot', 'camera', 'portrait'],
    priority: 7
  },
  {
    id: 'industry-insights',
    label: 'Industry Insights',
    description: 'Industry trends, career advice, and professional insights',
    icon: '💼',
    keywords: ['industry', 'career', 'professional', 'trends', 'insights', 'advice', 'tips'],
    titlePatterns: [
      /industry.*insights/i,
      /career.*advice/i,
      /professional.*tips/i,
      /industry.*trends/i,
      /career.*guidance/i
    ],
    tagPatterns: ['industry insights', 'career advice', 'professional tips', 'trends'],
    priority: 6
  }
]

// Smart categorization function
export function categorizeVideo(video: YouTubeVideo): string[] {
  const categories: string[] = []
  
  // Prepare search text (title + description + tags)
  const searchText = `${video.title} ${video.description} ${video.tags?.join(' ') || ''}`.toLowerCase()
  
  // Sort categories by priority (highest first)
  const sortedCategories = [...VIDEO_CATEGORIES].sort((a, b) => b.priority - a.priority)
  
  for (const category of sortedCategories) {
    let score = 0
    
    // Check title patterns (highest weight)
    for (const pattern of category.titlePatterns) {
      if (pattern.test(video.title)) {
        score += 10
        break // Only count once per category
      }
    }
    
    // Check tag patterns (high weight)
    if (video.tags) {
      for (const tagPattern of category.tagPatterns) {
        if (video.tags.some(tag => tag.toLowerCase().includes(tagPattern.toLowerCase()))) {
          score += 8
          break
        }
      }
    }
    
    // Check keywords in all text (medium weight)
    const keywordMatches = category.keywords.filter(keyword => 
      searchText.includes(keyword.toLowerCase())
    )
    score += keywordMatches.length * 2
    
    // If score is high enough, add to categories
    if (score >= 5) {
      categories.push(category.id)
    }
  }
  
  // Always ensure at least one category
  if (categories.length === 0) {
    categories.push('course-content') // Default category
  }
  
  return categories
}

// Get videos by category using smart categorization
export function getVideosBySmartCategory(videos: YouTubeVideo[], categoryId: string): YouTubeVideo[] {
  if (categoryId === 'all') {
    return videos
  }
  
  return videos.filter(video => {
    const videoCategories = categorizeVideo(video)
    return videoCategories.includes(categoryId)
  })
}

// Get category statistics
export function getCategoryStats(videos: YouTubeVideo[]): Record<string, number> {
  const stats: Record<string, number> = {}
  
  // Initialize all categories
  VIDEO_CATEGORIES.forEach(category => {
    stats[category.id] = 0
  })
  
  // Count videos in each category
  videos.forEach(video => {
    const videoCategories = categorizeVideo(video)
    videoCategories.forEach(categoryId => {
      stats[categoryId] = (stats[categoryId] || 0) + 1
    })
  })
  
  return stats
}

// Get category info by ID
export function getCategoryInfo(categoryId: string): VideoCategory | undefined {
  return VIDEO_CATEGORIES.find(cat => cat.id === categoryId)
}
