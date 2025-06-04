import { Group } from '@mantine/core'
import { CollapsibleContent } from '../shared/v3'
import { getAssetDetails } from '@/utils'
import Image from 'next/image'
import { ParagraphContentful, Title } from '../ui'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  mentors: any[]
  assets: any[]
}

export default function CourseMentors(props: Props) {
  const isMobile = useIsMobile()
  const showMentors = props.mentors.length > 1

  if (!showMentors) return

  return (
    <Group bg={'#F76335'} py={32}>
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div>
          <Title size={isMobile ? '24px' : '32px'} label="Course Leader & Mentor" color="white" className="py-4" />

          {props.mentors.map((mentor) => (
            <CollapsibleContent
              isProfile
              key={mentor.fields.name}
              icon={
                <Image
                  height={98}
                  width={98}
                  src={`https:${getAssetDetails(props.assets, mentor.fields.image.sys.id)?.fields.file.url}`}
                  alt={mentor.fields.name}
                  style={{ objectFit: 'cover' }}
                />
              }
              title={mentor.fields.name}
              subTitle={mentor.fields.professionalTitle}
              profileLink={mentor.fields.socialMediaLink}
              content={<ParagraphContentful className="z-20 px-4 text-lg">{mentor.fields.bio}</ParagraphContentful>}
            />
          ))}
        </div>
      </div>
    </Group>
  )
}
