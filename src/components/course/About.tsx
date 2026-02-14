import { Box } from '@/lib/tw-mantine'
import { ParagraphContentful, Title } from '../ui'
import { CourseVideoCard } from '../cards'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  description: any
  intakes: string
  courseVideo: any
  educationalLevel: string
  isCampaign?: boolean
  courseSlug?: string
}
export default function CourseAbout(props: Props) {
  const isMobile = useIsMobile()

  return (
    <div
      className={
        isMobile ? `w-full pb-16 pt-${props.isCampaign ? '[56em]' : '20'} sm:pt-0` : 'w-full pb-16 pt-48 sm:pt-0'
      }
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 2xl:px-0">
        <div className="flex min-h-[600px] w-full flex-col sm:flex-row">
          {props.isCampaign && (
            <Box className="flex w-full flex-col sm:flex-row">
              <div className="mt-24 flex flex-col sm:w-1/2 sm:pr-4 xl:w-[60%]">
                <Title label="About this course" size={isMobile ? '24px' : '36px'} color="admiRed" />

                <ParagraphContentful className="mt-1 text-lg" fontFamily="font-nexa">
                  {props.description}
                </ParagraphContentful>
              </div>
            </Box>
          )}
          {!props.isCampaign && (
            <>
              <div className="relative flex flex-col pt-32 sm:w-1/2">
                <div className="font-nexa text-admiRed">
                  <Title label="About this course" />
                </div>
                <ParagraphContentful className="mt-1 text-lg sm:pr-4" fontFamily="font-nexa">
                  {props.description}
                </ParagraphContentful>
              </div>
              <div className="z-10 my-0 flex h-fit justify-end sm:w-1/2 sm:pt-36">
                <CourseVideoCard
                  intakes={props.intakes}
                  courseVideo={props.courseVideo}
                  educationalLevel={props.educationalLevel}
                  courseSlug={props.courseSlug}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
