#!/usr/bin/env node

/**
 * Test the course-topic mapper to ensure all courses map to a topic
 */

const COURSE_TOPIC_MAPPING = {
  // Animation
  animation: 'Animation',
  '2d animation': 'Animation',
  '3d animation': 'Animation',

  // Film Production (includes content creation - video/multimedia focused)
  film: 'Film Production',
  'video production': 'Film Production',
  television: 'Film Production',
  'digital content': 'Film Production',
  'content creation': 'Film Production',
  multimedia: 'Film Production',

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

function extractCourseTopic(courseName, courseCategory) {
  if (courseCategory) return courseCategory
  const normalizedName = courseName.toLowerCase()
  for (const [keyword, topic] of Object.entries(COURSE_TOPIC_MAPPING)) {
    if (normalizedName.includes(keyword)) {
      return topic
    }
  }
  return undefined
}

const courses = [
  'Data Analytics and Visualisation',
  'Graphic Design Certificate',
  'Digital Marketing Certificate',
  'Digital Content Creation Diploma',
  'Graphic Design Diploma',
  'Sound Engineering Diploma',
  'Music Production and Sound Engineering Certificate',
  'Photography Certificate',
  'Film and Television Production Diploma',
  'Video Production Certificate (Professional)',
  'Certificate in AI Adoption & Digital Transformation',
  'Multimedia Certificate',
  '2D Animation Certificate (Rubika)'
]

console.log('Testing topic extraction for all courses:')
console.log('='.repeat(70))

let allMatched = true
courses.forEach((c) => {
  const topic = extractCourseTopic(c)
  const status = topic ? '✅' : '❌'
  if (!topic) allMatched = false
  console.log(`${status} ${c.padEnd(50)} -> ${topic || 'NO MATCH'}`)
})

console.log('='.repeat(70))
console.log(allMatched ? '✅ All courses matched!' : '❌ Some courses have no match!')
process.exit(allMatched ? 0 : 1)
