import { Paper, Group, Stack, Badge, Text, Button } from '@/lib/tw-mantine'
import { IconSchool, IconBrandWhatsapp } from '@tabler/icons-react'
import { Title } from '@/components/ui'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

/**
 * Fast Converter CTA - Segment A
 * Targets 25% of visitors who convert quickly with immediate action CTAs
 */
export function FastConverterCTA() {
  return (
    <Paper
      shadow="sm"
      p="xl"
      mt="xl"
      mb="xl"
      radius="md"
      className="border-2 border-[#FF6B35] bg-gradient-to-r from-[#FFF8F5] to-white"
    >
      <Group justify="space-between" wrap="wrap" gap="md">
        <Stack gap="xs" style={{ flex: '1 1 300px' }}>
          <Group gap="xs">
            <IconSchool size={24} color="#FF6B35" />
            <Badge size="lg" color="orange" variant="filled">
              85% Employed in 3 Months
            </Badge>
          </Group>

          <Title label="Spearhead Your Career Journey with a Diploma" size="28px" color="#002A23" />

          <Text size="lg" c="dimmed">
            From only <strong>15,000 KES/month</strong> • 6-month payback •{' '}
            <strong>75K KES avg. starting salary</strong>
          </Text>

          <Text size="sm" fw={500} c="#FF6B35">
            🎯 ROI: 12× your investment over 5 years • Build high-value, exportable content
          </Text>
        </Stack>

        <Group gap="sm" style={{ flex: '0 0 auto' }}>
          <Button
            component="a"
            href="/apply"
            size="lg"
            color="orange"
            leftSection={<IconSchool size={20} />}
            className="font-bold"
          >
            Apply Now
          </Button>

          <Button
            component="a"
            href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I'd like to learn more about diploma programs`}
            size="lg"
            variant="outline"
            color="green"
            leftSection={<IconBrandWhatsapp size={20} />}
            onClick={() => {
              trackWhatsAppClick('courses_page_fast_converter', 'Courses Page - Fast Converter CTA')
            }}
            target="_blank"
          >
            WhatsApp Support
          </Button>
        </Group>
      </Group>
    </Paper>
  )
}
