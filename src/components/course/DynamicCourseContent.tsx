import React from 'react'
import Image from 'next/image'
import { Box, Grid, Loader, Text, Title } from '@mantine/core'
import { useCourseContent } from '@/hooks/useCourseContent'
import { UserTestimonialCard } from '@/components/cards'

interface DynamicCourseContentProps {
  courseSlug: string
  courseName: string
}

/**
 * Component that dynamically displays testimonials, reviews, and portfolios
 * for a specific course based on the course slug
 */
export default function DynamicCourseContent({ courseSlug, courseName }: DynamicCourseContentProps) {
  const { content, loading, error, hasTestimonials, hasReviews, hasPortfolios } = useCourseContent(courseSlug)

  if (loading) {
    return (
      <Box className="flex justify-center py-8">
        <Loader size="lg" />
      </Box>
    )
  }

  if (error) {
    console.error('Error loading course content:', error)
    return null // Fail silently for better UX
  }

  return (
    <Box className="space-y-12">
      {/* Course Testimonials Section */}
      {hasTestimonials && (
        <section>
          <Box className="mb-8">
            <Title order={2} className="mb-4 text-3xl font-bold text-gray-800">
              What {courseName} Students Say
            </Title>
            <Text className="text-lg text-gray-600">
              Hear from graduates who transformed their careers through our {courseName} program
            </Text>
          </Box>

          <Grid>
            {content.testimonials.map((testimonial) => (
              <Grid.Col key={testimonial.sys.id} span={{ base: 12, md: 6, lg: 4 }}>
                <UserTestimonialCard
                  user={testimonial}
                  testimonial={testimonial}
                  assets={[]} // Include assets if needed
                />
              </Grid.Col>
            ))}
          </Grid>
        </section>
      )}

      {/* Student Reviews Section */}
      {hasReviews && (
        <section>
          <Box className="mb-8">
            <Title order={2} className="mb-4 text-3xl font-bold text-gray-800">
              Student Reviews
            </Title>
            <Text className="text-lg text-gray-600">
              Detailed feedback from {courseName} alumni about their learning experience
            </Text>
          </Box>

          <Grid>
            {content.studentReviews.map((review) => (
              <Grid.Col key={review.sys.id} span={{ base: 12, md: 6 }}>
                <Box className="rounded-lg border bg-white p-6 shadow-sm">
                  <div
                    className="mb-4 text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: review.fields.description
                    }}
                  />
                  <Box className="flex items-center space-x-3">
                    {review.fields.authorImage && (
                      <Image
                        src={`https:${review.fields.authorImage.fields.file.url}`}
                        alt={review.fields.authorName}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <Text className="font-semibold text-gray-800">{review.fields.authorName}</Text>
                      <Text className="text-sm text-gray-600">{review.fields.authorRole}</Text>
                    </div>
                  </Box>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </section>
      )}

      {/* Student Portfolios Section */}
      {hasPortfolios && (
        <section>
          <Box className="mb-8">
            <Title order={2} className="mb-4 text-3xl font-bold text-gray-800">
              Student Work Showcase
            </Title>
            <Text className="text-lg text-gray-600">
              Explore creative projects and professional work from {courseName} graduates
            </Text>
          </Box>

          <Grid>
            {content.studentPortfolios.map((portfolio) => (
              <Grid.Col key={portfolio.sys.id} span={{ base: 12, md: 6, lg: 4 }}>
                <Box className="overflow-hidden rounded-lg border bg-white shadow-sm">
                  {portfolio.fields.profilePicture && (
                    <Image
                      src={`https:${portfolio.fields.profilePicture.fields.file.url}`}
                      alt={portfolio.fields.studentName}
                      width={400}
                      height={192}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <Box className="p-6">
                    <Title order={3} className="mb-2 text-xl font-bold text-gray-800">
                      {portfolio.fields.studentName}
                    </Title>
                    <Text className="mb-3 font-medium text-admiRed">{portfolio.fields.professionalTitle}</Text>
                    {portfolio.fields.bio && (
                      <div
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: portfolio.fields.bio
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Grid.Col>
            ))}
          </Grid>
        </section>
      )}

      {/* Fallback message if no content */}
      {!hasTestimonials && !hasReviews && !hasPortfolios && (
        <Box className="py-12 text-center">
          <Text className="text-gray-500">
            Student testimonials and portfolios will be displayed here once available.
          </Text>
        </Box>
      )}
    </Box>
  )
}

/**
 * Simplified version that shows only testimonials
 */
export function CourseTestimonialsSection({
  courseSlug,
  title = 'Student Success Stories'
}: {
  courseSlug: string
  title?: string
}) {
  const { content, loading, hasTestimonials } = useCourseContent(courseSlug, {
    autoFetch: true,
    limits: { testimonials: 6, reviews: 0, portfolios: 0 }
  })

  if (loading || !hasTestimonials) return null

  return (
    <section className="py-12">
      <Box className="mb-8 text-center">
        <Title order={2} className="mb-4 text-3xl font-bold text-gray-800">
          {title}
        </Title>
      </Box>

      <Grid>
        {content.testimonials.map((testimonial) => (
          <Grid.Col key={testimonial.sys.id} span={{ base: 12, md: 6, lg: 4 }}>
            <UserTestimonialCard user={testimonial} testimonial={testimonial} assets={[]} />
          </Grid.Col>
        ))}
      </Grid>
    </section>
  )
}
