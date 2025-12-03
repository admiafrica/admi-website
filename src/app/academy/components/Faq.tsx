'use client'

import { Accordion, Card, Container, Text, Title } from '@mantine/core'

const faqs = [
  {
    question: 'Who is the AI Academy for?',
    answer:
      'Creative professionals, marketers, analysts, founders, and operators who want to ship better work with AI—no coding background required.'
  },
  {
    question: 'What is the time commitment?',
    answer: 'Expect 5-8 hours weekly across live sessions, labs, and guided practice. Each path runs 8–12 weeks.'
  },
  {
    question: 'Will I get a certificate?',
    answer:
      'Yes. You earn a completion credential plus a portfolio-ready deliverable and career narrative you can share with hiring teams.'
  },
  {
    question: 'What kind of career support do you offer?',
    answer:
      'Interview drills, resume and portfolio refinement, salary negotiation coaching, and an AI-powered story builder to position your work.'
  }
]

export function Faq() {
  return (
    <Container
      size="lg"
      style={{
        paddingTop: '88px',
        paddingBottom: '88px'
      }}
    >
      <Title order={2} ta="center" style={{ marginBottom: 12 }}>
        Common questions
      </Title>
      <Text c="dimmed" ta="center" style={{ marginBottom: 32 }}>
        Straight answers about how the program runs and how we support you.
      </Text>
      <Card withBorder padding="lg" radius="md" shadow="sm">
        <Accordion variant="separated">
          {faqs.map((faq, index) => (
            <Accordion.Item key={faq.question} value={`faq-${index}`}>
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </Container>
  )
}
