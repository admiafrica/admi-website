import Image from 'next/image'
import { Card, Text, NumberFormatter, Divider, Badge, Tooltip } from '@mantine/core'

import { Button, Paragraph, Title } from '../ui'

import IconHourglass from '@/assets/icons/hour-glass-white.svg'
import IconCurrency from '@/assets/icons/group-6.svg'
import { useRouter } from 'next/router'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  programType: any
  creditHours: number
  tuitionFees: string
}

export default function CourseEnquiryCard(props: Props) {
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleEnquiry = () => {
    router.push('/enquiry')
  }

  // Extract numeric value from tuition string
  const extractAmount = (str: string): number => {
    const match = str?.replace(/,/g, '').match(/\d+/)
    return match ? parseInt(match[0]) : 100000
  }

  const tuitionAmount = extractAmount(props.tuitionFees)
  const isDiploma = props.programType?.fields?.duration?.includes('2 year') || tuitionAmount >= 100000
  const monthlyEquivalent = Math.ceil(tuitionAmount / 4)

  return (
    <Card className="mx-auto mt-16 h-fit w-[92vw] justify-center shadow-lg md:w-full" bg={'black'} radius={6}>
      <div className="my-auto flex w-full flex-col p-2 text-white md:flex-row md:p-4">
        <div className="my-auto flex w-full flex-col items-center pt-3 md:flex-row">
          <div className="mb-4 mr-8 w-fit text-center font-nexa md:text-left">
            <Text size="25px" fw={900} c={'admiShamrok'} pb={8}>
              Earn your course
            </Text>
            <Text size="25px" fw={900}>
              {props.programType.fields.name.toLowerCase()} today!
            </Text>
          </div>
          {isMobile ? (
            <div className="my-auto flex grow md:flex-row">
              <div className="flex sm:w-1/3 sm:justify-center">
                <Image width={32} height={32} src={IconHourglass} alt="email" />
                <div className="px-4 text-left md:text-left">
                  <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                    Credit Hours
                  </Paragraph>
                  <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={900} fontFamily="font-nexa">
                    <NumberFormatter prefix="Hrs " value={props.creditHours} thousandSeparator />
                  </Paragraph>
                </div>
              </div>
              <Divider orientation="vertical" size={1} opacity="30%" mx={8} />
              <div className="flex sm:w-1/3 sm:justify-center">
                <Image width={32} height={32} src={IconCurrency} alt="email" />
                <div className="pl-4 text-left md:text-left">
                  <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-1">
                    Tuition Fees
                  </Paragraph>
                  <Title size={isMobile ? '14px' : '16px'} label={props.tuitionFees} color="white" />
                  <Tooltip label="50/30/20 payment split available">
                    <Text size="xs" c="admiShamrok" fw={500}>
                      or ~KES {monthlyEquivalent.toLocaleString()}/month
                    </Text>
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-auto flex grow md:flex-row">
              <Divider orientation="vertical" size={1} opacity="30%" mx={8} />
              <div className="flex sm:w-1/3 sm:justify-center">
                <Image width={32} height={32} src={IconHourglass} alt="email" />
                <div className="px-4 text-left md:text-left">
                  <Text size="16px" fw={100} pb={8}>
                    Credit Hours
                  </Text>
                  <Text size="16px" fw={900}>
                    <NumberFormatter prefix="Hrs " value={props.creditHours} thousandSeparator />
                  </Text>
                </div>
              </div>
              <Divider orientation="vertical" size={1} opacity="30%" mx={8} />
              <div className="flex sm:w-1/3 sm:justify-center">
                <Image width={32} height={32} src={IconCurrency} alt="email" />
                <div className="px-4 text-left md:text-left">
                  <Text size="16px" fw={100} pb={4}>
                    Tuition Fees
                  </Text>
                  <Text size="16px" fw={900}>
                    {props.tuitionFees}
                  </Text>
                  <Tooltip label="50/30/20 payment split available">
                    <Text size="xs" c="admiShamrok" fw={500}>
                      or ~KES {monthlyEquivalent.toLocaleString()}/month
                    </Text>
                  </Tooltip>
                  {isDiploma && (
                    <Badge size="xs" color="yellow" mt={4} style={{ color: '#000' }}>
                      Save 10% if paid upfront
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:py-auto mx-auto py-4">
          <Button size="xl" backgroundColor="admiRed" label="Apply for May 2026" onClick={handleEnquiry} />
        </div>
      </div>
    </Card>
  )
}
