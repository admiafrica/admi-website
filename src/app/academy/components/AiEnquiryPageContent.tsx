'use client'

import { Box, Card, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconCheck, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { AiEnquiryForm } from './AiEnquiryForm'

const assurances = [
  'Tailored guidance for your role and goals',
  'Portfolio-ready projects and governance built in',
  'Fast response times from the Academy team'
]

export function AiEnquiryPageContent() {
  const palette = {
    blush: '#F7E8DE',
    sand: '#F2EDE8',
    mint: '#DDEEE5'
  }

  return (
    <>
      <Box
        component="section"
        style={{
          background: `
            radial-gradient(circle at 14% 16%, rgba(186, 46, 54, 0.12), transparent 32%),
            radial-gradient(circle at 80% 10%, rgba(247, 177, 153, 0.24), transparent 28%),
            linear-gradient(180deg, ${palette.sand} 0%, #ffffff 70%)`
        }}
      >
        <Container size="lg" style={{ paddingTop: '96px', paddingBottom: '72px' }}>
          <Stack gap="lg" maw={780}>
            <Title order={1} style={{ fontSize: '3rem', lineHeight: 1.05 }}>
              Book a call with the AI Academy team
            </Title>
            <Text size="lg" c="dimmed">
              Share your goals and timeline. We will recommend the right path, show sample projects, and outline how we
              support you through the cohort.
            </Text>
            <Group gap="md">
              <Link
                href="/academy/paths"
                style={{
                  color: '#BA2E36',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                Explore programs <IconArrowRight size={16} />
              </Link>
              <Link
                href="/academy/about"
                style={{
                  color: '#000',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                See how we mentor <IconArrowRight size={14} />
              </Link>
            </Group>
            <Group gap="md" wrap="wrap">
              {assurances.map((item) => (
                <Card
                  key={item}
                  withBorder
                  radius="md"
                  padding="md"
                  style={{
                    minWidth: 220,
                    background: `linear-gradient(180deg, ${palette.blush} 0%, #ffffff 100%)`,
                    borderColor: 'rgba(0,0,0,0.05)'
                  }}
                >
                  <Group gap="xs">
                    <ThemeIcon color="admiDarkOrange" variant="light" size={22} radius="xl">
                      <IconCheck size={14} />
                    </ThemeIcon>
                    <Text fw={600}>{item}</Text>
                  </Group>
                </Card>
              ))}
            </Group>
          </Stack>
        </Container>
      </Box>

      <Container size="lg" style={{ paddingTop: '64px', paddingBottom: '96px' }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <AiEnquiryForm />

          <Stack gap="lg">
            <Card withBorder padding="xl" radius="lg" shadow="sm">
              <Title order={4} mb="xs">
                What happens after you submit
              </Title>
              <Stack gap="sm">
                {[
                  'We review your goals and confirm the right path.',
                  'You receive cohort dates, sample projects, and a short call invite.',
                  'We help you prep tools and set expectations before the start date.'
                ].map((item) => (
                  <Group key={item} gap="xs" align="flex-start">
                    <ThemeIcon color="admiDarkOrange" variant="light" size={20} radius="xl">
                      <IconCheck size={12} />
                    </ThemeIcon>
                    <Text>{item}</Text>
                  </Group>
                ))}
              </Stack>
            </Card>

            <Card
              withBorder
              padding="xl"
              radius="lg"
              shadow="sm"
              style={{
                background: `linear-gradient(120deg, ${palette.blush} 0%, ${palette.mint} 100%)`,
                borderColor: 'rgba(0,0,0,0.05)'
              }}
            >
              <Title order={4} mb="xs">
                Prefer email?
              </Title>
              <Text c="dimmed" mb="md">
                Send us your role, goals, and a preferred time. We will match you with the right advisor.
              </Text>
              <Group gap="sm">
                <Link
                  href="mailto:academy@admi.ac.ke"
                  style={{
                    background: 'linear-gradient(90deg, #BA2E36 0%, #F76335 100%)',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: 12,
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  Email the team
                </Link>
                <Link
                  href="https://wa.me/254711486581"
                  style={{
                    border: '1px solid #BA2E36',
                    color: '#BA2E36',
                    padding: '10px 16px',
                    borderRadius: 12,
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  WhatsApp us
                </Link>
              </Group>
            </Card>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  )
}
