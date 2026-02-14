import React, { useRef } from 'react'
import { Container, Title, Text, Card, Group, Button, Badge } from '@/lib/tw-mantine'
import { Carousel } from '@/lib/tw-mantine-carousel'
import { IconPlayerPlay, IconExternalLink, IconEye } from '@tabler/icons-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

interface RelatedVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views?: string
  url: string
  type: 'youtube' | 'internal' | 'vimeo'
  category?: string
}

interface RelatedVideosCarouselProps {
  videos: RelatedVideo[]
  title?: string
  courseCategory?: string
}

export function RelatedVideosCarousel({
  videos,
  title = 'Related Videos',
  courseCategory
}: RelatedVideosCarouselProps) {
  const autoplay = useRef(Autoplay({ delay: 4000 }))

  if (!videos || videos.length === 0) {
    return null
  }

  const handleVideoClick = (video: RelatedVideo) => {
    if (video.type === 'youtube') {
      // Open YouTube video in new tab
      window.open(video.url, '_blank')
    } else if (video.type === 'internal') {
      // Navigate to internal video page
      window.location.href = video.url
    } else {
      // Handle other video types
      window.open(video.url, '_blank')
    }
  }

  const getVideoTypeBadge = (type: string) => {
    switch (type) {
      case 'youtube':
        return (
          <Badge color="red" variant="light" size="xs">
            YouTube
          </Badge>
        )
      case 'internal':
        return (
          <Badge color="blue" variant="light" size="xs">
            ADMI
          </Badge>
        )
      case 'vimeo':
        return (
          <Badge color="cyan" variant="light" size="xs">
            Vimeo
          </Badge>
        )
      default:
        return (
          <Badge color="gray" variant="light" size="xs">
            Video
          </Badge>
        )
    }
  }

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} c="dark">
            {title}
          </Title>
          {courseCategory && (
            <Text size="sm" c="dimmed" mt="xs">
              Explore more {courseCategory} content and student showcases
            </Text>
          )}
        </div>
        <Button
          variant="outline"
          color="red"
          rightSection={<IconExternalLink size={16} />}
          component="a"
          href="https://www.youtube.com/@ADMIafrica/"
          target="_blank"
        >
          View All on YouTube
        </Button>
      </Group>

      <Carousel
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
        slideGap={{ base: 'xl', sm: 'md' }}
        align="start"
        slidesToScroll={1}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        loop
      >
        {videos.map((video) => (
          <Carousel.Slide key={video.id}>
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
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="rounded-full bg-white bg-opacity-90 p-3">
                      <IconPlayerPlay size={24} color="#F76335" />
                    </div>
                  </div>

                  {/* Video Type Badge */}
                  <div className="absolute left-2 top-2">{getVideoTypeBadge(video.type)}</div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                  )}
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
                    {video.views && (
                      <Group gap={4}>
                        <IconEye size={14} color="#666" />
                        <Text size="xs" c="dimmed">
                          {video.views}
                        </Text>
                      </Group>
                    )}
                    {video.category && (
                      <Badge variant="dot" color="gray" size="xs">
                        {video.category}
                      </Badge>
                    )}
                  </Group>

                  <Button size="xs" variant="light" color="red" leftSection={<IconPlayerPlay size={12} />}>
                    Watch
                  </Button>
                </Group>
              </div>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Call to Action */}
      <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl" bg="gray.0">
        <Group justify="space-between" align="center">
          <div>
            <Title order={4}>Want to create videos like these?</Title>
            <Text size="sm" c="dimmed" mt="xs">
              Join our Film & TV Production program and learn from industry professionals
            </Text>
          </div>
          <Group>
            <Button variant="outline" color="blue" component="a" href="/enquiry">
              Learn More
            </Button>
            <Button color="red" component="a" href="/courses/film-and-television-production-diploma">
              View Course
            </Button>
          </Group>
        </Group>
      </Card>
    </Container>
  )
}

export default RelatedVideosCarousel
