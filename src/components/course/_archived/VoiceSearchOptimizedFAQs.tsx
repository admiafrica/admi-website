import React, { useState, useEffect } from 'react'
import { IconChevronDown, IconAlertCircle, IconMicrophone } from '@tabler/icons-react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { ICourseFAQ, IFAQResponse } from '@/types'
import { createFAQSchemaData, optimizeFAQsForVoiceSearch } from '@/utils/faq-helpers'

interface VoiceSearchOptimizedFAQsProps {
  courseSlug: string
  courseName?: string
  location?: string
  enableVoiceSearchIndicators?: boolean
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

export function VoiceSearchOptimizedFAQs({
  courseSlug,
  courseName,
  location = 'Kenya',
  enableVoiceSearchIndicators = true
}: VoiceSearchOptimizedFAQsProps) {
  const [faqs, setFaqs] = useState<ICourseFAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [voiceSearchOptimizedFAQs, setVoiceSearchOptimizedFAQs] = useState<any[]>([])
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/v3/course-faqs?slug=${courseSlug}`)

        if (!response.ok) {
          console.warn(`CMS FAQs not available for ${courseSlug}`)
          setFaqs([])
          return
        }

        const data: IFAQResponse = await response.json()
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

  // Optimize FAQs for voice search
  useEffect(() => {
    if (displayFAQs.length > 0) {
      const optimizedFAQs = optimizeFAQsForVoiceSearch(displayFAQs)
      setVoiceSearchOptimizedFAQs(optimizedFAQs)
    }
  }, [displayFAQs])

  // Convert FAQs to the format expected by the UI
  const formattedFAQs = voiceSearchOptimizedFAQs.map((faq: any) => ({
    question: faq.voiceSearchQuestion || faq.fields?.question || faq.question,
    answer: renderFAQContent(faq.voiceSearchAnswer || faq.fields?.answer || faq.answer),
    originalQuestion: faq.originalQuestion || faq.fields?.question || faq.question,
    category: faq.fields?.category || faq.category || 'General Information',
    keywords: faq.keywords || '',
    voiceSearchVariations: faq.voiceSearchVariations || [],
    voiceSearchOptimized: faq.voiceSearchOptimized || false,
    isRichText: !!(
      faq.fields?.answer?.nodeType ||
      (typeof (faq.fields?.answer || faq.answer) === 'object' && (faq.fields?.answer || faq.answer)?.nodeType)
    )
  }))

  // Generate structured data for voice search
  const faqSchemaData = createFAQSchemaData(voiceSearchOptimizedFAQs, courseName, location)

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

  return (
    <>
      {/* Inject structured data for voice search and AI */}
      {faqSchemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchemaData)
          }}
        />
      )}

      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <h2 className="text-4xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            {enableVoiceSearchIndicators && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
                <IconMicrophone size={12} className="mr-1" />
                Voice Search Optimized
              </span>
            )}
          </div>
          <p className="mx-auto max-w-[600px] text-lg text-gray-500">
            Get answers to common questions about {courseName || 'this course'}, admission requirements, career
            prospects, and student support services. These FAQs are optimized for voice search and AI assistants.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2">
          {formattedFAQs.map((faq, index) => {
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
                      {enableVoiceSearchIndicators && faq.voiceSearchOptimized && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-800">
                            Voice Search Ready
                          </span>
                          {faq.keywords && <p className="text-xs text-gray-500">Keywords: {faq.keywords}</p>}
                        </div>
                      )}
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

                    {/* Show voice search variations for debugging/development */}
                    {enableVoiceSearchIndicators &&
                      faq.voiceSearchVariations &&
                      faq.voiceSearchVariations.length > 0 && (
                        <div className="mt-4 rounded-md bg-gray-50 p-3">
                          <p className="mb-1 text-xs font-medium text-gray-500">Voice Search Variations:</p>
                          <ul className="space-y-1 text-xs text-gray-600">
                            {faq.voiceSearchVariations.map((variation: string, vIndex: number) => (
                              <li key={vIndex}>&ldquo;{variation}&rdquo;</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Voice Search Help Section */}
        {enableVoiceSearchIndicators && (
          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <div className="flex flex-wrap items-start gap-4">
              <IconMicrophone size={20} className="mt-1 text-blue-600" />
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700" style={{ color: '#1864ab' }}>
                  Voice Search Tip
                </p>
                <p className="text-sm text-gray-700" style={{ color: '#1971c2' }}>
                  You can ask voice assistants questions like &ldquo;How do I apply to ADMI?&rdquo; or &ldquo;What are
                  the requirements for film school in Kenya?&rdquo; to get instant answers.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
