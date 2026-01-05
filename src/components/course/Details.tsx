import Image from 'next/image'
import { Card, ScrollArea } from '@mantine/core'

import { getAssetDetails, ensureProtocol } from '@/utils'
import { CollapsibleContent } from '../shared/v3'
import { Paragraph, ParagraphContentful, Title } from '../ui'
import { CourseEnquiryCard } from '../cards'

import IconCheckbox from '@/assets/icons/checkbox.svg'
import IconBook from '@/assets/icons/book.svg'
import IconHatBlack from '@/assets/icons/hat-black.svg'
import IconBackgroundImageA from '@/assets/icons/ellipse-yellow-cut.svg'
import IconBackgroundImageB from '@/assets/icons/ellipse-orange.svg'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  programType: any
  creditHours: number
  tuitionFees: string
  benefits: any[]
  assets: any[]
  careerOptions: any
  learningOutcomes: any
  courseDescription: any
}

export default function CourseDetails(props: Props) {
  const isMobile = useIsMobile()

  return (
    <div className="relative w-full bg-[#F5FFFD] pb-16">
      {/* BACKGROUND IMAGES */}
      <div className="absolute left-1/2 z-10 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full justify-end">
          <Image src={IconBackgroundImageA} alt={'background image'} />
        </div>
      </div>

      <div className="absolute left-1/2 top-[20rem] z-10 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full">
          <Image src={IconBackgroundImageB} alt={'background image'} />
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-screen-xl px-4">
        <div className="z-20 mx-auto mb-8 w-fit pt-8 text-center">
          <Title label="Why you should take this course" color="black" size={isMobile ? '24px' : undefined} />
        </div>
        <div className="relative z-20 flex flex-col justify-between sm:flex-row sm:flex-wrap">
          {props.benefits.map((benefit) => (
            <Card
              shadow="md"
              className={props.benefits.length > 3 ? 'mb-8 sm:w-[48%] lg:w-[24%]' : 'mb-8 sm:w-[30%]'}
              key={benefit.sys.id}
            >
              <div className="flex px-4 pt-4">
                <Image
                  src={ensureProtocol(getAssetDetails(props.assets, benefit.fields.icon.sys.id)?.fields.file.url)}
                  alt={benefit.fields.icon.sys.id}
                  width={32}
                  height={32}
                />
                <Paragraph fontFamily="font-nexa" fontWeight={900} className="min-h-[3em] pl-4 pt-1">
                  {benefit.fields.title}
                </Paragraph>
              </div>
              <ScrollArea h={isMobile ? 'fit-content' : '14em'} offsetScrollbars>
                <ParagraphContentful className="px-4 text-gray-500">{benefit.fields.text}</ParagraphContentful>
              </ScrollArea>
            </Card>
          ))}
        </div>

        <div className="relative z-20">
          <CollapsibleContent
            title="Course Description"
            content={<ParagraphContentful className="z-20 text-lg">{props.courseDescription}</ParagraphContentful>}
            icon={<Image width={24} height={24} src={IconCheckbox} alt="email" />}
          />
          <CollapsibleContent
            title="Learning Outcomes"
            content={<ParagraphContentful className="z-20 text-lg">{props.learningOutcomes}</ParagraphContentful>}
            icon={<Image width={24} height={24} src={IconBook} alt="email" />}
          />
          <CollapsibleContent
            title="Career Options"
            content={<ParagraphContentful className="z-20 text-lg">{props.careerOptions}</ParagraphContentful>}
            icon={<Image width={24} height={24} src={IconHatBlack} alt="email" />}
          />

          <CourseEnquiryCard
            programType={props.programType}
            creditHours={props.creditHours}
            tuitionFees={props.tuitionFees}
          />
        </div>
      </div>
    </div>
  )
}
