import { YouTubeVideo } from './youtube-api'

// Manual categorization system based on playlists and keywords
export interface ManualCategory {
  id: string
  label: string
  description: string
  icon: string
  color: string
  // Playlist-based categorization (highest priority)
  playlistIds: string[]
  playlistTitles: string[] // Partial matches for playlist titles
  // Manual keyword categorization (medium priority)
  manualKeywords: string[] // Keywords that content creators should add
  hashtagKeywords: string[] // Hashtags to look for
  // Fallback automatic categorization (lowest priority)
  titleKeywords: string[]
  descriptionKeywords: string[]
}

// ADMI Video Categories - Manual Curation Focused
export const MANUAL_CATEGORIES: ManualCategory[] = [
  {
    id: 'student-showcase',
    label: 'Student Showcase',
    description: 'Student projects, portfolios, and creative work',
    icon: '🎨',
    color: 'blue',
    playlistIds: [], // Will be populated when playlists are created
    playlistTitles: ['student showcase', 'student work', 'student projects', 'portfolio'],
    manualKeywords: ['#StudentShowcase', '#StudentWork', '#Portfolio', '#FinalProject', '#StudentProject'],
    hashtagKeywords: ['studentshowcase', 'studentwork', 'portfolio', 'finalproject'],
    titleKeywords: ['student', 'showcase', 'project', 'portfolio', 'final project'],
    descriptionKeywords: ['student work', 'student project', 'portfolio showcase', 'final project']
  },
  {
    id: 'course-tutorials',
    label: 'Course Tutorials',
    description: 'Educational content and course materials',
    icon: '📚',
    color: 'green',
    playlistIds: [],
    playlistTitles: ['tutorials', 'course content', 'lessons', 'how to'],
    manualKeywords: ['#Tutorial', '#HowTo', '#CourseContent', '#Learning', '#Education'],
    hashtagKeywords: ['tutorial', 'howto', 'coursecontent', 'learning'],
    titleKeywords: ['tutorial', 'how to', 'learn', 'course', 'lesson'],
    descriptionKeywords: ['tutorial', 'how to', 'learn how', 'course content', 'educational']
  },
  {
    id: 'testimonials',
    label: 'Testimonials & Success Stories',
    description: 'Graduate testimonials and success stories',
    icon: '⭐',
    color: 'yellow',
    playlistIds: [],
    playlistTitles: ['testimonials', 'success stories', 'graduate stories', 'this is admi'],
    manualKeywords: ['#Testimonial', '#SuccessStory', '#Graduate', '#Alumni', '#ThisIsADMI'],
    hashtagKeywords: ['testimonial', 'successstory', 'graduate', 'alumni', 'thisisadmi'],
    titleKeywords: ['testimonial', 'success story', 'graduate', 'alumni', 'this is admi'],
    descriptionKeywords: ['testimonial', 'success story', 'graduate story', 'alumni story']
  },
  {
    id: 'facilities-tour',
    label: 'Facilities & Campus',
    description: 'Campus tours, facilities, and equipment showcases',
    icon: '🏢',
    color: 'cyan',
    playlistIds: [],
    playlistTitles: ['facilities tour', 'campus tour', 'studio tour', 'equipment'],
    manualKeywords: ['#FacilitiesTour', '#CampusTour', '#Studio', '#Equipment', '#Campus'],
    hashtagKeywords: ['facilitiestour', 'campustour', 'studio', 'equipment'],
    titleKeywords: ['tour', 'facilities', 'studio', 'campus', 'equipment'],
    descriptionKeywords: ['facilities tour', 'campus tour', 'studio tour', 'equipment showcase']
  },
  {
    id: 'events',
    label: 'Events & Activities',
    description: 'Campus events, workshops, and activities',
    icon: '🎉',
    color: 'pink',
    playlistIds: [],
    playlistTitles: ['events', 'workshops', 'graduation', 'open day'],
    manualKeywords: ['#Event', '#Workshop', '#Graduation', '#OpenDay', '#Seminar'],
    hashtagKeywords: ['event', 'workshop', 'graduation', 'openday'],
    titleKeywords: ['event', 'workshop', 'graduation', 'open day', 'seminar'],
    descriptionKeywords: ['event', 'workshop', 'graduation ceremony', 'open day']
  },
  {
    id: 'music-production',
    label: 'Music Production',
    description: 'Music production, audio engineering, and sound design',
    icon: '🎵',
    color: 'grape',
    playlistIds: [],
    playlistTitles: ['music production', 'audio', 'sound design', 'recording'],
    manualKeywords: ['#MusicProduction', '#Audio', '#Recording', '#SoundDesign', '#MusicTech'],
    hashtagKeywords: ['musicproduction', 'audio', 'recording', 'sounddesign'],
    titleKeywords: ['music', 'audio', 'sound', 'recording', 'production'],
    descriptionKeywords: ['music production', 'audio production', 'sound design', 'recording']
  },
  {
    id: 'film-tv',
    label: 'Film & TV Production',
    description: 'Film making, video production, and television content',
    icon: '🎬',
    color: 'red',
    playlistIds: [],
    playlistTitles: ['film production', 'video production', 'tv production', 'cinematography'],
    manualKeywords: ['#FilmProduction', '#VideoProduction', '#Cinematography', '#FilmMaking'],
    hashtagKeywords: ['filmproduction', 'videoproduction', 'cinematography', 'filmmaking'],
    titleKeywords: ['film', 'video', 'tv', 'production', 'cinematography'],
    descriptionKeywords: ['film production', 'video production', 'cinematography', 'film making']
  },
  {
    id: 'animation-vfx',
    label: 'Animation & VFX',
    description: 'Animation, visual effects, and motion graphics',
    icon: '🎭',
    color: 'indigo',
    playlistIds: [],
    playlistTitles: ['animation', 'vfx', 'motion graphics', '3d animation'],
    manualKeywords: ['#Animation', '#VFX', '#MotionGraphics', '#3D', '#VisualEffects'],
    hashtagKeywords: ['animation', 'vfx', 'motiongraphics', '3d'],
    titleKeywords: ['animation', 'vfx', 'motion graphics', '3d', 'visual effects'],
    descriptionKeywords: ['animation', 'visual effects', 'motion graphics', '3d animation']
  },
  {
    id: 'graphic-design',
    label: 'Graphic Design',
    description: 'Graphic design, branding, and visual communication',
    icon: '🎨',
    color: 'orange',
    playlistIds: [],
    playlistTitles: ['graphic design', 'branding', 'visual design', 'logo design'],
    manualKeywords: ['#GraphicDesign', '#Branding', '#VisualDesign', '#LogoDesign'],
    hashtagKeywords: ['graphicdesign', 'branding', 'visualdesign', 'logodesign'],
    titleKeywords: ['graphic', 'design', 'branding', 'logo', 'visual'],
    descriptionKeywords: ['graphic design', 'branding', 'visual design', 'logo design']
  },
  {
    id: 'digital-marketing',
    label: 'Digital Marketing',
    description: 'Digital marketing, social media, and content strategy',
    icon: '📱',
    color: 'teal',
    playlistIds: [],
    playlistTitles: ['digital marketing', 'social media', 'content marketing', 'marketing'],
    manualKeywords: ['#DigitalMarketing', '#SocialMedia', '#ContentStrategy', '#Marketing'],
    hashtagKeywords: ['digitalmarketing', 'socialmedia', 'contentstrategy', 'marketing'],
    titleKeywords: ['marketing', 'digital', 'social media', 'content'],
    descriptionKeywords: ['digital marketing', 'social media', 'content marketing', 'marketing strategy']
  },
  {
    id: 'photography',
    label: 'Photography',
    description: 'Photography techniques, equipment, and portfolios',
    icon: '📸',
    color: 'violet',
    playlistIds: [],
    playlistTitles: ['photography', 'photo shoot', 'portrait photography', 'studio photography'],
    manualKeywords: ['#Photography', '#PhotoShoot', '#PortraitPhotography', '#StudioPhotography'],
    hashtagKeywords: ['photography', 'photoshoot', 'portraitphotography', 'studiophotography'],
    titleKeywords: ['photography', 'photo', 'portrait', 'studio'],
    descriptionKeywords: ['photography', 'photo shoot', 'portrait photography', 'studio photography']
  }
]

