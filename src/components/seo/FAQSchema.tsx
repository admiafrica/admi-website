import { FC } from 'react'

interface FAQQuestion {
  question: string
  answer: string
}

interface FAQSchemaProps {
  questions: FAQQuestion[]
}

/**
 * FAQSchema component
 * Renders JSON-LD FAQ schema for rich snippets eligibility
 * Eligible for Google FAQ rich results in SERP
 */
export const FAQSchema: FC<FAQSchemaProps> = ({ questions }) => {
  if (!questions || questions.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export default FAQSchema
