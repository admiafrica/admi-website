import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Input, Text, Pill } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { IconSearch } from '@tabler/icons-react';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Button, Title } from '@/components/ui';
import { getAssetDetails } from '@/utils';
import Image from 'next/image';
import { CourseListItemCard, ProgramListItemCard } from '@/components/cards';

export default function CoursesPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  const fetchCoursePrograms = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/course-programs`);
      const data = await response.json();
      console.log('COURSE PROGRAMS', data);
      setPrograms(data);
    } catch (error) {
      console.log('Error fetching programs:', error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(`/api/v3/courses`);
      const data = await response.json();
      console.log('COURSES', data);
      setCourses(data);
    } catch (error) {
      console.log('Error fetching courses:', error);
    }
  }, []);

  const filterProgramCourses = (programType: string, courses: any[]) => {
    const programCourses = courses.filter((course) => course.fields.programType.fields.name == programType);
    return programCourses;
  };

  useEffect(() => {
    fetchCoursePrograms();
    fetchCourses();
  }, []);

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <div className="h-[24vh] w-full bg-[#002A23]">
        <div className="mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
          <Card bg={'#173D37'}>
            <Card.Section>
              <div className="flex w-full text-white">
                <IconSearch className="mx-4 my-auto" />
                <Input className="grow py-4" placeholder="Search for course e.g Graphic Design, Content Creation" />
                <div className="mx-4 my-auto">
                  <Button size="lg" backgroundColor="admiRed" label="Search" />
                </div>
              </div>
            </Card.Section>
          </Card>
        </div>
      </div>
      <div className="w-full bg-[#F5FFFD]">
        <div className="mx-auto w-full max-w-screen-xl bg-[#F5FFFD] px-4 2xl:px-0">
          <div className="flex h-fit w-full pt-24">
            <div className="flex grow flex-col">
              <Title label="Courses" size="24px" color="black" />
              <Text>Explore our variety of course that suits you!</Text>
            </div>
            <div>
              <Text>Sort By: All Courses </Text>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-screen-xl px-4 2xl:px-0">
          {programs.toReversed().map((program) => (
            <Box key={program.sys.id}>
              <ProgramListItemCard program={program} courses={courses} />
            </Box>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
