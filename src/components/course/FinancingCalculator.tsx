import { useState } from 'react'
import { Paper, Stack, Group, SimpleGrid, Text, ThemeIcon, Slider, Badge, Button } from '@mantine/core'
import { IconCurrencyDollar, IconBrandWhatsapp } from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

const DIPLOMA_TOTAL_COST = 450000
const SLIDER_MARKS = {
  monthly: [
    { value: 10000, label: '10K' },
    { value: 25000, label: '25K' },
    { value: 50000, label: '50K' }
  ],
  duration: [
    { value: 3, label: '3mo' },
    { value: 12, label: '12mo' },
    { value: 24, label: '24mo' },
    { value: 36, label: '36mo' }
  ]
}

/**
 * Interactive Financing Calculator
 * Allows prospective students to visualize payment options
 */
export function FinancingCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState(15000)
  const [paymentMonths, setPaymentMonths] = useState(30)

  const totalPaid = monthlyPayment * paymentMonths

  return (
    <Paper
      shadow="md"
      p="xl"
      mb="xl"
      radius="md"
      className="border border-green-300 bg-gradient-to-br from-green-50 to-white"
    >
      <Stack gap="lg">
        <Group gap="sm">
          <ThemeIcon size="lg" color="green" variant="light">
            <IconCurrencyDollar size={24} />
          </ThemeIcon>
          <div>
            <Text size="xl" fw={700} c="#2f9e44">
              Flexible Payment Plans
            </Text>
            <Text size="sm" c="dimmed">
              Standard Diploma: {DIPLOMA_TOTAL_COST.toLocaleString()} KES total (4 semesters + internship)
            </Text>
          </div>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {/* Controls */}
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} mb="xs">
                Monthly Payment Amount
              </Text>
              <Group gap="xs">
                <Text size="2xl" fw={700} c="green">
                  {monthlyPayment.toLocaleString()} KES
                </Text>
                <Text size="sm" c="dimmed">
                  per month
                </Text>
              </Group>
              <Slider
                value={monthlyPayment}
                onChange={setMonthlyPayment}
                min={10000}
                max={50000}
                step={1000}
                marks={SLIDER_MARKS.monthly}
                color="green"
                mt="md"
              />
            </div>

            <div>
              <Text size="sm" fw={500} mb="xs">
                Payment Period
              </Text>
              <Group gap="xs">
                <Text size="2xl" fw={700} c="green">
                  {paymentMonths}
                </Text>
                <Text size="sm" c="dimmed">
                  months
                </Text>
              </Group>
              <Slider
                value={paymentMonths}
                onChange={setPaymentMonths}
                min={3}
                max={36}
                step={3}
                marks={SLIDER_MARKS.duration}
                color="green"
                mt="md"
              />
            </div>
          </Stack>

          {/* Summary */}
          <Paper p="lg" bg="#f1f3f5" radius="md">
            <Stack gap="sm">
              <Text size="sm" c="dimmed" fw={500}>
                YOUR INVESTMENT BREAKDOWN
              </Text>

              <div>
                <Text size="xs" c="dimmed">
                  Total Program Cost
                </Text>
                <Text size="lg" fw={700}>
                  {DIPLOMA_TOTAL_COST.toLocaleString()} KES
                </Text>
              </div>

              <div>
                <Text size="xs" c="dimmed">
                  You Pay Per Month
                </Text>
                <Text size="xl" fw={700} c="green">
                  {monthlyPayment.toLocaleString()} KES
                </Text>
              </div>

              <div>
                <Text size="xs" c="dimmed">
                  Total Paid Over Time
                </Text>
                <Text size="lg" fw={700}>
                  {totalPaid.toLocaleString()} KES
                </Text>
              </div>

              <Badge size="lg" color="green" variant="light" fullWidth mt="sm">
                Payback Period: 6 months after graduation
              </Badge>

              <Text size="xs" c="dimmed" ta="center" mt="xs">
                Based on 75K KES avg. starting salary
              </Text>
            </Stack>
          </Paper>
        </SimpleGrid>

        <Group justify="center" gap="sm" mt="md">
          <Button component="a" href="/apply" color="green" leftSection={<IconCurrencyDollar size={18} />}>
            Apply with Payment Plan
          </Button>

          <Button
            component="a"
            href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I need help understanding payment options for diploma programs`}
            variant="outline"
            color="green"
            leftSection={<IconBrandWhatsapp size={18} />}
            onClick={() => trackWhatsAppClick('courses_financing', 'Financing Calculator')}
            target="_blank"
          >
            Discuss Financing Options
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}
