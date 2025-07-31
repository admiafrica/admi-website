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
  Divider,
  Stack,
  Breadcrumbs,
  Anchor,
  MantineProvider
} from '@mantine/core'
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
import '@mantine/core/styles.css'

// For now, we'll use the existing video utilities and API calls
// These would need to be adapted for App Router if needed
const videoData = [
  {
    id: '1',
    title: 'ADMI Graduation Ceremony 2024',
    thumbnail: {
      default: 'https://via.placeholder.com/400x225/4C6EF5/ffffff?text=Graduation+2024',
      medium: 'https://via.placeholder.com/400x225/4C6EF5/ffffff?text=Graduation+2024',
      high: 'https://via.placeholder.com/400x225/4C6EF5/ffffff?text=Graduation+2024'
    },
    duration: '45:30',
    viewCount: '1,200',
    publishedAt: '2024-12-15T10:00:00Z',
    description:
      'Highlights from the 2024 graduation ceremony celebrating our talented graduates and their achievements in digital media.',
    channelTitle: 'ADMI Africa',
    tags: ['graduation', 'ceremony', 'students', 'celebration']
  },
  {
    id: '2',
    title: 'Student Showcase: Animation Projects',
    thumbnail: {
      default: 'https://via.placeholder.com/400x225/12B886/ffffff?text=Animation+Showcase',
      medium: 'https://via.placeholder.com/400x225/12B886/ffffff?text=Animation+Showcase',
      high: 'https://via.placeholder.com/400x225/12B886/ffffff?text=Animation+Showcase'
    },
    duration: '12:45',
    viewCount: '856',
    publishedAt: '2024-11-20T14:30:00Z',
    description:
      'Amazing animation projects by our talented students showcasing their creativity and technical skills.',
    channelTitle: 'ADMI Africa',
    tags: ['animation', 'student work', 'showcase', 'creative']
  },
  {
    id: '3',
    title: 'Tech Workshop: AI in Creative Media',
    thumbnail: {
      default: 'https://via.placeholder.com/400x225/FD7E14/ffffff?text=AI+Workshop',
      medium: 'https://via.placeholder.com/400x225/FD7E14/ffffff?text=AI+Workshop',
      high: 'https://via.placeholder.com/400x225/FD7E14/ffffff?text=AI+Workshop'
    },
    duration: '1:20:15',
    viewCount: '2,300',
    publishedAt: '2024-10-10T09:15:00Z',
    description:
      'Learn about AI applications in creative media and how artificial intelligence is transforming the industry.',
    channelTitle: 'ADMI Africa',
    tags: ['AI', 'workshop', 'technology', 'creative media']
  },
  {
    id: '4',
    title: 'ADMI Open Day 2024',
    thumbnail: {
      default: 'https://via.placeholder.com/400x225/7950F2/ffffff?text=Open+Day',
      medium: 'https://via.placeholder.com/400x225/7950F2/ffffff?text=Open+Day',
      high: 'https://via.placeholder.com/400x225/7950F2/ffffff?text=Open+Day'
    },
    duration: '25:00',
    viewCount: '1,500',
    publishedAt: '2024-09-05T11:00:00Z',
    description: 'Tour our campus and meet our faculty during our annual open day event.',
    channelTitle: 'ADMI Africa',
    tags: ['open day', 'campus tour', 'faculty', 'facilities']
  },
  {
    id: '5',
    title: 'Film Production Masterclass',
    thumbnail: {
      default: 'https://via.placeholder.com/400x225/E64980/ffffff?text=Film+Masterclass',
      medium: 'https://via.placeholder.com/400x225/E64980/ffffff?text=Film+Masterclass',
      high: 'https://via.placeholder.com/400x225/E64980/ffffff?text=Film+Masterclass'
    },
    duration: '55:30',
    viewCount: '3,100',
    publishedAt: '2024-08-15T16:45:00Z',
    description: 'Industry professionals share their expertise in film production techniques and best practices.',
    channelTitle: 'ADMI Africa',
    tags: ['film production', 'masterclass', 'industry professionals']
  },
  {
    id: '6',
    title: 'Digital Design Exhibition',
    thumbnail: {
      default: 'https://via.placeholder.com/400x225/1098AD/ffffff?text=Design+Exhibition',
      medium: 'https://via.placeholder.com/400x225/1098AD/ffffff?text=Design+Exhibition',
      high: 'https://via.placeholder.com/400x225/1098AD/ffffff?text=Design+Exhibition'
    },
    duration: '18:20',
    viewCount: '945',
    publishedAt: '2024-07-20T13:20:00Z',
    description: 'Showcasing the best of student digital design work from various courses and programs.',
    channelTitle: 'ADMI Africa',
    tags: ['digital design', 'exhibition', 'student work', 'creative']
  }
]

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

