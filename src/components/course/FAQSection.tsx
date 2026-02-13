import { Paper, Stack, SimpleGrid, Text, Group, Button } from '@mantine/core'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { FAQ_DATA } from '@/data/faq-data'

/**
 * Comprehensive FAQ Section
 * Answers common objections and questions for diploma programs
 */
export function FAQSection() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 pb-20 pt-12 2xl:px-0">
      <Paper shadow="sm" p="xl" radius="md" className="border border-gray-200">
        <Stack gap="xl">
          <div>
            <Text size="2xl" fw={700} c="#002A23" mb="xs">
              Common Questions About Diploma Programs
            </Text>
            <Text size="md" c="dimmed">
              We understand you have questions. Here are answers to help you make the right decision.
            </Text>
          </div>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {FAQ_DATA.map((category) => (
              <Stack key={category.title} gap="md">
                <Text size="lg" fw={600} c={category.color}>
                  {category.title}
                </Text>

                {category.items.map((item) => (
                  <div key={item.question}>
                    <Text size="sm" fw={600} mb={4}>
                      {item.question}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {item.answer}
                    </Text>
                  </div>
                ))}
              </Stack>
            ))}
          </SimpleGrid>

          <Paper p="lg" bg="#f8f9fa" radius="md" mt="lg">
            <Group justify="space-between" wrap="wrap" gap="md">
              <Stack gap={4} style={{ flex: '1 1 300px' }}>
                <Text size="lg" fw={600}>
                  Still have questions?
                </Text>
                <Text size="sm" c="dimmed">
                  Our admissions team is here to help you make the best decision for your future.
                </Text>
              </Stack>

              <Group gap="sm">
                <Button
                  component="a"
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I have questions about diploma programs`}
                  color="green"
                  leftSection={<IconBrandWhatsapp size={18} />}
                  onClick={() => trackWhatsAppClick('courses_faq', 'FAQ Section')}
                  target="_blank"
                >
                  Chat on WhatsApp
                </Button>
                <Button component="a" href="/contact" variant="outline" color="gray">
                  Schedule a Call
                </Button>
              </Group>
            </Group>
          </Paper>
        </Stack>
      </Paper>
    </div>
  )
}
