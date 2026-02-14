import React from 'react'
import { ensureProtocol } from '@/utils'
import Image from 'next/image'
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
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
      </div>
    )
  }

  if (error) {
    console.error('Error loading course content:', error)
    return null // Fail silently for better UX
  }

  return (
    <div className="space-y-12">
      {/* Course Testimonials Section */}
      {hasTestimonials && (
        <section>
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold font-semibold text-gray-800 text-gray-900">
              What {courseName} Students Say
            </h2>
            <p className="text-lg text-gray-600 text-gray-700">
              Hear from graduates who transformed their careers through our {courseName} program
            </p>
          </div>

          <div className="flex flex-wrap">
            {content.testimonials.map((testimonial) => (
              <div key={testimonial.sys.id} className="w-full md:w-1/2 lg:w-4/12">
                <UserTestimonialCard
                  user={testimonial}
                  testimonial={testimonial}
                  assets={[]} // Include assets if needed
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Student Reviews Section */}
      {hasReviews && (
        <section>
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold font-semibold text-gray-800 text-gray-900">Student Reviews</h2>
            <p className="text-lg text-gray-600 text-gray-700">
              Detailed feedback from {courseName} alumni about their learning experience
            </p>
          </div>

          <div className="flex flex-wrap">
            {content.studentReviews.map((review) => (
              <div key={review.sys.id} className="w-full md:w-1/2">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <div
                    className="mb-4 text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: review.fields.description
                    }}
                  />
                  <div className="flex items-center space-x-3">
                    {review.fields.authorImage && (
                      <Image
                        src={ensureProtocol(review.fields.authorImage.fields.file.url)}
                        alt={review.fields.authorName}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-700 text-gray-800">{review.fields.authorName}</p>
                      <p className="text-sm text-gray-600 text-gray-700">{review.fields.authorRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Student Portfolios Section */}
      {hasPortfolios && (
        <section>
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold font-semibold text-gray-800 text-gray-900">Student Work Showcase</h2>
            <p className="text-lg text-gray-600 text-gray-700">
              Explore creative projects and professional work from {courseName} graduates
            </p>
          </div>

          <div className="flex flex-wrap">
            {content.studentPortfolios.map((portfolio) => (
              <div key={portfolio.sys.id} className="w-full md:w-1/2 lg:w-4/12">
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                  {portfolio.fields.profilePicture && (
                    <Image
                      src={ensureProtocol(portfolio.fields.profilePicture.fields.file.url)}
                      alt={portfolio.fields.studentName}
                      width={400}
                      height={192}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="mb-2 text-2xl text-xl font-bold font-semibold text-gray-800 text-gray-900">
                      {portfolio.fields.studentName}
                    </h3>
                    <p className="mb-3 font-medium text-admiRed text-gray-700">{portfolio.fields.professionalTitle}</p>
                    {portfolio.fields.bio && (
                      <div
                        className="text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: portfolio.fields.bio
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fallback message if no content */}
      {!hasTestimonials && !hasReviews && !hasPortfolios && (
        <div className="py-12 text-center">
          <p className="text-gray-500">Student testimonials and portfolios will be displayed here once available.</p>
        </div>
      )}
    </div>
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
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold font-semibold text-gray-800 text-gray-900">{title}</h2>
      </div>

      <div className="flex flex-wrap">
        {content.testimonials.map((testimonial) => (
          <div key={testimonial.sys.id} className="w-full md:w-1/2 lg:w-4/12">
            <UserTestimonialCard user={testimonial} testimonial={testimonial} assets={[]} />
          </div>
        ))}
      </div>
    </section>
  )
}
