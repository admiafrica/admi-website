import React, { useState, useEffect } from 'react'
import { Accordion, Container, Title, Text, Group, Loader, Alert, Badge } from '@mantine/core'
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

      <Container size="lg" py="xl">
        <div className="mb-8 text-center">
          <Group justify="center" mb="md">
            <Title order={2} size="h1">
              Frequently Asked Questions
            </Title>
            {enableVoiceSearchIndicators && (
              <Badge variant="light" color="blue" leftSection={<IconMicrophone size={12} />} size="sm">
                Voice Search Optimized
              </Badge>
            )}
          </Group>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Get answers to common questions about {courseName || 'this course'}, admission requirements, career
            prospects, and student support services. These FAQs are optimized for voice search and AI assistants.
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
          {formattedFAQs.map((faq, index) => (
            <Accordion.Item key={index} value={`faq-${index}`}>
              <Accordion.Control>
                <Group justify="space-between" wrap="nowrap">
                  <div>
                    <Text fw={500} size="md">
                      {faq.question}
                    </Text>
                    {enableVoiceSearchIndicators && faq.voiceSearchOptimized && (
                      <Group gap="xs" mt="xs">
                        <Badge size="xs" variant="dot" color="green">
                          Voice Search Ready
                        </Badge>
                        {faq.keywords && (
                          <Text size="xs" c="dimmed">
                            Keywords: {faq.keywords}
                          </Text>
                        )}
                      </Group>
                    )}
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

                {/* Show voice search variations for debugging/development */}
                {enableVoiceSearchIndicators && faq.voiceSearchVariations && faq.voiceSearchVariations.length > 0 && (
                  <div className="mt-4 rounded-md bg-gray-50 p-3">
                    <Text size="xs" fw={500} c="dimmed" mb="xs">
                      Voice Search Variations:
                    </Text>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {faq.voiceSearchVariations.map((variation: string, vIndex: number) => (
                        <li key={vIndex}>&ldquo;{variation}&rdquo;</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Voice Search Help Section */}
        {enableVoiceSearchIndicators && (
          <div className="mt-8 rounded-lg bg-blue-50 p-4">
            <Group align="start" gap="md">
              <IconMicrophone size={20} className="mt-1 text-blue-600" />
              <div>
                <Text fw={500} size="sm" c="blue.7" mb="xs">
                  Voice Search Tip
                </Text>
                <Text size="sm" c="blue.6">
                  You can ask voice assistants questions like &ldquo;How do I apply to ADMI?&rdquo; or &ldquo;What are
                  the requirements for film school in Kenya?&rdquo; to get instant answers.
                </Text>
              </div>
            </Group>
          </div>
        )}
      </Container>
    </>
  )
}
