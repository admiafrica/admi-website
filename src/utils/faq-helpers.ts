import { ICourseFAQ } from '@/types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

// Helper function to safely render FAQ content
export const renderFAQContent = (content: any): string => {
  if (!content) return ''

  // If it's already a string, return it
  if (typeof content === 'string') return content

  // If it's a rich text object, convert it to HTML
  if (content.nodeType && content.content) {
    try {
      return documentToHtmlString(content)
    } catch (error) {
      console.error('Error rendering rich text:', error)
      // Fallback: extract plain text
      return extractPlainTextFromRichText(content)
    }
  }

  // Fallback: convert to string
  return String(content)
}

// Helper function to extract plain text from rich text
export const extractPlainTextFromRichText = (richText: any): string => {
  if (!richText || !richText.content) return ''

  return richText.content
    .map((block: any) => block.content?.map((content: any) => content.value || '').join(' '))
    .join(' ')
}

// Helper function to format FAQ data consistently
export const formatFAQData = (faq: ICourseFAQ | any) => ({
  question: faq.fields?.question || faq.question,
  answer: renderFAQContent(faq.fields?.answer || faq.answer),
  category: faq.fields?.category || faq.category || 'General Information',
  displayOrder: faq.fields?.displayOrder || 0,
  isRichText: !!(
    faq.fields?.answer?.nodeType ||
    (typeof (faq.fields?.answer || faq.answer) === 'object' && (faq.fields?.answer || faq.answer)?.nodeType)
  )
})

// Helper function to sort FAQs by display order
export const sortFAQsByOrder = (faqs: (ICourseFAQ | any)[]) => {
  return faqs.sort((a, b) => {
    const orderA = a.fields?.displayOrder || a.displayOrder || 0
    const orderB = b.fields?.displayOrder || b.displayOrder || 0
    return orderA - orderB
  })
}

// Helper function to group FAQs by category
export const groupFAQsByCategory = (faqs: (ICourseFAQ | any)[]) => {
  const formatted = faqs.map(formatFAQData)
  const grouped: Record<string, any[]> = {}

  formatted.forEach((faq) => {
    if (!grouped[faq.category]) {
      grouped[faq.category] = []
    }
    grouped[faq.category].push(faq)
  })

  return grouped
}

// Helper function to get unique categories from FAQs
export const getFAQCategories = (faqs: (ICourseFAQ | any)[]) => {
  const categories = faqs.map((faq) => faq.fields?.category || faq.category || 'General Information')
  return Array.from(new Set(categories))
}

// Helper function to validate FAQ data
export const validateFAQData = (faq: any): boolean => {
  const question = faq.fields?.question || faq.question
  const answer = faq.fields?.answer || faq.answer

  return !!(question && answer && question.trim() && answer.trim())
}

// Helper function to filter valid FAQs
export const filterValidFAQs = (faqs: (ICourseFAQ | any)[]) => {
  return faqs.filter(validateFAQData)
}

// Helper function to create FAQ schema data optimized for voice search and AI
export const createFAQSchemaData = (faqs: (ICourseFAQ | any)[], courseName?: string, location: string = 'Kenya') => {
  const validFAQs = filterValidFAQs(faqs)

  if (validFAQs.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: courseName ? `${courseName} - Frequently Asked Questions` : 'Course FAQs',
    about: courseName ? {
      '@type': 'Course',
      name: courseName,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Africa Digital Media Institute',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'KE',
          addressLocality: 'Nairobi'
        }
      }
    } : undefined,
    inLanguage: ['en', 'sw'], // English and Swahili for voice search
    audience: {
      '@type': 'Audience',
      geographicArea: {
        '@type': 'Place', 
        name: location
      }
    },
    mainEntity: validFAQs.map((faq) => {
      const question = faq.fields?.question || faq.question
      const answer = faq.fields?.answer || faq.answer
      
      return {
        '@type': 'Question',
        name: question,
        text: question, // Add text field for better AI understanding
        answerCount: 1,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
          dateCreated: new Date().toISOString(),
          author: {
            '@type': 'EducationalOrganization',
            name: 'Africa Digital Media Institute'
          }
        },
        // Add suggested questions for voice search
        suggestedAnswer: [
          {
            '@type': 'Answer',
            text: answer
          }
        ],
        // Add keywords for better discoverability
        keywords: extractKeywordsFromFAQ(question, answer)
      }
    })
  }
}

