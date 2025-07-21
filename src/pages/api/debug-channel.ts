import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const API_KEY = process.env.YOUTUBE_API_KEY
    const CHANNEL_ID = process.env.ADMI_YOUTUBE_CHANNEL_ID || 'UCqLmokG6Req2pHn2p7D8WZQ'
    
    console.log('🔍 Debug: Channel ID being used:', CHANNEL_ID)
    console.log('🔧 Debug: API Key available:', !!API_KEY)
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' })
    }

    // First, let's verify the channel exists and get its info
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
    console.log('🌐 Channel API URL:', channelUrl.replace(API_KEY, 'API_KEY_HIDDEN'))
    
    const channelResponse = await fetch(channelUrl)
    
    if (!channelResponse.ok) {
      const errorText = await channelResponse.text()
      console.error('❌ Channel API error:', channelResponse.status, errorText)
      return res.status(500).json({ 
        error: `Channel API error: ${channelResponse.status}`,
        details: errorText
      })
    }
    
    const channelData = await channelResponse.json()
    console.log('📺 Channel data:', channelData)
    
    if (!channelData.items || channelData.items.length === 0) {
      return res.status(404).json({ 
        error: 'Channel not found',
        channelId: CHANNEL_ID
      })
    }
    
    const channel = channelData.items[0]
    
    // Now get a few videos from this channel
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=5&order=date&type=video&key=${API_KEY}`
    console.log('🎥 Videos API URL:', videosUrl.replace(API_KEY, 'API_KEY_HIDDEN'))
    
    const videosResponse = await fetch(videosUrl)
    
    if (!videosResponse.ok) {
      const errorText = await videosResponse.text()
      console.error('❌ Videos API error:', videosResponse.status, errorText)
      return res.status(500).json({ 
        error: `Videos API error: ${videosResponse.status}`,
        details: errorText
      })
    }
    
    const videosData = await videosResponse.json()
    console.log('🎬 Videos data:', videosData)
    
    return res.status(200).json({
      channelId: CHANNEL_ID,
      channel: {
        title: channel.snippet.title,
        description: channel.snippet.description,
        subscriberCount: channel.statistics.subscriberCount,
        videoCount: channel.statistics.videoCount,
        viewCount: channel.statistics.viewCount
      },
      videos: videosData.items?.map((video: any) => ({
        id: video.id.videoId,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        channelId: video.snippet.channelId,
        publishedAt: video.snippet.publishedAt
      })) || [],
      totalVideos: videosData.items?.length || 0
    })

  } catch (error) {
    console.error('❌ Debug API error:', error)
    
    return res.status(500).json({
      error: 'Debug API failed',
      message: (error as Error).message
    })
  }
}
