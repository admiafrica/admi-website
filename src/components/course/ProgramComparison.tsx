'use client'

import { useRouter } from 'next/router'
import { Badge, Button, Card, Group, Stack, Table, Text, ThemeIcon } from '@mantine/core'
import { IconArrowRight, IconCheck, IconX } from '@tabler/icons-react'

type Props = {
  certificateSlug?: string
  diplomaSlug?: string
}

export default function ProgramComparison({ certificateSlug, diplomaSlug }: Props) {
  const router = useRouter()

  const comparisonData = [
    {
      feature: 'Duration',
      certificate: '4 months (1 term)',
      diploma: '2 years (4-5 semesters)',
      highlight: 'diploma'
    },
    {
      feature: 'Investment',
      certificate: 'KES 48,000 total',
      diploma: 'KES 400,000 - 500,000 total',
      highlight: 'certificate'
    },
    {
      feature: 'Monthly Equivalent',
      certificate: '~KES 12,000/month',
      diploma: '~KES 25,000/month',
      highlight: null
    },
    {
      feature: 'Certification Level',
      certificate: 'Certificate',
      diploma: 'Diploma + Woolf Pathway',
      highlight: 'diploma'
    },
    {
      feature: 'Expected Salary (Entry)',
      certificate: 'KES 25,000 - 80,000',
      diploma: 'KES 45,000 - 120,000',
      highlight: 'diploma'
    },
    {
      feature: 'Industry Internship',
      certificate: false,
      diploma: true,
      highlight: 'diploma'
    },
    {
      feature: 'Portfolio Projects',
      certificate: '2-3 projects',
      diploma: '10+ major projects',
      highlight: 'diploma'
    },
    {
      feature: 'Job Placement Support',
      certificate: 'Basic',
      diploma: 'Full career services',
      highlight: 'diploma'
    },
    {
      feature: 'Upgrade Path',
      certificate: 'Can upgrade to Diploma',
      diploma: 'Full program',
      highlight: null
    },
    {
      feature: 'Payment Plans',
      certificate: true,
      diploma: '50/30/20 split + 10% upfront discount',
      highlight: 'diploma'
    }
  ]

  const handleEnquiry = (type: 'certificate' | 'diploma') => {
    const query = router.query
    const slug = type === 'certificate' ? certificateSlug : diplomaSlug
    if (slug) {
      router.push({ pathname: `/courses/${slug}`, query })
    } else {
      router.push({ pathname: '/enquiry', query: { ...query, program: type } })
    }
  }

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <ThemeIcon size="sm" radius="xl" color="teal">
          <IconCheck size={12} />
        </ThemeIcon>
      ) : (
        <ThemeIcon size="sm" radius="xl" color="gray" variant="light">
          <IconX size={12} />
        </ThemeIcon>
      )
    }
    return <Text size="sm">{value}</Text>
  }

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        <Stack gap="xl">
          {/* Header */}
          <div className="text-center">
            <Badge size="lg" color="blue" variant="light" mb="md">
              Not Sure Which to Choose?
            </Badge>
            <Text size="xl" fw={900} className="font-nexa">
              Certificate vs Diploma Comparison
            </Text>
            <Text size="md" c="dimmed" mt="sm">
              Find the right program for your goals and budget
            </Text>
          </div>

          {/* Comparison Table */}
          <Card shadow="md" radius="lg" p={0} className="overflow-hidden">
            <Table highlightOnHover withColumnBorders>
              <Table.Thead>
                <Table.Tr bg="gray.1">
                  <Table.Th w={200}>Feature</Table.Th>
                  <Table.Th w={250}>
                    <Group gap="sm">
                      <Badge color="blue" variant="light">
                        Certificate
                      </Badge>
                      <Text size="sm" c="dimmed">
                        4 months
                      </Text>
                    </Group>
                  </Table.Th>
                  <Table.Th w={250}>
                    <Group gap="sm">
                      <Badge color="teal" variant="filled">
                        Diploma
                      </Badge>
                      <Text size="sm" c="dimmed">
                        2 years
                      </Text>
                    </Group>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {comparisonData.map((row, index) => (
                  <Table.Tr key={index}>
                    <Table.Td fw={500}>{row.feature}</Table.Td>
                    <Table.Td bg={row.highlight === 'certificate' ? 'blue.0' : undefined}>
                      {renderValue(row.certificate)}
                    </Table.Td>
                    <Table.Td bg={row.highlight === 'diploma' ? 'teal.0' : undefined}>
                      {renderValue(row.diploma)}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            {/* CTA Row */}
            <Group justify="space-around" p="xl" bg="gray.0">
              <Stack align="center" gap="sm">
                <Text size="sm" c="dimmed">
                  Quick skills upgrade
                </Text>
                <Button
                  variant="outline"
                  color="blue"
                  rightSection={<IconArrowRight size={16} />}
                  onClick={() => handleEnquiry('certificate')}
                >
                  Choose Certificate
                </Button>
              </Stack>
              <Stack align="center" gap="sm">
                <Badge color="teal" variant="light">
                  Recommended for Career Change
                </Badge>
                <Button
                  color="teal"
                  rightSection={<IconArrowRight size={16} />}
                  onClick={() => handleEnquiry('diploma')}
                >
                  Choose Diploma
                </Button>
              </Stack>
            </Group>
          </Card>

          {/* Bottom Message */}
          <Text size="sm" c="dimmed" ta="center">
            💡 <strong>Pro tip:</strong> Start with a Certificate and upgrade to Diploma within 6 months - your full
            certificate fee (KES 48,000) will be credited!
          </Text>
        </Stack>
      </div>
    </div>
  )
}
