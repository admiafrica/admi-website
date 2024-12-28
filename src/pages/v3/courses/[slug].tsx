import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MainLayout } from '@/layouts/v3/MainLayout';
import {
  CourseAbout,
  CourseApplicationProcess,
  CourseDetails,
  CourseFAQs,
  CourseHero,
  CourseMentors,
  CourseStudents,
} from '@/components/course';

export default function CourseDetailPage() {
  const router = useRouter();
  const [course, setCourse] = useState<any>();
  const [courseAssets, setCourseAssets] = useState<any>();
  const [courseEntries, setCourseEntries] = useState<any>();

  const slug = router.query.slug;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses?slug=${slug}`);
        const data = await response.json();
        console.log('COURSE DATA', data);
        setCourse(data.fields);
        setCourseAssets(data.assets);
        setCourseEntries(data.entries);
      } catch (error) {
        console.log('Error', error);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  if (!course) return;

  return (
    <MainLayout>
      <CourseHero
        name={course.name}
        banner={course.banner}
        duration={course.courseDuration}
        creditHours={course.creditHours}
      />
      <CourseAbout description={course.description} />
      <CourseDetails
        usp={course.usp}
        assets={courseAssets}
        duration={course.courseDuration}
        creditHours={course.creditHours}
        tuitionFee={course.tuitionFee}
      />
      <CourseMentors />
      <CourseStudents testimonials={course.testimonials || []} />
      <CourseApplicationProcess />
      <CourseFAQs faqs={course.faqs} />
    </MainLayout>
  );
}
