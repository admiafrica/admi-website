import Image from 'next/image'
import { Button, Paragraph } from '../ui'

import IconAward from '@/assets/icons/Award'
import IconTimer from '@/assets/icons/timer.svg'
import IconHourGlass from '@/assets/icons/hourglass-start.svg'
import IconAvatar from '@/assets/icons/avatar.svg'
import { useRouter } from 'next/router'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  courseName?: string
  programType: any
  creditHours: number
  awardLevel: string
  isCampaign?: boolean
}

export default function CourseSummaryCard(props: Props) {
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleEnquiry = () => {
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = router.query
    const query: Record<string, string> = {}
    if (props.courseName) query.course = props.courseName
    if (utm_source) Object.assign(query, { utm_source, utm_medium, utm_campaign, utm_term, utm_content })

    router.push({ pathname: '/enquiry', query })
  }

  return (
    <div
      className="h-fit max-w-screen-xl justify-center rounded-xl border border-gray-200 bg-white shadow-sm sm:h-[7.125rem]"
      style={{
        backgroundColor: 'var(--admi-shamrok, #08F6CF)',
        borderRadius: 6,
        width: props.isCampaign ? 'fit-content' : '100%'
      }}
    >
      <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-0">
        <div className="my-auto grow">
          {isMobile ? (
            <div className="flex flex-col p-0">
              <div className="flex w-full">
                <div className={'flex w-1/2'}>
                  <Image width={32} src={IconTimer} alt="duration" />
                  <div className="pl-2">
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Duration
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.programType.fields.duration}
                    </Paragraph>
                  </div>
                </div>
                <div className={'flex w-1/2'}>
                  <IconAward />
                  <div>
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Award Level
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.awardLevel}
                    </Paragraph>
                  </div>
                </div>
              </div>
              <div className="flex w-full">
                <div className={'flex w-1/2'}>
                  <Image width={40} src={IconHourGlass} alt="term length" />
                  <div>
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Term Length
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.programType.fields.termLength}
                    </Paragraph>
                  </div>
                </div>
                <div className={'flex w-1/2'}>
                  <Image width={40} src={IconAvatar} alt="email" />
                  <div>
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Delivery Mode
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.programType.fields.deliveryMode}
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="mr-8 flex">
                <Image width={32} src={IconTimer} alt="duration" />
                <div className="px-4 text-left">
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 100, paddingBottom: 8 }}>
                    Duration
                  </p>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 900 }}>
                    {props.programType.fields.duration}
                  </p>
                </div>
              </div>
              <div className="mr-8 flex">
                <Image width={40} src={IconHourGlass} alt="term length" />
                <div className="px-4 text-left">
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 100, paddingBottom: 8 }}>
                    Term Length
                  </p>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 900 }}>
                    {props.programType.fields.termLength}
                  </p>
                </div>
              </div>
              <div className="mr-8 flex">
                <Image width={40} src={IconAvatar} alt="email" />
                <div className="px-4 text-left">
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 100, paddingBottom: 8 }}>
                    Delivery Mode
                  </p>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 900 }}>
                    {props.programType.fields.deliveryMode}
                  </p>
                </div>
              </div>
              <div className="flex">
                <IconAward />
                <div className="px-4 text-left">
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 100, paddingBottom: 8 }}>
                    Award Level
                  </p>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 900 }}>
                    {props.awardLevel}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {!props.isCampaign && (
          <div
            className={
              isMobile ? 'md:py-auto mx-auto w-full cursor-pointer py-4' : 'md:py-auto mx-auto cursor-pointer py-4'
            }
          >
            <Button size="xl" backgroundColor="admiRed" label="Get in Touch" onClick={handleEnquiry} />
          </div>
        )}
      </div>
    </div>
  )
}
