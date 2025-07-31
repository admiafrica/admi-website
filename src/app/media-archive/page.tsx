'use client'

import {
  Container,
  Title,
  SimpleGrid,
  Card,
  Text,
  Group,
  ThemeIcon,
  Stack,
  Paper,
  MantineProvider
} from '@mantine/core'
import { IconVideo, IconPhoto, IconHeadphones } from '@tabler/icons-react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'
import '@mantine/core/styles.css'

const mediaCategories = [
  {
    title: 'Videos',
    description: 'Browse our collection of event videos, documentaries, and highlights',
    icon: IconVideo,
    href: '/videos',
    color: 'blue',
    stats: 'Available Now'
  },
  {
    title: 'Images',
    description: 'Explore our photo gallery from ADMI events, workshops, and activities',
    icon: IconPhoto,
    href: '/media-archive/images',
    color: 'green',
    stats: 'Coming Soon'
  },
  {
    title: 'Audio',
    description: 'Listen to podcasts, interviews, and audio recordings',
    icon: IconHeadphones,
    href: '/media-archive/audio',
    color: 'orange',
    stats: 'Coming Soon'
  }
]

export default function MediaArchivePage() {
  return (
    <MantineProvider>
      <MainLayout>
        <Container size="lg" py={80}>
          <Stack gap={48}>
            <div>
              <Title order={1} size={48} fw={700} ta="center" mb={16}>
                Media Archive
              </Title>
              <Text ta="center" size="lg" c="dimmed" maw={600} mx="auto">
                Explore our rich collection of multimedia content from ADMI events, workshops, and activities
              </Text>
            </div>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {mediaCategories.map((category) => (
                <Link key={category.title} href={category.href} style={{ textDecoration: 'none' }}>
                  <Card
                    shadow="sm"
                    padding="xl"
                    radius="md"
                    withBorder
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <ThemeIcon size={60} radius="md" variant="light" color={category.color} mb={20}>
                      <category.icon size={30} />
                    </ThemeIcon>

                    <Title order={3} size="h4" fw={600} mb={8}>
                      {category.title}
                    </Title>

                    <Text size="sm" c="dimmed" mb={20}>
                      {category.description}
                    </Text>

                    <Group justify="space-between" align="center">
                      <Text size="sm" fw={500} c="blue">
                        Browse {category.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {category.stats}
                      </Text>
                    </Group>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>

            <Paper p="xl" radius="md" bg="gray.0" ta="center">
              <Title order={3} size="h4" mb={8}>
                Looking for something specific?
              </Title>
              <Text c="dimmed" mb={16}>
                Our media archive is continuously growing with new content from ADMI events and activities.
              </Text>
              <Text size="sm" c="dimmed">
                For media inquiries, please contact{' '}
                <a href="mailto:media@admi.africa" style={{ fontWeight: 500, color: 'inherit' }}>
                  media@admi.africa
                </a>
              </Text>
            </Paper>
          </Stack>
        </Container>
      </MainLayout>
    </MantineProvider>
  )
}
