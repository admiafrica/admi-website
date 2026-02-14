'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Group,
  Button,
  TextInput,
  Select,
  Badge,
  Loader,
  Center,
  Box,
  Modal,
  AspectRatio,
  Tabs,
  ScrollArea,
  Divider,
  Stack,
  Breadcrumbs,
  Anchor,
  MantineProvider
} from '@/lib/tw-mantine'
import {
  IconSearch,
  IconPlayerPlay,
  IconExternalLink,
  IconEye,
  IconClock,
  IconCalendar,
  IconTag
} from '@tabler/icons-react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'

// We'll need to adapt this for App Router - for now using client-side data loading
// In a full implementation, this would use proper App Router data fetching

// Helper function to format large numbers
const formatLargeNumber = (num: string): string => {
  const number = parseInt(num)

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`
  }

  return number.toString()
}

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: {
    default: string
    medium: string
    high: string
  }
  publishedAt: string
  duration: string
  viewCount: string
  channelTitle: string
  tags?: string[]
}

export default function VideoGallery() {
  // State for video data - in full implementation this would come from server-side data
  const [allVideosList, setAllVideosList] = useState<any[]>([])
  const [filteredVideos, setFilteredVideos] = useState<any[]>([])
  const [displayedVideos, setDisplayedVideos] = useState<YouTubeVideo[]>([])
  const [displayCount, setDisplayCount] = useState(12)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all')
  const [selectedCourse, setSelectedCourse] = useState<string | null>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [channelInfo, setChannelInfo] = useState<any>(null)

  // Video Modal State
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [modalOpened, setModalOpened] = useState(false)

  // Videos currently visible to user (for performance)
  const visibleVideos = displayedVideos.slice(0, displayCount)

  // Get related videos based on current video
  const getRelatedVideos = (currentVideo: YouTubeVideo): YouTubeVideo[] => {
    if (!currentVideo) return []

    // Find videos with similar tags or from same category using displayed videos (full data)
    const related = displayedVideos.filter((video) => {
      if (video.id === currentVideo.id) return false

      // Check for common tags (only if both videos have tags)
      const commonTags =
        currentVideo.tags && video.tags
          ? currentVideo.tags.filter((tag: string) =>
              video.tags?.some((vTag: string) => vTag.toLowerCase().includes(tag.toLowerCase()))
            )
          : []

      // Check for similar titles (common keywords)
      const currentWords = currentVideo.title.toLowerCase().split(' ')
      const videoWords = video.title.toLowerCase().split(' ')
      const commonWords = currentWords.filter((word) => word.length > 3 && videoWords.includes(word))

      return commonTags.length > 0 || commonWords.length > 1
    })

    return related.slice(0, 6) // Return top 6 related videos
  }

  // Simple category filters
  const categories = [
    { value: 'all', label: 'All Videos' },
    { value: 'student-showcase', label: 'Student Showcase' },
    { value: 'facilities-tour', label: 'Facilities Tour' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'course-tutorials', label: 'Tutorials' },
    { value: 'events', label: 'Events' }
  ]

  // Course filters
  const courses = [
    { value: 'all', label: 'All Courses' },
    { value: 'music-production', label: 'Music Production' },
    { value: 'film-tv', label: 'Film & TV Production' },
    { value: 'animation-vfx', label: 'Animation & VFX' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'photography', label: 'Photography' }
  ]

  // Load videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true)
        // Try to use the existing API endpoint from Pages Router
        const response = await fetch('/api/admi-videos')

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`)
        }

        const data = await response.json()

        if (data.videos && data.videos.length > 0) {
          setAllVideosList(data.videos)
          setFilteredVideos(data.videos)
          setDisplayedVideos(data.videos.slice(0, 12))
          setChannelInfo(data.channelInfo)
        } else {
          // Fallback: Set a message for when API works but returns no videos
          setError('No videos available at this time. Please check back later.')
        }
      } catch (err) {
        console.error('Error loading videos:', err)
        // Provide a more informative error message
        setError(
          'Videos are temporarily unavailable. The video service may be updating. Please try again later or visit our YouTube channel directly.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  // Filter ALL videos based on search, category, and course
  useEffect(() => {
    let filtered = allVideosList

    // Apply search filter to ALL videos
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter - would use actual categorization logic
    if (selectedCategory && selectedCategory !== 'all') {
      // This would use the actual manual categorization from utils
      filtered = filtered
    }

    // Apply course filter - would use actual categorization logic
    if (selectedCourse && selectedCourse !== 'all') {
      // This would use the actual manual categorization from utils
      filtered = filtered
    }

    setFilteredVideos(filtered)
    setDisplayedVideos(filtered.slice(0, 12))

    // Reset display count when filters change for better UX
    setDisplayCount(12)
  }, [allVideosList, searchQuery, selectedCategory, selectedCourse])

  // Load more videos function
  const loadMoreVideos = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + 12, filteredVideos.length))
  }, [filteredVideos.length])

  // Infinite scroll for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (displayCount < filteredVideos.length && !loading) {
          loadMoreVideos()
        }
      }
    }

    // Only enable infinite scroll on mobile
    if (window.innerWidth <= 768) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [displayCount, filteredVideos.length, loading, loadMoreVideos])

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video)
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
    setSelectedVideo(null)
  }

  const refreshVideos = async () => {
    setLoading(true)
    try {
      // Refresh by reloading the page to get fresh server-side data
      window.location.reload()
    } catch (error) {
      console.error('Error refreshing videos:', error)
      setError('Failed to refresh videos. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <MantineProvider>
      <MainLayout>
        <Container size="xl" py="xl">
          {/* Breadcrumbs */}
          <Breadcrumbs mb="xl">
            <Link href="/media-archive" passHref legacyBehavior>
              <Anchor>Media Archive</Anchor>
            </Link>
            <Anchor>Videos</Anchor>
          </Breadcrumbs>

          {/* Header Section */}
          <Box ta="center" mb="xl">
            <Title order={1} size="h1" mb="md">
              ADMI Video Gallery
            </Title>
            <Text size="lg" c="dimmed" maw={600} mx="auto">
              Discover the ADMI experience through our video collection featuring student work, facility tours, success
              stories, and insights into creative media education.
            </Text>
          </Box>

          {/* Stats and CTA */}
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl" bg="gray.0">
            <Group justify="space-between" align="center">
              <div>
                <Group gap="xl">
                  <div>
                    <Text fw={700} size="xl" c="red">
                      {channelInfo?.videoCount ? formatLargeNumber(channelInfo.videoCount) : `${allVideosList.length}+`}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Videos
                    </Text>
                  </div>
                  <div>
                    <Text fw={700} size="xl" c="blue">
                      {channelInfo?.viewCount ? formatLargeNumber(channelInfo.viewCount) : '10M+'}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Total Views
                    </Text>
                  </div>
                  <div>
                    <Text fw={700} size="xl" c="green">
                      {channelInfo?.subscriberCount ? formatLargeNumber(channelInfo.subscriberCount) : '4K+'}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Subscribers
                    </Text>
                  </div>
                </Group>
              </div>
              <Group>
                <Button
                  variant="outline"
                  color="red"
                  leftSection={<IconExternalLink size={16} />}
                  component="a"
                  href="https://www.youtube.com/@ADMIafrica/"
                  target="_blank"
                >
                  Visit YouTube Channel
                </Button>
                <Button color="blue" component="a" href="/enquiry">
                  Enquire Now
                </Button>
              </Group>
            </Group>
          </Card>

          {/* Search and Filter Controls */}
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
            <Group justify="space-between" align="end" wrap="wrap" gap="md">
              <TextInput
                placeholder="Search videos..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(event: any) => setSearchQuery(event.currentTarget.value)}
                style={{ flex: 1, minWidth: 250 }}
                size="md"
              />
              <Select
                placeholder="Category"
                data={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                w={180}
                size="md"
                clearable
              />
              <Select
                placeholder="Course"
                data={courses}
                value={selectedCourse}
                onChange={setSelectedCourse}
                w={180}
                size="md"
                clearable
              />
              <Button variant="light" onClick={refreshVideos} loading={loading} size="md">
                Refresh
              </Button>
            </Group>
          </Card>

          {/* Results Info */}
          <Group justify="space-between" mb="md">
            <Text c="dimmed">
              Showing {Math.min(displayCount, filteredVideos.length)} of {filteredVideos.length} videos
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory &&
                selectedCategory !== 'all' &&
                ` in ${categories.find((c) => c.value === selectedCategory)?.label}`}
            </Text>
            {filteredVideos.length > displayCount && (
              <Text size="sm" c="blue">
                {filteredVideos.length - displayCount} more available
              </Text>
            )}
          </Group>

          {/* Video Grid */}
          {loading ? (
            <Center py="xl">
              <div style={{ textAlign: 'center' }}>
                <Loader size="lg" mb="md" />
                <Text>Loading ADMI videos...</Text>
              </div>
            </Center>
          ) : error ? (
            <Center py="xl">
              <div style={{ textAlign: 'center' }}>
                <Text size="lg" fw={500} mb="xs" c="red">
                  Failed to load videos
                </Text>
                <Text c="dimmed" mb="md">
                  {error}
                </Text>
                <Button variant="light" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </Center>
          ) : filteredVideos.length === 0 ? (
            <Center py="xl">
              <div style={{ textAlign: 'center' }}>
                <Text size="lg" fw={500} mb="xs">
                  No videos found
                </Text>
                <Text c="dimmed" mb="md">
                  Try adjusting your search terms or category filter
                </Text>
                <Button
                  variant="light"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Center>
          ) : (
            <>
              <Grid>
                {visibleVideos.map((video) => (
                  <Grid.Col key={video.id} span={{ base: 12, sm: 6, md: 4 }}>
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                      className="h-full cursor-pointer transition-shadow hover:shadow-lg"
                      onClick={() => handleVideoClick(video)}
                    >
                      <Card.Section>
                        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                          <Image
                            src={video.thumbnail.medium || video.thumbnail.default}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                            <div className="rounded-full bg-white bg-opacity-90 p-4">
                              <IconPlayerPlay size={32} style={{ color: '#EF7B2E' }} />
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                            {video.duration}
                          </div>

                          {/* YouTube Badge */}
                          <div className="absolute left-2 top-2">
                            <Badge color="red" variant="filled" size="xs">
                              YouTube
                            </Badge>
                          </div>
                        </div>
                      </Card.Section>

                      <div className="flex h-full flex-col">
                        <Title order={5} mt="md" lineClamp={2} className="flex-grow">
                          {video.title}
                        </Title>

                        <Text size="sm" c="dimmed" lineClamp={3} mt="xs" className="flex-grow">
                          {video.description}
                        </Text>

                        <Group justify="space-between" mt="md" align="center">
                          <Group gap="xs">
                            <Group gap={4}>
                              <IconEye size={14} style={{ color: '#666' }} />
                              <Text size="xs" c="dimmed">
                                {video.viewCount}
                              </Text>
                            </Group>
                            <Group gap={4}>
                              <IconClock size={14} style={{ color: '#666' }} />
                              <Text size="xs" c="dimmed">
                                {video.duration}
                              </Text>
                            </Group>
                          </Group>

                          <Button size="xs" variant="light" color="red" leftSection={<IconPlayerPlay size={12} />}>
                            Watch
                          </Button>
                        </Group>
                      </div>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>

              {/* Load More Button */}
              {filteredVideos.length > displayCount && (
                <Center mt="xl">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={loadMoreVideos}
                    leftSection={<IconPlayerPlay size={16} />}
                  >
                    Load More Videos ({filteredVideos.length - displayCount} remaining)
                  </Button>
                </Center>
              )}

              {/* SEO: Hidden video list for search engines */}
              <div style={{ display: 'none' }} className="seo-video-catalog">
                <h2>Complete ADMI Video Catalog</h2>
                {allVideosList.map((video) => (
                  <div key={`seo-${video.id}`} className="seo-video-item">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <span>Duration: {video.duration}</span>
                    <span>Views: {video.viewCount}</span>
                    <span>Channel: {video.channelTitle}</span>
                    <span>
                      Published:{' '}
                      {new Date(video.publishedAt).toLocaleDateString('en-KE', {
                        timeZone: 'Africa/Nairobi',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </span>
                    {video.tags && video.tags.length > 0 && <span>Tags: {video.tags.join(', ')}</span>}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Call to Action */}
          <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl" bg="red.0">
            <Group justify="space-between" align="center">
              <div>
                <Title order={3}>Ready to Create Your Own Content?</Title>
                <Text c="dimmed" mt="xs">
                  Join ADMI and learn to create professional videos, animations, and digital content
                </Text>
              </div>
              <Group>
                <Button variant="outline" color="blue" component="a" href="/courses">
                  View Courses
                </Button>
                <Button color="red" component="a" href="/enquiry">
                  Apply Today
                </Button>
              </Group>
            </Group>
          </Card>

          {/* Video Modal */}
          <Modal opened={modalOpened} onClose={closeModal} size="xl" title={null} padding={0} radius="md" centered>
            {selectedVideo && (
              <div>
                {/* Video Player */}
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    style={{ border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </AspectRatio>

                {/* Video Details */}
                <Box p="lg">
                  <Title order={3} mb="sm">
                    {selectedVideo.title}
                  </Title>

                  <Group mb="md" gap="lg">
                    <Group gap={4}>
                      <IconEye size={16} style={{ color: '#666' }} />
                      <Text size="sm" c="dimmed">
                        {selectedVideo.viewCount} views
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <IconClock size={16} style={{ color: '#666' }} />
                      <Text size="sm" c="dimmed">
                        {selectedVideo.duration}
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <IconCalendar size={16} style={{ color: '#666' }} />
                      <Text size="sm" c="dimmed">
                        {new Date(selectedVideo.publishedAt).toLocaleDateString('en-KE', {
                          timeZone: 'Africa/Nairobi',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </Group>
                  </Group>

                  <Tabs defaultValue="description">
                    <Tabs.List>
                      <Tabs.Tab value="description">Description</Tabs.Tab>
                      <Tabs.Tab value="related">Related Videos</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="description" pt="md">
                      <ScrollArea h={200}>
                        <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                          {selectedVideo.description}
                        </Text>

                        {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                          <Box mt="md">
                            <Group gap="xs">
                              <IconTag size={14} />
                              <Text size="xs" fw={500}>
                                Tags:
                              </Text>
                            </Group>
                            <Group gap="xs" mt="xs">
                              {selectedVideo.tags.slice(0, 10).map((tag, index) => (
                                <Badge key={index} size="xs" variant="light">
                                  {tag}
                                </Badge>
                              ))}
                            </Group>
                          </Box>
                        )}
                      </ScrollArea>
                    </Tabs.Panel>

                    <Tabs.Panel value="related" pt="md">
                      <ScrollArea h={300}>
                        <Stack gap="sm">
                          {getRelatedVideos(selectedVideo).map((relatedVideo) => (
                            <Card
                              key={relatedVideo.id}
                              padding="sm"
                              radius="md"
                              withBorder
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setSelectedVideo(relatedVideo)
                              }}
                            >
                              <Group gap="sm">
                                <Image
                                  src={relatedVideo.thumbnail.medium}
                                  alt={relatedVideo.title}
                                  width={80}
                                  height={60}
                                  style={{ objectFit: 'cover', borderRadius: 4 }}
                                />
                                <div style={{ flex: 1 }}>
                                  <Text size="sm" fw={500} lineClamp={2}>
                                    {relatedVideo.title}
                                  </Text>
                                  <Group gap="xs" mt={4}>
                                    <Text size="xs" c="dimmed">
                                      {relatedVideo.viewCount} views
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                      •
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                      {relatedVideo.duration}
                                    </Text>
                                  </Group>
                                </div>
                              </Group>
                            </Card>
                          ))}
                        </Stack>
                      </ScrollArea>
                    </Tabs.Panel>
                  </Tabs>

                  <Divider my="md" />

                  <Group justify="space-between">
                    <Button
                      variant="light"
                      leftSection={<IconExternalLink size={16} />}
                      component="a"
                      href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                      target="_blank"
                    >
                      Watch on YouTube
                    </Button>
                    <Button variant="outline" onClick={closeModal}>
                      Close
                    </Button>
                  </Group>
                </Box>
              </div>
            )}
          </Modal>
        </Container>
      </MainLayout>
    </MantineProvider>
  )
}
