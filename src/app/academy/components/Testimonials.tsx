'use client'

import { Avatar, Card, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconQuote } from '@tabler/icons-react'

const testimonials = [
  {
    name: 'Jane M.',
    role: 'Creative Director',
    testimonial:
      'The AI for Creatives path felt like a studio apprenticeship. I automated edits, pitched smarter, and shipped three portfolio pieces that landed two new clients.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    name: 'Rahul S.',
    role: 'Marketing Lead',
    testimonial:
      'We rebuilt our campaign ops with AI copilots. Week 6 alone paid for the program with a 38% lift in ROAS and a reusable playbook.',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
  },
  {
    name: 'Nora K.',
    role: 'Business Analyst',
    testimonial:
      'The automation labs gave me confidence. I now own an internal AI stack, reduced reporting time by 70%, and stepped into a strategy role.',
    avatar: 'https://randomuser.me/api/portraits/women/69.jpg'
  }
]

export function Testimonials() {
  return (
    <Container
      size="lg"
      style={{
        paddingTop: '88px',
        paddingBottom: '88px'
      }}
    >
      <Title order={2} ta="center" style={{ fontSize: '2.1rem', marginBottom: 12 }}>
        Proof from alumni who shipped
      </Title>
      <Text c="dimmed" ta="center" style={{ maxWidth: 720, margin: '0 auto 40px' }}>
        Results-first learning: every path ends with assets, automations, and a sharper story for your career moves.
      </Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {testimonials.map((item) => (
          <Card
            key={item.name}
            withBorder
            padding="xl"
            radius="md"
            shadow="sm"
            style={{
              position: 'relative',
              background:
                'linear-gradient(180deg, rgba(186, 46, 54, 0.07) 0%, rgba(255, 255, 255, 0.92) 50%, #ffffff 100%)',
              borderColor: 'rgba(0,0,0,0.05)'
            }}
          >
            <ThemeIcon
              variant="light"
              color="admiDarkOrange"
              size={36}
              radius="md"
              style={{ position: 'absolute', top: 18, right: 18 }}
            >
              <IconQuote size={18} />
            </ThemeIcon>
            <Stack gap="md">
              <Text c="dimmed" fs="italic">
                "{item.testimonial}"
              </Text>
              <Group gap="sm">
                <Avatar src={item.avatar} alt={item.name} radius="xl" />
                <Stack gap={2}>
                  <Text fw={600}>{item.name}</Text>
                  <Text size="sm" c="dimmed">
                    {item.role}
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
