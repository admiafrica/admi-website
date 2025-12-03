'use client'

import { Badge, Button, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { programs } from '../paths/data'

export function PathOverview() {
  return (
    <Container
      size="lg"
      style={{
        paddingTop: '88px',
        paddingBottom: '88px'
      }}
    >
      <Title order={2} ta="center" style={{ fontSize: '2.1rem', marginBottom: 12 }}>
        Choose a path built for your role
      </Title>
      <Text c="dimmed" ta="center" style={{ maxWidth: 720, margin: '0 auto 40px' }}>
        Each program blends live instruction, labs, and career coaching with a portfolio-ready deliverable at the end.
      </Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {programs.map((path) => (
          <Card
            key={path.slug}
            withBorder
            padding="xl"
            radius="md"
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
              <Badge color={path.color} variant="light">
                {path.duration}
              </Badge>
              <Badge color={path.color} variant="outline">
                {path.outcome}
              </Badge>
            </Group>
            <Stack gap={8} style={{ flex: 1 }}>
              <Title order={3}>{path.title}</Title>
              <Text c="dimmed">{path.description}</Text>
            </Stack>
            <Button
              component={Link}
              href={`/academy/paths/${path.slug}`}
              radius="md"
              variant="light"
              color={path.color}
              rightSection={<span aria-hidden>→</span>}
            >
              View syllabus
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
