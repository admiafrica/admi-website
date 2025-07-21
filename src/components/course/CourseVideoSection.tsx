import React, { useState, useEffect } from 'react'
import { Container, Title, Text, Card, Group, Button, Badge, Grid, Box, Tabs, Loader } from '@mantine/core'
import { IconPlayerPlay, IconEye, IconClock, IconUsers, IconTrendingUp, IconExternalLink } from '@tabler/icons-react'
import Link from 'next/link'
import { VideoPlayer } from '@/components/shared/v3'
import { YouTubeVideo, getVideosForCourse, getYouTubeWatchUrl } from '@/utils/youtube-api'

interface CourseVideoSectionProps {
  course: any
  slug: string
  youtubeVideos?: YouTubeVideo[]
}

export function CourseVideoSection({ course, slug, youtubeVideos = [] }: CourseVideoSectionProps) {
  const [activeTab, setActiveTab] = useState<string | null>('preview')
  const [relatedVideos, setRelatedVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const hasMainVideo = course?.courseVideo?.fields?.file?.url
  const hasRelatedVideos = relatedVideos.length > 0

  // Fetch YouTube videos from cached API for this specific course
  useEffect(() => {
    const fetchCourseVideos = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use our cached API instead of direct YouTube API
        const response = await fetch('/api/admi-videos?limit=100')
        if (!response.ok) {
          throw new Error('Failed to fetch videos')
        }

        const data = await response.json()
        const allVideos = data.videos || []
        const courseRelated = getVideosForCourse(allVideos, slug)
        setRelatedVideos(courseRelated.slice(0, 6)) // Limit to 6 videos
      } catch (error) {
        console.error('Error fetching course videos:', error)
        setError('Failed to load related videos')
      } finally {
        setLoading(false)
      }
    }

    fetchCourseVideos()
  }, [slug])

  // Only hide the component if we're not loading and have no videos
  if (!hasMainVideo && !hasRelatedVideos && !loading) {
    return null
  }

  const videoStats = {
    views: '2.5K+',
    duration: '2:30',
    students: '150+',
    completion: '95%'
  }

  return (
    <Container size="xl" py="xl">
      <Title order={2} ta="center" mb="xl" c="dark">
        Course Videos & Preview
      </Title>

      <Tabs value={activeTab} onChange={setActiveTab} variant="outline" radius="md">
        <Tabs.List grow mb="xl">
          {hasMainVideo && (
            <Tabs.Tab value="preview" leftSection={<IconPlayerPlay size={16} />}>
              Course Preview
            </Tabs.Tab>
          )}
          <Tabs.Tab value="related" leftSection={<IconEye size={16} />}>
            Related Videos {loading ? '(Loading...)' : `(${relatedVideos.length})`}
          </Tabs.Tab>
          <Tabs.Tab value="info" leftSection={<IconTrendingUp size={16} />}>
            Video Insights
          </Tabs.Tab>
        </Tabs.List>

        {/* Main Course Preview Tab */}
        {hasMainVideo && (
          <Tabs.Panel value="preview">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <div className="relative aspect-video w-full">
                      <VideoPlayer videoUrl={course.courseVideo.fields.file.url} showControls={true} />
                    </div>
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <div>
                      <Title order={3} size="h4">
                        {course.name} - Course Preview
                      </Title>
                      <Text size="sm" c="dimmed">
                        Get an inside look at what you&apos;ll learn in this {course.awardLevel || 'course'}
                      </Text>
                    </div>
                    <Badge color="blue" variant="light">
                      {course.awardLevel || 'Course'}
                    </Badge>
                  </Group>

                  <Group mt="md">
                    <Button
                      component={Link}
                      href={`/watch/${slug}`}
                      leftSection={<IconPlayerPlay size={16} />}
                      variant="filled"
                      color="red"
                      size="md"
                    >
                      Watch Full Video
                    </Button>
                    <Button component={Link} href="/enquiry" variant="outline" color="blue" size="md">
                      Apply Now
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                  <Title order={4} mb="md">
                    Video Stats
                  </Title>

                  <Group mb="md">
                    <IconEye size={20} color="#F76335" />
                    <div>
                      <Text fw={500}>{videoStats.views}</Text>
                      <Text size="xs" c="dimmed">
                        Total Views
                      </Text>
                    </div>
                  </Group>

                  <Group mb="md">
                    <IconClock size={20} color="#F76335" />
                    <div>
                      <Text fw={500}>{videoStats.duration}</Text>
                      <Text size="xs" c="dimmed">
                        Duration
                      </Text>
                    </div>
                  </Group>

                  <Group mb="md">
                    <IconUsers size={20} color="#F76335" />
                    <div>
                      <Text fw={500}>{videoStats.students}</Text>
                      <Text size="xs" c="dimmed">
                        Students Enrolled
                      </Text>
                    </div>
                  </Group>

                  <Group mb="md">
                    <IconTrendingUp size={20} color="#F76335" />
                    <div>
                      <Text fw={500}>{videoStats.completion}</Text>
                      <Text size="xs" c="dimmed">
                        Completion Rate
                      </Text>
                    </div>
                  </Group>

                  <Box mt="xl">
                    <Text size="sm" fw={500} mb="xs">
                      What you&apos;ll see in this video:
                    </Text>
                    <Text size="sm" c="dimmed">
                      • Course curriculum overview
                      <br />
                      • Facilities and equipment tour
                      <br />
                      • Student projects showcase
                      <br />
                      • Career opportunities
                      <br />• Application process
                    </Text>
                  </Box>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        )}

        {/* Related Videos Tab */}
        <Tabs.Panel value="related">
          {loading ? (
            <div className="text-center py-8">
              <Text>Loading related videos...</Text>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <Text c="red" mb="md">{error}</Text>
              <Button variant="light" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : relatedVideos.length === 0 ? (
            <div className="text-center py-8">
              <Text c="dimmed">No related videos found for this course.</Text>
            </div>
          ) : (
            <Grid>
              {relatedVideos.map((video) => (
                <Grid.Col key={video.id} span={{ base: 12, sm: 6, md: 4 }}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="cursor-pointer transition-shadow hover:shadow-lg"
                    onClick={() => window.open(getYouTubeWatchUrl(video.id), '_blank')}
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
                          <div className="rounded-full bg-white bg-opacity-90 p-3">
                            <IconPlayerPlay size={24} color="#F76335" />
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

                    <Title order={5} mt="md" lineClamp={2}>
                      {video.title}
                    </Title>
                    <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
                      {video.description}
                    </Text>

                    <Group justify="space-between" mt="md">
                      <Group gap="xs">
                        <IconEye size={14} color="#666" />
                        <Text size="xs" c="dimmed">
                          {video.viewCount}
                        </Text>
                      </Group>
                      <Button size="xs" variant="light" color="red" leftSection={<IconPlayerPlay size={12} />}>
                        Watch
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>

            {/* View More Videos CTA */}
            <Group justify="center" mt="xl">
              <Button
                variant="outline"
                color="red"
                size="md"
                leftSection={<IconExternalLink size={16} />}
                component="a"
                href="/videos"
              >
                View All Videos
              </Button>
              <Button
                color="red"
                size="md"
                component="a"
                href="https://www.youtube.com/@ADMIafrica/"
                target="_blank"
                leftSection={<IconExternalLink size={16} />}
              >
                Visit YouTube Channel
              </Button>
            </Group>
          )}
        </Tabs.Panel>

        {/* Video Insights Tab */}
        <Tabs.Panel value="info">
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Why Watch Our Course Videos?
                </Title>
                <Text mb="md">
                  Our course preview videos give you an authentic look into the ADMI experience. See real students
                  working with industry-standard equipment and learn from experienced instructors.
                </Text>
                <Text size="sm" c="dimmed">
                  • Real classroom footage
                  <br />
                  • Student project showcases
                  <br />
                  • Industry-standard equipment demos
                  <br />• Career outcome testimonials
                </Text>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Video Production Quality
                </Title>
                <Text mb="md">
                  All our videos are produced by our own Film & TV Production students and faculty, showcasing the
                  quality of education you&apos;ll receive.
                </Text>
                <Group mt="md">
                  <Badge variant="light" color="green">
                    4K Quality
                  </Badge>
                  <Badge variant="light" color="blue">
                    Student Produced
                  </Badge>
                  <Badge variant="light" color="orange">
                    Industry Standard
                  </Badge>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}

export default CourseVideoSection
