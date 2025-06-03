import React, { useState, useEffect } from 'react'
import { Accordion, Badge, Container, Title, Text, Group, Button, Loader, Alert } from '@mantine/core'
import { IconChevronDown, IconSchool, IconBriefcase, IconCertificate, IconAlertCircle } from '@tabler/icons-react'
import { ICourseFAQ, IFAQResponse } from '@/types'
import { GENERAL_DIPLOMA_FAQS } from '@/data/diploma-faqs'

interface CMSCourseFAQsProps {
  courseSlug: string
  fallbackFAQs?: any[]
  showGeneralFallback?: boolean
}

export function CMSCourseFAQs({ 
  courseSlug, 
  fallbackFAQs = [], 
  showGeneralFallback = true 
}: CMSCourseFAQsProps) {
  const [faqs, setFaqs] = useState<ICourseFAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/v3/course-faqs?slug=${courseSlug}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch FAQs: ${response.statusText}`)
        }
        
        const data: IFAQResponse = await response.json()
        setFaqs(data.items)
      } catch (err) {
        console.error('Error fetching course FAQs:', err)
        setError(err instanceof Error ? err.message : 'Failed to load FAQs')
      } finally {
        setLoading(false)
      }
    }

    if (courseSlug) {
      fetchFAQs()
    }
  }, [courseSlug])

  // Get fallback FAQs if no CMS FAQs are available
  const getFallbackFAQs = () => {
    if (fallbackFAQs.length > 0) {
      return fallbackFAQs
    }
    
    if (showGeneralFallback) {
      return GENERAL_DIPLOMA_FAQS.slice(0, 8) // Show first 8 general FAQs as fallback
    }
    
    return []
  }

  // Use CMS FAQs if available, otherwise use fallback
  const displayFAQs = faqs.length > 0 ? faqs : getFallbackFAQs()

  // Convert CMS FAQs to the format expected by the UI
  const formattedFAQs = displayFAQs.map((faq: any) => ({
    question: faq.fields?.question || faq.question,
    answer: faq.fields?.answer || faq.answer,
    category: faq.fields?.category || faq.category || 'General Information'
  }))

  // Filter FAQs by category
  const filteredFAQs = activeCategory === 'all' 
    ? formattedFAQs
    : formattedFAQs.filter(faq => faq.category === activeCategory)

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(formattedFAQs.map(faq => faq.category)))]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Career Prospects':
        return <IconBriefcase size={16} />
      case 'Accreditation & Recognition':
        return <IconCertificate size={16} />
      case 'Course Content & Structure':
        return <IconSchool size={16} />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Career Prospects':
        return 'green'
      case 'Accreditation & Recognition':
        return 'blue'
      case 'Course Content & Structure':
        return 'orange'
      case 'Fees & Payment':
        return 'red'
      case 'Admission Requirements':
        return 'purple'
      default:
        return 'gray'
    }
  }

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <div className="text-center">
          <Loader size="lg" />
          <Text mt="md" c="dimmed">Loading course FAQs...</Text>
        </div>
      </Container>
    )
  }

  if (error && displayFAQs.length === 0) {
    return (
      <Container size="lg" py="xl">
        <Alert 
          icon={<IconAlertCircle size={16} />} 
          title="Unable to load FAQs" 
          color="red"
          variant="light"
        >
          {error}. Please try refreshing the page or contact support if the problem persists.
        </Alert>
      </Container>
    )
  }

  if (displayFAQs.length === 0) {
    return null // Don't render anything if no FAQs are available
  }

  return (
    <Container size="lg" py="xl">
      <div className="text-center mb-8">
        <Title order={2} size="h1" mb="md">
          Frequently Asked Questions
        </Title>
        <Text size="lg" c="dimmed" maw={600} mx="auto">
          Get answers to common questions about this course, admission requirements, 
          career prospects, and student support services.
        </Text>
        {faqs.length === 0 && (
          <Text size="sm" c="dimmed" mt="xs">
            Showing general course information. Course-specific FAQs will be added soon.
          </Text>
        )}
      </div>

      {/* Category Filter */}
      {categories.length > 2 && (
        <Group justify="center" mb="xl" gap="xs">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'filled' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              leftSection={getCategoryIcon(category)}
              color={getCategoryColor(category)}
            >
              {category === 'all' ? 'All Questions' : category}
            </Button>
          ))}
        </Group>
      )}

      {/* FAQ Accordion */}
      <Accordion
        variant="separated"
        radius="md"
        chevron={<IconChevronDown size={16} />}
        styles={{
          chevron: {
            '&[data-rotate]': {
              transform: 'rotate(180deg)',
            },
          },
          item: {
            border: '1px solid #e9ecef',
            '&[data-active]': {
              borderColor: '#228be6',
            },
          },
          control: {
            padding: '1rem 1.5rem',
            '&:hover': {
              backgroundColor: '#f8f9fa',
            },
          },
          content: {
            padding: '1rem 1.5rem',
            paddingTop: 0,
          },
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
                  <Badge 
                    size="xs" 
                    variant="light" 
                    color={getCategoryColor(faq.category)}
                    mt={4}
                  >
                    {faq.category}
                  </Badge>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" lh={1.6}>
                {faq.answer}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Call to Action */}
      <div className="text-center mt-12 p-8 bg-gray-50 rounded-lg">
        <Title order={3} mb="md">
          Still Have Questions?
        </Title>
        <Text mb="lg" c="dimmed">
          Our admissions team is here to help you make the right choice for your career.
        </Text>
        <Group justify="center" gap="md">
          <Button size="lg" variant="filled">
            Contact Admissions
          </Button>
          <Button size="lg" variant="outline">
            Download Brochure
          </Button>
        </Group>
      </div>
    </Container>
  )
}
