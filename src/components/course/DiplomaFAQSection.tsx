import React, { useState } from 'react'
import { Accordion, Badge, Container, Title, Text, Group, Button } from '@mantine/core'
import { IconChevronDown, IconSchool, IconBriefcase, IconCertificate } from '@tabler/icons-react'
import { 
  GENERAL_DIPLOMA_FAQS, 
  FILM_TELEVISION_FAQS, 
  ANIMATION_VFX_FAQS, 
  GRAPHIC_DESIGN_FAQS, 
  AUDIO_PRODUCTION_FAQS, 
  PHOTOGRAPHY_FAQS 
} from '@/data/diploma-faqs'

interface DiplomaFAQSectionProps {
  programType?: 'film-television' | 'animation-vfx' | 'graphic-design' | 'audio-production' | 'photography'
  showGeneralFAQs?: boolean
  maxFAQs?: number
}

export function DiplomaFAQSection({ 
  programType, 
  showGeneralFAQs = true, 
  maxFAQs = 10 
}: DiplomaFAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Get program-specific FAQs
  const getProgramFAQs = () => {
    switch (programType) {
      case 'film-television':
        return FILM_TELEVISION_FAQS
      case 'animation-vfx':
        return ANIMATION_VFX_FAQS
      case 'graphic-design':
        return GRAPHIC_DESIGN_FAQS
      case 'audio-production':
        return AUDIO_PRODUCTION_FAQS
      case 'photography':
        return PHOTOGRAPHY_FAQS
      default:
        return []
    }
  }

  // Combine general and program-specific FAQs
  const allFAQs = [
    ...(showGeneralFAQs ? GENERAL_DIPLOMA_FAQS : []),
    ...getProgramFAQs()
  ]

  // Filter FAQs by category
  const filteredFAQs = activeCategory === 'all' 
    ? allFAQs.slice(0, maxFAQs)
    : allFAQs.filter(faq => faq.category === activeCategory).slice(0, maxFAQs)

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(allFAQs.map(faq => faq.category)))]

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

  return (
    <Container size="lg" py="xl">
      <div className="text-center mb-8">
        <Title order={2} size="h1" mb="md">
          Frequently Asked Questions
        </Title>
        <Text size="lg" c="dimmed" maw={600} mx="auto">
          Get answers to common questions about our diploma programs, admission requirements, 
          career prospects, and student support services.
        </Text>
      </div>

      {/* Category Filter */}
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

// Simplified FAQ component for course pages
export function CourseFAQs({ faqs, programType }: { faqs: any[], programType?: string }) {
  if (!faqs || faqs.length === 0) {
    // Show default diploma FAQs if no course-specific FAQs
    return (
      <DiplomaFAQSection 
        programType={programType as any}
        showGeneralFAQs={true}
        maxFAQs={8}
      />
    )
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">
        Course FAQs
      </Title>
      <Accordion variant="separated" radius="md">
        {faqs.map((faq, index) => (
          <Accordion.Item key={index} value={`course-faq-${index}`}>
            <Accordion.Control>
              <Text fw={500}>{faq.fields?.question || faq.question}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" lh={1.6}>
                {faq.fields?.answer || faq.answer}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  )
}
