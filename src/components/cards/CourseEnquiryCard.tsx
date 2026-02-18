import Image from 'next/image'

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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', { useGrouping: true }).format(value)
  }

  return (
    <div
      className="mx-auto mt-16 h-fit w-[92vw] justify-center rounded-xl border border-gray-200 shadow-lg md:h-[7.125rem] md:w-full"
      style={{ backgroundColor: 'black', borderRadius: 6 }}
    >
      <div className="my-auto flex w-full flex-col p-2 text-white md:flex-row md:p-4">
        <div className="my-auto flex w-full flex-col items-center pt-3 md:flex-row">
          <div className="mb-4 mr-8 w-fit text-center font-nexa md:text-left">
            <p
              className="text-gray-700"
              style={{ fontSize: '25px', fontWeight: 900, color: 'var(--admi-shamrok, #08F6CF)', paddingBottom: 8 }}
            >
              Earn your course
            </p>
            <p className="text-gray-700" style={{ fontSize: '25px', fontWeight: 900, color: 'inherit' }}>
              {props.programType.fields.name.toLowerCase()} today!
            </p>
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
                    Hrs {formatNumber(props.creditHours)}
                  </Paragraph>
                </div>
              </div>
              <hr
                className="border-gray-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  marginLeft: 8,
                  marginRight: 8,
                  height: 'auto',
                  borderLeftWidth: 1,
                  borderTopWidth: 0
                }}
              />
              <div className="flex sm:w-1/3 sm:justify-center">
                <Image width={32} height={32} src={IconCurrency} alt="email" />
                <div className="pl-4 text-left md:text-left">
                  <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                    Tuition Fees
                  </Paragraph>
                  <Title size={isMobile ? '14px' : '16px'} label={props.tuitionFees} color="white" />
                </div>
              </div>
            </div>
          ) : (
            <div className="my-auto flex grow md:flex-row">
              <hr
                className="border-gray-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  marginLeft: 8,
                  marginRight: 8,
                  height: 'auto',
                  borderLeftWidth: 1,
                  borderTopWidth: 0
                }}
              />
              <div className="flex sm:w-1/3 sm:justify-center">
                <Image width={32} height={32} src={IconHourglass} alt="email" />
                <div className="px-4 text-left md:text-left">
                  <p
                    className="text-gray-700"
                    style={{ fontSize: '16px', fontWeight: 100, paddingBottom: 8, color: 'inherit' }}
                  >
                    Credit Hours
                  </p>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 900, color: 'inherit' }}>
                    Hrs {formatNumber(props.creditHours)}
                  </p>
                </div>
              </div>
              <hr
                className="border-gray-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.3)',
                  marginLeft: 8,
                  marginRight: 8,
                  height: 'auto',
                  borderLeftWidth: 1,
                  borderTopWidth: 0
                }}
              />
              <div className="flex sm:w-1/3 sm:justify-center">
                <Image width={32} height={32} src={IconCurrency} alt="email" />
                <div className="px-4 text-left md:text-left">
                  <p
                    className="text-gray-700"
                    style={{ fontSize: '16px', fontWeight: 100, paddingBottom: 8, color: 'inherit' }}
                  >
                    Tuition Fees
                  </p>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 900, color: 'inherit' }}>
                    {props.tuitionFees}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="md:py-auto mx-auto py-4">
          <Button size="xl" backgroundColor="admiRed" label="Enquire Today" onClick={handleEnquiry} />
        </div>
      </div>
    </div>
  )
}
