import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Image,
  Modal,
  Button,
  Breadcrumbs,
  Anchor,
  MantineProvider,
  Loader,
  Alert
} from '@mantine/core'
import { IconDownload, IconCalendar, IconCamera, IconArrowLeft, IconAlertCircle } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'
import '@mantine/core/styles.css'

interface AlbumImage {
  id: string
  title: string
  filename: string
  thumbnail: string
  fullSize: string
  downloadUrl: string
  size: number
  lastModified: string
}

interface Album {
  slug: string
  title: string
  description: string
  date: string
  category: string
  photographer: string
  images: AlbumImage[]
  imageCount: number
}

// Client component that handles params
'use client'
function AlbumPageClient({ slug }: { slug: string }) {
  const [album, setAlbum] = useState<Album | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<AlbumImage | null>(null)
  const [modalOpened, setModalOpened] = useState(false)

  // Fetch album data from API
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/media-archive/albums/${slug}`)
        const data = await response.json()

        if (data.success && data.album) {
          setAlbum(data.album)
          setError(null)
        } else {
          setError(data.error || 'Album not found')
        }
      } catch (err) {
        console.error('Error fetching album:', err)
        setError('Failed to load album')
      } finally {
        setLoading(false)
      }
    }

    fetchAlbum()
  }, [slug])

  const openImageModal = (image: AlbumImage) => {
    setSelectedImage(image)
    setModalOpened(true)
  }

  const breadcrumbs = [
    { title: 'Media Archive', href: '/media-archive' },
    { title: 'Images', href: '/media-archive/images' },
    { title: album?.title || slug, href: '#' }
  ]

  return (
    <MantineProvider>
      <MainLayout>
        <Container size="xl" py={80}>
          <Stack gap={40}>
            <div>
              <Breadcrumbs mb={20}>
                {breadcrumbs.map((item, index) => (
                  <Anchor key={index} component={Link} href={item.href} size="sm">
                    {item.title}
                  </Anchor>
                ))}
              </Breadcrumbs>

              {loading && (
                <Stack align="center" py={60}>
                  <Loader size="lg" />
                  <Text c="dimmed">Loading album...</Text>
                </Stack>
              )}

              {error && (
                <Alert icon={<IconAlertCircle size={16} />} title="Unable to load album" color="red" mb={20}>
                  {error}
                  <Group mt="md">
                    <Link href="/media-archive/images">
                      <Button leftSection={<IconArrowLeft size={16} />} variant="outline" size="sm">
                        Back to Image Gallery
                      </Button>
                    </Link>
                  </Group>
                </Alert>
              )}

              {album && !loading && !error && (
                <>
                  <Title order={1} size={40} fw={700} mb={16}>
                    {album.title}
                  </Title>

                  <Text size="lg" c="dimmed" mb={20}>
                    {album.description}
                  </Text>

                  <Group gap="md" mb={20}>
                    <Badge color="blue" variant="light" size="lg">
                      {album.category}
                    </Badge>
                    <Group gap={4}>
                      <IconCalendar size={16} />
                      <Text size="sm" c="dimmed">
                        {new Date(album.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <IconCamera size={16} />
                      <Text size="sm" c="dimmed">
                        Photo by {album.photographer}
                      </Text>
                    </Group>
                    <Text size="sm" c="dimmed" fw={500}>
                      {album.imageCount} photos
                    </Text>
                  </Group>
                </>
              )}
            </div>

            {album && !loading && !error && (
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {album.images.map((image) => (
                  <Card
                    key={image.id}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ cursor: 'pointer' }}
                    onClick={() => openImageModal(image)}
                  >
                    <Card.Section>
                      <Image
                        src={image.thumbnail}
                        alt={image.title}
                        height={250}
                        fallbackSrc="https://via.placeholder.com/400x300/E9ECEF/6C757D?text=Image+Not+Found"
                      />
                    </Card.Section>

                    <Text fw={500} lineClamp={2} mt="md">
                      {image.title}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            )}

            <Group justify="center" mt={40}>
              <Link href="/media-archive/images">
                <Button leftSection={<IconArrowLeft size={16} />} variant="outline" size="md">
                  Back to Image Gallery
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>

        <Modal opened={modalOpened} onClose={() => setModalOpened(false)} size="xl" title={selectedImage?.title}>
          {selectedImage && (
            <Stack>
              <Image src={selectedImage.fullSize} alt={selectedImage.title} radius="md" />
              <Group justify="space-between" align="flex-start">
                <Stack gap="xs">
                  <Text size="sm" fw={500}>
                    Album: {album?.title}
                  </Text>
                  <Group gap="xs">
                    <Badge color="blue" variant="light">
                      {album?.category}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      Photo by {album?.photographer}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed">
                    {new Date(album?.date || new Date()).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </Stack>
                <Button leftSection={<IconDownload size={16} />} variant="light" size="sm">
                  Download
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </MainLayout>
    </MantineProvider>
  )
}

// Server component wrapper to handle params
type AlbumPageProps = {
  params: Promise<{ slug: string }>
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params
  return <AlbumPageClient slug={slug} />
}
