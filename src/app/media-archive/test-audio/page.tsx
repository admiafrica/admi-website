'use client'

import { Container, Title, Card, Button, Stack } from '@mantine/core'
import { useState } from 'react'
import { MainLayout } from '@/layouts/v3/MainLayout'

export default function TestAudioPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  const testAudio = () => {
    const audio = new Audio(
      'https://d17qqznw1g499t.cloudfront.net/media-archive/audio/creative-minds-podcast-ai-design.mp3'
    )

    audio.addEventListener('canplay', () => {
      console.log('Audio can play')
      audio
        .play()
        .then(() => {
          console.log('Audio playing successfully')
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Play failed:', error)
        })
    })

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e)
      console.error('Audio error details:', audio.error)
    })

    audio.load()
  }

  return (
    <MainLayout>
      <Container size="sm" py={80}>
        <Stack gap={20}>
          <Title>Audio Test Page</Title>

          <Card padding="lg">
            <Title order={3} mb={16}>
              Simple Audio Test
            </Title>
            <Button onClick={testAudio}>Test Audio Playback</Button>
            {isPlaying && <p>Audio is playing!</p>}
          </Card>

          <Card padding="lg">
            <Title order={3} mb={16}>
              Native HTML5 Audio
            </Title>
            <audio
              controls
              preload="metadata"
              src="https://d17qqznw1g499t.cloudfront.net/media-archive/audio/creative-minds-podcast-ai-design.mp3"
            >
              Your browser does not support the audio element.
            </audio>
          </Card>

          <Card padding="lg">
            <Title order={3} mb={16}>
              WAV File Test
            </Title>
            <audio
              controls
              preload="metadata"
              src="https://d17qqznw1g499t.cloudfront.net/media-archive/audio/nairobi-nights-soundtrack.wav"
            >
              Your browser does not support the audio element.
            </audio>
          </Card>
        </Stack>
      </Container>
    </MainLayout>
  )
}
