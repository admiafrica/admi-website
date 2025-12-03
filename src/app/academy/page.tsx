'use client'

import { Badge, Box, Button, Card, Container, Divider, Group, List, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import Link from 'next/link'
import { IconArrowRight, IconCalendar, IconCheck, IconPhoneCall } from '@tabler/icons-react'
import { EmailCapture } from './components/EmailCapture'
import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { PathOverview } from './components/PathOverview'
import { Testimonials } from './components/Testimonials'

const stats = [
  { label: 'Cohort duration', value: '12 weeks' },
  { label: 'Live sessions', value: '2x weekly' },
  { label: 'Career sprints', value: 'Portfolio + interviews' }
]

export default function AcademyLandingPage() {
  return (
    <>
      <Box
        component="section"
        style={{
          position: 'relative',
          background:
            'radial-gradient(circle at 20% 20%, rgba(186, 46, 54, 0.10), transparent 38%), radial-gradient(circle at 80% 10%, rgba(247, 99, 53, 0.14), transparent 32%), linear-gradient(180deg, #fff9f7 0%, #ffffff 70%)'
        }}
      >
        <Container
          size="lg"
          style={{
            paddingTop: '96px',
            paddingBottom: '96px',
            position: 'relative'
          }}
        >
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,1))'
            }}
          />
          <Group align="center" gap="xl" justify="space-between" wrap="nowrap">
            <Stack gap="lg" style={{ maxWidth: 640 }}>
              <Group gap="xs" align="center">
                <Badge size="lg" variant="light" color="admiDarkOrange">
                  New cohort forming
                </Badge>
                <Text c="dimmed" size="sm">
                  Applications close soon — reserve your seat
                </Text>
              </Group>
              <Title order={1} style={{ fontSize: '3.2rem', lineHeight: 1.1 }}>
                Build an AI-powered career with hands-on practice and expert guidance.
              </Title>
              <Text size="lg" c="dimmed">
                Join a curated path for marketers, creatives, and business leaders. Ship portfolio projects, learn the
                latest AI tools, and get coached by practitioners.
              </Text>
              <Group gap="md" align="center">
                <Button
                  component={Link}
                  href="/academy/paths"
                  size="lg"
                  radius="md"
                  rightSection={<IconArrowRight size={18} />}
                  variant="gradient"
                  gradient={{ from: '#BA2E36', to: '#F76335' }}
                >
                  Explore programs
                </Button>
                <Button
                  component={Link}
                  href="/academy/enquiry"
                  size="lg"
                  radius="md"
                  variant="outline"
                  leftSection={<IconPhoneCall size={18} />}
                >
                  Talk to an advisor
                </Button>
              </Group>
              <Group gap="md" wrap="wrap">
                {stats.map((item) => (
                  <Card
                    key={item.label}
                    withBorder
                    padding="md"
                    radius="md"
                    style={{ flex: '1 1 180px', minWidth: 180 }}
                  >
                    <Text size="xs" c="dimmed" fw={600} tt="uppercase" lh={1.2}>
                      {item.label}
                    </Text>
                    <Text fw={700} size="lg">
                      {item.value}
                    </Text>
                  </Card>
                ))}
              </Group>
            </Stack>

            <Card
              shadow="md"
              padding="xl"
              radius="lg"
              withBorder
              style={{
                maxWidth: 360,
                flex: '0 0 360px',
                background: 'linear-gradient(180deg, #ffffff 0%, #fff1ed 100%)'
              }}
            >
              <Stack gap="md">
                <Group gap="xs" align="center">
                  <ThemeIcon color="admiDarkOrange" variant="light" size={32} radius="md">
                    <IconCalendar size={18} />
                  </ThemeIcon>
                  <Text fw={700}>Upcoming live series</Text>
                </Group>
                <Text c="dimmed">
                  Weekly studio sessions with mentors, peer critiques, and project labs tailored to your chosen path.
                </Text>
                <Divider />
                <List
                  spacing="sm"
                  icon={
                    <ThemeIcon color="admiDarkOrange" size={20} radius="xl" variant="light">
                      <IconCheck size={14} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>Personalized AI toolkit setup for your workflow</List.Item>
                  <List.Item>Portfolio-ready project briefs with templates</List.Item>
                  <List.Item>Career coaching for interviews and positioning</List.Item>
                </List>
                <Button
                  component={Link}
                  href="/academy/paths/ai-for-creatives"
                  fullWidth
                  radius="md"
                  variant="gradient"
                  gradient={{ from: '#BA2E36', to: '#F76335' }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  View a sample path
                </Button>
              </Stack>
            </Card>
          </Group>
        </Container>
      </Box>
      <Features />
      <Testimonials />
      <PathOverview />
      <Faq />
      <EmailCapture />
    </>
  )
}
