'use client'

import { Badge, Card, Container, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core'
import { IconBook, IconUsers, IconBriefcase, IconBrain } from '@tabler/icons-react'

const features = [
  {
    icon: IconBook,
    title: 'Personalized learning maps',
    description: 'Skill diagnostics and AI-assisted coaching to curate the exact projects and lessons you need.',
    badge: 'Tailored'
  },
  {
    icon: IconBriefcase,
    title: 'Portfolio-first execution',
    description: 'Ship real deliverables: marketing playbooks, creative assets, and automated business workflows.',
    badge: 'Projects'
  },
  {
    icon: IconUsers,
    title: 'Mentors & peer studio',
    description: 'Weekly live critiques, accountability squads, and practitioner-led office hours.',
    badge: 'Live'
  },
  {
    icon: IconBrain,
    title: 'Career transformation hub',
    description: 'Narrative coaching, interview drills, and an AI-powered resume/portfolio upgrade lab.',
    badge: 'Career'
  }
]

export function Features() {
  return (
    <Container
      size="lg"
      style={{
        paddingTop: '88px',
        paddingBottom: '88px'
      }}
    >
      <Title order={2} ta="center" style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
        Designed to move you from curious to confident
      </Title>
      <Text c="dimmed" ta="center" style={{ maxWidth: 740, margin: '0 auto 40px' }}>
        We blend live mentoring, structured practice, and career positioning into one cohesive experience—so you learn
        faster and get credit for it.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {features.map((feature) => (
          <Card
            key={feature.title}
            withBorder
            padding="lg"
            radius="md"
            shadow="sm"
            style={{
              background:
                'linear-gradient(180deg, rgba(186, 46, 54, 0.06) 0%, rgba(255, 255, 255, 0.9) 50%, #ffffff 100%)',
              borderColor: 'rgba(0,0,0,0.05)'
            }}
          >
            <ThemeIcon
              size={44}
              radius="md"
              variant="light"
              color="admiDarkOrange"
              style={{ boxShadow: 'var(--mantine-shadow-sm)' }}
            >
              <feature.icon size={22} />
            </ThemeIcon>
            <Title order={4} style={{ marginTop: 16, marginBottom: 10 }}>
              {feature.title}
            </Title>
            <Text c="dimmed" style={{ marginBottom: 12 }}>
              {feature.description}
            </Text>
            <Badge color="admiDarkOrange" variant="light">
              {feature.badge}
            </Badge>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
