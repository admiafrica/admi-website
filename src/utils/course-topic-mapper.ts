/**
 * Maps course names to topic categories for article filtering
 * This ensures articles with matching topics appear on course pages
 */

const COURSE_TOPIC_MAPPING: Record<string, string> = {
  animation: 'Animation',
  film: 'Film Production',
  music: 'Music Production',
  photography: 'Photography',
  sound: 'Sound Engineering',
  graphic: 'Graphic Design',
  'ui-ux': 'UI/UX Design',
  'ui/ux': 'UI/UX Design',
  design: 'Graphic Design', // fallback for generic "design"
  'video-game': 'Video Game Development',
  'game-development': 'Video Game Development',
  gaming: 'Video Game Development',
  'digital-marketing': 'Digital Marketing',
  marketing: 'Digital Marketing',
  'entertainment-business': 'Entertainment Business',
  business: 'Entertainment Business'
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
