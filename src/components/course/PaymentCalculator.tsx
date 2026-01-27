'use client'

import { useState } from 'react'
import { Card, Group, NumberFormatter, SegmentedControl, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { IconCalculator, IconCheck, IconInfoCircle, IconPercentage } from '@tabler/icons-react'

type Props = {
  tuitionFees: string // e.g., "KES 100,000" or just the number
  isDiploma?: boolean
  totalSemesters?: number
}

export default function PaymentCalculator({ tuitionFees, isDiploma = true, totalSemesters = 4 }: Props) {
  const [paymentOption, setPaymentOption] = useState<string>('installment')

  // Extract numeric value from tuition string
  const extractAmount = (str: string): number => {
    const match = str.replace(/,/g, '').match(/\d+/)
    return match ? parseInt(match[0]) : isDiploma ? 100000 : 48000
  }

  const semesterFee = extractAmount(tuitionFees)
  const upfrontDiscount = 0.1 // 10% discount for full payment

  // Payment plans
  const plans = {
    upfront: {
      total: semesterFee * (1 - upfrontDiscount),
      savings: semesterFee * upfrontDiscount,
      payments: [{ label: 'Full Payment', amount: semesterFee * (1 - upfrontDiscount), due: 'Before classes start' }]
    },
    installment: {
      total: semesterFee,
      savings: 0,
      payments: [
        { label: 'First Installment (50%)', amount: semesterFee * 0.5, due: 'Before classes start' },
        { label: 'Second Installment (30%)', amount: semesterFee * 0.3, due: 'Week 6' },
        { label: 'Final Installment (20%)', amount: semesterFee * 0.2, due: 'Week 12' }
      ]
    }
  }

  const currentPlan = paymentOption === 'upfront' ? plans.upfront : plans.installment

  // Calculate monthly equivalent for marketing
  const monthlyEquivalent = Math.ceil(semesterFee / 4)

  return (
    <Card shadow="md" radius="md" p="xl" className="border-2 border-[#00D9A5]">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Group gap="sm">
            <ThemeIcon size="lg" radius="md" color="teal">
              <IconCalculator size={20} />
            </ThemeIcon>
            <div>
              <Text fw={700} size="lg">
                Payment Options
              </Text>
              <Text size="sm" c="dimmed">
                Flexible plans to suit your budget
              </Text>
            </div>
          </Group>
          <Tooltip label="50/30/20 split across the semester">
            <ThemeIcon variant="light" color="gray" radius="xl">
              <IconInfoCircle size={16} />
            </ThemeIcon>
          </Tooltip>
        </Group>

        {/* Payment Toggle */}
        <SegmentedControl
          value={paymentOption}
          onChange={setPaymentOption}
          fullWidth
          data={[
            {
              label: (
                <Group gap={4} justify="center">
                  <IconPercentage size={16} />
                  <span>Pay Upfront (Save 10%)</span>
                </Group>
              ),
              value: 'upfront'
            },
            {
              label: (
                <Group gap={4} justify="center">
                  <IconCalculator size={16} />
                  <span>Installment Plan</span>
                </Group>
              ),
              value: 'installment'
            }
          ]}
          color="teal"
        />

        {/* Semester Fee Display */}
        <Card bg="gray.0" p="md" radius="sm">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Semester Tuition Fee
            </Text>
            <Text size="xl" fw={900}>
              <NumberFormatter prefix="KES " value={semesterFee} thousandSeparator />
            </Text>
          </Group>
          {isDiploma && (
            <Text size="xs" c="dimmed" mt={4}>
              ~ <NumberFormatter prefix="KES " value={monthlyEquivalent} thousandSeparator /> per month
            </Text>
          )}
        </Card>

        {/* Payment Breakdown */}
        <Stack gap="xs">
          <Text fw={600} size="sm">
            Payment Schedule:
          </Text>
          {currentPlan.payments.map((payment, index) => (
            <Group key={index} justify="space-between" className="rounded-md bg-gray-50 p-3">
              <Group gap="sm">
                <ThemeIcon size="sm" radius="xl" color="teal" variant="light">
                  <IconCheck size={12} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={500}>
                    {payment.label}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {payment.due}
                  </Text>
                </div>
              </Group>
              <Text fw={700}>
                <NumberFormatter prefix="KES " value={payment.amount} thousandSeparator />
              </Text>
            </Group>
          ))}
        </Stack>

        {/* Total */}
        <Card bg={paymentOption === 'upfront' ? 'teal.0' : 'gray.1'} p="md" radius="sm">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Semester Total
              </Text>
              {currentPlan.savings > 0 && (
                <Text size="xs" c="teal" fw={600}>
                  You save <NumberFormatter prefix="KES " value={currentPlan.savings} thousandSeparator />!
                </Text>
              )}
            </div>
            <Text size="xl" fw={900} c={paymentOption === 'upfront' ? 'teal' : undefined}>
              <NumberFormatter prefix="KES " value={currentPlan.total} thousandSeparator />
            </Text>
          </Group>
        </Card>

        {/* Diploma Total Investment */}
        {isDiploma && (
          <Card bg="dark" p="md" radius="sm">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="white">
                  Total Diploma Investment
                </Text>
                <Text size="xs" c="dimmed">
                  {totalSemesters} semesters (2 years)
                </Text>
              </div>
              <div className="text-right">
                <Text size="lg" fw={900} c="#F1FE38">
                  <NumberFormatter prefix="KES " value={currentPlan.total * totalSemesters} thousandSeparator />
                </Text>
                {paymentOption === 'upfront' && (
                  <Text size="xs" c="teal">
                    Save{' '}
                    <NumberFormatter prefix="KES " value={currentPlan.savings * totalSemesters} thousandSeparator />{' '}
                    total
                  </Text>
                )}
              </div>
            </Group>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
