import React, { useState, useEffect } from 'react'
import { Container, Title, Text, Button, Card, Code, Alert } from '@mantine/core'
import { IconCheck, IconX, IconLoader } from '@tabler/icons-react'

// Simple test page to verify YouTube API integration
export default function TestYouTubePage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    testYouTubeAPI()
  }, [])

  const testYouTubeAPI = async () => {
    try {
      setStatus('loading')
      setError('')

      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      const CHANNEL_ID = process.env.NEXT_PUBLIC_ADMI_YOUTUBE_CHANNEL_ID || 'UCyAYiT5XYUcOaOlzn32qROA'

      if (!API_KEY) {
        throw new Error('YouTube API key not found in environment variables')
      }

      // First, let's search for ADMI channels to find the correct ID
      console.log('🔍 Searching for ADMI channels...')

      // Try multiple search terms to find the channel
      const searchQueries = ['Africa Digital Media Institute ADMI', 'ADMI Africa', '@ADMIafrica', 'ADMIafrica']

      let searchData = null
      for (const query of searchQueries) {
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=channel&maxResults=10&key=${API_KEY}`
        )

        if (searchResponse.ok) {
          const data = await searchResponse.json()
          if (data.items && data.items.length > 0) {
            searchData = data
            console.log(
              `Found channels with query "${query}":`,
              data.items.map((item: any) => item.snippet.title)
            )
            break
          }
        }
      }

      if (!searchData) {
        throw new Error('No ADMI channels found with any search query')
      }

      console.log('Search results:', searchData)

      // Test the current channel ID
      console.log('Testing channel ID:', CHANNEL_ID)
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
      )

      let channelData = null
      if (channelResponse.ok) {
        channelData = await channelResponse.json()
        console.log('Channel data:', channelData)
      } else {
        console.error('Channel response error:', channelResponse.status)
      }

      // Get videos specifically from the ADMI channel ID
      console.log('Fetching videos for channel:', CHANNEL_ID)
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&order=date&type=video&key=${API_KEY}`
      )

      let videosData = null
      if (videosResponse.ok) {
        videosData = await videosResponse.json()
        console.log('Videos data:', videosData)
        console.log('Videos found:', videosData.items?.length || 0)

        // Log each video's channel to verify
        videosData.items?.forEach((video: any, index: number) => {
          console.log(`Video ${index + 1}:`, {
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            channelId: video.snippet.channelId
          })
        })
      } else {
        console.error('Videos response error:', videosResponse.status)
        const errorData = await videosResponse.json()
        console.error('Error details:', errorData)
      }

      setResult({
        searchResults: searchData?.items || [],
        channel: channelData?.items?.[0] || null,
        videos: videosData?.items || [],
        apiKey: API_KEY.substring(0, 10) + '...',
        channelId: CHANNEL_ID,
        channelFound: !!channelData?.items?.[0],
        videosFound: videosData?.items?.length || 0
      })
      setStatus('success')
    } catch (err: any) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl" ta="center">
        YouTube API Integration Test
      </Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <div className="mb-4 flex items-center gap-3">
          {status === 'loading' && <IconLoader className="animate-spin" />}
          {status === 'success' && <IconCheck color="green" />}
          {status === 'error' && <IconX color="red" />}

          <Title order={3}>
            {status === 'loading' && 'Testing YouTube API...'}
            {status === 'success' && 'YouTube API Working!'}
            {status === 'error' && 'YouTube API Error'}
          </Title>
        </div>

        {status === 'error' && (
          <Alert color="red" mb="md">
            <Text fw={500}>Error Details:</Text>
            <Text size="sm">{error}</Text>
          </Alert>
        )}

        {status === 'success' && result && (
          <div>
            <Alert color="green" mb="md">
              <Text fw={500}>✅ YouTube API is working correctly!</Text>
            </Alert>

            <Title order={4} mb="md">
              Search Results for "ADMI" ({result.searchResults.length} found):
            </Title>
            {result.searchResults.map((channel: any, index: number) => (
              <Card key={channel.snippet.channelId} withBorder p="md" mb="sm">
                <Text fw={500}>
                  {index + 1}. {channel.snippet.title}
                </Text>
                <Text size="sm" c="dimmed">
                  Channel ID: {channel.snippet.channelId}
                </Text>
                <Text size="sm">{channel.snippet.description.substring(0, 100)}...</Text>
                {channel.snippet.channelId === result.actualChannelId && (
                  <Text size="sm" c="green" fw={500}>
                    ← Using this channel
                  </Text>
                )}
              </Card>
            ))}

            {result.channel && (
              <>
                <Title order={4} mb="md">
                  Channel Information:
                </Title>
                <Card withBorder p="md" mb="md">
                  <Text>
                    <strong>Name:</strong> {result.channel.snippet.title}
                  </Text>
                  <Text>
                    <strong>Subscribers:</strong> {result.channel.statistics?.subscriberCount || 'N/A'}
                  </Text>
                  <Text>
                    <strong>Total Videos:</strong> {result.channel.statistics?.videoCount || 'N/A'}
                  </Text>
                  <Text>
                    <strong>Total Views:</strong> {result.channel.statistics?.viewCount || 'N/A'}
                  </Text>
                </Card>
              </>
            )}

            <Title order={4} mb="md">
              Videos from Channel ({result.videos.length}):
            </Title>
            {result.videos.length > 0 ? (
              result.videos.map((video: any, index: number) => (
                <Card key={video.id.videoId} withBorder p="md" mb="sm">
                  <Text fw={500}>
                    {index + 1}. {video.snippet.title}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Channel: {video.snippet.channelTitle} (ID: {video.snippet.channelId})
                  </Text>
                  <Text size="sm" c="dimmed">
                    Published: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </Text>
                  {video.snippet.channelId !== result.channelId && (
                    <Text size="sm" c="red" fw={500}>
                      ⚠️ This video is NOT from the target channel!
                    </Text>
                  )}
                </Card>
              ))
            ) : (
              <Text c="orange">No videos found for this channel</Text>
            )}

            <Title order={4} mb="md">
              Debug Information:
            </Title>
            <Code block>
              API Key: {result.apiKey}
              {'\n'}Target Channel ID: {result.channelId}
              {'\n'}Channel Found: {result.channelFound ? 'Yes' : 'No'}
              {'\n'}Videos Found: {result.videosFound}
              {'\n'}Environment: {process.env.NODE_ENV}
            </Code>

            {result.channelFound && result.channel && (
              <Alert color="green" mt="md">
                <Text fw={500}>✅ Channel Verified: {result.channel.snippet.title}</Text>
                <Text size="sm">This is the correct ADMI channel</Text>
              </Alert>
            )}

            {!result.channelFound && (
              <Alert color="red" mt="md">
                <Text fw={500}>❌ Channel Not Found</Text>
                <Text size="sm">The channel ID might be incorrect</Text>
              </Alert>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button onClick={testYouTubeAPI} loading={status === 'loading'}>
            Test Again
          </Button>
          <Button variant="outline" component="a" href="/media-archive/videos">
            Go to Video Gallery
          </Button>
          <Button variant="outline" component="a" href="/courses/film-and-television-production-diploma">
            Test Course Page
          </Button>
        </div>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder bg="gray.0">
        <Title order={4} mb="md">
          Troubleshooting Tips:
        </Title>
        <Text size="sm" mb="xs">
          • Make sure NEXT_PUBLIC_YOUTUBE_API_KEY is set in your .env file
        </Text>
        <Text size="sm" mb="xs">
          • Verify the API key has YouTube Data API v3 enabled
        </Text>
        <Text size="sm" mb="xs">
          • Check that the API key allows requests from localhost:3000
        </Text>
        <Text size="sm" mb="xs">
          • Ensure the channel ID is correct for ADMI's YouTube channel
        </Text>
      </Card>
    </Container>
  )
}
