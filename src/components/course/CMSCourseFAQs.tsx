import React, { useState, useEffect } from 'react'
import { Accordion, Container, Title, Text, Group, Loader, Alert } from '@/lib/tw-mantine'
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
      <Container size="lg" py="xl">
        <div className="text-center">
          <Loader size="lg" />
          <Text mt="md" c="dimmed">
            Loading course FAQs...
          </Text>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Unable to load FAQs" color="red" variant="light">
          {error}
        </Alert>
      </Container>
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
    <Container size="lg" py="xl">
      {/* FAQ Structured Data */}
      {filteredFAQs.length > 0 && (
        <script
          id={`cms-faq-structured-data-${courseSlug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <div className="mb-8 text-center">
        <Title order={2} size="h1" mb="md">
          Frequently Asked Questions
        </Title>
        <Text size="lg" c="dimmed" maw={600} mx="auto">
          Get answers to common questions about this course, admission requirements, career prospects, and student
          support services.
        </Text>
      </div>

      {/* FAQ Accordion */}
      <Accordion
        variant="separated"
        radius="md"
        chevron={<IconChevronDown size={16} />}
        styles={{
          chevron: {
            '&[data-rotate="true"]': {
              transform: 'rotate(180deg)'
            }
          },
          item: {
            border: '1px solid #e9ecef',
            '&[data-active="true"]': {
              borderColor: '#228be6'
            }
          },
          control: {
            padding: '1rem 1.5rem',
            '&:hover': {
              backgroundColor: '#f8f9fa'
            }
          },
          content: {
            padding: '1rem 1.5rem',
            paddingTop: 0
          }
        }}
      >
        {filteredFAQs.map((faq, index) => (
          <Accordion.Item key={index} value={`faq-${index}`}>
            <Accordion.Control>
              <Group justify="space-between" wrap="nowrap">
                <div>
                  <Text fw={500} size="md">
                    {faq.question}
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              {faq.isRichText ? (
                <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              ) : (
                <Text size="sm" lh={1.6}>
                  {faq.answer}
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  )
}
