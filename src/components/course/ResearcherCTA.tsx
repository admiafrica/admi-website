import { Paper, Group, Stack, Text, Button } from '@/lib/tw-mantine'
import { IconChartBar } from '@tabler/icons-react'

/**
 * Researcher CTA - Segment C
 * Targets 18% of visitors in research/comparison phase
 */
export function ResearcherCTA() {
  return (
    <Paper shadow="xs" p="lg" mb="xl" radius="md" className="border border-blue-200 bg-blue-50">
      <Group justify="space-between" wrap="wrap" gap="md">
        <Stack gap="xs" style={{ flex: '1 1 300px' }}>
          <Group gap="xs">
            <IconChartBar size={20} color="#1971c2" />
            <Text size="lg" fw={600} c="#1971c2">
              Not sure which program is right for you?
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            Dive deep into price-to-value comparisons • Calculate lifetime earnings • Understand career trajectory
            differences
          </Text>
        </Stack>

        <Group gap="sm" style={{ flex: '0 0 auto' }}>
          <Button
            component="a"
            href="/programs/diploma-vs-certificate"
            variant="light"
            color="blue"
            leftSection={<IconChartBar size={18} />}
          >
            Compare Programs
          </Button>
        </Group>
      </Group>
    </Paper>
  )
}
