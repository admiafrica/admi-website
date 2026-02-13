import { Paper, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconWorld, IconAward, IconShieldCheck, IconUsers } from '@tabler/icons-react'

const TRUST_BADGES = [
  {
    icon: IconWorld,
    color: 'blue',
    title: 'Global Standards',
    description: 'Industry-recognized curriculum'
  },
  {
    icon: IconAward,
    color: 'orange',
    title: 'Employer Recognition',
    description: 'Trusted by 500+ companies'
  },
  {
    icon: IconShieldCheck,
    color: 'green',
    title: 'Ethical Practices',
    description: 'Digital-first assessment'
  },
  {
    icon: IconUsers,
    color: 'teal',
    title: '5,000+ Alumni',
    description: 'Building careers since 2012'
  }
] as const

/**
 * Trust & Social Proof Section
 * Displays credibility indicators to build confidence
 */
export function TrustBadges() {
  return (
    <Paper shadow="xs" p="lg" mb="xl" radius="md" className="border border-gray-200 bg-white">
      <Text size="lg" fw={600} ta="center" mb="lg" c="#002A23">
        Globally Recognized, Value-Driven Education
      </Text>

      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="lg">
        {TRUST_BADGES.map((badge) => (
          <Stack key={badge.title} gap="xs" align="center">
            <ThemeIcon size={48} color={badge.color} variant="light" radius="xl">
              <badge.icon size={28} />
            </ThemeIcon>
            <Text size="sm" fw={600} ta="center">
              {badge.title}
            </Text>
            <Text size="xs" c="dimmed" ta="center">
              {badge.description}
            </Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Paper>
  )
}
