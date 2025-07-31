'use client'

import {
  Container,
  Title,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  TextInput,
  Select,
  Button,
  ActionIcon,
  Progress,
  Breadcrumbs,
  Anchor,
  MantineProvider,
  Loader,
  Alert
} from '@mantine/core'
import {
  IconSearch,
  IconPlayerPlay,
  IconPlayerPause,
  IconCalendar,
  IconMicrophone,
  IconHeadphones,
  IconAlertCircle,
  IconFileMusic
} from '@tabler/icons-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'
import '@mantine/core/styles.css'

interface AudioItem {
  id: string
  title: string
  description: string
  filename: string
  audioUrl: string
  duration: string
  date: string
  category: string
  speaker: string
  student?: string
  course?: string
  genre?: string
  plays: number
  size: number
  format: string
  lastModified: string
}

const categories = [
  'All',
  'Podcast',
  'Interview',
  'Tech Talk',
  'Radio Show',
  'Masterclass',
  'Speech',
  'Music',
  'Soundtrack',
  'Student Work',
  'Portfolio',
  'Composition',
  'Recording',
  'Audio'
]

export default function AudioPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({})
  const [audioItems, setAudioItems] = useState<AudioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  // Fetch audio data from API
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/media-archive/audio.json')
        const data = await response.json()

        if (data.success) {
          setAudioItems(data.audio)
          setError(null)
        } else {
          setError(data.error || 'Failed to load audio content')
        }
      } catch (err) {
        console.error('Error fetching audio:', err)
        setError('Failed to connect to audio archive')
      } finally {
        setLoading(false)
      }
    }

    fetchAudio()
  }, [])

  const filteredAudio = audioItems.filter((audio) => {
    const matchesSearch =
      audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.speaker.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || audio.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const togglePlay = (audioItem: AudioItem) => {
    const audioId = audioItem.id

    // Pause all other audio
    Object.keys(audioRefs.current).forEach((id) => {
      if (id !== audioId && audioRefs.current[id]) {
        audioRefs.current[id].pause()
      }
    })

    if (playingId === audioId) {
      // Pause current audio
      if (audioRefs.current[audioId]) {
        audioRefs.current[audioId].pause()
      }
      setPlayingId(null)
    } else {
      // Play new audio
      if (!audioRefs.current[audioId]) {
        // Create new audio element - use direct URL for better compatibility
        const audio = new Audio()
        audio.preload = 'metadata'

        // Check if browser can play the format
        const canPlayMp4 = audio.canPlayType('audio/mp4')
        const canPlayMp3 = audio.canPlayType('audio/mpeg')

        console.log('Browser audio support:', {
          mp4: canPlayMp4,
          mp3: canPlayMp3,
          filename: audioItem.filename,
          format: audioItem.format
        })

        audio.src = audioItem.audioUrl
        audioRefs.current[audioId] = audio

        // Set up event listeners
        audio.addEventListener('timeupdate', () => {
          const progressPercent = (audio.currentTime / audio.duration) * 100
          setProgress((prev) => ({ ...prev, [audioId]: progressPercent }))
          setCurrentTime((prev) => ({ ...prev, [audioId]: audio.currentTime }))
        })

        audio.addEventListener('ended', () => {
          setPlayingId(null)
          setProgress((prev) => ({ ...prev, [audioId]: 0 }))
        })

        audio.addEventListener('error', (e) => {
          console.error('Audio playback error:', e)
          console.error('Audio URL:', audioItem.audioUrl)
          console.error('Audio readyState:', audio.readyState)
          console.error('Audio networkState:', audio.networkState)
          console.error('Audio error code:', (audio.error as any)?.code)
          console.error('Audio error message:', (audio.error as any)?.message)
          setPlayingId(null)
          setError('Unable to play audio file. Please try again later.')
        })

        audio.addEventListener('canplaythrough', () => {
          console.log('Audio can play through:', audioItem.audioUrl)
        })

        audio.addEventListener('loadstart', () => {
          console.log('Audio load started:', audioItem.audioUrl)
        })
      }

      // Try to play with error handling
      setPlayingId(audioId)
      audioRefs.current[audioId].play().catch((error) => {
        console.error('Play failed:', error)
        console.error('Play error details:', {
          name: error.name,
          message: error.message,
          code: (error as any).code
        })
        setError('Unable to play audio. Please try again.')
        setPlayingId(null)
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <MantineProvider>
      <MainLayout>
        <Container size="xl" py={80}>
          <Stack gap={40}>
            <div>
              <Breadcrumbs mb={20}>
                <Link href="/media-archive" passHref legacyBehavior>
                  <Anchor>Media Archive</Anchor>
                </Link>
                <Anchor>Audio</Anchor>
              </Breadcrumbs>

              <Title order={1} size={40} fw={700} ta="center" mb={16}>
                Audio Library
              </Title>
              <Text ta="center" size="lg" c="dimmed" maw={600} mx="auto">
                Listen to podcasts, interviews, and recordings from ADMI events
              </Text>
            </div>

            {!loading && !error && (
              <Group gap="md" mb={20}>
                <TextInput
                  placeholder="Search audio..."
                  leftSection={<IconSearch size={18} />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ flex: 1 }}
                />
                <Select
                  placeholder="Category"
                  data={categories}
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value || 'All')}
                  w={200}
                />
              </Group>
            )}

            {loading && (
              <Stack align="center" py={60}>
                <Loader size="lg" />
                <Text c="dimmed">Loading audio content...</Text>
              </Stack>
            )}

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} title="Unable to load audio content" color="red" mb={20}>
                {error}
              </Alert>
            )}

            {!loading && !error && (
              <Stack gap="md">
                {filteredAudio.map((audio) => (
                  <Card key={audio.id} shadow="sm" padding="lg" radius="md" withBorder>
                    <Group align="flex-start" gap="md">
                      <ActionIcon size={48} radius="xl" variant="filled" color="blue" onClick={() => togglePlay(audio)}>
                        {playingId === audio.id ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
                      </ActionIcon>

                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Group justify="space-between" align="flex-start">
                          <div>
                            <Title order={4} mb={4}>
                              {audio.title}
                            </Title>
                            <Text size="sm" c="dimmed" mb={8}>
                              {audio.description}
                            </Text>
                          </div>
                        </Group>

                        {playingId === audio.id && (
                          <Stack gap="xs">
                            <Progress value={progress[audio.id] || 0} size="sm" radius="xl" color="blue" />
                            <Group justify="space-between">
                              <Text size="xs" c="dimmed">
                                {formatTime(currentTime[audio.id] || 0)}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {audio.duration}
                              </Text>
                            </Group>
                          </Stack>
                        )}

                        <Group gap="xs" wrap="wrap">
                          <Badge color="blue" variant="light" size="sm">
                            {audio.category}
                          </Badge>
                          {audio.genre && (
                            <Badge color="green" variant="light" size="sm">
                              {audio.genre}
                            </Badge>
                          )}
                          <Group gap={4}>
                            <IconMicrophone size={14} />
                            <Text size="xs" c="dimmed">
                              {audio.student ? `Student: ${audio.student}` : audio.speaker}
                            </Text>
                          </Group>
                          {audio.course && (
                            <Group gap={4}>
                              <Text size="xs" c="dimmed" fw={500}>
                                Course: {audio.course}
                              </Text>
                            </Group>
                          )}
                          <Group gap={4}>
                            <IconCalendar size={14} />
                            <Text size="xs" c="dimmed">
                              {new Date(audio.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </Text>
                          </Group>
                          <Group gap={4}>
                            <IconHeadphones size={14} />
                            <Text size="xs" c="dimmed">
                              {audio.plays} plays
                            </Text>
                          </Group>
                          <Group gap={4}>
                            <IconFileMusic size={14} />
                            <Text size="xs" c="dimmed">
                              {audio.format}
                            </Text>
                          </Group>
                          {!playingId && (
                            <Text size="xs" c="dimmed" fw={500}>
                              {audio.duration}
                            </Text>
                          )}
                        </Group>
                      </Stack>
                    </Group>
                  </Card>
                ))}
              </Stack>
            )}

            {!loading && !error && filteredAudio.length === 0 && (
              <Text ta="center" c="dimmed" py={60}>
                {audioItems.length === 0
                  ? 'No audio content found in media archive'
                  : 'No audio matches your search criteria'}
              </Text>
            )}

            <Group justify="center" mt={40}>
              <Button variant="outline" size="md">
                Load More Audio
              </Button>
            </Group>
          </Stack>
        </Container>
      </MainLayout>
    </MantineProvider>
  )
}
