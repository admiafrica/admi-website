// Voice Search Optimization Patterns for ADMI Creative Education

export interface VoiceSearchPattern {
  intent: string
  patterns: string[]
  targetKeywords: string[]
  contentType: 'conversational' | 'direct' | 'comparison' | 'how-to'
  priority: 'high' | 'medium' | 'low'
}

// Voice Search Query Patterns for Creative Education in Africa
export const VOICE_SEARCH_PATTERNS: VoiceSearchPattern[] = [
  // Career Intent Patterns
  {
    intent: 'career_prospects',
    patterns: [
      'How do I become a filmmaker in Africa?',
      'What jobs can I get with a film degree in Kenya?',
      'How much do graphic designers earn in Africa?',
      'What are the best creative careers in Africa?',
      'Can I work in Nollywood after film school?',
      'What do music producers earn in Kenya?',
      'How do I start a career in animation in Africa?',
      'What creative jobs are available in Nairobi?'
    ],
    targetKeywords: ['creative careers africa', 'film jobs kenya', 'designer salary africa', 'nollywood careers'],
    contentType: 'conversational',
    priority: 'high'
  },

  // Educational Intent Patterns
  {
    intent: 'course_selection',
    patterns: [
      'Which is better film production or animation?',
      'What should I study to work in African media?',
      'How long does it take to become a filmmaker?',
      'What courses do I need for music production?',
      'Should I study graphic design or web design?',
      'What do I need to study to work in Nollywood?',
      'How do I choose between diploma and certificate programs?'
    ],
    targetKeywords: ['film vs animation', 'media courses africa', 'music production education', 'creative education kenya'],
    contentType: 'comparison',
    priority: 'high'
  },

  // Practical Information Patterns
  {
    intent: 'admission_requirements',
    patterns: [
      'How do I apply to ADMI?',
      'What are the requirements for film school in Kenya?',
      'Can I study creative media without experience?',
      'Do I need a portfolio for animation school?',
      'What grades do I need for ADMI?',
      'Can I study online at ADMI?',
      'How much does it cost to study at ADMI?',
      'Are there scholarships for creative students in Kenya?'
    ],
    targetKeywords: ['admi admission', 'film school requirements kenya', 'creative education cost', 'scholarships kenya'],
    contentType: 'direct',
    priority: 'high'
  },

  // Technical/How-to Patterns
  {
    intent: 'learning_process',
    patterns: [
      'How do I learn film editing?',
      'What software do graphic designers use?',
      'How do I start music production?',
      'What equipment do I need for photography?',
      'How do I create animations?',
      'What do I need to make films?',
      'How do I become a sound engineer?',
      'What skills do I need for creative careers?'
    ],
    targetKeywords: ['film editing tutorials', 'design software', 'music production setup', 'animation skills'],
    contentType: 'how-to',
    priority: 'medium'
  },

  // Financial/Practical Patterns
  {
    intent: 'financial_planning',
    patterns: [
      'How much does creative education cost in Kenya?',
      'Can I study part-time while working?',
      'Are there payment plans for creative courses?',
      'How do I fund my creative education?',
      'What financial aid is available for students?',
      'Can I work while studying at ADMI?',
      'How do I pay for film school in Kenya?'
    ],
    targetKeywords: ['education costs kenya', 'part-time study', 'student financing', 'creative education funding'],
    contentType: 'direct',
    priority: 'medium'
  },

  // Industry-Specific Patterns
  {
    intent: 'industry_opportunities',
    patterns: [
      'What opportunities are there in African film industry?',
      'How is the music industry growing in Africa?',
      'What companies hire creative professionals in Kenya?',
      'Where do ADMI graduates work?',
      'What is the future of creative industries in Africa?',
      'How do I get into the gaming industry in Africa?',
      'What media companies are in Nairobi?'
    ],
    targetKeywords: ['african film industry', 'music industry africa', 'creative jobs nairobi', 'media companies kenya'],
    contentType: 'conversational',
    priority: 'medium'
  },

  // Location-Specific Patterns
  {
    intent: 'local_opportunities',
    patterns: [
      'What creative courses are available in Nairobi?',
      'Where can I study film in Kenya?',
      'What are the best creative schools in East Africa?',
      'Can I study creative media in Kenya?',
      'What media training is available in Nairobi?',
      'Where do I learn music production in Kenya?',
      'What animation schools are in Africa?'
    ],
    targetKeywords: ['creative courses nairobi', 'film school kenya', 'media training east africa', 'animation school africa'],
    contentType: 'direct',
    priority: 'high'
  }
]

// Voice Search Optimization Utilities
export const generateVoiceSearchContent = (pattern: VoiceSearchPattern) => {
  const baseContent = {
    intent: pattern.intent,
    naturalLanguageQuestions: pattern.patterns,
    targetKeywords: pattern.targetKeywords,
    contentType: pattern.contentType
  }

  // Generate FAQ variations for each pattern
  const faqVariations = pattern.patterns.map(question => ({
    question,
    expectedAnswerType: pattern.contentType,
    voiceSearchOptimized: true,
    priority: pattern.priority
  }))

  return {
    ...baseContent,
    faqVariations
  }
}

