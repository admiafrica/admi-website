import Image from 'next/image';
import { Box, Text, Select } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title, SearchDropdown } from '@/components/ui';
import { ProgramListItemCard } from '@/components/cards';
import { PageSEO } from '@/components/shared/v3';
import { useIsMobile } from '@/hooks/useIsMobile';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';
import { useEffect, useState } from 'react';

export default function CoursesPage({
  programs,
  courses,
  filterOptions,
}: {
  programs: any[];
  courses: any[];
  filterOptions: string[];
}) {
  const isMobile = useIsMobile();
  const [activeOption, setActiveOption] = useState<string>('All Courses');
  const [filteredPrograms, setFilteredPrograms] = useState<any[]>(programs);

  useEffect(() => {
    setFilteredPrograms(
      activeOption !== 'All Courses'
        ? programs.filter((program) => program.fields.name.includes(activeOption))
        : programs
    );
  }, [activeOption, programs]);

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO
        title="Courses"
        description="Explore ADMI's comprehensive range of digital media and creative courses in Kenya. From certificate to diploma programs, find the perfect course to advance your creative career in Nairobi."
        keywords="ADMI courses, digital media courses Kenya, creative education Nairobi, certificate programs, diploma courses, Africa Digital Media Institute"
        url="/courses"
      />
      <div className="h-[16em] w-full overflow-x-hidden bg-[#002A23]">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[62%] top-[20vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full justify-end pr-[10%]">
            <Image src={IconBgImageYellow} alt="background image" />
          </div>
        </div>

        <div className="absolute left-1/2 top-[5vh] z-0 h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full">
            <Image src={IconBgImageRed} alt="background image" />
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
          <SearchDropdown
            destination="courses"
            items={courses}
            buttonLabel="Search"
            placeholder={isMobile ? 'Search for course' : 'Search for course e.g Graphic Design, Content Creation'}
          />
        </div>
      </div>
      <div className="relative z-10 w-full bg-[#F5FFFD]">
        <div className="mx-auto w-full max-w-screen-xl bg-[#F5FFFD] px-4 2xl:px-0">
          <div className="flex h-fit w-full flex-col pt-24 sm:flex-row">
            <div className="flex grow flex-col pb-4">
              <Title label="Courses" size="24px" color="black" />
              <Paragraph fontFamily="font-nexa" className="py-2">
                Explore our variety of courses across various topics that suit you!
              </Paragraph>
            </div>
            <div className="flex items-center bg-white pl-4 font-proxima">
              <Text>Sort By:</Text>
              <Select
                className="grow border-none font-proxima font-bold sm:w-[220px]"
                placeholder="Select Program"
                allowDeselect={false}
                nothingFoundMessage="No programs found"
                data={filterOptions}
                onChange={(value) => setActiveOption(value as string)}
                renderOption={(value) => (
                  <div className="font-proxima">
                    <Text size="16px">{value.option.value}</Text>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        <div className="relative mx-auto min-h-[60vh] w-full max-w-screen-xl px-4 2xl:px-0">
          {filteredPrograms.map((program) => (
            <Box key={program.sys.id}>
              <ProgramListItemCard
                program={program}
                courses={courses}
                filterProgramCourses={(programType: string, courses: any[]) =>
                  courses.filter((course) => course.fields.programType.fields.name === programType)
                }
              />
            </Box>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  try {
    const [programsRes, coursesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/course-programs`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/courses`),
    ]);

    if (!programsRes.ok || !coursesRes.ok) throw new Error('Failed to fetch data');

    const programs = await programsRes.json();
    const courses = await coursesRes.json();

    const sortedPrograms = programs.reverse();
    const sortedCourses = courses.reverse();

    return {
      props: {
        programs: sortedPrograms,
        courses: sortedCourses,
        filterOptions: ['All Courses', ...sortedPrograms.map((program: any) => program.fields.name)],
      },
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return { props: { programs: [], courses: [], filterOptions: ['All Courses'] } };
  }
}
