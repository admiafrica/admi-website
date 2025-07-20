// YouTube API integration for ADMI channel videos

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: {
    default: string
    medium: string
    high: string
    maxres?: string
  }
  publishedAt: string
  duration: string
  viewCount: string
  likeCount?: string
  channelTitle: string
  tags?: string[]
  categoryId: string
}

export interface YouTubePlaylist {
  id: string
  title: string
  description: string
  thumbnail: string
  itemCount: number
  videos?: YouTubeVideo[]
}

// ADMI YouTube Channel Configuration
const ADMI_CHANNEL_CONFIG = {
  channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw', // Replace with actual ADMI channel ID
  channelHandle: '@ADMIafrica',
  channelUrl: 'https://www.youtube.com/@ADMIafrica/',
  apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY
}

// Course-related keywords for categorizing videos
const COURSE_KEYWORDS = {
  'film-and-television-production-diploma': [
    'film',
    'television',
    'tv',
    'production',
    'cinema',
    'director',
    'cinematography'
  ],
  'music-production-diploma': ['music', 'audio', 'sound', 'recording', 'studio', 'producer', 'mixing'],
  'graphic-design-diploma': ['graphic', 'design', 'visual', 'branding', 'logo', 'typography', 'adobe'],
  'animation-and-motion-graphics-diploma': ['animation', 'motion', 'graphics', '3d', '2d', 'vfx', 'effects'],
  'digital-marketing-certificate': ['marketing', 'digital', 'social media', 'seo', 'advertising', 'campaign'],
  'photography-certificate': ['photography', 'photo', 'camera', 'portrait', 'landscape', 'studio'],
  'video-production-certificate': ['video', 'production', 'editing', 'premiere', 'final cut'],
  'sound-engineering-diploma': ['sound', 'engineering', 'audio', 'mixing', 'mastering', 'acoustics']
}

/**
 * Fetch videos from ADMI YouTube channel
 */
export async function fetchADMIChannelVideos(maxResults: number = 50): Promise<YouTubeVideo[]> {
  if (!ADMI_CHANNEL_CONFIG.apiKey) {
    console.warn('YouTube API key not configured')
    return []
  }

  try {
    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${ADMI_CHANNEL_CONFIG.channelId}&key=${ADMI_CHANNEL_CONFIG.apiKey}`
    )

    if (!channelResponse.ok) {
      throw new Error(`Channel API error: ${channelResponse.status}`)
    }

    const channelData = await channelResponse.json()
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist')
    }

    // Get videos from uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${ADMI_CHANNEL_CONFIG.apiKey}`
    )

    if (!playlistResponse.ok) {
      throw new Error(`Playlist API error: ${playlistResponse.status}`)
    }

    const playlistData = await playlistResponse.json()
    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',')

    // Get detailed video information
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${ADMI_CHANNEL_CONFIG.apiKey}`
    )

    if (!videosResponse.ok) {
      throw new Error(`Videos API error: ${videosResponse.status}`)
    }

    const videosData = await videosResponse.json()

    return videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: {
        default: video.snippet.thumbnails.default?.url || '',
        medium: video.snippet.thumbnails.medium?.url || '',
        high: video.snippet.thumbnails.high?.url || '',
        maxres: video.snippet.thumbnails.maxres?.url
      },
      publishedAt: video.snippet.publishedAt,
      duration: formatDuration(video.contentDetails.duration),
      viewCount: formatViewCount(video.statistics.viewCount),
      likeCount: video.statistics.likeCount,
      channelTitle: video.snippet.channelTitle,
      tags: video.snippet.tags || [],
      categoryId: video.snippet.categoryId
    }))
  } catch (error) {
    console.error('Error fetching ADMI YouTube videos:', error)
    return []
  }
}

/**
 * Get videos related to a specific course
 */
export function getVideosForCourse(videos: YouTubeVideo[], courseSlug: string): YouTubeVideo[] {
  const keywords = COURSE_KEYWORDS[courseSlug as keyof typeof COURSE_KEYWORDS] || []

  if (keywords.length === 0) {
    return []
  }

  return videos.filter((video) => {
    const searchText = `${video.title} ${video.description} ${video.tags?.join(' ')}`.toLowerCase()
    return keywords.some((keyword) => searchText.includes(keyword.toLowerCase()))
  })
}

/**
 * Search videos by keyword
 */
export function searchVideos(videos: YouTubeVideo[], query: string): YouTubeVideo[] {
  const searchQuery = query.toLowerCase()

  return videos.filter((video) => {
    const searchText = `${video.title} ${video.description} ${video.tags?.join(' ')}`.toLowerCase()
    return searchText.includes(searchQuery)
  })
}

/**
 * Get videos by category
 */
export function getVideosByCategory(videos: YouTubeVideo[], category: string): YouTubeVideo[] {
  const categoryKeywords: Record<string, string[]> = {
    'student-showcase': ['student', 'showcase', 'project', 'work', 'portfolio'],
    'facilities-tour': ['tour', 'facilities', 'studio', 'lab', 'equipment'],
    testimonials: ['testimonial', 'graduate', 'alumni', 'success', 'story'],
    tutorials: ['tutorial', 'how to', 'learn', 'guide', 'tips'],
    events: ['event', 'graduation', 'ceremony', 'workshop', 'seminar'],
    industry: ['industry', 'professional', 'expert', 'career', 'job']
  }

  const keywords = categoryKeywords[category] || []

  return videos.filter((video) => {
    const searchText = `${video.title} ${video.description}`.toLowerCase()
    return keywords.some((keyword) => searchText.includes(keyword))
  })
}

/**
 * Format YouTube duration (PT4M13S) to readable format (4:13)
 */
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return '0:00'

  const hours = parseInt(match[1]?.replace('H', '') || '0')
  const minutes = parseInt(match[2]?.replace('M', '') || '0')
  const seconds = parseInt(match[3]?.replace('S', '') || '0')

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Format view count to readable format (1.2K, 1.5M, etc.)
 */
function formatViewCount(count: string): string {
  const num = parseInt(count)

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }

  return num.toString()
}

/**
 * Get YouTube video embed URL
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = false): string {
  const params = new URLSearchParams({
    rel: '0', // Don't show related videos from other channels
    modestbranding: '1', // Modest YouTube branding
    controls: '1', // Show player controls
    showinfo: '0', // Don't show video info
    fs: '1', // Allow fullscreen
    cc_load_policy: '0', // Don't show captions by default
    iv_load_policy: '3', // Don't show annotations
    autohide: '1' // Auto-hide controls
  })

  if (autoplay) {
    params.set('autoplay', '1')
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

/**
 * Get YouTube video watch URL
 */
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}

/**
 * Extract video ID from YouTube URL
 */
export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}