// Helper function to optimize existing FAQs for voice search
export const optimizeExistingFAQForVoiceSearch = (faq: any) => {
  const { question, answer } = faq

  // Add conversational variations
  const voiceSearchVariations = []
  
  // Add "How do I..." variations
  if (question.includes('requirements') || question.includes('apply')) {
    voiceSearchVariations.push(`How do I ${question.toLowerCase().replace('what are the ', '').replace('?', '')}?`)
  }

  // Add "What is..." variations
  if (question.includes('duration') || question.includes('cost')) {
    voiceSearchVariations.push(`What is the ${question.toLowerCase().replace('what is the ', '').replace('what are the ', '')}`)
  }

  // Add "Can I..." variations
  if (question.includes('transfer') || question.includes('work')) {
    voiceSearchVariations.push(`Can I ${question.toLowerCase().replace('can i ', '').replace('do you ', '')}`)
  }

  return {
    ...faq,
    voiceSearchVariations,
    voiceSearchOptimized: true,
    conversationalAnswer: makeAnswerConversational(answer)
  }
}

// Helper function to make answers more conversational for voice search
export const makeAnswerConversational = (answer: string): string => {
  // Add conversational starters
  if (answer.startsWith('Yes,')) {
    return answer.replace('Yes,', 'Yes, absolutely!')
  }
  
  if (answer.startsWith('No,')) {
    return answer.replace('No,', 'No, but here\'s what you should know:')
  }

  // Add specific numbers and timeframes for voice search
  const conversationalAnswer = answer
    .replace(/(\d+)-(\d+)%/, 'between $1 and $2 percent')
    .replace(/(\d+)-(\d+) months/, 'between $1 and $2 months')
    .replace(/KES ([\d,]+)/, 'Kenyan shillings $1')
    .replace(/2-year/, 'two-year')

  return conversationalAnswer
}

// Voice Search FAQ Categories for Contentful
export const VOICE_SEARCH_FAQ_CATEGORIES = [
  {
    category: 'Career Guidance',
    description: 'Questions about career paths, job opportunities, and salary expectations',
    voiceSearchPatterns: [
      'How do I become a [profession] in [location]?',
      'What jobs can I get with [degree/course] in [location]?',
      'How much do [profession] earn in [location]?'
    ]
  },
  {
    category: 'Course Selection',
    description: 'Comparative questions about different courses and programs',
    voiceSearchPatterns: [
      'Which is better [course A] or [course B]?',
      'What should I study to work in [industry]?',
      'How do I choose between [option A] and [option B]?'
    ]
  },
  {
    category: 'Admission Process',
    description: 'Direct questions about application requirements and procedures',
    voiceSearchPatterns: [
      'How do I apply to [institution/course]?',
      'What are the requirements for [course] in [location]?',
      'Do I need [requirement] for [course]?'
    ]
  },
  {
    category: 'Learning Process',
    description: 'How-to questions about skills and learning methods',
    voiceSearchPatterns: [
      'How do I learn [skill]?',
      'What do I need to [achieve goal]?',
      'How do I start [career/hobby]?'
    ]
  },
  {
    category: 'Financial Planning',
    description: 'Questions about costs, funding, and financial aid',
    voiceSearchPatterns: [
      'How much does [course/education] cost in [location]?',
      'Can I study [type] while working?',
      'Are there scholarships for [demographic/field]?'
    ]
  },
  {
    category: 'Industry Insights',
    description: 'Questions about industry trends and opportunities',
    voiceSearchPatterns: [
      'What opportunities are there in [industry] in [location]?',
      'How is [industry] growing in [location]?',
      'What is the future of [industry] in [location]?'
    ]
  }
]

// Helper function to generate voice search optimized FAQ content
export const generateVoiceSearchFAQ = (
  question: string,
  baseAnswer: string,
  category: string,
  location: string = 'Africa'
) => {
  const conversationalQuestion = question.charAt(0).toUpperCase() + question.slice(1)
  if (!conversationalQuestion.endsWith('?')) {
    return `${conversationalQuestion}?`
  }

  const conversationalAnswer = baseAnswer
    .replace(/(\d+)-(\d+)%/, 'between $1 and $2 percent')
    .replace(/(\d+)-(\d+) months/, '$1 to $2 months')
    .replace(/KES ([\d,]+)/, 'Kenyan shillings $1')
    .replace(/2-year/, 'two-year')

  return {
    question: conversationalQuestion,
    answer: conversationalAnswer,
    category,
    location,
    voiceSearchOptimized: true,
    naturalLanguage: true
  }
}

// Export patterns for easy access
export const getVoiceSearchPatternsByIntent = (intent: string) => {
  return VOICE_SEARCH_PATTERNS.filter(pattern => pattern.intent === intent)
}

export const getHighPriorityVoiceSearchPatterns = () => {
  return VOICE_SEARCH_PATTERNS.filter(pattern => pattern.priority === 'high')
}

export const getAllVoiceSearchQuestions = () => {
  return VOICE_SEARCH_PATTERNS.flatMap(pattern => pattern.patterns)
}