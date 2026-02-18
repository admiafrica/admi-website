import axiosContentfulClient from './axiosContentfulClient'

/**
 * Utility functions for fetching course-related testimonials, reviews, and portfolios
 * These work with the course relationship fields once they're added to Contentful
 */

export interface CourseRelatedContent {
  testimonials: any[]
  studentReviews: any[]
  studentPortfolios: any[]
}

/**
 * Get testimonials for a specific course
 * @param courseSlug - The course slug to filter by
 * @param limit - Maximum number of testimonials to fetch
 */
export async function getCourseTestimonials(courseSlug: string, limit: number = 6) {
  try {
    const response = await axiosContentfulClient.get('/entries', {
      params: {
        content_type: 'testimonial',
        'fields.relatedCourse.sys.contentType.sys.id': 'course',
        'fields.relatedCourse.fields.slug': courseSlug,
        limit,
        include: 2,
        order: '-sys.createdAt'
      }
    })

    return response.data.items
  } catch (error) {
    console.error(`Error fetching testimonials for course ${courseSlug}:`, error)
    return []
  }
}

/**
 * Get alumni testimonials for a specific course
 * @param courseSlug - The course slug to filter by
 * @param limit - Maximum number of alumni testimonials to fetch
 */
export async function getCourseStudentReviews(courseSlug: string, limit: number = 6) {
  try {
    const response = await axiosContentfulClient.get('/entries', {
      params: {
        content_type: 'testimonial',
        'fields.testimonialType': 'alumni',
        'fields.relatedCourses.sys.contentType.sys.id': 'course',
        'fields.relatedCourses.fields.slug': courseSlug,
        limit,
        include: 2,
        order: '-sys.createdAt'
      }
    })

    return response.data.items
  } catch (error) {
    console.error(`Error fetching alumni testimonials for course ${courseSlug}:`, error)
    return []
  }
}

/**
 * Get student portfolios for a specific course
 * @param courseSlug - The course slug to filter by
 * @param limit - Maximum number of portfolios to fetch
 */
export async function getCourseStudentPortfolios(courseSlug: string, limit: number = 6) {
  try {
    const response = await axiosContentfulClient.get('/entries', {
      params: {
        content_type: 'studentPortfolio',
        'fields.relatedCourse.sys.contentType.sys.id': 'course',
        'fields.relatedCourse.fields.slug': courseSlug,
        limit,
        include: 2,
        order: '-sys.createdAt'
      }
    })

    return response.data.items
  } catch (error) {
    console.error(`Error fetching student portfolios for course ${courseSlug}:`, error)
    return []
  }
}

/**
 * Get all course-related content (testimonials, reviews, portfolios) in one call
 * @param courseSlug - The course slug to filter by
 * @param limits - Object specifying limits for each content type
 */
export async function getAllCourseRelatedContent(
  courseSlug: string,
  limits = { testimonials: 4, reviews: 4, portfolios: 4 }
): Promise<CourseRelatedContent> {
  try {
    const [testimonials, studentReviews, studentPortfolios] = await Promise.all([
      getCourseTestimonials(courseSlug, limits.testimonials),
      getCourseStudentReviews(courseSlug, limits.reviews),
      getCourseStudentPortfolios(courseSlug, limits.portfolios)
    ])

    return {
      testimonials,
      studentReviews,
      studentPortfolios
    }
  } catch (error) {
    console.error(`Error fetching all course content for ${courseSlug}:`, error)
    return {
      testimonials: [],
      studentReviews: [],
      studentPortfolios: []
    }
  }
}

/**
 * Get testimonials by course category (for broader filtering)
 * @param category - Course category (e.g., 'design', 'film', 'music')
 * @param limit - Maximum number of testimonials to fetch
 */
export async function getTestimonialsByCategory(category: string, limit: number = 6) {
  try {
    const response = await axiosContentfulClient.get('/entries', {
      params: {
        content_type: 'testimonial',
        'fields.courseCategory': category,
        limit,
        include: 2,
        order: '-sys.createdAt'
      }
    })

    return response.data.items
  } catch (error) {
    console.error(`Error fetching testimonials for category ${category}:`, error)
    return []
  }
}

/**
 * Get recent alumni testimonials across all courses (for homepage/general use)
 * @param limit - Maximum number of alumni testimonials to fetch
 */
export async function getRecentStudentReviews(limit: number = 6) {
  try {
    const response = await axiosContentfulClient.get('/entries', {
      params: {
        content_type: 'testimonial',
        'fields.testimonialType': 'alumni',
        limit,
        include: 2,
        order: '-sys.createdAt'
      }
    })

    return response.data.items
  } catch (error) {
    console.error('Error fetching recent alumni testimonials:', error)
    return []
  }
}

/**
 * Get featured student portfolios (for homepage showcase)
 * @param limit - Maximum number of portfolios to fetch
 */
export async function getFeaturedStudentPortfolios(limit: number = 6) {
  try {
    const response = await axiosContentfulClient.get('/entries', {
      params: {
        content_type: 'studentPortfolio',
        limit,
        include: 2,
        order: '-sys.createdAt'
      }
    })

    return response.data.items
  } catch (error) {
    console.error('Error fetching featured student portfolios:', error)
    return []
  }
}
