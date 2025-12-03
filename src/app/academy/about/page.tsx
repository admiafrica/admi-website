'use client'

import { Badge, Box, Card, Container, Divider, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import Link from 'next/link'
import { IconArrowRight, IconCertificate, IconCompass, IconHeartHandshake, IconUsers } from '@tabler/icons-react'

const teachingModel = [
  {
    title: 'Portfolio-first delivery',
    copy: 'We anchor every lesson to a deliverable. Expect briefs, templates, and critiques that move you toward a finished asset.',
    icon: IconCompass
  },
  {
    title: 'Mentors who ship',
    copy: 'Sessions are led by practitioners from creative, marketing, and data teams who share real prompts, systems, and case studies.',
    icon: IconUsers
  },
  {
    title: 'Career positioning',
    copy: 'We translate your work into a story hiring managers and leadership care about—measurable impact, governance, and reliability.',
    icon: IconCertificate
  }
]

const rhythm = [
  'Live workshops twice per week with labs in between',
  'Structured feedback cycles with small peer squads',
  'Office hours for tooling, prompts, and implementation challenges',
  'Career clinics on interviews, negotiation, and stakeholder communication'
]

const mentors = [
  {
    name: 'Creative & Content',
    focus: 'Art direction, video, audio, and motion pipelines with AI guardrails.'
  },
  {
    name: 'Marketing & Growth',
    focus: 'Campaign ops, experimentation, analytics, and QA for performance teams.'
  },
  {
    name: 'Data & Operations',
    focus: 'Reporting automation, dashboards, and internal copilots with governance.'
  }
]

export default function AcademyAboutPage() {
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
          <Stack gap="lg" maw={780}>
            <Badge color="admiDarkOrange" variant="light" size="lg">
              About ADMI AI Academy
            </Badge>
            <Title order={1} style={{ fontSize: '3rem', lineHeight: 1.05 }}>
              Built for ambitious creatives, marketers, and operators who want proof—not just theory.
            </Title>
            <Text size="lg" c="dimmed">
              We designed the AI Academy to pair hands-on experimentation with professional rigor. You will leave with
              shipped projects, a career story, and the confidence to lead AI initiatives at work.
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
                href="/academy/enquiry"
                style={{
                  color: '#000',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                Talk to an advisor <IconArrowRight size={14} />
              </Link>
            </Group>
          </Stack>

          <Group gap="md" mt={32} wrap="wrap">
            {[
              { label: 'Cohort length', value: '8–12 weeks with portfolio delivery' },
              { label: 'Sessions', value: 'Live workshops + async labs weekly' },
              { label: 'Support', value: 'Mentors, peer squads, and career coaching' }
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

      <Container size="lg" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
        <Stack gap="lg">
          <Title order={2}>Our teaching model</Title>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {teachingModel.map((item) => (
              <Card key={item.title} withBorder padding="xl" radius="lg" shadow="sm">
                <ThemeIcon variant="light" color="admiDarkOrange" size={36} radius="md">
                  <item.icon size={18} />
                </ThemeIcon>
                <Title order={3} mt="md" mb="xs">
                  {item.title}
                </Title>
                <Text c="dimmed">{item.copy}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>

      <Container size="lg" style={{ paddingBottom: '72px' }}>
        <Card withBorder padding="xl" radius="lg" shadow="md">
          <Group gap="md" align="flex-start">
            <ThemeIcon variant="light" color="admiDarkOrange" size={32} radius="md">
              <IconHeartHandshake size={18} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Title order={3}>What a cohort feels like</Title>
              <Text c="dimmed" mb="lg">
                We combine structure with flexibility. Expect consistent checkpoints and space to adapt projects to your
                role.
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                {rhythm.map((item) => (
                  <Group key={item} gap="xs" align="flex-start">
                    <ThemeIcon color="admiDarkOrange" variant="light" size={20} radius="xl">
                      <IconArrowRight size={12} />
                    </ThemeIcon>
                    <Text>{item}</Text>
                  </Group>
                ))}
              </SimpleGrid>
            </div>
          </Group>
        </Card>
      </Container>

      <Container size="lg" style={{ paddingBottom: '72px' }}>
        <Stack gap="md">
          <Title order={2}>Mentors by focus area</Title>
          <Text c="dimmed" maw={720}>
            You will be paired with a lead mentor for your path plus guest instructors who have shipped AI work in-house
            and for clients.
          </Text>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
            {mentors.map((mentor) => (
              <Card key={mentor.name} withBorder padding="lg" radius="md" shadow="sm">
                <Text fw={700}>{mentor.name}</Text>
                <Divider my="sm" />
                <Text c="dimmed">{mentor.focus}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
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
                Join the next cohort
              </Title>
              <Text c="dimmed">
                Tell us about your role and goals. We will recommend the right path, share sample projects, and outline
                the time commitment.
              </Text>
            </div>
            <Link
              href="/academy/enquiry"
              style={{
                background: 'linear-gradient(90deg, #BA2E36 0%, #F76335 100%)',
                color: '#fff',
                padding: '12px 18px',
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              Book a call
            </Link>
          </Group>
        </Card>
      </Container>
    </>
  )
}
