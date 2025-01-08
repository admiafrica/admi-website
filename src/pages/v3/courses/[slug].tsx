import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

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
  const [, setCourseEntries] = useState<any>();

  const slug = router.query.slug;

  const fetchCourse = useCallback(async () => {
    if (!slug) return;

    try {
      const response = await fetch(`/api/v3/course-details?slug=${slug}`);
      const data = await response.json();
      console.log('COURSE', data);

      setCourse(data.fields);
      setCourseAssets(data.assets);
      setCourseEntries(data.entries);
    } catch (error) {
      console.log('Error fetching course:', error);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  if (!course) return null;

  const portfoliosSample = [
    { author: 'Emmanuel Chege', course: 'Animation and Motion Graphics Diploma' },
    { author: 'Anab Samatar', course: 'Animation and Motion Graphics Diploma' },
    { author: 'Donelle Wahome', course: 'Animation and Motion Graphics Diploma' },
  ];

  const testimonialsSample = [
    { author: 'John Doe', title: 'Alumni', description: 'testimonial', review: 5 },
    { author: 'Jane Doe', title: 'Student', description: 'testimonial', review: 5 },
    { author: 'Jane Doe', title: 'Student', description: 'testimonial', review: 4 },
  ];

  return (
    <MainLayout minimizeFooter minimizeHeader>
      <CourseHero
        name={course.name}
        coverImage={course.coverImage}
        programType={course.programType}
        awardLevel={course.awardLevel}
        creditHours={course.creditHours}
      />
      <CourseAbout description={course.description} />
      <CourseDetails
        benefits={course.courseBenefits || []}
        assets={courseAssets || []}
        programType={course.programType}
        creditHours={course.creditHours}
        tuitionFees={course.tuitionFees}
        courseDescription={course.description}
        careerOptions={course.careerOptions}
        learningOutcomes={course.learningOutcomes}
      />
      <CourseMentors mentors={course.courseLeadersMentors} assets={courseAssets || []} />
      <CourseStudents
        portfolios={course.portfolios || portfoliosSample}
        testimonials={course.testimonials || testimonialsSample}
        totalHistoricalEnrollment={course.totalHistoricalEnrollment}
      />
      <CourseApplicationProcess processes={course.applicationProcesses} />
      <CourseFAQs faqs={course.faqs || []} />
    </MainLayout>
  );
}
