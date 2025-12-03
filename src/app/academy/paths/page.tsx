'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'
import Link from 'next/link'
import { IconArrowRight, IconCheck, IconMapPin, IconUserStar } from '@tabler/icons-react'
import { programs } from './data'

export default function PathsPage() {
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
          <Stack gap="lg" maw={760}>
            <Group gap="xs">
              <Badge color="admiDarkOrange" variant="light" size="lg">
                AI Academy
              </Badge>
              <Text c="dimmed" size="sm">
                Cohort-based, portfolio-first learning
              </Text>
            </Group>
            <Title order={1} style={{ fontSize: '3rem', lineHeight: 1.05 }}>
              Choose the AI path that fits your role and ship work that proves it.
            </Title>
            <Text size="lg" c="dimmed">
              Each path blends live instruction, labs, and career coaching. You leave with deliverables, a story that
              sells your impact, and a system you can run inside your team.
            </Text>
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
                Talk to an advisor
              </Button>
              <Button component={Link} href="/academy/about" size="lg" radius="md" variant="outline">
                Meet the faculty
              </Button>
            </Group>
          </Stack>

          <Group gap="md" mt={32} wrap="wrap">
            {[
              { label: 'Live sessions', value: '2x weekly + labs' },
              { label: 'Career support', value: 'Interview drills + portfolio review' },
              { label: 'Proof of work', value: 'Projects with metrics and governance' }
            ].map((item) => (
              <Card key={item.label} withBorder radius="md" padding="md" style={{ minWidth: 220 }}>
                <Text size="xs" c="dimmed" fw={600} tt="uppercase" lh={1.2}>
                  {item.label}
                </Text>
                <Text fw={700} size="lg">
                  {item.value}
                </Text>
              </Card>
            ))}
          </Group>
        </Container>
      </Box>

      <Container size="lg" style={{ paddingTop: '72px', paddingBottom: '48px' }}>
        <Stack gap="xl">
          <Stack gap={8} align="flex-start">
            <Title order={2} style={{ fontSize: '2.2rem' }}>
              Explore the paths
            </Title>
            <Text c="dimmed" maw={720}>
              Pick the track that matches your goals. Every cohort follows the same rhythm—diagnose, build with support,
              and present your work with a clear ROI story.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
            {programs.map((program) => (
              <Card
                key={program.slug}
                withBorder
                padding="xl"
                radius="lg"
                shadow="sm"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  borderColor: 'rgba(0,0,0,0.05)',
                  background:
                    'linear-gradient(180deg, rgba(186, 46, 54, 0.05) 0%, rgba(255, 255, 255, 0.94) 60%, #ffffff 100%)'
                }}
              >
                <Group gap="xs">
                  <Badge color={program.color} variant="light">
                    {program.duration}
                  </Badge>
                  <Badge color={program.color} variant="outline">
                    {program.cadence}
                  </Badge>
                  <Badge color={program.color} variant="light">
                    {program.cohortDate}
                  </Badge>
                </Group>
                <Stack gap={6}>
                  <Title order={3}>{program.title}</Title>
                  <Text fw={600} c={program.color}>
                    {program.tagline}
                  </Text>
                  <Text c="dimmed">{program.description}</Text>
                </Stack>
                <Divider />
                <List
                  spacing="sm"
                  size="sm"
                  icon={
                    <ThemeIcon color={program.color} variant="light" size={20} radius="xl">
                      <IconCheck size={14} />
                    </ThemeIcon>
                  }
                >
                  {program.heroBullets.map((item) => (
                    <List.Item key={item}>{item}</List.Item>
                  ))}
                </List>
                <Group justify="space-between" align="center">
                  <Text fw={600}>{program.outcome}</Text>
                  <Button
                    component={Link}
                    href={`/academy/paths/${program.slug}`}
                    radius="md"
                    variant="gradient"
                    gradient={{ from: '#BA2E36', to: '#F76335' }}
                    rightSection={<IconArrowRight size={16} />}
                  >
                    View syllabus
                  </Button>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      <Container size="lg" style={{ paddingTop: '48px', paddingBottom: '72px' }}>
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
          <Stack gap="lg">
            <Group gap="sm">
              <ThemeIcon variant="light" color="admiDarkOrange" size={32} radius="md">
                <IconMapPin size={18} />
              </ThemeIcon>
              <div>
                <Title order={3}>Not sure which path fits?</Title>
                <Text c="dimmed">We will map your goals to the right program in a 20-minute call.</Text>
              </div>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              {[
                'Skill diagnostic + roadmap review',
                'See sample projects from past cohorts',
                'Career positioning + sponsorship tips'
              ].map((item) => (
                <Group key={item} gap="xs" align="flex-start">
                  <ThemeIcon color="admiDarkOrange" variant="light" size={20} radius="xl">
                    <IconCheck size={12} />
                  </ThemeIcon>
                  <Text>{item}</Text>
                </Group>
              ))}
            </SimpleGrid>
            <Group gap="md">
              <Button
                component={Link}
                href="/academy/enquiry"
                radius="md"
                variant="gradient"
                gradient={{ from: '#BA2E36', to: '#F76335' }}
                rightSection={<IconArrowRight size={16} />}
              >
                Book a call
              </Button>
              <Button component={Link} href="/academy/about" radius="md" variant="outline">
                Learn how we mentor
              </Button>
            </Group>
          </Stack>
        </Card>
      </Container>

      <Container size="lg" style={{ paddingBottom: '96px' }}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {[
            {
              title: 'Live and async support',
              copy: 'Studios, critiques, and async check-ins keep you accountable between sessions.'
            },
            {
              title: 'Career narrative coaching',
              copy: 'We translate your projects into a clear story for hiring managers and leadership.'
            },
            {
              title: 'Community of practitioners',
              copy: 'Work alongside peers in marketing, creative, and operations who are shipping similar work.'
            }
          ].map((item) => (
            <Card key={item.title} withBorder padding="lg" radius="md" shadow="sm">
              <Group gap="sm">
                <ThemeIcon variant="light" color="admiDarkOrange" size={32} radius="md">
                  <IconUserStar size={18} />
                </ThemeIcon>
                <Title order={4}>{item.title}</Title>
              </Group>
              <Text c="dimmed" mt="xs">
                {item.copy}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
