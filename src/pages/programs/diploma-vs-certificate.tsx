import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import {
  Container,
  Title,
  Text,
  Paper,
  SimpleGrid,
  Stack,
  Group,
  Button,
  Badge,
  ThemeIcon,
  Table,
  List,
  Box,
  Divider
} from '@/lib/tw-mantine'
import {
  IconSchool,
  IconCertificate,
  IconTrendingUp,
  IconClock,
  IconCurrencyDollar,
  IconBriefcase,
  IconChartBar,
  IconCheck,
  IconX,
  IconBrandWhatsapp,
  IconArrowRight
} from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

export default function DiplomaVsCertificatePage() {
  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="Diploma vs Certificate: Which Program is Right for You?"
        description="Compare ADMI's diploma and certificate programs. Understand the investment, career outcomes, ROI, and make the right choice for your creative career in Kenya."
        keywords="diploma vs certificate, ADMI programs, Kenya creative education, diploma ROI, certificate programs, career comparison"
        url="/programs/diploma-vs-certificate"
      />

      <Box className="bg-[#002A23] py-20">
        <Container size="lg">
          <Stack align="center" gap="md">
            <Badge size="xl" color="orange" variant="filled">
              Choose Your Path
            </Badge>
            <Title order={1} className="text-center text-white" style={{ fontSize: '48px' }}>
              Diploma vs Certificate Programs
            </Title>
            <Text size="xl" className="text-center text-white/80" maw={700}>
              Discover which program aligns with your career goals, budget, and timeline. Compare side-by-side to make
              an informed decision.
            </Text>
          </Stack>
        </Container>
      </Box>

      <Container size="lg" py={60}>
        {/* Quick Decision Matrix */}
        <Paper shadow="md" p="xl" mb={60} radius="md" className="border-2 border-orange-300">
          <Text size="xl" fw={700} mb="lg" ta="center">
            Quick Decision Guide
          </Text>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Paper p="lg" bg="#FFF8F5" radius="md">
              <Group gap="sm" mb="md">
                <ThemeIcon size={48} color="orange" variant="light" radius="xl">
                  <IconSchool size={28} />
                </ThemeIcon>
                <div>
                  <Text size="lg" fw={700} c="orange">
                    Choose a Diploma if you want:
                  </Text>
                </div>
              </Group>
              <List spacing="sm" icon={<IconCheck size={20} color="green" />}>
                <List.Item>Career transformation & higher salaries (75K/month avg)</List.Item>
                <List.Item>In-depth mastery of your craft over 2 years</List.Item>
                <List.Item>Industry internship & employer connections</List.Item>
                <List.Item>12× return on investment in 5 years</List.Item>
                <List.Item>Credentials employers trust & recognize</List.Item>
              </List>
              <Button
                component="a"
                href="/apply"
                color="orange"
                size="lg"
                fullWidth
                mt="lg"
                leftSection={<IconSchool size={20} />}
              >
                Apply for Diploma
              </Button>
            </Paper>

            <Paper p="lg" bg="#F0F9FF" radius="md">
              <Group gap="sm" mb="md">
                <ThemeIcon size={48} color="blue" variant="light" radius="xl">
                  <IconCertificate size={28} />
                </ThemeIcon>
                <div>
                  <Text size="lg" fw={700} c="blue">
                    Choose a Certificate if you want:
                  </Text>
                </div>
              </Group>
              <List spacing="sm" icon={<IconCheck size={20} color="blue" />}>
                <List.Item>Quick skill acquisition in 3-6 months</List.Item>
                <List.Item>Lower upfront investment (48K one-time)</List.Item>
                <List.Item>Supplement existing skills or pivot careers</List.Item>
                <List.Item>Test the field before committing long-term</List.Item>
                <List.Item>Immediate job readiness for entry-level roles</List.Item>
              </List>
              <Button
                component="a"
                href="/apply"
                color="blue"
                size="lg"
                fullWidth
                mt="lg"
                variant="outline"
                leftSection={<IconCertificate size={20} />}
              >
                Apply for Certificate
              </Button>
            </Paper>
          </SimpleGrid>
        </Paper>

        {/* Detailed Side-by-Side Comparison */}
        <Text size="2xl" fw={700} mb="xl" ta="center">
          Comprehensive Program Comparison
        </Text>

        <Paper shadow="sm" p={0} radius="md" mb={60} className="overflow-x-auto">
          <Table striped highlightOnHover>
            <Table.Thead className="bg-gray-100">
              <Table.Tr>
                <Table.Th style={{ width: '30%' }}>
                  <Text size="lg" fw={700}>
                    Factor
                  </Text>
                </Table.Th>
                <Table.Th style={{ width: '35%' }}>
                  <Group gap="xs">
                    <IconSchool size={24} color="#FF6B35" />
                    <Text size="lg" fw={700} c="orange">
                      Diploma Program
                    </Text>
                  </Group>
                </Table.Th>
                <Table.Th style={{ width: '35%' }}>
                  <Group gap="xs">
                    <IconCertificate size={24} color="#1971c2" />
                    <Text size="lg" fw={700} c="blue">
                      Certificate Program
                    </Text>
                  </Group>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {/* Investment */}
              <Table.Tr>
                <Table.Td>
                  <Group gap="xs">
                    <IconCurrencyDollar size={20} />
                    <Text fw={600}>Total Investment</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fw={700} size="lg" c="orange">
                    450,000 KES
                  </Text>
                  <Text size="sm" c="dimmed">
                    (Standard diploma)
                  </Text>
                  <Text size="xs" c="dimmed">
                    320K for GD/Content Creation
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fw={700} size="lg" c="blue">
                    48,000 KES
                  </Text>
                  <Text size="sm" c="dimmed">
                    (One-time payment)
                  </Text>
                </Table.Td>
              </Table.Tr>

              {/* Monthly Payment */}
              <Table.Tr>
                <Table.Td>
                  <Group gap="xs">
                    <IconCurrencyDollar size={20} />
                    <Text fw={600}>Monthly Payment</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fw={600}>15,000 KES/month</Text>
                  <Text size="sm" c="dimmed">
                    Over 30 months (or pay per semester)
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fw={600}>48,000 KES upfront</Text>
                  <Text size="sm" c="dimmed">
                    Or 24K × 2 installments
                  </Text>
                </Table.Td>
              </Table.Tr>

              {/* Duration */}
              <Table.Tr>
                <Table.Td>
                  <Group gap="xs">
                    <IconClock size={20} />
                    <Text fw={600}>Program Duration</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fw={600}>2 years (5 semesters)</Text>
                  <Text size="sm" c="dimmed">
                    4 academic + 1 internship
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fw={600}>3-6 months (1 term)</Text>
                  <Text size="sm" c="dimmed">
                    Condensed intensive format
                  </Text>
                </Table.Td>
              </Table.Tr>

              {/* Starting Salary */}
              <Table.Tr>
                <Table.Td>
                  <Group gap="xs">
                    <IconTrendingUp size={20} />
                    <Text fw={600}>Avg. Starting Salary</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge size="xl" color="green" variant="filled">
                    75,000 KES/month
                  </Badge>
                  <Text size="sm" c="dimmed" mt={4}>
                    100K/month by year 2
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge size="xl" color="blue" variant="light">
                    35,000 KES/month
                  </Badge>
                  <Text size="sm" c="dimmed" mt={4}>
                    45K/month by year 2
                  </Text>
                </Table.Td>
              </Table.Tr>

              {/* Employment Rate */}
              <Table.Tr>
                <Table.Td>
                  <Group gap="xs">
                    <IconBriefcase size={20} />
                    <Text fw={600}>Employment Rate</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge size="lg" color="green">
                    85% in 3 months
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge size="lg" color="blue">
                    68% in 3-6 months
                  </Badge>
                </Table.Td>
              </Table.Tr>

              {/* Payback Period */}
              <Table.Tr>
                <Table.Td>
                  <Group gap="xs">
                    <IconChartBar size={20} />
                    <Text fw={600}>Payback Period</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fw={700} c="green">
                    6 months
                  </Text>
                  <Text size="sm" c="dimmed">
                    After graduation at 75K/month
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fw={700} c="blue">
                    1-2 months
                  </Text>
                  <Text size="sm" c="dimmed">
                    At 35K/month (but lower ceiling)
                  </Text>
                </Table.Td>
              </Table.Tr>

              {/* 5-Year Earnings */}
              <Table.Tr className="bg-green-50">
                <Table.Td>
                  <Group gap="xs">
                    <IconTrendingUp size={20} />
                    <Text fw={700}>5-Year Total Earnings</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text fw={700} size="xl" c="green">
                    5,400,000 KES
                  </Text>
                  <Text size="sm" c="dimmed">
                    12× return on investment
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text fw={700} size="lg" c="blue">
                    2,460,000 KES
                  </Text>
                  <Text size="sm" c="dimmed">
                    51× ROI but lower absolute earnings
                  </Text>
                </Table.Td>
              </Table.Tr>

              {/* Lifetime Earnings Gap */}
              <Table.Tr className="bg-orange-50">
                <Table.Td>
                  <Text fw={700} c="orange">
                    💰 Earnings Difference
                  </Text>
                </Table.Td>
                <Table.Td colSpan={2}>
                  <Stack gap="xs">
                    <Text fw={700} size="xl" c="orange">
                      +2,940,000 KES more with a diploma
                    </Text>
                    <Text size="sm" c="dimmed">
                      Over 5 years, diploma grads earn 2.94M KES more than certificate holders. The diploma costs 402K
                      more, but you earn back <strong>7.3× that difference</strong>.
                    </Text>
                  </Stack>
                </Table.Td>
              </Table.Tr>

              {/* Internship */}
              <Table.Tr>
                <Table.Td>
                  <Text fw={600}>Industry Internship</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconCheck size={20} color="green" />
                    <Text c="green" fw={600}>
                      Required (3 months)
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Many convert to job offers
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconX size={20} color="gray" />
                    <Text c="dimmed">Not included</Text>
                  </Group>
                </Table.Td>
              </Table.Tr>

              {/* Equipment */}
              <Table.Tr>
                <Table.Td>
                  <Text fw={600}>Equipment Access</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconCheck size={20} color="green" />
                    <Text>Industry-standard hardware</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Full studio access for practice
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconCheck size={20} color="blue" />
                    <Text>Basic equipment provided</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Limited to class hours
                  </Text>
                </Table.Td>
              </Table.Tr>

              {/* Career Support */}
              <Table.Tr>
                <Table.Td>
                  <Text fw={600}>Career Support</Text>
                </Table.Td>
                <Table.Td>
                  <List size="sm" spacing={4}>
                    <List.Item>Job placement assistance</List.Item>
                    <List.Item>Resume & portfolio reviews</List.Item>
                    <List.Item>500+ employer connections</List.Item>
                    <List.Item>LinkedIn profile optimization</List.Item>
                  </List>
                </Table.Td>
                <Table.Td>
                  <List size="sm" spacing={4}>
                    <List.Item>Basic job search tips</List.Item>
                    <List.Item>Portfolio guidance</List.Item>
                  </List>
                </Table.Td>
              </Table.Tr>

              {/* Working Professional Friendly */}
              <Table.Tr>
                <Table.Td>
                  <Text fw={600}>Working Professional Friendly</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconCheck size={20} color="green" />
                    <Text>Yes - Evening & weekend options</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    60% of students work full-time
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconCheck size={20} color="blue" />
                    <Text>Yes - Flexible schedules</Text>
                  </Group>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Paper>

        {/* ROI Visualization */}
        <Paper shadow="md" p="xl" mb={60} radius="md" className="bg-gradient-to-br from-green-50 to-white">
          <Text size="2xl" fw={700} mb="md" ta="center">
            Return on Investment (ROI) Analysis
          </Text>
          <Text size="md" c="dimmed" ta="center" mb="xl">
            See how your investment pays back over time
          </Text>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {/* Diploma ROI */}
            <Paper p="lg" shadow="sm" radius="md" className="border-2 border-orange-300">
              <Stack gap="lg">
                <Group gap="sm">
                  <ThemeIcon size={56} color="orange" variant="light" radius="xl">
                    <IconSchool size={32} />
                  </ThemeIcon>
                  <div>
                    <Text size="xl" fw={700} c="orange">
                      Diploma ROI
                    </Text>
                    <Text size="sm" c="dimmed">
                      Standard Program (450K)
                    </Text>
                  </div>
                </Group>

                <Divider />

                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    INVESTMENT
                  </Text>
                  <Text size="2xl" fw={700} c="orange">
                    450,000 KES
                  </Text>
                </div>

                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    PAYBACK PERIOD
                  </Text>
                  <Badge size="xl" color="green" variant="filled">
                    6 months after graduation
                  </Badge>
                </div>

                <Divider />

                <div>
                  <Text size="sm" fw={600} mb="xs">
                    📊 Earnings Timeline:
                  </Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Year 1-2 (75K/month)</Text>
                      <Text size="sm" fw={600}>
                        1,800,000 KES
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Year 3-5 (100K/month)</Text>
                      <Text size="sm" fw={600}>
                        3,600,000 KES
                      </Text>
                    </Group>
                    <Group justify="space-between" className="border-t pt-2">
                      <Text size="md" fw={700}>
                        5-Year Total
                      </Text>
                      <Text size="xl" fw={700} c="green">
                        5,400,000 KES
                      </Text>
                    </Group>
                  </Stack>
                </div>

                <Badge size="xl" color="orange" variant="filled" fullWidth>
                  12× Return on Investment
                </Badge>
              </Stack>
            </Paper>

            {/* Certificate ROI */}
            <Paper p="lg" shadow="sm" radius="md" className="border-2 border-blue-300">
              <Stack gap="lg">
                <Group gap="sm">
                  <ThemeIcon size={56} color="blue" variant="light" radius="xl">
                    <IconCertificate size={32} />
                  </ThemeIcon>
                  <div>
                    <Text size="xl" fw={700} c="blue">
                      Certificate ROI
                    </Text>
                    <Text size="sm" c="dimmed">
                      All Programs (48K)
                    </Text>
                  </div>
                </Group>

                <Divider />

                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    INVESTMENT
                  </Text>
                  <Text size="2xl" fw={700} c="blue">
                    48,000 KES
                  </Text>
                </div>

                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    PAYBACK PERIOD
                  </Text>
                  <Badge size="xl" color="blue" variant="filled">
                    1-2 months after completion
                  </Badge>
                </div>

                <Divider />

                <div>
                  <Text size="sm" fw={600} mb="xs">
                    📊 Earnings Timeline:
                  </Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Year 1-2 (35K/month)</Text>
                      <Text size="sm" fw={600}>
                        840,000 KES
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Year 3-5 (45K/month)</Text>
                      <Text size="sm" fw={600}>
                        1,620,000 KES
                      </Text>
                    </Group>
                    <Group justify="space-between" className="border-t pt-2">
                      <Text size="md" fw={700}>
                        5-Year Total
                      </Text>
                      <Text size="xl" fw={700} c="blue">
                        2,460,000 KES
                      </Text>
                    </Group>
                  </Stack>
                </div>

                <Badge size="xl" color="blue" variant="filled" fullWidth>
                  51× Return on Investment
                </Badge>
              </Stack>
            </Paper>
          </SimpleGrid>

          <Paper p="lg" mt="xl" bg="#FFF3E0" radius="md">
            <Group gap="sm">
              <IconTrendingUp size={32} color="#FF6B35" />
              <Stack gap={4} style={{ flex: 1 }}>
                <Text fw={700} size="lg">
                  The Diploma Advantage
                </Text>
                <Text size="sm">
                  While certificate programs offer a higher ROI percentage (51× vs 12×), diploma graduates earn{' '}
                  <strong>2.94 million KES more</strong> in absolute terms over 5 years. That's enough to:
                </Text>
                <List size="sm" mt="xs">
                  <List.Item>Buy a car (1.5M KES)</List.Item>
                  <List.Item>Make a down payment on property (1M KES)</List.Item>
                  <List.Item>Start your own studio/business (400K KES)</List.Item>
                </List>
              </Stack>
            </Group>
          </Paper>
        </Paper>

        {/* Still Unsure? */}
        <Paper shadow="lg" p="xl" radius="md" className="bg-gradient-to-r from-orange-50 to-blue-50">
          <Stack align="center" gap="lg">
            <Text size="2xl" fw={700} ta="center">
              Still unsure which path is right for you?
            </Text>
            <Text size="lg" c="dimmed" ta="center" maw={600}>
              Our admissions team will help you evaluate your goals, budget, and timeline to make the best decision for
              your future.
            </Text>
            <Group gap="md">
              <Button
                component="a"
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I need help choosing between diploma and certificate programs`}
                size="xl"
                color="green"
                leftSection={<IconBrandWhatsapp size={24} />}
                onClick={() => trackWhatsAppClick('comparison_page', 'Diploma vs Certificate Page')}
                target="_blank"
              >
                Chat with Advisor on WhatsApp
              </Button>
              <Button
                component="a"
                href="/apply"
                size="xl"
                color="orange"
                variant="outline"
                leftSection={<IconArrowRight size={24} />}
              >
                Start Application
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </MainLayout>
  )
}
