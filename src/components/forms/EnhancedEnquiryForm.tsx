import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { IconAsterisk, IconArrowRight, IconArrowLeft, IconLock, IconCheck } from '@tabler/icons-react'
import { getStoredUTMs, getCurrentPageInfo, trackWhatsAppClick } from '@/utils/utm-tracking'
import { ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { trackMetaEvent } from '@/utils/track-event'

interface FormData {
  email: string
  firstName: string
  lastName: string
  phone: string
  courseName: string
  studyTimeline: string
  programType: string
  investmentRange: string
  careerGoals: string
  experienceLevel: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  leadScore?: number
}

type UTMKey = 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content'

const INITIAL_VALUES: FormData = {
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
}

const STEP_LABELS = ['Course Interest', 'Program Details', 'Contact Info']

const INPUT_CLASS =
  'box-border h-[44px] w-full min-w-0 max-w-full rounded-[8px] border border-[#BCC5D0] bg-[#F7F8FA] px-3 text-[14px] text-[#1F2937] placeholder:text-[#6F7E90] outline-none'

const RADIO_CLASS = 'h-4 w-4 border-[#8896A8] text-brand-red focus:ring-brand-red'

export default function EnhancedEnquiryForm() {
  const router = useRouter()
  const [courses, setCourses] = useState<any[]>([])
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [countryCode, setCountryCode] = useState('254')
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState<FormData>(INITIAL_VALUES)

  const setField = (field: keyof FormData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const fetchCourses = useCallback(async () => {
    try {
      setCoursesLoading(true)
      const response = await fetch('/api/v3/courses')
      const data = await response.json()
      setCourses(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching courses:', error)
      setCourses([])
    } finally {
      setCoursesLoading(false)
    }
  }, [])

  const calculateLeadScore = (data: FormData): number => {
    let score = 0

    switch (data.studyTimeline) {
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

    switch (data.programType) {
      case 'full-time-diploma':
        score += 8
        break
      case 'professional-certificate':
      case 'foundation-certificate':
        score += 2
        break
      case 'weekend-parttime':
        score += 1
        break
    }

    switch (data.investmentRange) {
      case '500k-plus':
      case '300k-500k':
        score += 6
        break
      case '100k-300k':
        score += 2
        break
      case 'under-100k':
        score += 1
        break
      case 'need-discussion':
        score += 3
        break
    }

    switch (data.careerGoals) {
      case 'career-change':
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

    switch (data.experienceLevel) {
      case 'professional-upgrade':
        score += 3
        break
      case 'intermediate':
      case 'some-experience':
      case 'formal-training':
        score += 2
        break
      case 'complete-beginner':
        score += 1
        break
    }

    return Math.min(score, 30)
  }

  const isEmailValid = (email: string) => /^\S+@\S+$/.test(email)

  const isStepComplete = (step: number): boolean => {
    if (step === 0) return !!(values.courseName && values.studyTimeline)
    if (step === 1) return !!(values.programType && values.careerGoals && values.experienceLevel)
    return false
  }

  const canAccessStep = (step: number): boolean => {
    if (step === 0) return true
    if (step === 1) return isStepComplete(0)
    if (step === 2) return isStepComplete(0) && isStepComplete(1)
    return false
  }

  const validateCurrentStep = (): boolean => {
    if (activeStep === 0) return !!(values.courseName && values.studyTimeline)
    if (activeStep === 1) return !!(values.programType && values.careerGoals && values.experienceLevel)
    if (activeStep === 2) {
      const cleanPhone = values.phone.replace(/\D/g, '')
      return (
        values.firstName.trim().length >= 2 &&
        values.lastName.trim().length >= 2 &&
        isEmailValid(values.email) &&
        cleanPhone.length >= 9 &&
        cleanPhone.length <= 10
      )
    }
    return true
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setActiveStep((current) => (current < 2 ? current + 1 : current))
    }
  }

  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCurrentStep()) return

    setAlert(null)
    setIsSubmitting(true)

    const leadScore = calculateLeadScore(values)
    const storedUTMs = getStoredUTMs()
    const pageInfo = getCurrentPageInfo()

    const cleanPhone = values.phone.replace(/\D/g, '')
    const formattedPhone = cleanPhone.replace(/^0+/, '')

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
      utm_source: storedUTMs.utm_source || values.utm_source || 'direct',
      utm_medium: storedUTMs.utm_medium || values.utm_medium || 'none',
      utm_campaign: storedUTMs.utm_campaign || values.utm_campaign || 'organic',
      utm_term: storedUTMs.utm_term || values.utm_term || '',
      utm_content: storedUTMs.utm_content || values.utm_content || '',
      first_touch_source: storedUTMs.first_touch_source || '',
      first_touch_medium: storedUTMs.first_touch_medium || '',
      first_touch_campaign: storedUTMs.first_touch_campaign || '',
      first_touch_term: storedUTMs.first_touch_term || '',
      first_touch_content: storedUTMs.first_touch_content || '',
      first_touch_timestamp: storedUTMs.first_touch_timestamp || '',
      ga_client_id: storedUTMs.ga_client_id || '',
      landing_page: storedUTMs.landing_page || pageInfo.current_page,
      referrer: storedUTMs.referrer || pageInfo.current_referrer,
      current_page: pageInfo.current_page
    }

    try {
      const response = await fetch('/api/v3/push-enhanced-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (!response.ok) {
        setAlert({
          type: 'error',
          message: typeof responseData.error === 'string' ? responseData.error : 'Failed to submit enquiry.'
        })
        setIsSubmitting(false)
        return
      }

      if (responseData.message === 'existing_contact') {
        setAlert({
          type: 'success',
          message:
            'Your record is already with us! For further assistance, please email us at admissions@admi.africa or contact us via WhatsApp at +254 711 486 581.'
        })
        setIsSubmitting(false)
        return
      }

      const conversionValue =
        leadScore >= 20 && values.programType === 'full-time-diploma'
          ? 200
          : leadScore >= 15 && values.programType === 'full-time-diploma'
            ? 100
            : leadScore >= 15 && values.programType !== 'full-time-diploma'
              ? 50
              : leadScore >= 10
                ? 30
                : leadScore >= 5
                  ? 10
                  : 1

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

      if (typeof window !== 'undefined') {
        const phoneFormatted = `+${countryCode}${formattedPhone}`
        const transactionId = storedUTMs.ga_client_id || `lead_${Date.now()}_${leadScore}`

        if (window.dataLayer) {
          // Google Ads conversion
          window.dataLayer.push({
            event: 'conversion',
            send_to: 'AW-16679471170/F0GVCJjHwNQZEMKQspE-',
            value: conversionValue,
            currency: 'USD',
            transaction_id: transactionId,
            email: values.email.trim().toLowerCase(),
            phone_number: phoneFormatted,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            lead_score: leadScore,
            program_type: values.programType,
            course_name: values.courseName,
            study_timeline: values.studyTimeline
          })

          // GA4 generate_lead with enhanced conversions + CAPI dedup
          window.dataLayer.push({
            event: 'generate_lead',
            event_id: transactionId,
            value: conversionValue,
            currency: 'USD',
            user_data: {
              email_address: values.email.trim().toLowerCase(),
              phone_number: phoneFormatted,
              address: {
                first_name: values.firstName.trim(),
                last_name: values.lastName.trim()
              }
            },
            lead_score: leadScore,
            course: values.courseName
          })
        } else if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-16679471170/F0GVCJjHwNQZEMKQspE-',
            value: conversionValue,
            currency: 'USD',
            transaction_id: transactionId,
            email: values.email.trim().toLowerCase(),
            phone_number: phoneFormatted,
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            lead_score: leadScore,
            course_name: values.courseName,
            study_timeline: values.studyTimeline
          })
        }

        // Meta Pixel Lead (deduplication handled inside trackMetaEvent)
        trackMetaEvent('Lead', {
          content_name: values.courseName,
          content_category: 'course_enquiry',
          value: conversionValue,
          currency: 'USD',
        })
      }

      setAlert({ type: 'success', message: 'Enquiry submitted successfully! Redirecting...' })
      setTimeout(() => {
        window.location.href = 'https://admi.africa/enquiry-thank-you'
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      setAlert({ type: 'error', message: 'An error occurred. Please try again later.' })
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  useEffect(() => {
    if (!router.isReady) return

    const utmKeys: UTMKey[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    const utmFromStorage: Partial<Record<UTMKey, string>> = {}
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

    const courseFromQuery = typeof router.query.course === 'string' ? router.query.course : ''

    setValues((prev) => ({
      ...prev,
      ...(courseFromQuery && { courseName: courseFromQuery }),
      utm_source: utmFromStorage.utm_source || 'direct',
      utm_medium: utmFromStorage.utm_medium || 'none',
      utm_campaign: utmFromStorage.utm_campaign || 'organic',
      utm_term: utmFromStorage.utm_term || '',
      utm_content: utmFromStorage.utm_content || ''
    }))
  }, [router.isReady, router.query])

  const courseOptions = useMemo(
    () =>
      courses?.map((course) => ({
        value: course.fields?.name || course.name || 'Unknown Course',
        label: course.fields?.name || course.name || 'Unknown Course'
      })) || [],
    [courses]
  )

  const showStep = (step: number) => activeStep === step

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="font-proxima text-xl font-bold text-black sm:text-2xl">Enquiry Form</h2>
        <p className="mt-1 font-proxima text-sm text-muted">
          Help us understand your needs better with a few quick questions
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-0">
            {STEP_LABELS.map((label, index) => {
              const completed = isStepComplete(index) && activeStep > index
              const active = activeStep === index
              const locked = !canAccessStep(index)

              return (
                <div key={label} className="flex flex-1 flex-col items-center">
                  <div className="flex w-full items-center">
                    {index > 0 && (
                      <div className={`h-0.5 flex-1 ${completed || active ? 'bg-[#0A3D3D]' : 'bg-[#E5E7EB]'}`} />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (!locked) setActiveStep(index)
                      }}
                      disabled={locked}
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        completed
                          ? 'bg-[#0A3D3D] text-white'
                          : active
                            ? 'bg-[#0A3D3D] text-white ring-2 ring-[#0A3D3D]/30 ring-offset-2'
                            : locked
                              ? 'cursor-not-allowed border border-[#E5E7EB] bg-[#F3F4F6] text-[#9CA3AF]'
                              : 'border border-[#D1D5DB] bg-white text-[#555]'
                      }`}
                      aria-label={`Step ${index + 1}: ${label}`}
                    >
                      {completed ? <IconCheck size={16} /> : locked ? <IconLock size={14} /> : index + 1}
                    </button>
                    {index < STEP_LABELS.length - 1 && (
                      <div className={`h-0.5 flex-1 ${completed ? 'bg-[#0A3D3D]' : 'bg-[#E5E7EB]'}`} />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-center text-[11px] font-semibold leading-tight sm:text-xs ${
                      active ? 'text-[#0A3D3D]' : locked ? 'text-[#9CA3AF]' : 'text-[#555]'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {showStep(0) && (
          <div className="space-y-5">
            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-semibold text-black">
                <span>Select Course</span>
                <IconAsterisk size={6} className="text-admiRed" />
              </div>
              <select
                value={values.courseName}
                onChange={(e) => setField('courseName', e.target.value)}
                className={INPUT_CLASS}
                disabled={coursesLoading}
              >
                <option value="">
                  {coursesLoading ? 'Loading courses...' : "Select a course you're interested in"}
                </option>
                {courseOptions.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-black sm:text-base">When are you planning to start?</p>
              <div className="space-y-2 text-sm text-[#333]">
                {[
                  ['may-2026', 'May 2026 intake (next intake)'],
                  ['september-2026', 'September 2026 intake'],
                  ['january-2027', 'January 2027 intake'],
                  ['researching', 'Just researching for now']
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="studyTimeline"
                      value={value}
                      checked={values.studyTimeline === value}
                      onChange={(e) => setField('studyTimeline', e.target.value)}
                      className={RADIO_CLASS}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {showStep(1) && (
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold text-black sm:text-base">
                What type of program are you looking for?
              </p>
              <div className="space-y-2 text-sm text-[#333]">
                {[
                  ['full-time-diploma', 'Full-time Diploma (2 years)'],
                  ['professional-certificate', 'Professional Certificate (3-6 months)'],
                  ['foundation-certificate', 'Foundation Certificate (3-6 months)'],
                  ['weekend-parttime', 'Weekend/Part-time classes']
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="programType"
                      value={value}
                      checked={values.programType === value}
                      onChange={(e) => setField('programType', e.target.value)}
                      className={RADIO_CLASS}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-black sm:text-base">What's your main goal?</p>
              <div className="space-y-2 text-sm text-[#333]">
                {[
                  ['career-change', 'Career change to creative industry'],
                  ['skill-upgrade', 'Upgrade skills in current role'],
                  ['start-business', 'Start my own creative business'],
                  ['university-prep', 'Prepare for university studies'],
                  ['personal-interest', 'Personal interest/hobby']
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="careerGoals"
                      value={value}
                      checked={values.careerGoals === value}
                      onChange={(e) => setField('careerGoals', e.target.value)}
                      className={RADIO_CLASS}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-black sm:text-base">Your current experience level?</p>
              <div className="space-y-2 text-sm text-[#333]">
                {[
                  ['complete-beginner', 'Complete beginner'],
                  ['some-experience', 'Some basic experience'],
                  ['intermediate', 'Intermediate level'],
                  ['professional-upgrade', 'Professional looking to upgrade'],
                  ['formal-training', 'Have formal training elsewhere']
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={value}
                      checked={values.experienceLevel === value}
                      onChange={(e) => setField('experienceLevel', e.target.value)}
                      className={RADIO_CLASS}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-black sm:text-base">
                Expected investment range? (Optional)
              </p>
              <div className="space-y-2 text-sm text-[#333]">
                {[
                  ['under-100k', 'Under 100,000 KES'],
                  ['100k-300k', '100,000 - 300,000 KES'],
                  ['300k-500k', '300,000 - 500,000 KES'],
                  ['500k-plus', '500,000+ KES'],
                  ['need-discussion', 'Need to discuss payment options']
                ].map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="investmentRange"
                      value={value}
                      checked={values.investmentRange === value}
                      onChange={(e) => setField('investmentRange', e.target.value)}
                      className={RADIO_CLASS}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {showStep(2) && (
          <div className="min-w-0 space-y-4 overflow-hidden">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1 flex items-center gap-1 text-sm font-semibold text-black">
                  <span>First Name</span>
                  <IconAsterisk size={6} className="text-admiRed" />
                </div>
                <input
                  value={values.firstName}
                  onChange={(e) => setField('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1 text-sm font-semibold text-black">
                  <span>Last Name</span>
                  <IconAsterisk size={6} className="text-admiRed" />
                </div>
                <input
                  value={values.lastName}
                  onChange={(e) => setField('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-semibold text-black">
                <span>Email Address</span>
                <IconAsterisk size={6} className="text-admiRed" />
              </div>
              <input
                type="email"
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="your@email.com"
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-semibold text-black">
                <span>Phone Number</span>
                <IconAsterisk size={6} className="text-admiRed" />
              </div>
              <div className="flex h-[44px] w-full min-w-0 max-w-full overflow-hidden rounded-[8px] border border-[#BCC5D0] bg-[#F7F8FA]">
                <div className="w-[100px] flex-shrink-0">
                  <PhoneInput
                    country={'ke'}
                    value={countryCode}
                    onChange={(value) => setCountryCode(value)}
                    containerStyle={{ border: 'none', width: '100%' }}
                    inputStyle={{
                      border: 'none',
                      borderRadius: '8px 0 0 8px',
                      fontSize: '13px',
                      height: '44px',
                      width: '100%',
                      backgroundColor: 'transparent',
                      color: '#1F2937',
                      paddingLeft: '40px'
                    }}
                    buttonStyle={{
                      border: 'none',
                      borderRadius: '8px 0 0 8px',
                      backgroundColor: 'transparent',
                      width: '34px',
                      height: '44px'
                    }}
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div className="h-6 w-px flex-shrink-0 self-center bg-[#BCC5D0]" />
                <input
                  value={values.phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '')
                    if (value.length > 3 && value.length <= 6) value = value.replace(/(\d{3})(\d+)/, '$1 $2')
                    else if (value.length > 6) value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3')
                    setField('phone', value)
                  }}
                  placeholder="712 345 678"
                  className="box-border h-[44px] min-w-0 flex-1 border-none bg-transparent px-3 text-[14px] text-[#1F2937] outline-none placeholder:text-[#6F7E90]"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {activeStep > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm font-semibold text-[#333] sm:w-auto"
            >
              <IconArrowLeft size={14} /> Back
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {activeStep < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!validateCurrentStep()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A3D3D] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Next Step <IconArrowRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !validateCurrentStep()}
              className="inline-flex w-full items-center justify-center rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          )}
        </div>
      </form>

      {alert && (
        <div
          className={`mt-4 rounded-lg border p-4 ${
            alert.type === 'success' ? 'border-[#339900] bg-[#F3FAEE]' : 'border-[#ff9966] bg-[#FFF6F2]'
          }`}
        >
          <p className="text-sm font-bold">{alert.type === 'success' ? 'Success' : 'Error'}</p>
          <p className="mt-1 text-sm leading-relaxed">{alert.message}</p>
          {alert.message.includes('already with us') && (
            <div className="mt-3 space-y-2">
              <a
                href="mailto:admissions@admi.africa"
                className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Email Us
              </a>
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
        </div>
      )}
    </div>
  )
}
