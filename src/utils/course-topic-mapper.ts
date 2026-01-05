/**
 * Maps course names to topic categories for article filtering
 * This ensures articles with matching topics appear on course pages
 */

const COURSE_TOPIC_MAPPING: Record<string, string> = {
  // Animation
  animation: 'Animation',
  '2d animation': 'Animation',
  '3d animation': 'Animation',

  // Film Production (includes content creation - video/multimedia focused)
  film: 'Film Production',
  'video production': 'Film Production',
  television: 'Film Production',
  'digital content': 'Film Production', // Digital Content Creation is video/multimedia focused
  'content creation': 'Film Production',
  multimedia: 'Film Production', // Multimedia is video/content focused

  // Music Production
  music: 'Music Production',

  // Photography
  photography: 'Photography',

  // Sound Engineering
  sound: 'Sound Engineering',

  // Graphic Design
  graphic: 'Graphic Design',

  // UI/UX Design
  'ui-ux': 'UI/UX Design',
  'ui/ux': 'UI/UX Design',
  'data analytics': 'UI/UX Design',
  'ai adoption': 'UI/UX Design',
  'digital transformation': 'UI/UX Design',

  // Video Game Development
  'video game': 'Video Game Development',
  'game development': 'Video Game Development',
  game: 'Video Game Development',
  gaming: 'Video Game Development',

  // Digital Marketing
  'digital marketing': 'Digital Marketing',
  marketing: 'Digital Marketing',

  // Entertainment Business
  'entertainment business': 'Entertainment Business',
  business: 'Entertainment Business',

  // Fallback for generic "design" - should come after more specific matches
  design: 'Graphic Design'
}

/**
 * Extracts topic from course name or category field
 * @param courseName - The course name (e.g., "Animation - Nairobi", "Music Production Certificate")
 * @param courseCategory - Optional category field from Contentful
 * @returns Topic string (e.g., "Animation", "Music Production") or undefined
 */
export function extractCourseTopic(courseName: string, courseCategory?: string): string | undefined {
  // If course has category field set, use it directly
  if (courseCategory) {
    return courseCategory
  }

  // Otherwise, extract from course name
  const normalizedName = courseName.toLowerCase()

  // Check each mapping
  for (const [keyword, topic] of Object.entries(COURSE_TOPIC_MAPPING)) {
    if (normalizedName.includes(keyword)) {
      return topic
    }
  }

  // No match found
  return undefined
}

/**
 * Gets all available topics
 */
export function getAllTopics(): string[] {
  return Array.from(new Set(Object.values(COURSE_TOPIC_MAPPING)))
}
