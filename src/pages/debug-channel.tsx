import React, { useState } from 'react'
import { Container, Title, Button, Card, Text, TextInput, Code, Alert } from '@mantine/core'

export default function DebugChannelPage() {
  const [channelId, setChannelId] = useState('UCyAYiT5XYUcOaOlzn32qROA')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testChannelId = async () => {
    setLoading(true)
    setResult(null)

    try {
      const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

      // Test 1: Get channel info
      console.log('Testing channel ID:', channelId)
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
      )

      const channelData = await channelResponse.json()
      console.log('Channel response:', channelData)

      // Test 2: Get videos from this channel
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${API_KEY}`
      )

      const videosData = await videosResponse.json()
      console.log('Videos response:', videosData)

      // Test 3: Try different search queries for ADMI
      const searchQueries = [
        'Africa Digital Media Institute',
        'ADMI Africa',
        'ADMI Kenya',
        'Digital Media Institute Kenya',
        'ADMI Nairobi'
      ]

      let searchData = { items: [] }
      for (const query of searchQueries) {
        try {
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
        } catch (error) {
          console.error(`Search failed for query "${query}":`, error)
        }
      }

      console.log('Final search response:', searchData)

      // Test 4: Try to find channel by handle (this might not work with current API)
      let handleData = null
      try {
        const handleResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=@ADMIafrica&type=channel&maxResults=5&key=${API_KEY}`
        )
        if (handleResponse.ok) {
          handleData = await handleResponse.json()
          console.log('Handle search response:', handleData)
        }
      } catch (error) {
        console.error('Handle search failed:', error)
      }

      setResult({
        channelData,
        videosData,
        searchData,
        handleData,
        channelFound: channelData.items && channelData.items.length > 0,
        videosFound: videosData.items ? videosData.items.length : 0,
        searchFound: searchData.items ? searchData.items.length : 0,
        handleFound: handleData?.items ? handleData.items.length : 0
      })
    } catch (error) {
      console.error('Error:', error)
      setResult({ error: (error as Error).message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">
        Debug ADMI Channel ID
      </Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Title order={3} mb="md">
          Test Channel ID
        </Title>
        <TextInput
          label="Channel ID to test"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
          mb="md"
        />
        <Button onClick={testChannelId} loading={loading}>
          Test Channel ID
        </Button>
      </Card>

      {result && (
        <div>
          {result.error ? (
            <Alert color="red" mb="md">
              <Text fw={500}>Error: {result.error}</Text>
            </Alert>
          ) : (
            <div>
              <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
                <Title order={4} mb="md">
                  Channel Test Results
                </Title>
                <Text>
                  <strong>Channel Found:</strong> {result.channelFound ? 'Yes' : 'No'}
                </Text>
                <Text>
                  <strong>Videos Found:</strong> {result.videosFound}
                </Text>
                <Text>
                  <strong>Search Results:</strong> {result.searchFound}
                </Text>

                {result.channelFound && result.channelData.items[0] && (
                  <div>
                    <Text mt="md">
                      <strong>Channel Name:</strong> {result.channelData.items[0].snippet.title}
                    </Text>
                    <Text>
                      <strong>Description:</strong> {result.channelData.items[0].snippet.description.substring(0, 100)}
                      ...
                    </Text>
                    <Text>
                      <strong>Subscribers:</strong> {result.channelData.items[0].statistics?.subscriberCount || 'N/A'}
                    </Text>
                    <Text>
                      <strong>Videos:</strong> {result.channelData.items[0].statistics?.videoCount || 'N/A'}
                    </Text>
                  </div>
                )}
              </Card>

              {result.videosFound > 0 && (
                <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
                  <Title order={4} mb="md">
                    Videos from This Channel
                  </Title>
                  {result.videosData.items.map((video: any, index: number) => (
                    <div key={video.id.videoId} style={{ marginBottom: '8px' }}>
                      <Text fw={500}>
                        {index + 1}. {video.snippet.title}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Channel: {video.snippet.channelTitle}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Published: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                      </Text>
                    </div>
                  ))}
                </Card>
              )}

              {result.searchFound > 0 && (
                <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
                  <Title order={4} mb="md">
                    ADMI Channels Found in Search
                  </Title>
                  {result.searchData.items.map((channel: any, index: number) => (
                    <div key={channel.snippet.channelId} style={{ marginBottom: '8px' }}>
                      <Text fw={500}>
                        {index + 1}. {channel.snippet.title}
                      </Text>
                      <Text size="sm" c="dimmed">
                        ID: {channel.snippet.channelId}
                      </Text>
                      <Text size="sm">{channel.snippet.description.substring(0, 100)}...</Text>
                      {channel.snippet.channelId === channelId && (
                        <Text size="sm" c="green" fw={500}>
                          ✅ This matches the test channel ID!
                        </Text>
                      )}
                    </div>
                  ))}
                </Card>
              )}

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Raw API Responses
                </Title>
                <Code block style={{ fontSize: '12px', maxHeight: '300px', overflow: 'auto' }}>
                  {JSON.stringify(result, null, 2)}
                </Code>
              </Card>
            </div>
          )}
        </div>
      )}

      <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl" bg="gray.0">
        <Title order={4} mb="md">
          Channel IDs to Test
        </Title>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <Button size="xs" variant="light" onClick={() => setChannelId('UCyAYiT5XYUcOaOlzn32qROA')}>
            UCyAYiT5XYUcOaOlzn32qROA (Current)
          </Button>
          <Button size="xs" variant="light" onClick={() => setChannelId('UC_x5XG1OV2P6uZZ5FSM9Ttw')}>
            UC_x5XG1OV2P6uZZ5FSM9Ttw (Old)
          </Button>
          <Button size="xs" variant="light" onClick={() => setChannelId('UCxxxxxxxxxxxxxxxxxxxxxx')}>
            Invalid ID (Test)
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="xs" variant="light" onClick={() => setChannelId('UC-9-kyTW8ZkZNDHQJ6FgpwQ')}>
            UC-9-kyTW8ZkZNDHQJ6FgpwQ (Music)
          </Button>
          <Button size="xs" variant="light" onClick={() => setChannelId('UCuAXFkgsw1L7xaCfnd5JJOw')}>
            UCuAXFkgsw1L7xaCfnd5JJOw (Random)
          </Button>
        </div>
      </Card>
    </Container>
  )
}
