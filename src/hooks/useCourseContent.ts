import { useState, useEffect, useCallback } from 'react'
import {
  getAllCourseRelatedContent,
  getCourseTestimonials,
  getCourseStudentReviews,
  getCourseStudentPortfolios,
  CourseRelatedContent
} from '@/utils/course-content-fetcher'

/**
 * Custom hook for fetching course-related testimonials, reviews, and portfolios
 * @param courseSlug - The course slug to filter content by
 * @param options - Configuration options
 */
export function useCourseContent(
  courseSlug: string,
  options = {
    autoFetch: true,
    limits: { testimonials: 4, reviews: 4, portfolios: 4 }
  }
) {
  const [content, setContent] = useState<CourseRelatedContent>({
    testimonials: [],
    studentReviews: [],
    studentPortfolios: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(async () => {
    if (!courseSlug) return

    setLoading(true)
    setError(null)

    try {
      const data = await getAllCourseRelatedContent(courseSlug, options.limits)
      setContent(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch course content')
    } finally {
      setLoading(false)
    }
  }, [courseSlug, options.limits])

  useEffect(() => {
    if (options.autoFetch) {
      fetchContent()
    }
  }, [options.autoFetch, fetchContent])

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
    hasTestimonials: content.testimonials.length > 0,
    hasReviews: content.studentReviews.length > 0,
    hasPortfolios: content.studentPortfolios.length > 0
  }
}

/**
 * Hook for fetching only testimonials for a course
 */
export function useCourseTestimonials(courseSlug: string, limit = 6) {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseSlug) return

    const fetchTestimonials = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getCourseTestimonials(courseSlug, limit)
        setTestimonials(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [courseSlug, limit])

  return { testimonials, loading, error }
}

/**
 * Hook for fetching only student reviews for a course
 */
export function useCourseReviews(courseSlug: string, limit = 6) {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseSlug) return

    const fetchReviews = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getCourseStudentReviews(courseSlug, limit)
        setReviews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [courseSlug, limit])

  return { reviews, loading, error }
}

/**
 * Hook for fetching only student portfolios for a course
 */
export function useCoursePortfolios(courseSlug: string, limit = 6) {
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseSlug) return

    const fetchPortfolios = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getCourseStudentPortfolios(courseSlug, limit)
        setPortfolios(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch portfolios')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [courseSlug, limit])

  return { portfolios, loading, error }
}
