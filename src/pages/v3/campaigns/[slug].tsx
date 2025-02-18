import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { CourseHero, CourseAbout, CourseDetails, CourseApplicationProcess, CourseFAQs } from '@/components/course';
import { PageSEO } from '@/components/shared/v3';
import { GoogleAnalyticsTag } from '@/components/shared';
import { useIsMobile } from '@/hooks/useIsMobile';

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

  return (
    <MainLayout minimizeFooter minimizeHeader>
      <PageSEO title={course.name} image={`https:${course.coverImage.fields.file.url}`} />
      <CourseHero
        name={course.name}
        coverImage={course.coverImage}
        programType={course.programType}
        awardLevel={course.awardLevel}
        creditHours={course.creditHours}
        isCampaign
      />
      <CourseAbout
        description={course.aboutTheCourse}
        isCampaign
        intakes={course.intakes}
        courseVideo={course.courseVideo}
        educationalLevel={course.educationalLevel}
      />
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
      <CourseApplicationProcess processes={course.applicationProcesses || []} />
      <CourseFAQs faqs={course.faqs || []} />
      <GoogleAnalyticsTag analyticsId={process.env.NEXT_PUBLIC_ADMI_GTM_ID as string} />
    </MainLayout>
  );
}
