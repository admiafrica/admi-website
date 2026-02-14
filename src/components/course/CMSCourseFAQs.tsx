import React, { useState, useEffect } from 'react'
import { IconChevronDown, IconAlertCircle } from '@tabler/icons-react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { ICourseFAQ, IFAQResponse } from '@/types'

interface CMSCourseFAQsProps {
  courseSlug: string
}

// Helper function to safely render FAQ content
const renderFAQContent = (content: any): string => {
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
      return extractPlainText(content)
    }
  }

  // Fallback: convert to string
  return String(content)
}

// Helper function to extract plain text from rich text
const extractPlainText = (richText: any): string => {
  if (!richText || !richText.content) return ''

  return richText.content
    .map((block: any) => block.content?.map((content: any) => content.value || '').join(' '))
    .join(' ')
}

export function CMSCourseFAQs({ courseSlug }: CMSCourseFAQsProps) {
  const [faqs, setFaqs] = useState<ICourseFAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/v3/course-faqs?slug=${courseSlug}`)
        console.log(`Fetching FAQs for course: ${courseSlug}`, response.status)

        if (!response.ok) {
          console.warn(`CMS FAQs not available for ${courseSlug}`, response.status)
          setFaqs([])
          return
        }

        const data: IFAQResponse = await response.json()
        console.log(`FAQs fetched for ${courseSlug}:`, data)
        setFaqs(data.items || [])
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setError('Unable to load FAQs')
        setFaqs([])
      } finally {
        setLoading(false)
      }
    }

    if (courseSlug) {
      fetchFAQs()
    }
  }, [courseSlug])

  // Use only CMS FAQs
  const displayFAQs = faqs

  // Convert CMS FAQs to the format expected by the UI
  const formattedFAQs = displayFAQs.map((faq: any) => ({
    question: faq.fields?.question || faq.question,
    answer: renderFAQContent(faq.fields?.answer || faq.answer),
    category: faq.fields?.category || faq.category || 'General Information',
    isRichText: !!(
      faq.fields?.answer?.nodeType ||
      (typeof (faq.fields?.answer || faq.answer) === 'object' && (faq.fields?.answer || faq.answer)?.nodeType)
    )
  }))

  // Show all FAQs (no filtering)
  const filteredFAQs = formattedFAQs

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
          <p className="mt-4 text-gray-500">Loading course FAQs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <div className="mb-1 flex items-center gap-2 font-semibold">
            <IconAlertCircle size={16} />
            Unable to load FAQs
          </div>
          {error}
        </div>
      </div>
    )
  }

  if (displayFAQs.length === 0) {
    return null // Don't render anything if no FAQs are available
  }

  // Generate FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: `Course FAQs - ${courseSlug}`,
    mainEntity: filteredFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.isRichText ? faq.answer.replace(/<[^>]*>/g, '') : faq.answer // Strip HTML for structured data
      }
    }))
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* FAQ Structured Data */}
      {filteredFAQs.length > 0 && (
        <script
          id={`cms-faq-structured-data-${courseSlug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <div className="mb-8 text-center">
        <h2 className="mb-4 text-4xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        <p className="mx-auto max-w-[600px] text-lg text-gray-500">
          Get answers to common questions about this course, admission requirements, career prospects, and student
          support services.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-2">
        {filteredFAQs.map((faq, index) => {
          const value = `faq-${index}`
          const isOpen = openFaq === value
          return (
            <div key={index} className="rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : value)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium hover:bg-gray-50"
              >
                <div className="flex w-full flex-wrap flex-nowrap justify-between">
                  <div>
                    <p className="font-medium text-gray-700">{faq.question}</p>
                  </div>
                </div>
                <IconChevronDown
                  size={16}
                  className={`ml-2 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-gray-200 px-6 py-4">
                  {faq.isRichText ? (
                    <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  ) : (
                    <p className="text-sm text-gray-700" style={{ lineHeight: 1.6 }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
