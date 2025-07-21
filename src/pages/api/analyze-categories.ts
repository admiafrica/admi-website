import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache } from '@/utils/video-cache'
import { 
  VIDEO_CATEGORIES, 
  categorizeVideo, 
  getCategoryStats,
  getCategoryInfo 
} from '@/utils/video-categorization'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const cache = readVideoCache()
    
    if (!cache || !cache.videos || cache.videos.length === 0) {
      return res.status(404).json({ error: 'No videos found' })
    }

    const { sample = '10', category } = req.query
    const sampleSize = parseInt(sample as string)
    
    // Get category statistics
    const categoryStats = getCategoryStats(cache.videos)
    
    // Analyze sample videos
    const sampleVideos = cache.videos.slice(0, sampleSize).map(video => {
      const categories = categorizeVideo(video)
      return {
        id: video.id,
        title: video.title,
        tags: video.tags?.slice(0, 5) || [],
        categories: categories.map(catId => {
          const info = getCategoryInfo(catId)
          return {
            id: catId,
            label: info?.label || catId,
            icon: info?.icon || '📁'
          }
        }),
        description: video.description.substring(0, 200) + '...'
      }
    })
    
    // Category breakdown
    const categoryBreakdown = VIDEO_CATEGORIES.map(cat => ({
      id: cat.id,
      label: cat.label,
      icon: cat.icon,
      description: cat.description,
      videoCount: categoryStats[cat.id] || 0,
      percentage: ((categoryStats[cat.id] || 0) / cache.videos.length * 100).toFixed(1),
      keywords: cat.keywords,
      priority: cat.priority
    })).sort((a, b) => b.videoCount - a.videoCount)
    
    // If specific category requested, show detailed analysis
    let categoryAnalysis = null
    if (category && typeof category === 'string') {
      const categoryVideos = cache.videos.filter(video => 
        categorizeVideo(video).includes(category)
      )
      
      const categoryInfo = getCategoryInfo(category)
      
      categoryAnalysis = {
        category: {
          id: category,
          ...categoryInfo
        },
        videoCount: categoryVideos.length,
        sampleVideos: categoryVideos.slice(0, 10).map(video => ({
          id: video.id,
          title: video.title,
          tags: video.tags?.slice(0, 3) || [],
          publishedAt: video.publishedAt
        })),
        commonTags: getCommonTags(categoryVideos),
        titlePatterns: getCommonTitleWords(categoryVideos)
      }
    }
    
    return res.status(200).json({
      totalVideos: cache.videos.length,
      categoriesFound: Object.keys(categoryStats).filter(key => categoryStats[key] > 0).length,
      categoryStats,
      categoryBreakdown,
      sampleVideos,
      categoryAnalysis,
      lastUpdated: cache.lastUpdated
    })

  } catch (error) {
    console.error('❌ Category analysis error:', error)
    return res.status(500).json({ error: 'Failed to analyze categories' })
  }
}

// Helper function to find common tags in a category
function getCommonTags(videos: any[]): { tag: string; count: number }[] {
  const tagCounts: Record<string, number> = {}
  
  videos.forEach(video => {
    if (video.tags) {
      video.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

// Helper function to find common title words
function getCommonTitleWords(videos: any[]): { word: string; count: number }[] {
  const wordCounts: Record<string, number> = {}
  
  videos.forEach(video => {
    const words = video.title.toLowerCase()
      .split(/\s+/)
      .filter((word: string) => word.length > 3)
      .filter((word: string) => !['this', 'that', 'with', 'from', 'they', 'have', 'been', 'will', 'were', 'said', 'each', 'which', 'their', 'time', 'more', 'very', 'what', 'know', 'just', 'first', 'into', 'over', 'think', 'also', 'your', 'work', 'life', 'only', 'can', 'still', 'should', 'after', 'being', 'now', 'made', 'before', 'here', 'through', 'when', 'where', 'much', 'some', 'these', 'many', 'would', 'there'].includes(word))
    
    words.forEach((word: string) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1
    })
  })
  
  return Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
}
