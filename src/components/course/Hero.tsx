import Image from 'next/image'
import { ensureProtocol } from '@/utils'
import { CourseSummaryCard } from '../cards'

import IconAward from '@/assets/icons/Award'
import { useIsMobile } from '@/hooks/useIsMobile'
import { Paragraph, Title } from '../ui'
import { EnquiryForm } from '../forms'

type Props = {
  name: string
  coverImage: any
  programType: any
  creditHours: number
  awardLevel: string
  isCampaign?: boolean
}

export default function CourseHero(props: Props) {
  const isMobile = useIsMobile()
  const words = props.name.trim().split(' ')
  // Take last two words for the highlighted line (e.g., "Production Diploma")
  const highlightedWords = words.length > 2 ? words.splice(-2).join(' ') : words.pop() || ''
  const remainingName = words.join(' ')

  return (
    <div className="relative h-[56vh] w-full sm:h-[50vh]">
      {/* Background Image */}
      <Image
        src={ensureProtocol(props.coverImage.fields.file.url)}
        placeholder="empty"
        alt="Course Banner"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0"
        style={{ objectFit: 'cover' }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="z-5 absolute inset-0"
        style={{
          background: 'radial-gradient(38.35% 91.08% at 66.59% 45.79%, rgba(0, 0, 0, 0) 14.71%, #000000 100%)'
        }}
      ></div>

      {/* Floating Card */}
      <div className="w-full">
        <div
          className={
            props.isCampaign
              ? 'section-container absolute left-1/2 top-[400px] z-20 flex w-full -translate-x-1/2 transform flex-col sm:top-[45vh] sm:flex-row'
              : 'section-container absolute left-1/2 top-[400px] z-20 flex w-full -translate-x-1/2 transform sm:top-[45vh]'
          }
        >
          <CourseSummaryCard
            courseName={props.name}
            programType={props.programType}
            creditHours={props.creditHours}
            awardLevel={props.awardLevel}
            isCampaign={props.isCampaign}
          />
          {props.isCampaign && (
            <div className="relative w-full max-w-[480px] sm:top-[-120px] sm:ml-2">
              <EnquiryForm />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="section-container relative z-10 pt-[15vh] text-white">
        <div className="max-w-[80%] md:max-w-[50%]">
          <span
            className="mb-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            style={{
              height: 36,
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <div className="m-2 flex flex-wrap">
              <IconAward color="white" width={28} height={28} />
              <Paragraph size="sm" fontFamily="font-nexa" fontWeight={900}>
                {props.programType.fields.name}
              </Paragraph>
            </div>
          </span>

          <Title size={isMobile ? '32px' : '60px'} label={remainingName} color="white" />

          <Title size={isMobile ? '32px' : '60px'} label={highlightedWords || 'Certificate'} color="#F1FE38" />
        </div>
      </div>
    </div>
  )
}
