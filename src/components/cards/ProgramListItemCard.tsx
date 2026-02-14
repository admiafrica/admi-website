import { Box, Pill, Divider } from '@/lib/tw-mantine'

import { Paragraph, Title } from '@/components/ui'
import { getAssetDetails, ensureProtocol } from '@/utils'
import Image from 'next/image'
import { CourseListItemCard } from '@/components/cards'

type Props = {
  courses: any[]
  program: any
  filterProgramCourses: (programType: string, courses: any[]) => any[]
}

export default function ProgramListItemCard({ courses, program, filterProgramCourses }: Props) {
  const programCourses = filterProgramCourses(program.fields.name, courses)

  return (
    <Box className="flex h-fit w-full flex-col pt-20" key={program.sys.id}>
      <Box className="flex flex-col sm:flex-row">
        <div className="flex grow flex-row pb-4 sm:pb-0">
          <Image
            width={36}
            height={36}
            src={ensureProtocol(getAssetDetails(program.assets, program.fields.icon.sys.id)?.fields.file.url)}
            alt={program.fields.icon.fields.file.fileName}
            className="my-auto"
            style={{ width: 'auto', height: 'auto', maxWidth: '36px', maxHeight: '36px' }}
          />
          <div className="my-auto pl-2">
            <Title label={program.fields.name} size="24px" color="admiDarkOrange" />
          </div>
        </div>
        <div className="flex">
          <div className="flex grow flex-col sm:w-fit md:flex-row">
            <Paragraph size="14px" className="my-auto pb-2 sm:pb-0">
              Duration:
            </Paragraph>
            <Pill
              size="md"
              className="mx-1 my-auto w-fit font-nexa font-black"
              bg={'white'}
              style={{ border: '2px solid rgba(0, 0, 0, 0.14)' }}
              h={28}
            >
              {program.fields.duration}
            </Pill>
          </div>
          <div className="flex flex-col sm:w-fit md:flex-row">
            <Paragraph size="14px" className="my-auto pb-2 sm:pb-0">
              Delivery Mode:
            </Paragraph>
            <div className="flex">
              {program.fields.deliveryMode.split(',').map((mode: any, index: number) => (
                <Pill
                  size="md"
                  className="mx-1 my-auto w-fit font-nexa font-black"
                  bg={'white'}
                  style={{ border: '2px solid rgba(0, 0, 0, 0.14)' }}
                  h={28}
                  key={`mode-${index}`}
                >
                  {mode}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </Box>
      <Divider my={16} />
      <Box>
        {programCourses.map((course) => (
          <Box key={course.sys.id}>
            <CourseListItemCard course={course} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
