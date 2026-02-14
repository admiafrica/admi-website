import { useRouter } from 'next/router'
import { useCallback, useEffect, useState, useMemo } from 'react'
import {
  Alert,
  Box,
  Group,
  Select,
  Text,
  TextInput,
  Radio,
  Stack,
  Stepper,
  Button as MantineButton
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Button, Paragraph, Title } from '../ui'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { IconAsterisk, IconArrowRight, IconArrowLeft } from '@tabler/icons-react'
import { getStoredUTMs, getCurrentPageInfo, trackWhatsAppClick } from '@/utils/utm-tracking'
import { ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

interface FormData {
  // Basic contact info
  email: string
  firstName: string
  lastName: string
  phone: string
  courseName: string

  // Pre-qualification fields
  studyTimeline: string
  programType: string
  investmentRange: string
  careerGoals: string
  experienceLevel: string

  // Tracking
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  leadScore?: number
}

export default function EnhancedEnquiryForm() {
  const router = useRouter()
  const [courses, setCourses] = useState<any[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [countryCode, setCountryCode] = useState('254')
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormData>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      courseName: '',
      studyTimeline: '',
      programType: '',
      investmentRange: '',
      careerGoals: '',
      experienceLevel: '',
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
      phone: (value) => {
        const cleanPhone = value.replace(/\D/g, '') // Remove non-digits
        if (cleanPhone.length < 9) return 'Phone number must be at least 9 digits'
        if (cleanPhone.length > 10) return 'Phone number cannot exceed 10 digits'
        return null
      },
      courseName: (value) => (!value ? 'Please select a course' : null),
      studyTimeline: (value) => (!value ? 'Please select your preferred timeline' : null),
      programType: (value) => (!value ? 'Please select a program type' : null),
      careerGoals: (value) => (!value ? 'Please select your career goals' : null),
      experienceLevel: (value) => (!value ? 'Please select your experience level' : null)
    }
  })

  const fetchCourses = useCallback(async () => {
    try {
      setCoursesLoading(true)
      const response = await fetch('/api/v3/courses')
      const data = await response.json()

      // Only set courses if data is an array
      if (Array.isArray(data)) {
        setCourses(data)
      } else {
        console.error('Courses API returned non-array data:', data)
        setCourses([])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      setCourses([])
    } finally {
      setCoursesLoading(false)
    }
  }, [])

  // Calculate lead score based on responses
  const calculateLeadScore = (values: FormData): number => {
    let score = 0

    // Timeline scoring (0-5 points)
    switch (values.studyTimeline) {
      case 'may-2026':
        score += 5
        break
      case 'september-2026':
        score += 4
        break
      case 'january-2027':
        score += 3
        break
      case 'researching':
        score += 1
        break
    }

    // Program type scoring (0-8 points) - PRIORITIZE DIPLOMA STUDENTS
    switch (values.programType) {
      case 'full-time-diploma':
        score += 8 // DOUBLED: Diploma students are high-value (100K × 4 terms + 48K internship = 450K lifetime)
        break
      case 'professional-certificate':
        score += 2 // REDUCED: Lower revenue potential (48K one-time)
        break
      case 'foundation-certificate':
        score += 2 // REDUCED: Lower revenue potential (48K one-time)
        break
      case 'weekend-parttime':
        score += 1
        break
    }

    // Investment range scoring (0-6 points) - PRIORITIZE DIPLOMA-LEVEL BUDGET
    switch (values.investmentRange) {
      case '500k-plus':
        score += 6 // INCREASED: Can afford full diploma program comfortably (450K)
        break
      case '300k-500k':
        score += 6 // INCREASED: Perfect diploma budget range (320-450K)
        break
      case '100k-300k':
        score += 2 // REDUCED: Certificate-level budget or needs financing
        break
      case 'under-100k':
        score += 1 // LOW VALUE: Likely certificate or short course
        break
      case 'need-discussion':
        score += 3 // NEUTRAL: Requires financial counseling
        break
    }

    // Career goals scoring (0-4 points)
    switch (values.careerGoals) {
      case 'career-change':
        score += 4
        break
      case 'start-business':
        score += 4
        break
      case 'skill-upgrade':
        score += 3
        break
      case 'university-prep':
        score += 2
        break
      case 'personal-interest':
        score += 1
        break
    }

    // Experience level scoring (0-3 points)
    switch (values.experienceLevel) {
      case 'professional-upgrade':
        score += 3
        break
      case 'intermediate':
        score += 2
        break
      case 'some-experience':
        score += 2
        break
      case 'complete-beginner':
        score += 1
        break
      case 'formal-training':
        score += 2
        break
    }

    return Math.min(score, 30) // Cap at 30 points (increased to accommodate diploma priority)
  }

  const handleSubmit = async (values: FormData) => {
    setAlert(null)
    setIsSubmitting(true)

    // Calculate lead score
    const leadScore = calculateLeadScore(values)

    // Get stored UTM parameters and current page info
    const storedUTMs = getStoredUTMs()
    const pageInfo = getCurrentPageInfo()

    // Format phone number - remove leading zeros and ensure proper format
    const cleanPhone = values.phone.replace(/\D/g, '') // Remove non-digits
    const formattedPhone = cleanPhone.replace(/^0+/, '') // Remove leading zeros

    const data = {
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: `${countryCode}${formattedPhone}`,
      courseName: values.courseName.trim(),
      leadScore,
      formType: 'enhanced-enquiry',
      submissionDate: new Date().toISOString(),
      // Last-touch attribution (what converted them)
      utm_source: storedUTMs.utm_source || values.utm_source || 'direct',
      utm_medium: storedUTMs.utm_medium || values.utm_medium || 'none',
      utm_campaign: storedUTMs.utm_campaign || values.utm_campaign || 'organic',
      utm_term: storedUTMs.utm_term || values.utm_term || '',
      utm_content: storedUTMs.utm_content || values.utm_content || '',
      // First-touch attribution (what originally brought them) - NEW!
      first_touch_source: storedUTMs.first_touch_source || '',
      first_touch_medium: storedUTMs.first_touch_medium || '',
      first_touch_campaign: storedUTMs.first_touch_campaign || '',
      first_touch_term: storedUTMs.first_touch_term || '',
      first_touch_content: storedUTMs.first_touch_content || '',
      first_touch_timestamp: storedUTMs.first_touch_timestamp || '',
      // GA Client ID for cross-session tracking - NEW!
      ga_client_id: storedUTMs.ga_client_id || '',
      // Include page tracking
      landing_page: storedUTMs.landing_page || pageInfo.current_page,
      referrer: storedUTMs.referrer || pageInfo.current_referrer,
      current_page: pageInfo.current_page
    }

    try {
      const response = await fetch('/api/v3/push-enhanced-lead', {
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
        }
        setAlert({ type: 'error', message: errorMessage })
        setIsSubmitting(false)
        return
      }

      // Check if this is an existing contact
      if (responseData.message === 'existing_contact') {
        setAlert({
          type: 'success',
          message:
            'Your record is already with us! For further assistance, please email us at admissions@admi.africa or contact us via WhatsApp at +254 711 486 581.'
        })
        setIsSubmitting(false)
        return
      }

      // Calculate conversion value based on lead score and program type
      // Diploma students have 7-9x lifetime value vs certificates (320-450K vs 48K)
      const conversionValue =
        leadScore >= 20 && values.programType === 'full-time-diploma'
          ? 200 // HOT DIPLOMA LEAD: High score + diploma = 450K lifetime value
          : leadScore >= 15 && values.programType === 'full-time-diploma'
            ? 100 // WARM DIPLOMA LEAD: Medium score + diploma = 450K lifetime value
            : leadScore >= 15 && values.programType !== 'full-time-diploma'
              ? 50 // High score but certificate only = 48K value
              : leadScore >= 10
                ? 30 // Warm lead (mixed signals)
                : leadScore >= 5
                  ? 10 // Cold lead (certificate likely)
                  : 1 // Unqualified

      // Store conversion data in sessionStorage for thank-you page
      const conversionData = {
        value: conversionValue,
        transaction_id: `lead_${Date.now()}_${leadScore}`,
        lead_score: leadScore,
        course_name: values.courseName,
        program_type: values.programType,
        study_timeline: values.studyTimeline,
        quality_tier:
          leadScore >= 20 && values.programType === 'full-time-diploma'
            ? 'hot_diploma'
            : leadScore >= 15 && values.programType === 'full-time-diploma'
              ? 'warm_diploma'
              : leadScore >= 15
                ? 'hot_certificate'
                : leadScore >= 10
                  ? 'warm'
                  : leadScore >= 5
                    ? 'cold'
                    : 'unqualified'
      }

      sessionStorage.setItem('admi_conversion_data', JSON.stringify(conversionData))
      console.log('💾 Stored conversion data for thank-you page:', conversionData)

      // Debug logging
      console.log('🎯 Lead Score:', leadScore)
      console.log('💰 Conversion Value:', conversionValue)
      console.log('📊 dataLayer available:', typeof window.dataLayer !== 'undefined')
      console.log('📊 gtag available:', typeof window.gtag !== 'undefined')

      // Send conversion event via dataLayer (GTM) or gtag (if available)
      if (typeof window !== 'undefined') {
        // Try GTM dataLayer first (preferred for this site)
        if (window.dataLayer) {
          console.log('✅ Sending via GTM dataLayer...')

          // Send Enhanced Conversion with user data for Google Ads
          window.dataLayer.push({
            event: 'conversion',
            send_to: 'AW-16679471170/F0GVCJjHwNQZEMKQspE-',
            value: conversionValue,
            currency: 'USD',
            transaction_id: storedUTMs.ga_client_id || `lead_${Date.now()}_${leadScore}`,
            // Enhanced Conversion user data (Google will hash these automatically)
            email: values.email.trim().toLowerCase(),
            phone_number: `+${countryCode}${formattedPhone}`,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            // Additional tracking data
            event_category: 'Lead Generation',
            event_label:
              leadScore >= 20 && values.programType === 'full-time-diploma'
                ? 'Hot Diploma Lead'
                : leadScore >= 15 && values.programType === 'full-time-diploma'
                  ? 'Warm Diploma Lead'
                  : leadScore >= 15
                    ? 'Hot Certificate Lead'
                    : leadScore >= 10
                      ? 'Warm Lead'
                      : leadScore >= 5
                        ? 'Cold Lead'
                        : 'Unqualified',
            lead_score: leadScore,
            program_type: values.programType,
            course_name: values.courseName,
            study_timeline: values.studyTimeline
          })

          // Also send generate_lead event for GA4 with user data
          window.dataLayer.push({
            event: 'generate_lead',
            value: conversionValue,
            currency: 'USD',
            // Enhanced Conversion user data
            user_data: {
              email_address: values.email.trim().toLowerCase(),
              phone_number: `+${countryCode}${formattedPhone}`,
              address: {
                first_name: values.firstName.trim(),
                last_name: values.lastName.trim()
              }
            },
            lead_score: leadScore,
            course: values.courseName,
            quality_tier: leadScore >= 15 ? 'hot' : leadScore >= 10 ? 'warm' : leadScore >= 5 ? 'cold' : 'unqualified'
          })

          console.log('📧 Enhanced Conversion data sent:', {
            email: values.email.trim().toLowerCase(),
            phone: `+${countryCode}${formattedPhone}`,
            name: `${values.firstName} ${values.lastName}`,
            transaction_id: storedUTMs.ga_client_id || `lead_${Date.now()}_${leadScore}`
          })
        }
        // Fallback to gtag if available
        else if (typeof window.gtag !== 'undefined') {
          console.log('✅ Sending via gtag...')

          // Send Enhanced Conversion with user data
          window.gtag('event', 'conversion', {
            send_to: 'AW-16679471170/F0GVCJjHwNQZEMKQspE-',
            value: conversionValue,
            currency: 'USD',
            transaction_id: storedUTMs.ga_client_id || `lead_${Date.now()}_${leadScore}`,
            // Enhanced Conversion user data (Google will hash these automatically)
            email: values.email.trim().toLowerCase(),
            phone_number: `+${countryCode}${formattedPhone}`,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            event_category: 'Lead Generation',
            event_label:
              leadScore >= 15
                ? 'Hot Lead'
                : leadScore >= 10
                  ? 'Warm Lead'
                  : leadScore >= 5
                    ? 'Cold Lead'
                    : 'Unqualified',
            lead_score: leadScore,
            course_name: values.courseName,
            study_timeline: values.studyTimeline
          })

          window.gtag('event', 'generate_lead', {
            value: conversionValue,
            currency: 'USD',
            // Enhanced Conversion user data
            email: values.email.trim().toLowerCase(),
            phone_number: `+${countryCode}${formattedPhone}`,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            lead_score: leadScore,
            course: values.courseName,
            quality_tier: leadScore >= 15 ? 'hot' : leadScore >= 10 ? 'warm' : leadScore >= 5 ? 'cold' : 'unqualified'
          })
        } else {
          console.warn('⚠️ Neither dataLayer nor gtag found - conversion tracking may not work')
        }
      }

      // Show success message
      setAlert({
        type: 'success',
        message: 'Enquiry submitted successfully! Redirecting...'
      })

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = 'https://admi.africa/enquiry-thank-you'
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      setAlert({ type: 'error', message: 'An error occurred. Please try again later.' })
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    const currentStepValid = validateCurrentStep()
    if (currentStepValid) {
      setActiveStep((current) => (current < 2 ? current + 1 : current))
    }
  }

  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current))

  const validateCurrentStep = (): boolean => {
    const values = form.getValues()

    switch (activeStep) {
      case 0: // Course and timeline
        return !!(values.courseName && values.studyTimeline)
      case 1: // Program details and goals
        return !!(values.programType && values.careerGoals && values.experienceLevel)
      case 2: // Contact info
        return !!(values.firstName && values.lastName && values.email && values.phone)
      default:
        return true
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses]) // Include fetchCourses dependency

  useEffect(() => {
    if (!router.isReady) return
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
    if (!foundInStorage) {
      utmKeys.forEach((key) => {
        const val = router.query[key]
        if (typeof val === 'string' && typeof window !== 'undefined') {
          sessionStorage.setItem(key, val)
          utmFromStorage[key] = val
        }
      })
    }
    // Prefill with fallback defaults
    form.setFieldValue('utm_source', utmFromStorage['utm_source'] || 'direct')
    form.setFieldValue('utm_medium', utmFromStorage['utm_medium'] || 'none')
    form.setFieldValue('utm_campaign', utmFromStorage['utm_campaign'] || 'organic')
    form.setFieldValue('utm_term', utmFromStorage['utm_term'] || '')
    form.setFieldValue('utm_content', utmFromStorage['utm_content'] || '')
  }, [router.isReady, router.query, form])

  // Memoize course options to prevent re-renders
  const courseOptions = useMemo(() => {
    return (
      courses?.map((course) => ({
        value: course.fields?.name || course.name || 'Unknown Course',
        label: course.fields?.name || course.name || 'Unknown Course'
      })) || []
    )
  }, [courses])

  return (
    <div className="mx-auto w-full max-w-full overflow-hidden rounded-lg bg-white p-3 sm:max-w-4xl sm:p-6 lg:p-8">
      <div className="mb-4 font-nexa sm:mb-6 lg:mb-8">
        <Title label="Enquiry Form" color="black" className="text-lg sm:text-xl lg:text-2xl" />
        <Text size="sm" c="dimmed" mt={2} className="text-xs sm:text-sm lg:text-base">
          Help us understand your needs better with a few quick questions
        </Text>
      </div>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {/* Hidden UTM fields */}
        <input {...form.getInputProps('utm_source')} type="hidden" />
        <input {...form.getInputProps('utm_medium')} type="hidden" />
        <input {...form.getInputProps('utm_campaign')} type="hidden" />
        <input {...form.getInputProps('utm_term')} type="hidden" />
        <input {...form.getInputProps('utm_content')} type="hidden" />

      <Stepper
        active={activeStep}
        onStepClick={setActiveStep}
        className="mb-4 overflow-x-auto sm:mb-6 lg:mb-8"
        orientation="horizontal"
        size="xs"
        allowNextStepsSelect={false}
        styles={{
          step: {
            minWidth: 'auto',
            padding: '4px 8px'
          },
          stepLabel: {
            fontSize: '12px',
            fontWeight: 500
          },
          stepDescription: {
            fontSize: '10px',
            display: 'none'
          }
        }}
      >
        <Stepper.Step label="Course Interest" description="What you want to study">
          <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4 lg:mt-6">
            <Select
              label={
                <div className="flex items-center">
                  <Title label="Select Course" color="black" className="text-sm sm:text-base lg:text-lg" />
                  <IconAsterisk size={6} className="ml-1 mt-0.5 text-admiRed sm:mt-1" />
                </div>
              }
              placeholder={coursesLoading ? 'Loading courses...' : "Select a course you're interested in"}
              searchable
              disabled={coursesLoading}
              data={courseOptions}
              size="sm"
              className="w-full"
              styles={{
                input: {
                  fontSize: '14px',
                  padding: '8px 12px'
                }
              }}
              {...form.getInputProps('courseName')}
            />

            <div>
              <Title
                label="When are you planning to start?"
                color="black"
                className="mb-2 text-sm sm:mb-3 sm:text-base lg:text-lg"
              />
              <Radio.Group {...form.getInputProps('studyTimeline')}>
                <Stack gap="xs">
                  <Radio
                    value="may-2026"
                    label="May 2026 intake (next intake)"
                    size="sm"
                    styles={{
                      label: { fontSize: '13px' },
                      radio: { width: '16px', height: '16px' }
                    }}
                  />
                  <Radio
                    value="september-2026"
                    label="September 2026 intake"
                    size="sm"
                    styles={{
                      label: { fontSize: '13px' },
                      radio: { width: '16px', height: '16px' }
                    }}
                  />
                  <Radio
                    value="january-2027"
                    label="January 2027 intake"
                    size="sm"
                    styles={{
                      label: { fontSize: '13px' },
                      radio: { width: '16px', height: '16px' }
                    }}
                  />
                  <Radio
                    value="researching"
                    label="Just researching for now"
                    size="sm"
                    styles={{
                      label: { fontSize: '13px' },
                      radio: { width: '16px', height: '16px' }
                    }}
                  />
                </Stack>
              </Radio.Group>
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Program Details" description="Type and goals">
          <div className="mt-6 space-y-4">
            <div>
              <Title label="What type of program are you looking for?" color="black" size="1.4em" className="mb-3" />
              <Radio.Group {...form.getInputProps('programType')}>
                <Stack gap="xs">
                  <Radio value="full-time-diploma" label="Full-time Diploma (2 years)" />
                  <Radio value="professional-certificate" label="Professional Certificate (3-6 months)" />
                  <Radio value="foundation-certificate" label="Foundation Certificate (3-6 months)" />
                  <Radio value="weekend-parttime" label="Weekend/Part-time classes" />
                </Stack>
              </Radio.Group>
            </div>

            <div>
              <Title label="What's your main goal?" color="black" size="1.4em" className="mb-3" />
              <Radio.Group {...form.getInputProps('careerGoals')}>
                <Stack gap="xs">
                  <Radio value="career-change" label="Career change to creative industry" />
                  <Radio value="skill-upgrade" label="Upgrade skills in current role" />
                  <Radio value="start-business" label="Start my own creative business" />
                  <Radio value="university-prep" label="Prepare for university studies" />
                  <Radio value="personal-interest" label="Personal interest/hobby" />
                </Stack>
              </Radio.Group>
            </div>

            <div>
              <Title label="Your current experience level?" color="black" size="1.4em" className="mb-3" />
              <Radio.Group {...form.getInputProps('experienceLevel')}>
                <Stack gap="xs">
                  <Radio value="complete-beginner" label="Complete beginner" />
                  <Radio value="some-experience" label="Some basic experience" />
                  <Radio value="intermediate" label="Intermediate level" />
                  <Radio value="professional-upgrade" label="Professional looking to upgrade" />
                  <Radio value="formal-training" label="Have formal training elsewhere" />
                </Stack>
              </Radio.Group>
            </div>

            <div>
              <Title label="Expected investment range? (Optional)" color="black" size="1.4em" className="mb-3" />
              <Radio.Group {...form.getInputProps('investmentRange')}>
                <Stack gap="xs">
                  <Radio value="under-100k" label="Under 100,000 KES" />
                  <Radio value="100k-300k" label="100,000 - 300,000 KES" />
                  <Radio value="300k-500k" label="300,000 - 500,000 KES" />
                  <Radio value="500k-plus" label="500,000+ KES" />
                  <Radio value="need-discussion" label="Need to discuss payment options" />
                </Stack>
              </Radio.Group>
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Contact Info" description="How to reach you">
          <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4 lg:mt-6">
            <TextInput
              label={
                <div className="flex items-center">
                  <Title label="First Name" color="black" className="text-sm sm:text-base" />
                  <IconAsterisk size={6} className="ml-1 mt-0.5 text-admiRed" />
                </div>
              }
              placeholder="Enter first name"
              size="sm"
              styles={{
                input: {
                  fontSize: '14px',
                  height: '36px'
                }
              }}
              {...form.getInputProps('firstName')}
            />

            <TextInput
              label={
                <div className="flex items-center">
                  <Title label="Last Name" color="black" className="text-sm sm:text-base" />
                  <IconAsterisk size={6} className="ml-1 mt-0.5 text-admiRed" />
                </div>
              }
              placeholder="Enter last name"
              size="sm"
              styles={{
                input: {
                  fontSize: '14px',
                  height: '36px'
                }
              }}
              {...form.getInputProps('lastName')}
            />

            <TextInput
              label={
                <div className="flex items-center">
                  <Title label="Email Address" color="black" className="text-sm sm:text-base" />
                  <IconAsterisk size={6} className="ml-1 mt-0.5 text-admiRed" />
                </div>
              }
              placeholder="your@email.com"
              size="sm"
              styles={{
                input: {
                  fontSize: '14px',
                  height: '36px'
                }
              }}
              {...form.getInputProps('email')}
            />

            <Box className="border-1 rounded-lg border-solid border-gray-200 px-2 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center">
                <Title label="Phone Number" color="black" className="text-sm sm:text-base" />
                <IconAsterisk size={6} className="ml-1 mt-0.5 text-admiRed" />
              </div>
              <Text size="sm" color="gray" className="pb-1 text-xs sm:text-sm">
                Kenya mobile number (without country code)
              </Text>
              <Box className="flex flex-row gap-2">
                <div className="w-24 sm:w-28">
                  <PhoneInput
                    country={'ke'}
                    value={countryCode}
                    onChange={(value) => setCountryCode(value)}
                    containerStyle={{
                      border: 'none',
                      width: '100%'
                    }}
                    inputStyle={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '12px',
                      height: '32px',
                      width: '100%',
                      paddingLeft: '35px'
                    }}
                    buttonStyle={{
                      border: '1px solid #ced4da',
                      borderRadius: '4px 0 0 4px',
                      backgroundColor: '#f8f9fa',
                      width: '30px',
                      height: '32px'
                    }}
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <TextInput
                  className="flex-1"
                  placeholder="712 345 678"
                  size="sm"
                  styles={{
                    input: {
                      fontSize: '14px',
                      height: '32px'
                    }
                  }}
                  {...form.getInputProps('phone')}
                  onChange={(e) => {
                    // Format phone number as user types (add spaces for readability)
                    let value = e.target.value.replace(/\D/g, '') // Remove non-digits
                    if (value.length > 3 && value.length <= 6) {
                      value = value.replace(/(\d{3})(\d+)/, '$1 $2')
                    } else if (value.length > 6) {
                      value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3')
                    }
                    form.setFieldValue('phone', value)
                  }}
                />
              </Box>
            </Box>
          </div>
        </Stepper.Step>
      </Stepper>

        <Group justify="space-between" mt="xl" className="flex-col gap-3 sm:flex-row sm:gap-0">
          {activeStep > 0 && (
            <MantineButton
              variant="default"
              onClick={prevStep}
              leftSection={<IconArrowLeft size={14} />}
              size="md"
              className="order-2 w-full sm:order-1 sm:w-auto"
            >
              Back
            </MantineButton>
          )}

          {activeStep < 2 ? (
            <MantineButton
              onClick={nextStep}
              rightSection={<IconArrowRight size={14} />}
              disabled={!validateCurrentStep()}
              size="md"
              className="order-1 w-full sm:order-2 sm:ml-auto sm:w-auto"
            >
              Next
            </MantineButton>
          ) : (
            <div className="order-1 w-full sm:order-2 sm:ml-auto sm:w-auto">
              <Button
                size="lg"
                backgroundColor="admiRed"
                label={isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          )}
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
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'enhanced_enquiry_form')}
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
