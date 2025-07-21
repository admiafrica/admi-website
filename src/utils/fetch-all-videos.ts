import { CachedVideo, VideoCache, writeVideoCache } from './video-cache'

// Helper functions
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

// Fetch ALL videos from ADMI channel with pagination
export async function fetchAllADMIVideos(): Promise<VideoCache> {
  const API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = process.env.ADMI_YOUTUBE_CHANNEL_ID || 'UCqLmokG6Req2pHn2p7D8WZQ'
  
  if (!API_KEY) {
    throw new Error('YouTube API key not configured')
  }

  console.log('🚀 Starting to fetch ALL ADMI videos...')
  
  try {
    // First, get channel information
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    const channelResponse = await fetch(channelUrl)
    
    if (!channelResponse.ok) {
      throw new Error(`Channel API error: ${channelResponse.status}`)
    }
    
    const channelData = await channelResponse.json()
    const channel = channelData.items[0]
    
    console.log(`📺 Channel: ${channel.snippet.title}`)
    console.log(`📊 Total videos in channel: ${channel.statistics.videoCount}`)
    
    // Fetch ALL videos using pagination
    const allVideos: any[] = []
    let nextPageToken = ''
    let pageCount = 0
    const maxResults = 50 // Maximum per page
    
    do {
      pageCount++
      console.log(`📄 Fetching page ${pageCount}...`)
      
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${maxResults}&order=date&type=video&key=${API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
      
      const searchResponse = await fetch(searchUrl)
      
      if (!searchResponse.ok) {
        throw new Error(`Search API error: ${searchResponse.status}`)
      }
      
      const searchData = await searchResponse.json()
      
      if (searchData.items && searchData.items.length > 0) {
        allVideos.push(...searchData.items)
        console.log(`✅ Page ${pageCount}: ${searchData.items.length} videos (Total so far: ${allVideos.length})`)
      }
      
      nextPageToken = searchData.nextPageToken || ''
      
      // Safety check to prevent infinite loops
      if (pageCount > 20) {
        console.log('⚠️ Reached maximum page limit (20), stopping pagination')
        break
      }
      
    } while (nextPageToken)
    
    console.log(`🎬 Total videos fetched: ${allVideos.length}`)
    
    if (allVideos.length === 0) {
      throw new Error('No videos found for the channel')
    }
    
    // Get detailed information for all videos (in batches of 50)
    const detailedVideos: CachedVideo[] = []
    const batchSize = 50
    
    for (let i = 0; i < allVideos.length; i += batchSize) {
      const batch = allVideos.slice(i, i + batchSize)
      const videoIds = batch.map(video => video.id.videoId).join(',')
      
      console.log(`🔍 Getting details for batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allVideos.length / batchSize)}...`)
      
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
      const detailsResponse = await fetch(detailsUrl)
      
      if (detailsResponse.ok) {
        const detailsData = await detailsResponse.json()
        
        const batchVideos = detailsData.items.map((video: any) => ({
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
          likeCount: video.statistics.likeCount || '0',
          channelTitle: video.snippet.channelTitle,
          tags: video.snippet.tags || [],
          categoryId: video.snippet.categoryId || ''
        }))
        
        detailedVideos.push(...batchVideos)
        console.log(`✅ Batch complete: ${batchVideos.length} videos processed`)
      }
    }
    
    // Create cache object
    const cache: VideoCache = {
      videos: detailedVideos,
      lastUpdated: new Date().toISOString(),
      totalVideos: detailedVideos.length,
      channelInfo: {
        title: channel.snippet.title,
        description: channel.snippet.description,
        subscriberCount: channel.statistics.subscriberCount,
        videoCount: channel.statistics.videoCount,
        viewCount: channel.statistics.viewCount
      }
    }
    
    // Save to cache
    writeVideoCache(cache)
    
    console.log(`🎉 Successfully cached ${detailedVideos.length} ADMI videos!`)
    
    return cache
    
  } catch (error) {
    console.error('❌ Error fetching all ADMI videos:', error)
    throw error
  }
}
