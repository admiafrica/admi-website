import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Text, Select, Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Button, Title } from '@/components/ui';
import { ProgramListItemCard } from '@/components/cards';
import { PageSEO } from '@/components/shared/v3';

export default function CoursesPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<any[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [activeOption, setActiveOption] = useState<string>('All Courses');
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>();

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

  const handleCourseSelect = (value: string) => {
    setSelectedCourse(value);
  };

  const handleCourseSearch = () => {
    console.log('SELECTED', selectedCourse);
    console.log('COURSES', courses);
    const course = courses.find((course) => course.fields.name == selectedCourse);
    router.push(`/v3/courses/${course.fields.slug}`);
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
  }, [activeOption]);

  useEffect(() => {
    if (programs) {
      setFilterOptions(['All Courses', ...formatProgramOptions(programs)]);
    }
  }, [programs]);

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO title="Courses" description="Explore our variety of courses across various topics that suits you!" />
      <div className="h-[24vh] w-full bg-[#002A23]">
        <div className="mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
          <Card bg={'#173D37'}>
            <Card.Section>
              <div className="flex w-full text-white">
                <IconSearch className="mx-4 my-auto" />
                <Autocomplete
                  className="grow py-4"
                  placeholder="Search for course e.g Graphic Design, Content Creation"
                  c="white"
                  data={courses.map((course) => course.fields.name)}
                  value={selectedCourse}
                  onChange={handleCourseSelect}
                />
                <div className="mx-4 my-auto">
                  <Button size="lg" backgroundColor="admiRed" label="Search" onClick={() => handleCourseSearch()} />
                </div>
              </div>
            </Card.Section>
          </Card>
        </div>
      </div>
      <div className="w-full bg-[#F5FFFD]">
        <div className="mx-auto w-full max-w-screen-xl bg-[#F5FFFD] px-4 2xl:px-0">
          <div className="flex h-fit w-full flex-col pt-24 sm:flex-row">
            <div className="flex grow flex-col pb-4">
              <Title label="Courses" size="24px" color="black" />
              <Text>Explore our variety of courses across various topics that suits you!</Text>
            </div>
            <div className="flex items-center bg-white pl-4 font-proxima">
              <Text>Sort By:</Text>
              <Select
                className="grow border-none font-proxima sm:w-[200px]"
                placeholder="Select Program"
                searchable
                nothingFoundMessage="No programs found"
                data={[...filterOptions]}
                defaultValue={'All Courses'}
                onChange={(value) => updateFilterOption(value as string)}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-screen-xl px-4 2xl:px-0">
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
