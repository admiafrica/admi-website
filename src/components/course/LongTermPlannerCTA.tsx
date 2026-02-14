import { Paper, Group, Stack, Badge, Text, Button } from '@/lib/tw-mantine'
import { IconClock } from '@tabler/icons-react'

/**
 * Long-Term Planner CTA - Segment D
 * Targets 31% of visitors planning for future intakes
 */
export function LongTermPlannerCTA() {
  return (
    <Paper shadow="xs" p="lg" mb="xl" radius="md" className="border border-teal-200 bg-teal-50">
      <Group justify="space-between" wrap="wrap" gap="md">
        <Stack gap="xs" style={{ flex: '1 1 300px' }}>
          <Group gap="xs">
            <IconClock size={20} color="#087f5b" />
            <Badge size="md" color="teal" variant="filled">
              Next Intake: March 2026
            </Badge>
          </Group>

          <Text size="lg" fw={600} c="#087f5b">
            Planning ahead? Drive your future with our Career Assessment
          </Text>

          <Text size="sm" c="dimmed">
            Capture personalized recommendations • Discover financing options • Secure early bird discounts
          </Text>
        </Stack>

        <Group gap="sm" style={{ flex: '0 0 auto' }}>
          <Button
            component="a"
            href="/career-assessment"
            variant="light"
            color="teal"
            leftSection={<IconClock size={18} />}
          >
            Take Quiz (2 min)
          </Button>
        </Group>
      </Group>
    </Paper>
  )
}