export default function VideosPage() {
  const [allVideosList] = useState(videoData)
  const [filteredVideos, setFilteredVideos] = useState(videoData)
  const [displayCount, setDisplayCount] = useState(12)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all')
  const [selectedCourse, setSelectedCourse] = useState<string | null>('all')
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  // Video Modal State
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [modalOpened, setModalOpened] = useState(false)

  // Videos currently visible to user
  const visibleVideos = filteredVideos.slice(0, displayCount)

  // Filter videos based on search, category, and course
  useEffect(() => {
    let filtered = allVideosList

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter (simplified for now)
    if (selectedCategory && selectedCategory !== 'all') {
      // This would use the actual categorization logic from the original
      filtered = filtered
    }

    // Apply course filter (simplified for now)
    if (selectedCourse && selectedCourse !== 'all') {
      // This would use the actual categorization logic from the original
      filtered = filtered
    }

    setFilteredVideos(filtered)
    setDisplayCount(12)
  }, [allVideosList, searchQuery, selectedCategory, selectedCourse])

  // Load more videos function
  const loadMoreVideos = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + 12, filteredVideos.length))
  }, [filteredVideos.length])

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video)
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
    setSelectedVideo(null)
  }

  return (
    <MantineProvider>
      <MainLayout>
        <Container size="xl" py={80}>
          <Stack gap={40}>
            <Breadcrumbs mb={20}>
              <Link href="/media-archive" passHref legacyBehavior>
                <Anchor>Media Archive</Anchor>
              </Link>
              <Anchor>Videos</Anchor>
            </Breadcrumbs>

            {/* Header Section */}
            <div>
              <Title order={1} size={48} fw={700} ta="center" mb={20}>
                Video Gallery
              </Title>
              <Text ta="center" size="xl" c="dimmed" maw={800} mx="auto">
                Discover the ADMI experience through our video collection featuring student work, facility tours,
                success stories, and insights into creative media education.
              </Text>
            </div>

            {/* Stats Card */}
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="gray.0">
              <Group justify="space-between" align="center">
                <div>
                  <Group gap="xl">
                    <div>
                      <Text fw={700} size="xl" c="red">
                        500+
                      </Text>
                      <Text size="sm" c="dimmed">
                        Videos
                      </Text>
                    </div>
                    <div>
                      <Text fw={700} size="xl" c="blue">
                        10M+
                      </Text>
                      <Text size="sm" c="dimmed">
                        Total Views
                      </Text>
                    </div>
                    <div>
                      <Text fw={700} size="xl" c="green">
                        4K+
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
            <Card shadow="sm" padding="lg" radius="md" withBorder>
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
              </Group>
            </Card>

            {/* Results Info */}
            <Group justify="space-between">
              <Text c="dimmed">
                Showing {Math.min(displayCount, filteredVideos.length)} of {filteredVideos.length} videos
                {searchQuery && ` for "${searchQuery}"`}
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
                        style={{ cursor: 'pointer', height: '100%' }}
                        onClick={() => handleVideoClick(video)}
                      >
                        <Card.Section>
                          <div
                            style={{
                              position: 'relative',
                              aspectRatio: '16/9',
                              overflow: 'hidden',
                              backgroundColor: '#f1f3f4'
                            }}
                          >
                            <Image
                              src={video.thumbnail.medium || video.thumbnail.default}
                              alt={video.title}
                              fill
                              style={{ objectFit: 'cover' }}
                            />

                            {/* Play Button Overlay */}
                            <div
                              style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                opacity: 0,
                                transition: 'opacity 0.3s'
                              }}
                              className="hover:opacity-100"
                            >
                              <div
                                style={{
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  padding: '16px'
                                }}
                              >
                                <IconPlayerPlay size={32} color="#F76335" />
                              </div>
                            </div>

                            {/* Duration Badge */}
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                borderRadius: '4px',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                padding: '4px 8px',
                                fontSize: '12px',
                                color: 'white'
                              }}
                            >
                              {video.duration}
                            </div>

                            {/* YouTube Badge */}
                            <div style={{ position: 'absolute', left: 8, top: 8 }}>
                              <Badge color="red" variant="filled" size="xs">
                                YouTube
                              </Badge>
                            </div>
                          </div>
                        </Card.Section>

                        <Stack gap="xs" mt="md" style={{ height: 'calc(100% - 200px)' }}>
                          <Title order={5} lineClamp={2} style={{ flexGrow: 1 }}>
                            {video.title}
                          </Title>

                          <Text size="sm" c="dimmed" lineClamp={3} style={{ flexGrow: 1 }}>
                            {video.description}
                          </Text>

                          <Group justify="space-between" align="center">
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
                        </Stack>
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
              </>
            )}

            {/* Call to Action */}
            <Card shadow="sm" padding="lg" radius="md" withBorder bg="red.0">
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
          </Stack>
        </Container>

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
                    <IconEye size={16} color="#666" />
                    <Text size="sm" c="dimmed">
                      {selectedVideo.viewCount} views
                    </Text>
                  </Group>
                  <Group gap={4}>
                    <IconClock size={16} color="#666" />
                    <Text size="sm" c="dimmed">
                      {selectedVideo.duration}
                    </Text>
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
                      {selectedVideo.tags.slice(0, 10).map((tag: string, index: number) => (
                        <Badge key={index} size="xs" variant="light">
                          {tag}
                        </Badge>
                      ))}
                    </Group>
                  </Box>
                )}

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
      </MainLayout>
    </MantineProvider>
  )
}
