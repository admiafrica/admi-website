'use client'

import { useRouter } from 'next/router'
import { Badge, Button, Card, Group, List, NumberFormatter, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconArrowRight, IconCheck, IconRocket, IconSparkles } from '@tabler/icons-react'

type Props = {
  certificateName: string
  certificateFee?: number // e.g., 48000
  diplomaName?: string
  diplomaFee?: number // e.g., 100000 per semester
}

export default function CertificateUpgrade({
  certificateName,
  certificateFee = 48000,
  diplomaName,
  diplomaFee = 100000
}: Props) {
  const router = useRouter()

  // Infer diploma name from certificate name
  const inferredDiplomaName = diplomaName || certificateName.replace('Certificate', 'Diploma')

  // Infer diploma slug from certificate
  const diplomaSlug = inferredDiplomaName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  const handleLearnMore = () => {
    router.push(`/courses/${diplomaSlug}`)
  }

  const upgradeAdvantages = [
    'Full certificate fee (KES 48,000) credited to diploma',
    'Advanced industry-level skills & portfolio',
    'Higher earning potential (KES 45K-120K/month)',
    'Woolf University accreditation pathway',
    'Guaranteed internship placement',
    'Access to alumni network & job board'
  ]

  return (
    <Card
      className="overflow-hidden"
      radius="lg"
      p={0}
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        border: '2px solid #F1FE38'
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: Content */}
        <div className="flex-1 p-6 md:p-8">
          <Stack gap="lg">
            {/* Header */}
            <Group gap="sm">
              <ThemeIcon size="lg" radius="md" color="yellow">
                <IconRocket size={20} />
              </ThemeIcon>
              <Badge size="lg" color="yellow" variant="filled">
                Upgrade Path Available
              </Badge>
            </Group>

            <div>
              <Text size="xl" fw={900} c="white" className="font-nexa">
                Ready for More? Upgrade to Diploma
              </Text>
              <Text size="sm" c="dimmed" mt="xs">
                Take your {certificateName} skills to the next level with our 2-year diploma program
              </Text>
            </div>

            {/* Benefits List */}
            <List
              spacing="sm"
              icon={
                <ThemeIcon size="sm" radius="xl" color="teal">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {upgradeAdvantages.map((advantage, index) => (
                <List.Item key={index}>
                  <Text size="sm" c="white">
                    {advantage}
                  </Text>
                </List.Item>
              ))}
            </List>

            {/* CTA */}
            <Button
              size="lg"
              color="yellow"
              rightSection={<IconArrowRight size={18} />}
              onClick={handleLearnMore}
              className="w-fit"
              style={{ color: '#000' }}
            >
              Explore Diploma Program
            </Button>
          </Stack>
        </div>

        {/* Right: Comparison Card */}
        <div className="bg-white/5 p-6 md:w-80 md:p-8">
          <Stack gap="md">
            <Text size="sm" c="dimmed" fw={500}>
              Investment Comparison
            </Text>

            {/* Certificate */}
            <Card bg="dark.6" p="md" radius="sm">
              <Text size="xs" c="dimmed">
                Certificate (4 months)
              </Text>
              <Text size="lg" fw={700} c="white">
                <NumberFormatter prefix="KES " value={certificateFee} thousandSeparator />
              </Text>
              <Text size="xs" c="dimmed">
                One-time investment
              </Text>
            </Card>

            {/* Arrow */}
            <Group justify="center">
              <IconSparkles size={24} color="#F1FE38" />
            </Group>

            {/* Diploma */}
            <Card bg="teal.9" p="md" radius="sm" className="border-2 border-[#00D9A5]">
              <Text size="xs" c="teal.2">
                Diploma (2 years)
              </Text>
              <Text size="lg" fw={700} c="white">
                <NumberFormatter prefix="KES " value={diplomaFee * 4} thousandSeparator />
              </Text>
              <Text size="xs" c="teal.3">
                <NumberFormatter prefix="KES " value={diplomaFee} thousandSeparator /> × 4 semesters
              </Text>
              <Badge size="sm" color="yellow" mt="sm" style={{ color: '#000' }}>
                Your KES 48K credited!
              </Badge>
            </Card>

            {/* Upgrade Deadline */}
            <Text size="xs" c="dimmed" ta="center">
              Upgrade within 6 months of certificate completion
            </Text>
          </Stack>
        </div>
      </div>
    </Card>
  )
}
