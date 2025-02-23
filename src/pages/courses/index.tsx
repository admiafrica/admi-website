import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Text, Select } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title, SearchDropdown } from '@/components/ui';
import { ProgramListItemCard } from '@/components/cards';
import { PageSEO } from '@/components/shared/v3';
import { useIsMobile } from '@/hooks/useIsMobile';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';

export default function CoursesPage() {
  const isMobile = useIsMobile();
  const [programs, setPrograms] = useState<any[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [activeOption, setActiveOption] = useState<string>('All Courses');
  const [courses, setCourses] = useState<any[]>([]);

  const fetchCoursePrograms = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/course-programs`);
      const data = await response.json();
      const sortedPrograms = data.toReversed();
      setPrograms(sortedPrograms);
      setFilteredPrograms(sortedPrograms);
      setFilterOptions(['All Courses', ...formatProgramOptions(programs)]);
    } catch (error) {
      console.log('Error fetching programs:', error);
    }
  }, [programs]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }, []);

  const filterProgramCourses = (programType: string, courses: any[]) => {
    const programCourses = courses.filter((course) => course.fields.programType.fields.name == programType);
    return programCourses;
  };

  const formatProgramOptions = (programs: any[]) => {
    const programNames = programs.map((program) => program.fields.name);
    return programNames;
  };

  const updateFilterOption = (value: string) => {
    setActiveOption(value || 'All Courses');
  };

  useEffect(() => {
    fetchCoursePrograms();
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = [];
    if (activeOption !== 'All Courses') {
      result = programs.filter((program) => program.fields.name.includes(activeOption));
    } else {
      result = programs;
    }
    setFilteredPrograms(result);
  }, [activeOption, programs]);

  useEffect(() => {
    if (programs) {
      setFilterOptions(['All Courses', ...formatProgramOptions(programs)]);
    }
  }, [programs]);

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO title="Courses" description="Explore our variety of courses across various topics that suits you!" />
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
          <SearchDropdown
            destination="courses"
            items={courses}
            buttonLabel="Search"
            placeholder={
              isMobile
                ? 'Search for course'
                : 'Search for course e.g Graphic Design, Content Creation'
            }
          />
        </div>
      </div>
      <div className="relative z-10 w-full bg-[#F5FFFD]">
        <div className="mx-auto w-full max-w-screen-xl bg-[#F5FFFD] px-4 2xl:px-0">
          <div className="flex h-fit w-full flex-col pt-24 sm:flex-row">
            <div className="flex grow flex-col pb-4">
              <Title label="Courses" size="24px" color="black" />
              <Paragraph fontFamily="font-nexa" className="py-2">
                Explore our variety of courses across various topics that suits you!
              </Paragraph>
            </div>
            <div className="flex items-center bg-white pl-4 font-proxima">
              <Text>Sort By:</Text>
              <Select
                className="grow border-none font-proxima font-bold sm:w-[220px]"
                placeholder="Select Program"
                allowDeselect={false}
                nothingFoundMessage="No programs found"
                data={[...filterOptions]}
                onChange={(value) => updateFilterOption(value as string)}
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
          {filteredPrograms &&
            courses &&
            filteredPrograms.map((program) => (
              <Box key={program.sys.id}>
                <ProgramListItemCard program={program} courses={courses} filterProgramCourses={filterProgramCourses} />
              </Box>
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
