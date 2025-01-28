import { Box, Text, Pill, Divider } from '@mantine/core';

import { Title } from '@/components/ui';
import { getAssetDetails } from '@/utils';
import Image from 'next/image';
import { CourseListItemCard } from '@/components/cards';

type Props = {
  courses: any[];
  program: any;
  filterProgramCourses: (programType: string, courses: any[]) => any[];
};

export default function ProgramListItemCard({ courses, program, filterProgramCourses }: Props) {
  const programCourses = filterProgramCourses(program.fields.name, courses);

  return (
    <Box className="flex h-fit w-full flex-col pt-20" key={program.sys.id}>
      <Box className="flex flex-col sm:flex-row">
        <div className="flex grow flex-row">
          <Image
            width={36}
            height={36}
            src={`https:${getAssetDetails(program.assets, program.fields.icon.sys.id)?.fields.file.url}`}
            alt={program.fields.icon.fields.file.fileName}
            className="my-auto"
          />
          <div className="my-auto pl-2">
            <Title label={program.fields.name} size="24px" color="admiDarkOrange" />
          </div>
        </div>
        <div className="flex">
          <div className="my-auto font-proxima">
            <Text size="14px">Duration:</Text>
          </div>
          <Pill
            size="md"
            className="mx-1 my-auto font-nexa font-black"
            bg={'white'}
            style={{ border: '2px solid rgba(0, 0, 0, 0.14)' }}
            h={28}
          >
            {program.fields.duration}
          </Pill>
        </div>
        <div className="flex">
          <div className="my-auto font-proxima">
            <Text size="14px">Delivery Mode:</Text>
          </div>
          {program.fields.deliveryMode.split(',').map((mode: any, index: number) => (
            <Pill
              size="md"
              className="mx-1 my-auto font-nexa font-black"
              bg={'white'}
              style={{ border: '2px solid rgba(0, 0, 0, 0.14)' }}
              h={28}
              key={`mode-${index}`}
            >
              {mode}
            </Pill>
          ))}
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
  );
}
