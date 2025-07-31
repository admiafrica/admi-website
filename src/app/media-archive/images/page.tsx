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
  Image,
  Button,
  MantineProvider,
  Loader,
  Alert
} from '@mantine/core'
import { IconSearch, IconCalendar, IconCamera, IconPhoto, IconAlertCircle } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'
import '@mantine/core/styles.css'

interface AlbumItem {
  id: string
  slug: string
  title: string
  description: string
  date: string
  category: string
  photographer: string
  event: string
  thumbnail: string
  imageCount: number
  isAlbum: boolean
}

const categories = [
  'All',
  'Graduation',
  'Workshops',
  'Open Day',
  'Classes',
  'Exhibition',
  'Facilities',
  'Awards',
  'Festival',
  'Event'
]

export default function ImagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [albums, setAlbums] = useState<AlbumItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/media-archive/albums')
        const data = await response.json()

        if (data.success) {
          setAlbums(data.albums)
          setError(null)
        } else {
          setError(data.error || 'Failed to load albums')
        }
      } catch (err) {
        console.error('Error fetching albums:', err)
        setError('Failed to connect to media archive')
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  // For now, we'll only show albums from S3. Individual images can be added later if needed
  const filteredItems = albums.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <MantineProvider>
      <MainLayout>
        <Container size="xl" py={80}>
          <Stack gap={40}>
            <div>
              <Title order={1} size={40} fw={700} ta="center" mb={16}>
                Photo Gallery
              </Title>
              <Text ta="center" size="lg" c="dimmed" maw={600} mx="auto">
                Browse through our collection of photos from ADMI events and activities
              </Text>
            </div>

            {!loading && !error && (
              <Group gap="md" mb={20}>
                <TextInput
                  placeholder="Search albums..."
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
                <Text c="dimmed">Loading albums from media archive...</Text>
              </Stack>
            )}

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} title="Unable to load albums" color="red" mb={20}>
                {error}
              </Alert>
            )}

            {!loading && !error && (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {filteredItems.map((album) => (
                  <Link key={album.id} href={`/media-archive/images/${album.slug}`} style={{ textDecoration: 'none' }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: 'pointer' }}>
                      <Card.Section>
                        <div style={{ position: 'relative' }}>
                          <Image
                            src={album.thumbnail}
                            alt={album.title}
                            height={200}
                            fallbackSrc="https://via.placeholder.com/400x300/E9ECEF/6C757D?text=No+Image"
                          />
                          <Badge
                            color="blue"
                            variant="filled"
                            style={{
                              position: 'absolute',
                              top: 8,
                              right: 8
                            }}
                            leftSection={<IconPhoto size={12} />}
                          >
                            {album.imageCount} photos
                          </Badge>
                        </div>
                      </Card.Section>

                      <Stack gap="xs" mt="md">
                        <Text fw={500} lineClamp={2}>
                          {album.title}
                        </Text>

                        <Badge color="blue" variant="light" size="sm">
                          {album.category} Album
                        </Badge>

                        <Group gap="xs" wrap="wrap">
                          <Group gap={4}>
                            <IconCalendar size={14} />
                            <Text size="xs" c="dimmed">
                              {new Date(album.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </Text>
                          </Group>
                          <Group gap={4}>
                            <IconCamera size={14} />
                            <Text size="xs" c="dimmed">
                              {album.photographer}
                            </Text>
                          </Group>
                        </Group>
                      </Stack>
                    </Card>
                  </Link>
                ))}
              </SimpleGrid>
            )}

            {!loading && !error && filteredItems.length === 0 && (
              <Text ta="center" c="dimmed" py={60}>
                {albums.length === 0 ? 'No albums found in media archive' : 'No albums match your search criteria'}
              </Text>
            )}

            <Group justify="center" mt={40}>
              <Button variant="outline" size="md">
                Load More Images
              </Button>
            </Group>
          </Stack>
        </Container>
      </MainLayout>
    </MantineProvider>
  )
}
