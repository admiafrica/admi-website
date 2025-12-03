'use client'

import { Button, Card, Container, Group, Text, TextInput, Title } from '@mantine/core'

export function EmailCapture() {
  return (
    <Container size="lg" style={{ paddingTop: '72px', paddingBottom: '96px' }}>
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
        <Group align="center" justify="space-between" gap="xl" wrap="wrap">
          <div style={{ maxWidth: 520 }}>
            <Title order={2} style={{ marginBottom: 8 }}>
              Stay ahead of the curve
            </Title>
            <Text c="dimmed">
              Get concise weekly drops: new AI tools, playbooks from our mentors, and early access to upcoming cohorts.
            </Text>
          </div>
          <Group gap="sm" wrap="wrap" style={{ flex: 1, minWidth: 320 }}>
            <TextInput placeholder="Your email address" size="md" radius="md" style={{ flex: 1, minWidth: 240 }} />
            <Button size="md" radius="md" variant="gradient" gradient={{ from: '#BA2E36', to: '#F76335' }}>
              Subscribe
            </Button>
          </Group>
        </Group>
      </Card>
    </Container>
  )
}
