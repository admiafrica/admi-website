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
import { CourseSchema, BreadcrumbSchema } from '@/components/shared/StructuredData';

export default function CourseDetailPage({
  course,
  courseAssets,
  slug,
}: {
  course: any;
  courseAssets: any[];
  slug: string;
}) {
  // Extract rich text content for description
  const getPlainTextFromRichText = (richText: any) => {
    if (!richText || !richText.content) return '';

    return richText.content
      .map((block: any) =>
        block.content
          ?.map((content: any) => content.value)
          .join(' ')
      )
      .join(' ')
      .substring(0, 160) + '...';
  };

  // Create comprehensive course description for SEO
  const courseDescription = course.description
    ? getPlainTextFromRichText(course.description)
    : course.aboutTheCourse
      ? getPlainTextFromRichText(course.aboutTheCourse)
      : `${course.name} - ${course.programType?.fields?.duration || ''} ${course.programType?.fields?.deliveryMode || ''} course at ADMI. ${course.awardLevel || ''} level program.`;

  // Extract learning outcomes as array
  const learningOutcomes = course.learningOutcomes?.content
    ?.map((block: any) => block.content?.map((content: any) => content.value).join(' '))
    .filter(Boolean) || [];

  // Extract career options as array
  const careerOptions = course.careerOptions?.content
    ?.map((block: any) => block.content?.map((content: any) => content.value).join(' '))
    .filter(Boolean) || [];

  // Create SEO keywords
  const keywords = [
    course.name,
    course.programType?.fields?.name,
    course.awardLevel,
    'ADMI',
    'Africa Digital Media Institute',
    'Kenya',
    'Nairobi',
    'digital media',
    'creative education',
    ...learningOutcomes.slice(0, 3),
    ...careerOptions.slice(0, 3)
  ].filter(Boolean).join(', ');

  return (
    <MainLayout>
      <PageSEO
        title={course.name}
        description={courseDescription}
        keywords={keywords}
        image={course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined}
        url={`/courses/${slug}`}
      />

      {/* Course Structured Data */}
      <CourseSchema
        name={course.name}
        description={courseDescription}
        provider={{
          name: 'Africa Digital Media Institute',
          url: 'https://admi.africa'
        }}
        url={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses/${slug}`}
        image={course.coverImage?.fields?.file?.url ? `https:${course.coverImage.fields.file.url}` : undefined}
        awardLevel={course.awardLevel}
        creditHours={course.creditHours}
        tuitionFees={course.tuitionFees}
        duration={course.programType?.fields?.duration}
        deliveryMode={course.programType?.fields?.deliveryMode}
        educationalLevel={course.educationalLevel}
        learningOutcomes={learningOutcomes}
        careerOptions={careerOptions}
        intakes={course.intakes}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa' },
          { name: 'Courses', url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses` },
          { name: course.name, url: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'}/courses/${slug}` }
        ]}
      />
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
