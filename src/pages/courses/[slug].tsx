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
import { PageSEO } from '@/components/shared/v3';

export default function CourseDetailPage({
  course,
  courseAssets,
  slug,
}: {
  course: any;
  courseAssets: any[];
  slug: string;
}) {
  return (
    <MainLayout>
      <PageSEO title={course.name} image={`https:${course.coverImage.fields.file.url}`} url={`/courses/${slug}`} />
      <CourseHero
        name={course.name}
        coverImage={course.coverImage}
        programType={course.programType}
        awardLevel={course.awardLevel}
        creditHours={course.creditHours}
      />
      <CourseAbout
        description={course.aboutTheCourse}
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
      <CourseMentors mentors={course.courseLeadersMentors} assets={courseAssets || []} />
      <CourseStudents
        portfolios={course.studentPortfolio || []}
        assets={courseAssets}
        testimonials={course.studentReviews || []}
        totalHistoricalEnrollment={course.totalHistoricalEnrollment}
      />
      <CourseApplicationProcess processes={course.applicationProcesses || []} />
      <CourseFAQs faqs={course.faqs || []} />
    </MainLayout>
  );
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/course-details?slug=${slug}`);
    if (!response.ok) {
      return { notFound: true }; // Redirect to 404 if course is not found
    }

    const data = await response.json();

    return {
      props: {
        course: data.fields,
        courseAssets: data.assets || [],
        slug,
      },
    };
  } catch (error) {
    console.error('Error fetching course:', error);
    return { notFound: true };
  }
}
