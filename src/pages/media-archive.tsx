import { Container, Title, SimpleGrid, Card, Text, Group, Badge, Stack, MantineProvider } from '@mantine/core'
import { IconVideo, IconPhoto, IconMusic } from '@tabler/icons-react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'
import '@/styles/globals.css'
import '@mantine/core/styles.css'

const mediaCategories = [
  {
    title: 'Videos',
    href: '/videos',
    color: 'blue',
    icon: IconVideo,
    description: 'Watch highlights from ADMI events, student showcases, and educational content',
    stats: 'Available Now'
  },
  {
    title: 'Images',
    href: '/media-archive/images',
    color: 'green',
    icon: IconPhoto,
    description: 'Browse photo galleries from graduations, workshops, and campus life',
    stats: 'Multiple Albums'
  },
  {
    title: 'Audio',
    href: '/media-archive/audio',
    color: 'purple',
    icon: IconMusic,
    description: 'Listen to student compositions, podcasts, and audio portfolios',
    stats: 'Music & Podcasts'
  }
]

// Pages Router version for staging compatibility
export default function MediaArchivePage() {
  return (
    <MantineProvider>
      <MainLayout>
        <Container size="xl" py={80}>
          <Stack gap={60}>
            <div>
              <Title order={1} size={48} fw={700} ta="center" mb={20}>
                Media Archive
              </Title>
              <Text ta="center" size="xl" c="dimmed" maw={800} mx="auto">
                Explore our comprehensive media library featuring videos, images, and audio content from ADMI events,
                student work, and educational resources.
              </Text>
            </div>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
              {mediaCategories.map((category) => (
                <Link key={category.title} href={category.href} style={{ textDecoration: 'none' }}>
                  <Card
                    shadow="sm"
                    padding="xl"
                    radius="md"
                    withBorder
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      ':hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
                      }
                    }}
                  >
                    <Stack gap="md" align="center" ta="center">
                      <div
                        style={{
                          backgroundColor: `var(--mantine-color-${category.color}-1)`,
                          borderRadius: '50%',
                          padding: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <category.icon size={40} style={{ color: `var(--mantine-color-${category.color}-6)` }} />
                      </div>

                      <div>
                        <Title order={3} size={24} fw={600} mb={8}>
                          {category.title}
                        </Title>
                        <Text size="sm" c="dimmed" mb={12}>
                          {category.description}
                        </Text>
                        <Badge color={category.color} variant="light" size="sm">
                          {category.stats}
                        </Badge>
                      </div>
                    </Stack>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>

            <div>
              <Text ta="center" size="lg" c="dimmed" mb={20}>
                Discover the creative work and memorable moments from Africa Digital Media Institute
              </Text>
              <Group justify="center" gap="md">
                <Badge color="blue" variant="outline" size="lg">
                  Student Work
                </Badge>
                <Badge color="green" variant="outline" size="lg">
                  Events & Activities
                </Badge>
                <Badge color="purple" variant="outline" size="lg">
                  Educational Content
                </Badge>
              </Group>
            </div>
          </Stack>
        </Container>
      </MainLayout>
    </MantineProvider>
  )
}
