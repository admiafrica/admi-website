import { useState, useEffect } from 'react'
import { useForm } from '@/lib/tw-mantine-form'
import { Button, Paragraph, Title } from '../ui'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { IconAsterisk } from '@tabler/icons-react'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [countryCode, setCountryCode] = useState('254')
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validate: {
      firstName: (value) => (value.trim().length < 2 ? 'First name must be at least 2 characters' : null),
      lastName: (value) => (value.trim().length < 2 ? 'Last name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      subject: (value) => (value.trim().length < 3 ? 'Subject must be at least 3 characters' : null),
      message: (value) => (value.trim().length < 10 ? 'Message must be at least 10 characters' : null)
    }
  })

  const subjectOptions = [
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Course Information', label: 'Course Information' },
    { value: 'Admissions', label: 'Admissions' },
    { value: 'Technical Support', label: 'Technical Support' },
    { value: 'Partnership Opportunities', label: 'Partnership Opportunities' },
    { value: 'Media Inquiries', label: 'Media Inquiries' },
    { value: 'Alumni Services', label: 'Alumni Services' },
    { value: 'Other', label: 'Other' }
  ]

  // UTM persistence: on mount, store from URL if not in sessionStorage, always prefill from sessionStorage
  useEffect(() => {
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    let foundInStorage = false
    const utmFromStorage: Record<string, string> = {}
    if (typeof window !== 'undefined') {
      utmKeys.forEach((key) => {
        const val = sessionStorage.getItem(key)
        if (val) {
          utmFromStorage[key] = val
          foundInStorage = true
        }
      })
      if (!foundInStorage) {
        const urlParams = new URLSearchParams(window.location.search)
        utmKeys.forEach((key) => {
          const val = urlParams.get(key)
          if (val) {
            sessionStorage.setItem(key, val)
            utmFromStorage[key] = val
          }
        })
      }
    }
    // Prefill form fields if you want to display them (not needed for hidden fields)
  }, [])

  const handleSubmit = async (values: ContactFormData) => {
    setAlert(null)
    setIsSubmitting(true)

    // Format phone number
    const formattedPhone = values.phone.replace(/^0+/, '')
    const fullPhone = values.phone ? `${countryCode}${formattedPhone}` : ''

    // Get UTM parameters from sessionStorage (preferred) or URL
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    const utmData: Record<string, string> = {}
    if (typeof window !== 'undefined') {
      utmKeys.forEach((key) => {
        const val = sessionStorage.getItem(key)
        if (val) utmData[key] = val
      })
      // Fallback to URL if not in storage
      if (Object.keys(utmData).length === 0) {
        const urlParams = new URLSearchParams(window.location.search)
        utmKeys.forEach((key) => {
          const val = urlParams.get(key)
          if (val) utmData[key] = val
        })
      }
    }

    const data = {
      ...values,
      phone: fullPhone,
      ...utmData
    }

    try {
      const response = await fetch('/api/v3/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (!response.ok) {
        let errorMessage = 'Failed to submit contact form.'
        try {
          errorMessage = typeof responseData.error === 'string' ? responseData.error : errorMessage
        } catch (e) {
          console.error('Error parsing response:', e)
          // If we can't parse the error response, use default message
        }
        setAlert({ type: 'error', message: errorMessage })
        return
      }

      // Show success message
      setAlert({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you within 24 hours.'
      })

      // Reset form
      form.reset()
      setCountryCode('254')

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Contact form submission error:', error)
      setAlert({ type: 'error', message: 'An error occurred. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full rounded-lg bg-white p-4 sm:p-8">
      <div className="mb-6 font-nexa">
        <Title label="Contact Us" color="black" size="32px" />
        <Paragraph className="mt-2 text-gray-600">Get in touch with us. We&apos;d love to hear from you!</Paragraph>
      </div>

      {alert && (
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900"
          style={{ marginBottom: 20, borderColor: alert.type === 'success' ? '#339900' : '#ff9966' }}
        >
          <div className="mb-1 font-semibold">
            <Paragraph fontWeight={900}>{alert.type === 'success' ? 'Success' : 'Error'}</Paragraph>
          </div>
          <Paragraph>{alert.message}</Paragraph>
        </div>
      )}

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {/* Name Fields */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="flex pl-2">
              <Title label="First Name" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
            <input
              className="h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
              placeholder="Enter your first name"
              key={form.key('firstName')}
              {...form.getInputProps('firstName')}
            />
          </div>
          <div className="flex-1">
            <div className="flex pl-2">
              <Title label="Last Name" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
            <input
              className="h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
              placeholder="Enter your last name"
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div className="flex pl-2">
            <Title label="Email Address" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <input
            className="h-11 w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
        </div>

        {/* Phone */}
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div className="flex pl-2">
            <Title label="Phone Number" color="black" size="1.4em" />
            <p className="ml-2 text-sm text-gray-500 text-gray-700">(Optional)</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2">
            <PhoneInput
              country={'ke'}
              value={countryCode}
              onChange={(value) => setCountryCode(value)}
              inputProps={{ readOnly: true }}
            />
            <input
              className="h-11 w-full grow rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
              placeholder="Enter phone number"
              key={form.key('phone')}
              type="tel"
              {...form.getInputProps('phone')}
            />
          </div>
        </div>

        {/* Subject */}
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div className="flex pl-2">
            <Title label="Subject" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <select
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-gray-900"
            key={form.key('subject')}
            {...form.getInputProps('subject')}
            onChange={(e) => form.getInputProps('subject').onChange(e.target.value)}
          >
            <option value="">Select a subject</option>
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div style={{ marginTop: 16, marginBottom: 16 }}>
          <div className="flex pl-2">
            <Title label="Message" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-3 py-2"
            placeholder="Tell us how we can help you..."
            rows={4}
            key={form.key('message')}
            {...form.getInputProps('message')}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end" style={{ marginTop: '2em' }}>
          <div className="w-full sm:w-[200px]">
            <Button
              size="lg"
              backgroundColor="admiRed"
              label={isSubmitting ? 'Sending...' : 'Send Message'}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
