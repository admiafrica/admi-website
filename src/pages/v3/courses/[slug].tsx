import {
  CourseApplicationProcess,
  CourseDetails,
  CourseFAQs,
  CourseMentors,
  CourseStudents,
} from '@/components/course';
import CourseAbout from '@/components/course/About';
import CourseHero from '@/components/course/Hero';
import { MainLayout } from '@/layouts/v3/MainLayout';
import { Text } from '@mantine/core';

export default function CourseDetailPage() {
  return (
    <MainLayout>
      <CourseHero />
      <CourseAbout />
      <CourseDetails />
      <CourseMentors />
      <CourseStudents />
      <CourseApplicationProcess />
      <CourseFAQs />
    </MainLayout>
  );
}
