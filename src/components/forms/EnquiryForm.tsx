import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Alert, Box, Group, Select, Text, TextInput } from '@/lib/tw-mantine'
import { useForm } from '@/lib/tw-mantine-form'
import { Button, Paragraph, Title } from '../ui'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { IconAsterisk } from '@tabler/icons-react'
import { getStoredUTMs, getCurrentPageInfo, trackWhatsAppClick } from '@/utils/utm-tracking'
import { ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

export default function EnquiryForm() {
  const router = useRouter()
  const [courses, setCourses] = useState<any[]>([])
  const [countryCode, setCountryCode] = useState('254') // State for the phone number
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      courseName: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      firstName: (value) => (value.trim().length < 2 ? 'First name must be at least 2 characters' : null),
      lastName: (value) => (value.trim().length < 2 ? 'Last name must be at least 2 characters' : null),
      phone: (value) => (value.trim().length < 8 ? 'Phone number must be at least 8 digits' : null),
      courseName: (value) => (!value ? 'Please select a course' : null)
    }
  })

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch('/api/v3/courses')
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.log('Error fetching courses:', error)
    }
  }, [])

  const handleSubmit = async (values: any) => {
    setAlert(null) // Clear previous alerts

    // Validate required fields
    if (
      !values.firstName?.trim() ||
      !values.lastName?.trim() ||
      !values.email?.trim() ||
      !values.phone?.trim() ||
      !values.courseName?.trim()
    ) {
      setAlert({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    // Get stored UTM parameters and current page info
    const storedUTMs = getStoredUTMs()
    const pageInfo = getCurrentPageInfo()

    // always remove leading zero from phone incase included
    const formattedPhone = values.phone.replace(/^0+/, '')
    const data = {
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: `${countryCode}${formattedPhone}`,
      courseName: values.courseName.trim(),
      // Include stored UTM parameters (prioritize stored over form values)
      utm_source: storedUTMs.utm_source || values.utm_source || 'direct',
      utm_medium: storedUTMs.utm_medium || values.utm_medium || 'none',
      utm_campaign: storedUTMs.utm_campaign || values.utm_campaign || 'organic',
      utm_term: storedUTMs.utm_term || values.utm_term || '',
      utm_content: storedUTMs.utm_content || values.utm_content || '',
      // Include page tracking
      landing_page: storedUTMs.landing_page || pageInfo.current_page,
      referrer: storedUTMs.referrer || pageInfo.current_referrer,
      current_page: pageInfo.current_page
    }

    try {
      const response = await fetch('/api/v3/push-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (!response.ok) {
        let errorMessage = 'Failed to submit enquiry.'
        try {
          errorMessage = typeof responseData.error === 'string' ? responseData.error : errorMessage
        } catch (e) {
          console.error('Error parsing response:', e)
          // If we can't parse the error response, use default message
        }
        setAlert({ type: 'error', message: errorMessage })
        return
      }

      // Check if this is an existing contact
      if (responseData.message === 'existing_contact') {
        setAlert({
          type: 'success',
          message:
            'Your record is already with us! For further assistance, please email us at admissions@admi.africa or contact us via WhatsApp at +254 711 486 581.'
        })
        return
      }

      // Show success message before redirect for new contacts
      setAlert({ type: 'success', message: 'Enquiry submitted successfully! Redirecting...' })

      // Redirect after a short delay to show success message
      setTimeout(() => {
        window.location.href = 'https://admi.africa/enquiry-thank-you'
      }, 1500)
    } catch (error) {
      console.error('Form submission error:', error)
      setAlert({ type: 'error', message: 'An error occurred. Please try again later.' })
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  useEffect(() => {
    if (!router.isReady) return
    // Helper to get UTM from URL or sessionStorage
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    const utmFromStorage: Record<string, string> = {}
    let foundInStorage = false
    if (typeof window !== 'undefined') {
      utmKeys.forEach((key) => {
        const val = sessionStorage.getItem(key)
        if (val) {
          utmFromStorage[key] = val
          foundInStorage = true
        }
      })
    }
    // If not in storage, get from URL and store
    if (!foundInStorage) {
      utmKeys.forEach((key) => {
        const val = router.query[key]
        if (typeof val === 'string' && typeof window !== 'undefined') {
          sessionStorage.setItem(key, val)
          utmFromStorage[key] = val
        }
      })
    }
    // Prefill form fields from storage or URL
    utmKeys.forEach((key) => {
      form.setFieldValue(key, utmFromStorage[key] || '')
    })
  }, [router.isReady, router.query, form])

  return (
    <div className="w-full rounded-lg bg-white p-4 sm:p-8">
      <div className="font-nexa">
        <Title label="Enquiry Form" color="black" />
      </div>
      <div className="mb-8 font-proxima">
        <Text fw={600}>Kindly provide the details below</Text>
      </div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {/* Hidden UTM fields */}
        <input {...form.getInputProps('utm_source')} type="hidden" />
        <input {...form.getInputProps('utm_medium')} type="hidden" />
        <input {...form.getInputProps('utm_campaign')} type="hidden" />
        <input {...form.getInputProps('utm_term')} type="hidden" />
        <input {...form.getInputProps('utm_content')} type="hidden" />

        <Select
          label={
            <div className="flex pl-2">
              <Title label="Select Course" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          placeholder="Select a course you're interested in"
          searchable
          nothingFoundMessage="No options"
          data={courses.map((course) => course.fields.name)}
          {...form.getInputProps('courseName')}
        />
        <div className="my-4 font-proxima">
          <Text size="1.1em">
            Curious about our courses and the benefits they offer? Explore the details and discover what you could gain
            by visiting our{' '}
            <span>
              <Link href="/courses">
                <span className="font-bold text-admiShamrok brightness-90">Courses page</span>
              </Link>
            </span>
          </Text>
        </div>
        <TextInput
          my={16}
          px={8}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          label={
            <div className="flex pl-2">
              <Title label="Email Address" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <TextInput
          my={16}
          px={8}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          label={
            <div className="flex pl-2">
              <Title label="First Name" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          placeholder="Enter first name"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          my={16}
          px={8}
          className="border-1 rounded-lg border-solid border-gray-200 py-2"
          label={
            <div className="flex pl-2">
              <Title label="Last Name" color="black" size="1.4em" />
              <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
            </div>
          }
          placeholder="Enter last name"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <Box my={16} className="border-1 rounded-lg border-solid border-gray-200 px-2 py-2">
          <div className="flex pl-2">
            <Title label="Phone Number" color="black" size="1.4em" />
            <IconAsterisk size={8} className="mt-1.5 text-admiRed" />
          </div>
          <Box className="flex">
            <PhoneInput
              country={'ke'}
              value={countryCode}
              onChange={(value) => {
                setCountryCode(value)
              }}
              containerStyle={{
                border: 'none',
                width: 100
              }}
              inputStyle={{
                border: 'none'
              }}
              buttonStyle={{
                border: 'none',
                marginLeft: '8px'
              }}
              dropdownStyle={{
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              inputProps={{ readOnly: true }}
            />
            <TextInput
              className="grow"
              placeholder="Enter phone"
              key={form.key('phone')}
              type="number"
              {...form.getInputProps('phone')}
            />
          </Box>
        </Box>
        <Group justify="flex-end" mt="2em" className="w-full">
          <Button size="lg" backgroundColor="admiRed" label="Submit" type="submit" />
        </Group>
      </form>
      {alert && (
        <Alert
          color={alert.type === 'success' ? '#339900' : '#ff9966'}
          title={<Paragraph fontWeight={900}>{alert.type === 'success' ? 'Success' : 'Error'}</Paragraph>}
          my={8}
        >
          <Paragraph className="text-sm leading-relaxed">{alert.message}</Paragraph>
          {alert.message.includes('already with us') && (
            <div className="mt-3 space-y-2">
              <div>
                <a
                  href="mailto:admissions@admi.africa"
                  className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Email Us
                </a>
              </div>
              <div>
                <a
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'enquiry_form')}
                  className="inline-block rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          )}
        </Alert>
      )}
    </div>
  )
}