// Helper function to extract keywords from FAQ for voice search optimization
export const extractKeywordsFromFAQ = (question: string, answer: string): string => {
  const questionKeywords = extractKeywords(question)
  const answerKeywords = extractKeywords(answer)
  
  // Combine and deduplicate keywords
  const allKeywords = [...new Set([...questionKeywords, ...answerKeywords])]
  
  return allKeywords.slice(0, 10).join(', ') // Limit to top 10 keywords
}

// Simple keyword extraction function
const extractKeywords = (text: string): string[] => {
  // Remove common stop words and extract meaningful terms
  const stopWords = ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by', 'that', 'this', 'it', 'from', 'they', 'we', 'you', 'are', 'will', 'can', 'do', 'does', 'what', 'how', 'when', 'where', 'why']
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 5)
}

// Helper function to merge CMS FAQs with fallback FAQs
export const mergeFAQsWithFallback = (cmsFaqs: ICourseFAQ[], fallbackFaqs: any[], maxFallback: number = 5) => {
  const validCmsFaqs = filterValidFAQs(cmsFaqs)

  if (validCmsFaqs.length > 0) {
    return sortFAQsByOrder(validCmsFaqs)
  }

  // If no CMS FAQs, use fallback FAQs (limited number)
  const validFallbackFaqs = filterValidFAQs(fallbackFaqs).slice(0, maxFallback)
  return sortFAQsByOrder(validFallbackFaqs)
}

// Helper function to get FAQ category colors for UI
export const getFAQCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Career Prospects': 'green',
    'Accreditation & Recognition': 'blue',
    'Course Content & Structure': 'orange',
    'Fees & Payment': 'red',
    'Admission Requirements': 'purple',
    'Student Support': 'teal',
    'Technology Requirements': 'indigo',
    'International Students': 'pink',
    'Graduate Outcomes': 'cyan',
    'General Information': 'gray'
  }

  return colorMap[category] || 'gray'
}

// Helper function to get FAQ category icons
export const getFAQCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    'Career Prospects': 'IconBriefcase',
    'Accreditation & Recognition': 'IconCertificate',
    'Course Content & Structure': 'IconSchool',
    'Fees & Payment': 'IconCurrencyDollar',
    'Admission Requirements': 'IconUserCheck',
    'Student Support': 'IconUsers',
    'Technology Requirements': 'IconDevices',
    'International Students': 'IconWorld',
    'Graduate Outcomes': 'IconTrendingUp',
    'General Information': 'IconInfoCircle'
  }

  return iconMap[category] || 'IconInfoCircle'
}

// Voice Search Optimization Functions

// Convert FAQ question to voice search friendly format
export const makeQuestionVoiceSearchFriendly = (question: string): string => {
  // Convert formal questions to conversational voice search patterns
  let voiceQuestion = question.trim()
  
  // Add conversational starters if missing
  if (!voiceQuestion.toLowerCase().startsWith('how') && 
      !voiceQuestion.toLowerCase().startsWith('what') && 
      !voiceQuestion.toLowerCase().startsWith('can') && 
      !voiceQuestion.toLowerCase().startsWith('do') &&
      !voiceQuestion.toLowerCase().startsWith('is') &&
      !voiceQuestion.toLowerCase().startsWith('are')) {
    
    // Determine appropriate starter based on content
    if (voiceQuestion.includes('requirement') || voiceQuestion.includes('need')) {
      voiceQuestion = `What are the ${voiceQuestion.toLowerCase()}`
    } else if (voiceQuestion.includes('work') || voiceQuestion.includes('job') || voiceQuestion.includes('career')) {
      voiceQuestion = `Can I ${voiceQuestion.toLowerCase()}`
    } else if (voiceQuestion.includes('duration') || voiceQuestion.includes('long') || voiceQuestion.includes('cost')) {
      voiceQuestion = `How ${voiceQuestion.toLowerCase()}`
    } else {
      voiceQuestion = `What ${voiceQuestion.toLowerCase()}`
    }
  }
  
  // Ensure it ends with question mark
  if (!voiceQuestion.endsWith('?')) {
    voiceQuestion += '?'
  }
  
  return voiceQuestion
}

