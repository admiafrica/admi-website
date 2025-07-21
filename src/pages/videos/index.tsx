import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
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
  Stack
} from '@mantine/core'
import { IconSearch, IconPlayerPlay, IconExternalLink, IconEye, IconClock, IconX, IconShare, IconThumbUp, IconCalendar, IconTag } from '@tabler/icons-react'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import {
  YouTubeVideo,
  searchVideos,
  getYouTubeWatchUrl
} from '@/utils/youtube-api'
import {
  MANUAL_CATEGORIES,
  getVideosByManualCategory,
  getManualCategoryStats,
  getManualCategoryInfo,
  categorizeVideoManually
} from '@/utils/manual-categorization'

interface VideoGalleryProps {
  allVideos: YouTubeVideo[] // All videos for SEO
  initialDisplay: YouTubeVideo[] // First 12 videos for initial display
  channelInfo?: {
    title: string
    description: string
    subscriberCount: string
    videoCount: string
    viewCount: string
  }
}

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

export default function VideoGallery({ allVideos, initialDisplay, channelInfo }: VideoGalleryProps) {
  // SEO: All videos available for search and filtering
  const [allVideosList] = useState<YouTubeVideo[]>(allVideos)
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>(allVideos)

  // UX: Progressive display management
  const [displayCount, setDisplayCount] = useState(12) // Start with 12 videos
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all')
  const [selectedCourse, setSelectedCourse] = useState<string | null>('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Video Modal State
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [modalOpened, setModalOpened] = useState(false)

  // Videos currently visible to user (for performance)
  const visibleVideos = filteredVideos.slice(0, displayCount)

  // Get related videos based on current video
  const getRelatedVideos = (currentVideo: YouTubeVideo): YouTubeVideo[] => {
    if (!currentVideo) return []

    // Find videos with similar tags or from same category
    const related = allVideosList.filter(video => {
      if (video.id === currentVideo.id) return false

      // Check for common tags
      const commonTags = currentVideo.tags?.filter(tag =>
        video.tags?.some(vTag => vTag.toLowerCase().includes(tag.toLowerCase()))
      ) || []

      // Check for similar titles (common keywords)
      const currentWords = currentVideo.title.toLowerCase().split(' ')
      const videoWords = video.title.toLowerCase().split(' ')
      const commonWords = currentWords.filter(word =>
        word.length > 3 && videoWords.includes(word)
      )

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

  // Videos are now loaded server-side, no need for client-side fetching

  // Filter ALL videos based on search, category, and course
  useEffect(() => {
    let filtered = allVideosList

    // Apply search filter to ALL videos
    if (searchQuery.trim()) {
      filtered = searchVideos(filtered, searchQuery)
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = getVideosByManualCategory(filtered, selectedCategory)
    }

    // Apply course filter
    if (selectedCourse && selectedCourse !== 'all') {
      filtered = getVideosByManualCategory(filtered, selectedCourse)
    }

    setFilteredVideos(filtered)

    // Reset display count when filters change for better UX
    setDisplayCount(12)
  }, [allVideosList, searchQuery, selectedCategory, selectedCourse])

  // Load more videos function
  const loadMoreVideos = () => {
    setDisplayCount(prev => Math.min(prev + 12, filteredVideos.length))
  }

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
  }, [displayCount, filteredVideos.length, loading])

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
    <MainLayout>
      <PageSEO
        title="Video Gallery - ADMI Africa"
        description="Explore ADMI's video gallery featuring student showcases, facility tours, testimonials, and educational content from Africa's premier digital media institute."
        keywords="ADMI videos, student showcase, facility tour, testimonials, digital media education, Kenya creative school"
        canonical="https://admi.africa/videos"
      />

      <Container size="xl" py="xl">
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
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
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
              <Text size="lg" fw={500} mb="xs" c="red">Failed to load videos</Text>
              <Text c="dimmed" mb="md">{error}</Text>
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
                      <img
                        src={video.thumbnail.medium || video.thumbnail.default}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <div className="rounded-full bg-white bg-opacity-90 p-4">
                          <IconPlayerPlay size={32} color="#F76335" />
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
                          <IconEye size={14} color="#666" />
                          <Text size="xs" c="dimmed">
                            {video.viewCount}
                          </Text>
                        </Group>
                        <Group gap={4}>
                          <IconClock size={14} color="#666" />
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
                  <span>Published: {new Date(video.publishedAt).toLocaleDateString('en-KE', {
                    timeZone: 'Africa/Nairobi',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}</span>
                  {video.tags && video.tags.length > 0 && (
                    <span>Tags: {video.tags.join(', ')}</span>
                  )}
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
        <Modal
          opened={modalOpened}
          onClose={closeModal}
          size="xl"
          title={null}
          padding={0}
          radius="md"
          centered
        >
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
                    <IconEye size={16} color="#666" />
                    <Text size="sm" c="dimmed">{selectedVideo.viewCount} views</Text>
                  </Group>
                  <Group gap={4}>
                    <IconClock size={16} color="#666" />
                    <Text size="sm" c="dimmed">{selectedVideo.duration}</Text>
                  </Group>
                  <Group gap={4}>
                    <IconCalendar size={16} color="#666" />
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
                            <Text size="xs" fw={500}>Tags:</Text>
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
                              <img
                                src={relatedVideo.thumbnail.medium}
                                alt={relatedVideo.title}
                                style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }}
                              />
                              <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500} lineClamp={2}>
                                  {relatedVideo.title}
                                </Text>
                                <Group gap="xs" mt={4}>
                                  <Text size="xs" c="dimmed">{relatedVideo.viewCount} views</Text>
                                  <Text size="xs" c="dimmed">•</Text>
                                  <Text size="xs" c="dimmed">{relatedVideo.duration}</Text>
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
                    href={getYouTubeWatchUrl(selectedVideo.id)}
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
  )
}

export const getServerSideProps = async () => {
  try {
    // Use our cached video API
    const { readVideoCache } = await import('@/utils/video-cache')
    const { fetchAllADMIVideos } = await import('@/utils/fetch-all-videos')

    console.log('🔍 SSR: Checking for cached videos...')

    // Try to get cached videos first
    let cache = readVideoCache()

    if (!cache) {
      console.log('📡 SSR: No cache found, fetching fresh data...')
      try {
        cache = await fetchAllADMIVideos()
        console.log('✅ SSR: Fresh data fetched and cached')
      } catch (error) {
        console.error('❌ SSR: Error fetching videos:', error)
        return {
          props: {
            allVideos: [],
            initialDisplay: [],
            channelInfo: null
          }
        }
      }
    } else {
      console.log(`📚 SSR: Using cached data (${cache.videos.length} videos)`)
    }

    // SEO Strategy: Load ALL videos for search engines, show 12 initially for UX
    const allVideos = cache.videos // All 568 videos for SEO
    const initialDisplay = cache.videos.slice(0, 12) // First 12 for initial display

    console.log(`📊 SSR: Loaded ${allVideos.length} videos for SEO, displaying ${initialDisplay.length} initially`)

    return {
      props: {
        allVideos,
        initialDisplay,
        channelInfo: cache.channelInfo
      }
    }

  } catch (error) {
    console.error('❌ SSR Error:', error)
    return {
      props: {
        allVideos: [],
        initialDisplay: [],
        channelInfo: null
      }
    }
  }
}


