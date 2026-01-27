'use client'

import { Badge, Card, Group, Progress, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconBriefcase, IconCash, IconCertificate, IconTrendingUp, IconUsers } from '@tabler/icons-react'

type Props = {
  isDiploma?: boolean
  employmentRate?: number // e.g., 85
  averageSalaryRange?: string // e.g., "KES 45,000 - 120,000"
  timeToEmployment?: string // e.g., "3-6 months"
}

// Default industry partners/employers
const defaultPartners = [
  { name: 'Safaricom', logo: '/images/partners/safaricom.png' },
  { name: 'Nation Media', logo: '/images/partners/nation.png' },
  { name: 'Standard Group', logo: '/images/partners/standard.png' },
  { name: 'Royal Media', logo: '/images/partners/royal.png' },
  { name: 'Capital FM', logo: '/images/partners/capital.png' },
  { name: 'Multichoice', logo: '/images/partners/multichoice.png' }
]

export default function GraduateOutcomes({
  isDiploma = true,
  employmentRate = isDiploma ? 85 : 75,
  averageSalaryRange = isDiploma ? 'KES 45,000 - 120,000' : 'KES 25,000 - 80,000',
  timeToEmployment = isDiploma ? '3-6 months' : '1-3 months'
}: Props) {
  const stats = [
    {
      icon: IconBriefcase,
      label: 'Employment Rate',
      value: `${employmentRate}%`,
      subtext: 'within 6 months of graduation',
      color: 'teal'
    },
    {
      icon: IconCash,
      label: 'Average Salary',
      value: averageSalaryRange,
      subtext: 'per month (entry level)',
      color: 'yellow'
    },
    {
      icon: IconTrendingUp,
      label: 'Time to First Job',
      value: timeToEmployment,
      subtext: 'after completing program',
      color: 'blue'
    },
    {
      icon: IconUsers,
      label: 'Alumni Network',
      value: '5,000+',
      subtext: 'graduates across Africa',
      color: 'grape'
    }
  ]

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        <Stack gap="xl">
          {/* Header */}
          <div className="text-center">
            <Badge size="lg" color="teal" variant="light" mb="md">
              Graduate Success
            </Badge>
            <Text size="xl" fw={900} c="white" className="font-nexa">
              Where Our {isDiploma ? 'Diploma' : 'Certificate'} Graduates Work
            </Text>
            <Text size="md" c="dimmed" mt="sm">
              Join thousands of successful graduates building careers in creative media
            </Text>
          </div>

          {/* Stats Grid */}
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
            {stats.map((stat, index) => (
              <Card key={index} bg="dark.6" p="lg" radius="md">
                <Stack gap="sm" align="center">
                  <ThemeIcon size="xl" radius="md" color={stat.color} variant="light">
                    <stat.icon size={24} />
                  </ThemeIcon>
                  <Text size="xl" fw={900} c="white" ta="center">
                    {stat.value}
                  </Text>
                  <div className="text-center">
                    <Text size="sm" c="white" fw={500}>
                      {stat.label}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {stat.subtext}
                    </Text>
                  </div>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>

          {/* Employment Progress Bar */}
          <Card bg="dark.6" p="lg" radius="md">
            <Group justify="space-between" mb="sm">
              <Text size="sm" c="white" fw={500}>
                Graduate Employment Rate
              </Text>
              <Text size="sm" c="teal" fw={700}>
                {employmentRate}%
              </Text>
            </Group>
            <Progress value={employmentRate} size="lg" color="teal" radius="xl" />
            <Text size="xs" c="dimmed" mt="sm">
              Based on {isDiploma ? '2023-2024' : '2024-2025'} graduate tracking data
            </Text>
          </Card>

          {/* Industry Partners */}
          <div>
            <Text size="sm" c="dimmed" ta="center" mb="md">
              Our graduates have been hired by
            </Text>
            <Group justify="center" gap="xl" wrap="wrap">
              {defaultPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex h-12 w-24 items-center justify-center rounded-md bg-white/10 px-4 py-2 grayscale transition-all hover:bg-white/20 hover:grayscale-0"
                >
                  <Text size="xs" c="white" fw={500} ta="center">
                    {partner.name}
                  </Text>
                </div>
              ))}
            </Group>
          </div>

          {/* Accreditation Badges */}
          <Group justify="center" gap="lg" mt="md">
            <Badge size="lg" variant="outline" color="yellow" leftSection={<IconCertificate size={16} />}>
              TVETA Accredited
            </Badge>
            <Badge size="lg" variant="outline" color="blue" leftSection={<IconCertificate size={16} />}>
              Pearson Assured
            </Badge>
            {isDiploma && (
              <Badge size="lg" variant="outline" color="grape" leftSection={<IconCertificate size={16} />}>
                Woolf University Partner
              </Badge>
            )}
          </Group>
        </Stack>
      </div>
    </div>
  )
}
