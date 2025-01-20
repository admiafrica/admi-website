import { useCallback, useEffect, useState } from 'react';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Box, Card, Input, Text, Pill } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Button, Title } from '@/components/ui';
import Image from 'next/image';
import { getAssetDetails } from '@/utils';

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
          <Card>
            <Card.Section>
              <div className="flex w-full">
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
          {programs.map((program) => {
            const programCourses = filterProgramCourses(program.fields.name, courses);

            return (
              <Box className="flex h-fit w-full flex-col pt-24">
                <Box className="flex flex-col sm:flex-row">
                  <div className="flex grow flex-col">
                    <Title label={program.fields.name} size="24px" color="black" />
                  </div>
                  <div className="flex">
                    <Text>Duration:</Text>
                    <Pill className="mx-1">{program.fields.duration}</Pill>
                  </div>
                  <div className="flex">
                    <Text>Delivery Mode:</Text>
                    {program.fields.deliveryMode.split(',').map((mode: any) => (
                      <Pill className="mx-1">{mode}</Pill>
                    ))}
                  </div>
                </Box>
                <Box>
                  {programCourses.map((course) => (
                    <Card className="my-4 h-[16vh] w-full shadow-lg" withBorder>
                      <Card.Section>
                        <Box className="flex h-full w-full">
                          <Image
                            height={98}
                            width={98}
                            src={`https:${getAssetDetails(course.assets, course.fields.coverImage.sys.id)?.fields.file.url}`}
                            alt={course.fields.name}
                          />
                          <Text>{course.fields.name}</Text>
                        </Box>
                      </Card.Section>
                    </Card>
                  ))}
                </Box>
              </Box>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
