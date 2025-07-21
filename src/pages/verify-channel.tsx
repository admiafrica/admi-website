import React, { useState, useEffect } from 'react'
import { Container, Title, Card, Text, Button, Alert, Code, Loader } from '@mantine/core'

export default function VerifyChannelPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    verifyChannel()
  }, [])

  const verifyChannel = async () => {
    setLoading(true)
    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
      const CHANNEL_ID = 'UCqLmokG6Req2pHn2p7D8WZQ' // Correct ID from page source
      
      console.log('🔍 Testing Channel ID:', CHANNEL_ID)
      
      // Test 1: Get channel information
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${CHANNEL_ID}&key=${API_KEY}`
      )
      
      if (!channelResponse.ok) {
        throw new Error(`Channel API failed: ${channelResponse.status}`)
      }
      
      const channelData = await channelResponse.json()
      console.log('📺 Channel Data:', channelData)
      
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found with this ID')
      }
      
      const channel = channelData.items[0]
      
      // Test 2: Get recent videos from this channel
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=5&order=date&type=video&key=${API_KEY}`
      )
      
      let videos = []
      if (videosResponse.ok) {
        const videosData = await videosResponse.json()
        videos = videosData.items || []
        console.log('🎥 Videos found:', videos.length)
      }
      
      // Test 3: Check if this looks like ADMI
      const isLikelyADMI = (
        channel.snippet.title.toLowerCase().includes('admi') ||
        channel.snippet.title.toLowerCase().includes('africa') ||
        channel.snippet.title.toLowerCase().includes('digital') ||
        channel.snippet.title.toLowerCase().includes('media') ||
        channel.snippet.description.toLowerCase().includes('admi') ||
        channel.snippet.description.toLowerCase().includes('africa digital media')
      )
      
      setResult({
        channel,
        videos,
        isLikelyADMI,
        channelId: CHANNEL_ID,
        success: true
      })
      
    } catch (error) {
      console.error('❌ Error:', error)
      setResult({
        error: error.message,
        success: false
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl" ta="center">
        Verify ADMI YouTube Channel ID
      </Title>

      {loading ? (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <div style={{ textAlign: 'center' }}>
            <Loader size="lg" mb="md" />
            <Text>Verifying channel ID: UCqLmokG6Req2pHn2p7D8WZQ</Text>
          </div>
        </Card>
      ) : result?.success ? (
        <div>
          <Alert color={result.isLikelyADMI ? "green" : "orange"} mb="md">
            <Text fw={500}>
              {result.isLikelyADMI ? "✅ This looks like the ADMI channel!" : "⚠️ This might not be the ADMI channel"}
            </Text>
          </Alert>

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={3} mb="md">Channel Information</Title>
            <Text><strong>Channel Name:</strong> {result.channel.snippet.title}</Text>
            <Text><strong>Channel ID:</strong> {result.channelId}</Text>
            <Text><strong>Subscribers:</strong> {result.channel.statistics.subscriberCount?.toLocaleString() || 'Hidden'}</Text>
            <Text><strong>Total Videos:</strong> {result.channel.statistics.videoCount?.toLocaleString() || 'Unknown'}</Text>
            <Text><strong>Total Views:</strong> {result.channel.statistics.viewCount?.toLocaleString() || 'Unknown'}</Text>
            <Text><strong>Created:</strong> {new Date(result.channel.snippet.publishedAt).toLocaleDateString()}</Text>
            
            <Title order={4} mt="md" mb="xs">Description:</Title>
            <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
              {result.channel.snippet.description.substring(0, 300)}
              {result.channel.snippet.description.length > 300 && '...'}
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Title order={3} mb="md">Recent Videos ({result.videos.length})</Title>
            {result.videos.length > 0 ? (
              result.videos.map((video: any, index: number) => (
                <div key={video.id.videoId} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #eee' }}>
                  <Text fw={500}>{index + 1}. {video.snippet.title}</Text>
                  <Text size="sm" c="dimmed">
                    Published: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Channel: {video.snippet.channelTitle}
                  </Text>
                </div>
              ))
            ) : (
              <Text c="dimmed">No recent videos found</Text>
            )}
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Verification Checklist</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Text size="sm">
                {result.channel.snippet.title.toLowerCase().includes('admi') ? '✅' : '❌'} 
                {' '}Channel name contains "ADMI"
              </Text>
              <Text size="sm">
                {result.channel.snippet.title.toLowerCase().includes('africa') ? '✅' : '❌'} 
                {' '}Channel name contains "Africa"
              </Text>
              <Text size="sm">
                {result.channel.snippet.description.toLowerCase().includes('digital media') ? '✅' : '❌'} 
                {' '}Description mentions "digital media"
              </Text>
              <Text size="sm">
                {result.videos.length > 0 ? '✅' : '❌'} 
                {' '}Has recent videos
              </Text>
              <Text size="sm">
                {parseInt(result.channel.statistics.subscriberCount) > 100 ? '✅' : '❌'} 
                {' '}Has reasonable subscriber count
              </Text>
            </div>
          </Card>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Button 
              color={result.isLikelyADMI ? "green" : "orange"}
              size="lg"
              onClick={() => {
                if (result.isLikelyADMI) {
                  alert('✅ This appears to be the correct ADMI channel! You can use this channel ID.')
                } else {
                  alert('⚠️ This might not be the ADMI channel. Please verify manually.')
                }
              }}
            >
              {result.isLikelyADMI ? 'Confirm This Channel' : 'Need Different Channel'}
            </Button>
          </div>
        </div>
      ) : (
        <Alert color="red">
          <Text fw={500}>❌ Error verifying channel</Text>
          <Text size="sm">{result?.error}</Text>
          <Button variant="light" mt="md" onClick={verifyChannel}>
            Try Again
          </Button>
        </Alert>
      )}

      <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl" bg="gray.0">
        <Title order={4} mb="md">How to Find the Correct Channel ID</Title>
        <Text size="sm" mb="xs">1. Go to the ADMI YouTube channel: https://www.youtube.com/@ADMIafrica</Text>
        <Text size="sm" mb="xs">2. Right-click and "View page source"</Text>
        <Text size="sm" mb="xs">3. Search for "channelId" or "externalId"</Text>
        <Text size="sm" mb="xs">4. Copy the ID that starts with "UC"</Text>
        <Text size="sm">5. Test it here to verify it's correct</Text>
      </Card>
    </Container>
  )
}
