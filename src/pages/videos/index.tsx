import React, { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
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
  Box
} from '@mantine/core'
import { IconSearch, IconPlayerPlay, IconExternalLink, IconEye, IconClock } from '@tabler/icons-react'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import {
  YouTubeVideo,
  fetchADMIChannelVideos,
  searchVideos,
  getVideosByCategory,
  getYouTubeWatchUrl
} from '@/utils/youtube-api'

interface VideoGalleryProps {
  initialVideos: YouTubeVideo[]
}

export default function VideoGallery({ initialVideos }: VideoGalleryProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>(initialVideos)
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>(initialVideos)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all')
  const [loading, setLoading] = useState(false)

  const categories = [
    { value: 'all', label: 'All Videos' },
    { value: 'student-showcase', label: 'Student Showcase' },
    { value: 'facilities-tour', label: 'Facilities Tour' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'events', label: 'Events' },
    { value: 'industry', label: 'Industry Insights' }
  ]

  // Filter videos based on search and category
  useEffect(() => {
    let filtered = videos

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchVideos(filtered, searchQuery)
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = getVideosByCategory(filtered, selectedCategory)
    }

    setFilteredVideos(filtered)
  }, [videos, searchQuery, selectedCategory])

  const handleVideoClick = (video: YouTubeVideo) => {
    window.open(getYouTubeWatchUrl(video.id), '_blank')
  }

  const refreshVideos = async () => {
    setLoading(true)
    try {
      const freshVideos = await fetchADMIChannelVideos(50)
      setVideos(freshVideos)
    } catch (error) {
      console.error('Error refreshing videos:', error)
    } finally {
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
                    {videos.length}+
                  </Text>
                  <Text size="sm" c="dimmed">
                    Videos
                  </Text>
                </div>
                <div>
                  <Text fw={700} size="xl" c="blue">
                    50K+
                  </Text>
                  <Text size="sm" c="dimmed">
                    Total Views
                  </Text>
                </div>
                <div>
                  <Text fw={700} size="xl" c="green">
                    Weekly
                  </Text>
                  <Text size="sm" c="dimmed">
                    New Content
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
                Apply Now
              </Button>
            </Group>
          </Group>
        </Card>

        {/* Search and Filter Controls */}
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Group justify="space-between" align="end">
            <TextInput
              placeholder="Search videos..."
              leftSection={<IconSearch size={16} />}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              style={{ flex: 1 }}
              size="md"
            />
            <Select
              placeholder="Filter by category"
              data={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              w={200}
              size="md"
            />
            <Button variant="light" onClick={refreshVideos} loading={loading} size="md">
              Refresh
            </Button>
          </Group>
        </Card>

        {/* Results Info */}
        <Group justify="space-between" mb="md">
          <Text c="dimmed">
            Showing {filteredVideos.length} of {videos.length} videos
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory &&
              selectedCategory !== 'all' &&
              ` in ${categories.find((c) => c.value === selectedCategory)?.label}`}
          </Text>
        </Group>

        {/* Video Grid */}
        {loading ? (
          <Center py="xl">
            <Loader size="lg" />
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
          <Grid>
            {filteredVideos.map((video) => (
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
      </Container>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch initial videos at build time
    const videos = await fetchADMIChannelVideos(50)

    return {
      props: {
        initialVideos: videos
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching videos for static generation:', error)

    return {
      props: {
        initialVideos: []
      },
      revalidate: 3600
    }
  }
}
