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

// Helper function to create FAQ schema data
export const createFAQSchemaData = (faqs: (ICourseFAQ | any)[], courseName?: string) => {
  const validFAQs = filterValidFAQs(faqs)

  if (validFAQs.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: courseName ? `${courseName} - Frequently Asked Questions` : 'Course FAQs',
    mainEntity: validFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.fields?.question || faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.fields?.answer || faq.answer
      }
    }))
  }
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
