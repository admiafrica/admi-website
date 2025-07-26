import React from 'react'
import { Container, Title, Text, Grid, Card, Group, Button, Badge } from '@mantine/core'
import { IconPlayerPlay, IconEye, IconExternalLink } from '@tabler/icons-react'
import { YouTubeVideo, getYouTubeWatchUrl } from '@/utils/youtube-api'
import Image from 'next/image'

interface VideoShowcaseProps {
  videos: YouTubeVideo[]
  title?: string
  subtitle?: string
  maxVideos?: number
}

export function VideoShowcase({
  videos,
  title = 'Student Showcases & Success Stories',
  subtitle = 'See what our students are creating and achieving',
  maxVideos = 6
}: VideoShowcaseProps) {
  const displayVideos = videos.slice(0, maxVideos)

  if (displayVideos.length === 0) {
    return null
  }

  return (
    <Container size="xl" py="xl">
      <div className="mb-12 text-center">
        <Title order={2} size="h1" mb="md">
          {title}
        </Title>
        <Text size="lg" c="dimmed" maw={600} mx="auto">
          {subtitle}
        </Text>
      </div>

      <Grid>
        {displayVideos.map((video) => (
          <Grid.Col key={video.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={() => window.open(getYouTubeWatchUrl(video.id), '_blank')}
            >
              <Card.Section>
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={video.thumbnail.high || video.thumbnail.medium || video.thumbnail.default}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="rounded-full bg-white bg-opacity-95 p-4 shadow-lg">
                      <IconPlayerPlay size={32} color="#F76335" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 rounded bg-black bg-opacity-80 px-2 py-1 text-sm font-medium text-white">
                    {video.duration}
                  </div>

                  {/* YouTube Badge */}
                  <div className="absolute left-3 top-3">
                    <Badge color="red" variant="filled" size="sm">
                      YouTube
                    </Badge>
                  </div>
                </div>
              </Card.Section>

              <div className="flex h-full flex-col pt-4">
                <Title order={4} lineClamp={2} className="mb-2 flex-grow">
                  {video.title}
                </Title>

                <Text size="sm" c="dimmed" lineClamp={3} className="mb-4 flex-grow">
                  {video.description}
                </Text>

                <Group justify="space-between" align="center" mt="auto">
                  <Group gap="xs">
                    <IconEye size={16} color="#666" />
                    <Text size="sm" c="dimmed" fw={500}>
                      {video.viewCount} views
                    </Text>
                  </Group>

                  <Button size="sm" variant="light" color="red" leftSection={<IconPlayerPlay size={16} />}>
                    Watch Now
                  </Button>
                </Group>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Call to Action */}
      <Group justify="center" mt="xl" gap="md">
        <Button
          variant="outline"
          color="red"
          size="lg"
          leftSection={<IconExternalLink size={20} />}
          component="a"
          href="/videos"
        >
          View All Videos
        </Button>
        <Button
          color="red"
          size="lg"
          leftSection={<IconExternalLink size={20} />}
          component="a"
          href="https://www.youtube.com/@ADMIafrica/"
          target="_blank"
        >
          Subscribe on YouTube
        </Button>
      </Group>

      {/* Stats Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl" bg="gray.0">
        <Group justify="center" gap="xl">
          <div className="text-center">
            <Text fw={700} size="xl" c="red">
              50+
            </Text>
            <Text size="sm" c="dimmed">
              Videos
            </Text>
          </div>
          <div className="text-center">
            <Text fw={700} size="xl" c="blue">
              100K+
            </Text>
            <Text size="sm" c="dimmed">
              Total Views
            </Text>
          </div>
          <div className="text-center">
            <Text fw={700} size="xl" c="green">
              500+
            </Text>
            <Text size="sm" c="dimmed">
              Subscribers
            </Text>
          </div>
          <div className="text-center">
            <Text fw={700} size="xl" c="orange">
              Weekly
            </Text>
            <Text size="sm" c="dimmed">
              New Content
            </Text>
          </div>
        </Group>
      </Card>
    </Container>
  )
}

export default VideoShowcase