// Manual categorization function with priority system
export function categorizeVideoManually(video: YouTubeVideo, playlists?: any[]): string[] {
  const categories: string[] = []
  const searchText = `${video.title} ${video.description}`.toLowerCase()
  
  for (const category of MANUAL_CATEGORIES) {
    let score = 0
    
    // 1. HIGHEST PRIORITY: Playlist-based categorization
    if (playlists) {
      for (const playlist of playlists) {
        // Check if video is in a specific playlist (would need playlist items API)
        // For now, check playlist title matches
        for (const playlistTitle of category.playlistTitles) {
          if (playlist.title.toLowerCase().includes(playlistTitle)) {
            score += 20 // Very high score for playlist match
            break
          }
        }
      }
    }
    
    // 2. HIGH PRIORITY: Manual keywords/hashtags in description
    for (const keyword of category.manualKeywords) {
      if (video.description.includes(keyword)) {
        score += 15
      }
    }
    
    // 3. HIGH PRIORITY: Hashtag keywords
    for (const hashtag of category.hashtagKeywords) {
      if (searchText.includes(`#${hashtag}`) || searchText.includes(hashtag)) {
        score += 12
      }
    }
    
    // 4. MEDIUM PRIORITY: Title keywords
    for (const keyword of category.titleKeywords) {
      if (video.title.toLowerCase().includes(keyword)) {
        score += 8
      }
    }
    
    // 5. LOW PRIORITY: Description keywords
    for (const keyword of category.descriptionKeywords) {
      if (video.description.toLowerCase().includes(keyword)) {
        score += 3
      }
    }
    
    // Add category if score is high enough
    if (score >= 8) { // Reduced threshold for manual system
      categories.push(category.id)
    }
  }
  
  // Default category if none found
  if (categories.length === 0) {
    categories.push('course-tutorials') // Default to course content
  }
  
  return categories
}

// Get videos by manual category
export function getVideosByManualCategory(videos: YouTubeVideo[], categoryId: string, playlists?: any[]): YouTubeVideo[] {
  if (categoryId === 'all') {
    return videos
  }
  
  return videos.filter(video => {
    const videoCategories = categorizeVideoManually(video, playlists)
    return videoCategories.includes(categoryId)
  })
}

// Get manual category statistics
export function getManualCategoryStats(videos: YouTubeVideo[], playlists?: any[]): Record<string, number> {
  const stats: Record<string, number> = {}
  
  // Initialize all categories
  MANUAL_CATEGORIES.forEach(category => {
    stats[category.id] = 0
  })
  
  // Count videos in each category
  videos.forEach(video => {
    const videoCategories = categorizeVideoManually(video, playlists)
    videoCategories.forEach(categoryId => {
      stats[categoryId] = (stats[categoryId] || 0) + 1
    })
  })
  
  return stats
}

// Get manual category info
export function getManualCategoryInfo(categoryId: string): ManualCategory | undefined {
  return MANUAL_CATEGORIES.find(cat => cat.id === categoryId)
}
