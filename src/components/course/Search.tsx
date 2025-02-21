import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Text, Autocomplete, Box } from '@mantine/core';

import { Button } from '@/components/ui';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';
import IconSearch from '@/assets/icons/Search';

type Props = {
  courses: any[];
};

export default function CourseSearch({ courses }: Props) {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string>();

  const handleCourseSelect = (value: string) => {
    setSelectedCourse(value);
  };

  const handleCourseSearch = () => {
    const course = courses.find((course) => course.fields.name == selectedCourse);
    router.push(`/courses/${course.fields.slug}`);
  };

  return (
    <div className="h-[16em] w-full bg-[#002A23]">
      {/* BACKGROUND IMAGES */}
      <div className="absolute left-[62%] top-[20vh] z-0 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full justify-end pr-[10%]">
          <Image src={IconBgImageYellow} alt={'background image'} />
        </div>
      </div>

      <div className="absolute left-1/2 top-[5vh] z-0 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full">
          <Image src={IconBgImageRed} alt={'background image'} />
        </div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
        <Box bg={'#173D37'} className="rounded-lg">
          <Box className="rounded-1xl py-4">
            <div className="flex w-full text-white">
              <div className="my-auto pl-2">
                <IconSearch color="white" width={36} height={36} />
              </div>
              <Autocomplete
                className="grow pt-1 text-white"
                placeholder="Search for course e.g Graphic Design, Content Creation"
                styles={{
                  input: {
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 600,
                  },
                }}
                renderOption={(value) => (
                  <div className="font-proxima">
                    <Text size="16px">{value.option.value}</Text>
                  </div>
                )}
                data={courses.map((course) => course.fields.name)}
                value={selectedCourse}
                onChange={handleCourseSelect}
              />
              <div className="mx-4 my-auto">
                <Button size="lg" backgroundColor="admiRed" label="Search" onClick={() => handleCourseSearch()} />
              </div>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
