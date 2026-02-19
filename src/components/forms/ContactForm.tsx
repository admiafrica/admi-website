import { useState, useEffect } from 'react'
import { useForm } from '@/lib/tw-mantine-form'
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
    <div className="w-full max-w-full overflow-hidden">
      {alert && (
        <div
          className={`mb-5 rounded-lg border p-4 ${alert.type === 'success' ? 'border-green-300 bg-green-50 text-green-900' : 'border-amber-300 bg-amber-50 text-amber-900'}`}
        >
          <p className="mb-1 font-semibold">{alert.type === 'success' ? 'Success' : 'Error'}</p>
          <p className="text-sm">{alert.message}</p>
        </div>
      )}

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className="max-w-full">
        {/* Name Fields */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="min-w-0 flex-1">
            <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
              First Name
              <IconAsterisk size={6} className="text-brand-red" />
            </label>
            <input
              className="form-input"
              placeholder="Enter your first name"
              key={form.key('firstName')}
              {...form.getInputProps('firstName')}
            />
          </div>
          <div className="min-w-0 flex-1">
            <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
              Last Name
              <IconAsterisk size={6} className="text-brand-red" />
            </label>
            <input
              className="form-input"
              placeholder="Enter your last name"
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
            Email Address
            <IconAsterisk size={6} className="text-brand-red" />
          </label>
          <input
            className="form-input"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
            Phone Number
            <span className="font-normal text-muted">(Optional)</span>
          </label>
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-lg border border-divider-light bg-[#f9fafb] px-3 sm:gap-3">
            <div className="shrink-0">
              <PhoneInput
                country={'ke'}
                value={countryCode}
                onChange={(value) => setCountryCode(value)}
                inputProps={{ readOnly: true }}
              />
            </div>
            <input
              className="h-11 min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              placeholder="Enter phone number"
              key={form.key('phone')}
              type="tel"
              {...form.getInputProps('phone')}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="mt-4">
          <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
            Subject
            <IconAsterisk size={6} className="text-brand-red" />
          </label>
          <select
            className="form-select"
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
        <div className="mt-4">
          <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-foreground">
            Message
            <IconAsterisk size={6} className="text-brand-red" />
          </label>
          <textarea
            className="form-textarea"
            placeholder="Tell us how we can help you..."
            rows={4}
            key={form.key('message')}
            {...form.getInputProps('message')}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  )
}
