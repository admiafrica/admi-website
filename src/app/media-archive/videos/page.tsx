'use client'

import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  TextInput,
  Select,
  Button,
  Image,
  AspectRatio,
  MantineProvider
} from '@mantine/core'
import { IconSearch, IconPlayerPlay, IconCalendar, IconEye } from '@tabler/icons-react'
import { useState } from 'react'
import { MainLayout } from '@/layouts/v3/MainLayout'
import '@mantine/core/styles.css'

// Placeholder video data
const videoData = [
  {
    id: '1',
    title: 'ADMI Graduation Ceremony 2024',
    thumbnail: 'https://via.placeholder.com/400x225/4C6EF5/ffffff?text=Graduation+2024',
    duration: '45:30',
    views: '1.2K',
    date: '2024-12-15',
    category: 'Events',
    description: 'Highlights from the 2024 graduation ceremony'
  },
  {
    id: '2',
    title: 'Student Showcase: Animation Projects',
    thumbnail: 'https://via.placeholder.com/400x225/12B886/ffffff?text=Animation+Showcase',
    duration: '12:45',
    views: '856',
    date: '2024-11-20',
    category: 'Student Work',
    description: 'Amazing animation projects by our talented students'
  },
  {
    id: '3',
    title: 'Tech Workshop: AI in Creative Media',
    thumbnail: 'https://via.placeholder.com/400x225/FD7E14/ffffff?text=AI+Workshop',
    duration: '1:20:15',
    views: '2.3K',
    date: '2024-10-10',
    category: 'Workshops',
    description: 'Learn about AI applications in creative media'
  },
  {
    id: '4',
    title: 'ADMI Open Day 2024',
    thumbnail: 'https://via.placeholder.com/400x225/7950F2/ffffff?text=Open+Day',
    duration: '25:00',
    views: '1.5K',
    date: '2024-09-05',
    category: 'Events',
    description: 'Tour our campus and meet our faculty'
  },
  {
    id: '5',
    title: 'Film Production Masterclass',
    thumbnail: 'https://via.placeholder.com/400x225/E64980/ffffff?text=Film+Masterclass',
    duration: '55:30',
    views: '3.1K',
    date: '2024-08-15',
    category: 'Masterclass',
    description: 'Industry professionals share their expertise'
  },
  {
    id: '6',
    title: 'Digital Design Exhibition',
    thumbnail: 'https://via.placeholder.com/400x225/1098AD/ffffff?text=Design+Exhibition',
    duration: '18:20',
    views: '945',
    date: '2024-07-20',
    category: 'Student Work',
    description: 'Showcasing the best of student digital design'
  }
]

const categories = ['All', 'Events', 'Student Work', 'Workshops', 'Masterclass', 'Documentary']

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredVideos = videoData.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <MantineProvider>
      <MainLayout>
        <Container size="xl" py={80}>
          <Stack gap={40}>
            <div>
              <Title order={1} size={40} fw={700} ta="center" mb={16}>
                Video Gallery
              </Title>
              <Text ta="center" size="lg" c="dimmed" maw={600} mx="auto">
                Watch highlights from ADMI events, student showcases, and educational content
              </Text>
            </div>

            <Group gap="md" mb={20}>
              <TextInput
                placeholder="Search videos..."
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

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {filteredVideos.map((video) => (
                <Card key={video.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <AspectRatio ratio={16 / 9}>
                      <div style={{ position: 'relative' }}>
                        <Image src={video.thumbnail} alt={video.title} height={225} />
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '50%',
                            width: 60,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <IconPlayerPlay size={30} color="white" />
                        </div>
                        <Badge
                          color="dark"
                          variant="filled"
                          style={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8
                          }}
                        >
                          {video.duration}
                        </Badge>
                      </div>
                    </AspectRatio>
                  </Card.Section>

                  <Stack gap="xs" mt="md">
                    <Title order={4} lineClamp={2}>
                      {video.title}
                    </Title>

                    <Text size="sm" c="dimmed" lineClamp={2}>
                      {video.description}
                    </Text>

                    <Group justify="space-between" mt="xs">
                      <Badge color="blue" variant="light">
                        {video.category}
                      </Badge>
                      <Group gap="xs">
                        <Group gap={4}>
                          <IconEye size={14} />
                          <Text size="xs" c="dimmed">
                            {video.views}
                          </Text>
                        </Group>
                        <Group gap={4}>
                          <IconCalendar size={14} />
                          <Text size="xs" c="dimmed">
                            {new Date(video.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </Text>
                        </Group>
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>

            {filteredVideos.length === 0 && (
              <Text ta="center" c="dimmed" py={60}>
                No videos found matching your search criteria
              </Text>
            )}

            <Group justify="center" mt={40}>
              <Button variant="outline" size="md">
                Load More Videos
              </Button>
            </Group>
          </Stack>
        </Container>
      </MainLayout>
    </MantineProvider>
  )
}