// Make FAQ answer more conversational for voice search
export const makeAnswerVoiceSearchFriendly = (answer: string, question: string): string => {
  let voiceAnswer = answer.trim()
  
  // Add conversational starters based on question type
  if (question.toLowerCase().includes('can i') || question.toLowerCase().includes('do i')) {
    if (!voiceAnswer.toLowerCase().startsWith('yes') && !voiceAnswer.toLowerCase().startsWith('no')) {
      voiceAnswer = `Yes, ${voiceAnswer.toLowerCase()}`
    }
  }
  
  // Replace technical terms with voice-friendly versions
  voiceAnswer = voiceAnswer
    .replace(/KCSE/g, 'Kenya Certificate of Secondary Education')
    .replace(/KES ([\d,]+)/g, 'Kenyan shillings $1')
    .replace(/(\d+)-(\d+)%/g, 'between $1 and $2 percent')
    .replace(/(\d+)-(\d+) months/g, '$1 to $2 months')
    .replace(/2-year/g, 'two-year')
    .replace(/85%\+/g, 'eighty-five percent or more')
    .replace(/C-/g, 'C minus')
    .replace(/UI\/UX/g, 'user interface and user experience')
    .replace(/VR\/AR/g, 'virtual reality and augmented reality')
  
  return voiceAnswer
}

// Generate voice search variations for a FAQ
export const generateVoiceSearchVariations = (question: string, category: string): string[] => {
  const variations: string[] = []
  const baseQuestion = question.toLowerCase().replace(/\?$/, '')
  
  // Common voice search patterns
  const patterns = [
    `How do I ${baseQuestion.replace(/^how /, '').replace(/^what /, '').replace(/^can i /, '')}?`,
    `What do I need to ${baseQuestion.replace(/^what are the requirements for /, '').replace(/^how do i /, '')}?`,
    `Can I ${baseQuestion.replace(/^can i /, '').replace(/^do i need /, '')}?`
  ]
  
  // Category-specific patterns
  if (category === 'Career Prospects') {
    variations.push(
      `How do I start a career in ${extractCareerField(question)}?`,
      `What jobs can I get with ${extractSkillOrDegree(question)}?`
    )
  }
  
  if (category === 'Admission Requirements') {
    variations.push(
      `How do I apply for ${extractCourseFromQuestion(question)}?`,
      `What grades do I need for ${extractCourseFromQuestion(question)}?`
    )
  }
  
  if (category === 'Fees & Payment') {
    variations.push(
      `How much does it cost to study ${extractCourseFromQuestion(question)} in Kenya?`,
      `Are there scholarships for ${extractCourseFromQuestion(question)} students?`
    )
  }
  
  // Filter out duplicates and invalid variations
  return [...new Set([...patterns, ...variations])]
    .filter(variation => variation.length > 10 && variation.includes('?'))
    .slice(0, 3) // Limit to 3 variations
}

// Helper functions for extracting context from questions
const extractCareerField = (question: string): string => {
  const fieldMatches = question.match(/(film|animation|music|graphic design|photography|sound engineering)/i)
  return fieldMatches ? fieldMatches[1].toLowerCase() : 'creative media'
}

const extractSkillOrDegree = (question: string): string => {
  const skillMatches = question.match(/(diploma|certificate|degree|training) in ([^?]+)/i)
  return skillMatches ? skillMatches[2] : 'creative media education'
}

const extractCourseFromQuestion = (question: string): string => {
  const courseMatches = question.match(/(film|animation|music|graphic design|photography|audio production)/i)
  return courseMatches ? courseMatches[1].toLowerCase() : 'creative media courses'
}

// Optimize FAQ data for voice search and AI understanding
export const optimizeFAQForVoiceSearch = (faq: any, category: string = 'General Information') => {
  const originalQuestion = faq.fields?.question || faq.question
  const originalAnswer = faq.fields?.answer || faq.answer
  
  return {
    ...faq,
    // Original data
    originalQuestion,
    originalAnswer,
    
    // Voice search optimized versions
    voiceSearchQuestion: makeQuestionVoiceSearchFriendly(originalQuestion),
    voiceSearchAnswer: makeAnswerVoiceSearchFriendly(originalAnswer, originalQuestion),
    voiceSearchVariations: generateVoiceSearchVariations(originalQuestion, category),
    
    // Keywords for AI understanding
    keywords: extractKeywordsFromFAQ(originalQuestion, originalAnswer),
    
    // Metadata for voice search
    conversationalTone: true,
    voiceSearchOptimized: true,
    aiOptimized: true,
    category
  }
}

// Batch optimize multiple FAQs for voice search
export const optimizeFAQsForVoiceSearch = (faqs: any[], defaultCategory: string = 'General Information') => {
  return faqs.map(faq => {
    const category = faq.fields?.category || faq.category || defaultCategory
    return optimizeFAQForVoiceSearch(faq, category)
  })
}
