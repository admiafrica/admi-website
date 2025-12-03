'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'
import Link from 'next/link'
import { IconArrowRight, IconCheck, IconInfoCircle } from '@tabler/icons-react'
import { programs } from '../data'

type PathPageProps = {
  params: Promise<{ slug: string }>
}

export default async function PathDetailPage({ params }: PathPageProps) {
  const { slug } = await params
  const program = programs.find((item) => item.slug === slug)

  if (!program) {
    return (
      <Container size="lg" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <Card withBorder padding="xl" radius="lg" shadow="sm">
          <Title order={2}>Path not found</Title>
          <Text c="dimmed" mt="sm">
            We could not find that program. Explore all options and pick the one that fits your goals.
          </Text>
          <Button
            component={Link}
            href="/academy/paths"
            mt="lg"
            radius="md"
            variant="gradient"
            gradient={{ from: '#BA2E36', to: '#F76335' }}
          >
            View all paths
          </Button>
        </Card>
      </Container>
    )
  }

  return (
    <>
      <Box
        component="section"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(186,46,54,0.10), transparent 35%), radial-gradient(circle at 80% 10%, rgba(247,99,53,0.14), transparent 30%), linear-gradient(180deg, #fff9f7 0%, #ffffff 70%)'
        }}
      >
        <Container size="lg" style={{ paddingTop: '96px', paddingBottom: '72px' }}>
          <Stack gap="lg">
            <Group gap="xs">
              <Badge color={program.color} variant="light" size="lg">
                {program.duration}
              </Badge>
              <Badge color={program.color} variant="outline" size="lg">
                {program.cadence}
              </Badge>
              <Badge color={program.color} variant="light" size="lg">
                {program.cohortDate}
              </Badge>
            </Group>
            <Stack gap={8} maw={840}>
              <Title order={1} style={{ fontSize: '3rem', lineHeight: 1.05 }}>
                {program.title}
              </Title>
              <Text fw={700} c={program.color} size="lg">
                {program.tagline}
              </Text>
              <Text c="dimmed" size="lg">
                {program.description}
              </Text>
            </Stack>
            <Group gap="md">
              <Button
                component={Link}
                href="/academy/enquiry"
                size="lg"
                radius="md"
                variant="gradient"
                gradient={{ from: '#BA2E36', to: '#F76335' }}
                rightSection={<IconArrowRight size={18} />}
              >
                Apply for this cohort
              </Button>
              <Button component={Link} href="/academy/paths" size="lg" radius="md" variant="outline">
                Compare other paths
              </Button>
            </Group>
            <Card withBorder radius="lg" padding="md" shadow="sm" maw={820} style={{ background: '#ffffff' }}>
              <List
                spacing="sm"
                icon={
                  <ThemeIcon color={program.color} variant="light" size={24} radius="xl">
                    <IconCheck size={14} />
                  </ThemeIcon>
                }
              >
                {program.heroBullets.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </Card>
          </Stack>
        </Container>
      </Box>

      <Container size="lg" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Stack gap="md">
            <Title order={3}>Who this is for</Title>
            <Group gap="sm" align="flex-start">
              {program.idealFor.map((item) => (
                <Badge key={item} color={program.color} variant="light" size="lg">
                  {item}
                </Badge>
              ))}
            </Group>
            <Card withBorder padding="lg" radius="md" shadow="sm">
              <Group gap="sm" align="flex-start">
                <ThemeIcon color={program.color} variant="light" size={28} radius="md">
                  <IconInfoCircle size={16} />
                </ThemeIcon>
                <div>
                  <Text fw={700}>Cohort rhythm</Text>
                  <Text c="dimmed">
                    Live sessions, labs, and critiques each week. You will share progress updates and get direct
                    feedback from mentors and peers.
                  </Text>
                </div>
              </Group>
            </Card>
          </Stack>

          <Stack gap="md">
            <Title order={3}>What you will walk away with</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {program.outcomes.map((item) => (
                <Card key={item} withBorder padding="md" radius="md" shadow="sm">
                  <Group gap="xs" align="flex-start">
                    <ThemeIcon color={program.color} variant="light" size={22} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                    <Text>{item}</Text>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </SimpleGrid>
      </Container>

      <Container size="lg" style={{ paddingBottom: '72px' }}>
        <Title order={3} mb="lg">
          Curriculum highlights
        </Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {program.curriculum.map((module) => (
            <Card
              key={module.title}
              withBorder
              padding="lg"
              radius="md"
              shadow="sm"
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <Title order={4}>{module.title}</Title>
              <List
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon color={program.color} variant="light" size={18} radius="xl">
                    <IconCheck size={11} />
                  </ThemeIcon>
                }
              >
                {module.points.map((point) => (
                  <List.Item key={point}>{point}</List.Item>
                ))}
              </List>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      <Container size="lg" style={{ paddingBottom: '72px' }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
          <Card withBorder padding="xl" radius="lg" shadow="sm">
            <Title order={4} mb="sm">
              Projects you will ship
            </Title>
            <List
              spacing="md"
              icon={
                <ThemeIcon color={program.color} variant="light" size={22} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {program.projects.map((project) => (
                <List.Item key={project}>{project}</List.Item>
              ))}
            </List>
          </Card>

          <Stack gap="lg">
            <Card withBorder padding="xl" radius="lg" shadow="sm">
              <Title order={4} mb="sm">
                Support during the cohort
              </Title>
              <List
                spacing="md"
                icon={
                  <ThemeIcon color={program.color} variant="light" size={22} radius="xl">
                    <IconCheck size={12} />
                  </ThemeIcon>
                }
              >
                {program.support.map((item) => (
                  <List.Item key={item}>{item}</List.Item>
                ))}
              </List>
            </Card>

            <Card withBorder padding="xl" radius="lg" shadow="sm">
              <Title order={4} mb="sm">
                Tools we cover
              </Title>
              <Group gap="sm" align="flex-start" wrap="wrap">
                {program.tools.map((tool) => (
                  <Badge key={tool} color={program.color} variant="light">
                    {tool}
                  </Badge>
                ))}
              </Group>
            </Card>
          </Stack>
        </SimpleGrid>
      </Container>

      <Container size="lg" style={{ paddingBottom: '96px' }}>
        <Card
          withBorder
          padding="xl"
          radius="lg"
          shadow="md"
          style={{
            background: 'linear-gradient(90deg, rgba(186, 46, 54, 0.10) 0%, rgba(247, 99, 53, 0.08) 100%)',
            borderColor: 'rgba(0,0,0,0.05)'
          }}
        >
          <Group justify="space-between" align="center" gap="md" wrap="wrap">
            <div style={{ maxWidth: 520 }}>
              <Title order={3} style={{ marginBottom: 8 }}>
                Ready for {program.title}?
              </Title>
              <Text c="dimmed">
                Submit a short note about your goals and current workflow. We will confirm fit, share sample projects,
                and hold your seat for the next cohort.
              </Text>
            </div>
            <Group gap="sm">
              <Button
                component={Link}
                href="/academy/enquiry"
                radius="md"
                variant="gradient"
                gradient={{ from: '#BA2E36', to: '#F76335' }}
              >
                Apply now
              </Button>
              <Button component={Link} href="/academy" radius="md" variant="outline">
                Back to overview
              </Button>
            </Group>
          </Group>
        </Card>
      </Container>
    </>
  )
}
