'use client'

import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Group, Select, SimpleGrid, Stack, Text, TextInput, Textarea, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCheck, IconInfoCircle } from '@tabler/icons-react'
import { useSearchParams } from 'next/navigation'
import { programs } from '../paths/data'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  company: string
  program: string
  timeline: string
  goals: string
  questions: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
}

const timelineOptions = [
  { value: 'next-cohort', label: 'Next cohort (priority)' },
  { value: 'next-2-3-months', label: 'In 2–3 months' },
  { value: 'this-year', label: 'Later this year' },
  { value: 'researching', label: 'Just researching' }
]

const goalOptions = [
  { value: 'launch-portfolio', label: 'Build/upgrade portfolio' },
  { value: 'team-enablement', label: 'Enable my team with AI' },
  { value: 'automation', label: 'Automate reporting/ops' },
  { value: 'career-move', label: 'Prepare for a career move' },
  { value: 'other', label: 'Other goals' }
]

const roleOptions = [
  { value: 'creative', label: 'Creative / Content / Design' },
  { value: 'marketing', label: 'Marketing / Growth / CRM' },
  { value: 'ops', label: 'Business Ops / Analytics' },
  { value: 'leader', label: 'Founder / Executive / Lead' },
  { value: 'other', label: 'Other' }
]

export function AiEnquiryForm() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string>('')

  const palette = useMemo(
    () => ({
      blush: '#F7E8DE',
      sand: '#F2EDE8',
      border: 'rgba(0,0,0,0.05)'
    }),
    []
  )

  const form = useForm<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      company: '',
      program: '',
      timeline: '',
      goals: '',
      questions: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: ''
    },
    validate: {
      firstName: (value) => (value.trim().length < 2 ? 'First name is required' : null),
      lastName: (value) => (value.trim().length < 2 ? 'Last name is required' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Enter a valid email'),
      phone: (value) => (value.trim().length < 7 ? 'Phone number is required' : null),
      program: (value) => (!value ? 'Select a program' : null),
      timeline: (value) => (!value ? 'Select your timeline' : null),
      goals: (value) => (!value ? 'Select your main goal' : null),
      role: (value) => (!value ? 'Select your role' : null)
    }
  })

  const programOptions = useMemo(
    () =>
      programs.map((program) => ({
        value: program.slug,
        label: program.title
      })),
    []
  )

  useEffect(() => {
    if (!searchParams) return
    form.setFieldValue('utm_source', searchParams.get('utm_source') || 'direct')
    form.setFieldValue('utm_medium', searchParams.get('utm_medium') || 'none')
    form.setFieldValue('utm_campaign', searchParams.get('utm_campaign') || 'organic')
    form.setFieldValue('utm_term', searchParams.get('utm_term') || '')
    form.setFieldValue('utm_content', searchParams.get('utm_content') || '')
  }, [searchParams, form])

  const handleSubmit = async (values: FormValues) => {
    setStatus('submitting')
    setMessage('')

    const programTitle = programs.find((item) => item.slug === values.program)?.title || values.program

    try {
      const response = await fetch('/api/academy/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          programTitle
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(typeof data?.error === 'string' ? data.error : 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage('Thanks! We received your enquiry and will reach out within one business day.')
      form.reset()
    } catch (error) {
      console.error('AI enquiry submission error', error)
      setStatus('error')
      setMessage('Unable to submit right now. Please try again or email academy@admi.ac.ke.')
    }
  }

  return (
    <Card
      withBorder
      padding="xl"
      radius="lg"
      shadow="md"
      style={{
        background: `linear-gradient(180deg, ${palette.sand} 0%, #ffffff 100%)`,
        borderColor: palette.border
      }}
    >
      <Stack gap="md">
        <div>
          <Title order={3} style={{ marginBottom: 6 }}>
            AI Academy enquiry
          </Title>
          <Text c="dimmed">Tell us about your goals. We will recommend the right path and share next steps.</Text>
        </div>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="First name"
                placeholder="Jane"
                required
                radius="md"
                {...form.getInputProps('firstName')}
              />
              <TextInput label="Last name" placeholder="Doe" required radius="md" {...form.getInputProps('lastName')} />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="Work email"
                placeholder="you@company.com"
                required
                radius="md"
                {...form.getInputProps('email')}
              />
              <TextInput
                label="Phone (with country code)"
                placeholder="+254712345678"
                required
                radius="md"
                {...form.getInputProps('phone')}
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Select
                label="Your role"
                placeholder="Select one"
                required
                data={roleOptions}
                radius="md"
                {...form.getInputProps('role')}
              />
              <TextInput
                label="Company / Organization (optional)"
                placeholder="Company name"
                radius="md"
                {...form.getInputProps('company')}
              />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Select
                label="AI path"
                placeholder="Choose a program"
                data={programOptions}
                required
                searchable
                radius="md"
                {...form.getInputProps('program')}
              />
              <Select
                label="When do you want to start?"
                placeholder="Select timeline"
                required
                data={timelineOptions}
                radius="md"
                {...form.getInputProps('timeline')}
              />
            </SimpleGrid>

            <Select
              label="Main goal"
              placeholder="Select one"
              required
              data={goalOptions}
              radius="md"
              {...form.getInputProps('goals')}
            />

            <Textarea
              label="What should we know?"
              placeholder="Share your current workflow, blockers, or expectations."
              minRows={3}
              radius="md"
              {...form.getInputProps('questions')}
            />

            <Group justify="flex-start" gap="sm">
              <Button
                type="submit"
                radius="md"
                size="md"
                variant="gradient"
                gradient={{ from: '#BA2E36', to: '#F76335' }}
                loading={status === 'submitting'}
              >
                Submit enquiry
              </Button>
              <Group gap={6}>
                <IconInfoCircle size={16} color="var(--mantine-color-dimmed)" />
                <Text c="dimmed" size="sm">
                  We reply within one business day.
                </Text>
              </Group>
            </Group>
          </Stack>
        </form>

        {status === 'success' && (
          <Alert color="green" icon={<IconCheck size={16} />} variant="light">
            {message}
          </Alert>
        )}
        {status === 'error' && (
          <Alert color="red" icon={<IconInfoCircle size={16} />} variant="light">
            {message}
          </Alert>
        )}
      </Stack>
    </Card>
  )
}
