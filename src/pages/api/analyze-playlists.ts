import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const API_KEY = process.env.YOUTUBE_API_KEY
    const CHANNEL_ID = process.env.ADMI_YOUTUBE_CHANNEL_ID || 'UCqLmokG6Req2pHn2p7D8WZQ'
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' })
    }

    console.log('🔍 Fetching playlists for ADMI channel...')
    
    // Get all playlists from ADMI channel
    const playlistsUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`
    
    const playlistsResponse = await fetch(playlistsUrl)
    
    if (!playlistsResponse.ok) {
      const errorText = await playlistsResponse.text()
      console.error('❌ Playlists API error:', playlistsResponse.status, errorText)
      return res.status(500).json({ 
        error: `Playlists API error: ${playlistsResponse.status}`,
        details: errorText
      })
    }
    
    const playlistsData = await playlistsResponse.json()
    console.log('📋 Found playlists:', playlistsData.items?.length || 0)
    
    if (!playlistsData.items || playlistsData.items.length === 0) {
      return res.status(200).json({
        message: 'No playlists found',
        playlists: [],
        totalPlaylists: 0
      })
    }
    
    // Get detailed playlist information
    const playlists = await Promise.all(
      playlistsData.items.map(async (playlist: any) => {
        try {
          // Get first few videos from each playlist to understand content
          const playlistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist.id}&maxResults=5&key=${API_KEY}`
          const itemsResponse = await fetch(playlistItemsUrl)
          
          let sampleVideos = []
          if (itemsResponse.ok) {
            const itemsData = await itemsResponse.json()
            sampleVideos = itemsData.items?.map((item: any) => ({
              videoId: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              publishedAt: item.snippet.publishedAt
            })) || []
          }
          
          return {
            id: playlist.id,
            title: playlist.snippet.title,
            description: playlist.snippet.description,
            publishedAt: playlist.snippet.publishedAt,
            videoCount: playlist.contentDetails.itemCount,
            thumbnails: playlist.snippet.thumbnails,
            sampleVideos
          }
        } catch (error) {
          console.error(`Error fetching playlist ${playlist.id}:`, error)
          return {
            id: playlist.id,
            title: playlist.snippet.title,
            description: playlist.snippet.description,
            publishedAt: playlist.snippet.publishedAt,
            videoCount: playlist.contentDetails.itemCount,
            thumbnails: playlist.snippet.thumbnails,
            sampleVideos: [],
            error: 'Failed to fetch sample videos'
          }
        }
      })
    )
    
    // Sort playlists by video count (descending)
    playlists.sort((a, b) => (b.videoCount || 0) - (a.videoCount || 0))
    
    return res.status(200).json({
      channelId: CHANNEL_ID,
      totalPlaylists: playlists.length,
      playlists,
      suggestions: {
        recommendedPlaylists: [
          'Student Showcase',
          'Course Tutorials',
          'Facilities Tour',
          'Testimonials & Success Stories',
          'Music Production',
          'Film & TV Production',
          'Animation & VFX',
          'Graphic Design',
          'Digital Marketing',
          'Photography',
          'Events & Workshops',
          'Industry Insights'
        ],
        keywordStrategy: {
          description: 'Add these keywords to video descriptions for better categorization',
          keywords: {
            'student-work': ['#StudentShowcase', '#StudentWork', '#Portfolio', '#FinalProject'],
            'tutorials': ['#Tutorial', '#HowTo', '#CourseContent', '#Learning'],
            'testimonials': ['#Testimonial', '#SuccessStory', '#Graduate', '#Alumni'],
            'facilities': ['#FacilitiesTour', '#Studio', '#Equipment', '#Campus'],
            'events': ['#Event', '#Workshop', '#Graduation', '#OpenDay'],
            'music': ['#MusicProduction', '#Audio', '#Recording', '#SoundDesign'],
            'film': ['#FilmProduction', '#VideoProduction', '#Cinematography'],
            'animation': ['#Animation', '#VFX', '#MotionGraphics', '#3D'],
            'design': ['#GraphicDesign', '#Branding', '#VisualDesign'],
            'marketing': ['#DigitalMarketing', '#SocialMedia', '#ContentStrategy'],
            'photography': ['#Photography', '#PhotoShoot', '#PortraitPhotography']
          }
        }
      }
    })

  } catch (error) {
    console.error('❌ Playlist analysis error:', error)
    
    return res.status(500).json({
      error: 'Playlist analysis failed',
      message: (error as Error).message
    })
  }
}
