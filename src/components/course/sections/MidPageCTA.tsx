'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
const PhoneInput = dynamic(() => import('react-phone-input-2'), { ssr: false })
import 'react-phone-input-2/lib/style.css'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'
import { getStoredUTMs, getCurrentPageInfo } from '@/utils/utm-tracking'
import { trackMetaEvent } from '@/utils/track-event'

interface MidPageCTAProps {
  courseName: string
  courseSlug: string
}

const INTAKE_OPTIONS = [
  { value: 'may-2026', label: 'May 2026' },
  { value: 'september-2026', label: 'September 2026' },
  { value: 'january-2027', label: 'January 2027' }
]

export default function MidPageCTA({ courseName, courseSlug }: MidPageCTAProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    intake: 'may-2026'
  })
  const [countryCode, setCountryCode] = useState('254')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const storedUTMs = getStoredUTMs()
    const pageInfo = getCurrentPageInfo()

    const cleanPhone = formData.phone.replace(/\D/g, '').replace(/^0+/, '')

    // Calculate lead score based on intake timing
    const leadScore = formData.intake === 'may-2026' ? 18 : formData.intake === 'september-2026' ? 15 : 12

    const data = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: `${countryCode}${cleanPhone}`,
      courseName: courseName,
      studyTimeline: formData.intake,
      programType: 'full-time-diploma',
      investmentRange: '',
      careerGoals: '',
      experienceLevel: '',
      leadScore: leadScore,
      formType: 'mid-page-cta',
      submissionDate: new Date().toISOString(),
      utm_source: storedUTMs.utm_source || 'direct',
      utm_medium: storedUTMs.utm_medium || 'none',
      utm_campaign: storedUTMs.utm_campaign || 'organic',
      utm_term: storedUTMs.utm_term || '',
      utm_content: storedUTMs.utm_content || '',
      first_touch_source: storedUTMs.first_touch_source || '',
      first_touch_medium: storedUTMs.first_touch_medium || '',
      first_touch_campaign: storedUTMs.first_touch_campaign || '',
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
        setError(typeof responseData.error === 'string' ? responseData.error : 'Failed to submit. Please try again.')
        setIsSubmitting(false)
        return
      }

      if (responseData.message === 'existing_contact') {
        setError('Your record is already with us! Our team will reach out shortly.')
        setIsSubmitting(false)
        return
      }

      // Calculate conversion value based on lead score
      const conversionValue = leadScore >= 15 ? 100 : 50

      const conversionData = {
        value: conversionValue,
        transaction_id: `lead_${Date.now()}_${leadScore}`,
        lead_score: leadScore,
        course_name: courseName,
        program_type: 'full-time-diploma',
        study_timeline: formData.intake,
        quality_tier: leadScore >= 15 ? 'warm_diploma' : 'warm'
      }

      sessionStorage.setItem('admi_conversion_data', JSON.stringify(conversionData))

      // Full conversion tracking
      if (typeof window !== 'undefined') {
        const formattedPhone = `+${countryCode}${cleanPhone}`
        const transactionId = storedUTMs.ga_client_id || `lead_${Date.now()}_${leadScore}`

        if (window.dataLayer) {
          // Google Ads conversion
          window.dataLayer.push({
            event: 'conversion',
            send_to: 'AW-16679471170/F0GVCJjHwNQZEMKQspE-',
            value: conversionValue,
            currency: 'USD',
            transaction_id: transactionId,
            email: formData.email.trim().toLowerCase(),
            phone_number: formattedPhone,
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            lead_score: leadScore,
            program_type: 'full-time-diploma',
            course_name: courseName,
            study_timeline: formData.intake,
            form_location: 'mid_page_cta'
          })

          // GA4 generate_lead event with enhanced conversions + CAPI dedup data
          window.dataLayer.push({
            event: 'generate_lead',
            event_id: transactionId,
            value: conversionValue,
            currency: 'USD',
            user_data: {
              email_address: formData.email.trim().toLowerCase(),
              phone_number: formattedPhone,
              address: {
                first_name: formData.firstName.trim(),
                last_name: formData.lastName.trim()
              }
            },
            lead_score: leadScore,
            course: courseName,
            form_location: 'mid_page_cta'
          })
        } else if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-16679471170/F0GVCJjHwNQZEMKQspE-',
            value: conversionValue,
            currency: 'USD',
            transaction_id: transactionId,
            email: formData.email.trim().toLowerCase(),
            phone_number: formattedPhone,
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            lead_score: leadScore,
            course_name: courseName,
            study_timeline: formData.intake
          })
        }

        // Meta Pixel Lead event (deduplication handled inside trackMetaEvent)
        trackMetaEvent('Lead', {
          content_name: courseName,
          content_ids: [`admi-course-${courseSlug}`],
          content_type: 'product',
          content_category: 'course_enquiry',
          value: conversionValue,
          currency: 'USD',
        })
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="section-padding w-full bg-gradient-to-br from-[#0A3D3D] to-[#0D4D4D]">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
              <IconCheck size={32} className="text-white" />
            </div>
            <h2 className="font-nexa text-3xl font-bold text-white md:text-4xl">
              Thank You, {formData.firstName}!
            </h2>
            <p className="mt-4 font-proxima text-lg text-white/80">
              Our admissions team will contact you within 24 hours to discuss your {courseName} application for the {INTAKE_OPTIONS.find(i => i.value === formData.intake)?.label} intake.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding w-full bg-gradient-to-br from-[#0A3D3D] to-[#0D4D4D]">
      <div className="section-container">
        <div className="mx-auto grid max-w-xl gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Messaging */}
          <div className="flex flex-col justify-center">
            <span className="font-proxima text-sm font-bold uppercase tracking-[2px] text-secondary">
              Ready to Apply?
            </span>
            <h2 className="mt-3 font-nexa text-3xl font-bold leading-[1.15] text-white md:text-[38px]">
              Start Your {courseName} Journey Today
            </h2>
            <p className="mt-4 font-proxima text-[17px] leading-[1.6] text-white/80">
              Fill in your details and our admissions team will reach out within 24 hours to guide you through the application process.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <IconCheck size={16} className="text-secondary" />
                </div>
                <span className="font-proxima text-[15px] text-white">No application fee</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <IconCheck size={16} className="text-secondary" />
                </div>
                <span className="font-proxima text-[15px] text-white">Flexible payment plans available</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <IconCheck size={16} className="text-secondary" />
                </div>
                <span className="font-proxima text-[15px] text-white">Response within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-xl sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Course (Pre-filled, read-only) */}
              <div className="min-w-0">
                <label className="mb-1 block font-proxima text-xs font-medium text-gray-600">
                  Course
                </label>
                <input
                  type="text"
                  value={courseName}
                  readOnly
                  className="box-border h-[40px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 font-proxima text-[14px] text-gray-600"
                />
              </div>

              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-0">
                  <label className="mb-1 block font-proxima text-xs font-medium text-gray-600">
                    First Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="First name"
                    className="box-border h-[40px] w-full rounded-lg border border-gray-300 bg-white px-3 font-proxima text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
                <div className="min-w-0">
                  <label className="mb-1 block font-proxima text-xs font-medium text-gray-600">
                    Last Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Last name"
                    className="box-border h-[40px] w-full rounded-lg border border-gray-300 bg-white px-3 font-proxima text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="min-w-0">
                <label className="mb-1 block font-proxima text-xs font-medium text-gray-600">
                  Email Address <span className="text-brand-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="box-border h-[40px] w-full rounded-lg border border-gray-300 bg-white px-3 font-proxima text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                />
              </div>

              {/* Phone */}
              <div className="min-w-0">
                <label className="mb-1 block font-proxima text-xs font-medium text-gray-600">
                  Phone Number <span className="text-brand-red">*</span>
                </label>
                <PhoneInput
                  country="ke"
                  value={formData.phone}
                  onChange={(phone, data: any) => {
                    setFormData(prev => ({ ...prev, phone }))
                    if (data?.dialCode) setCountryCode(data.dialCode)
                  }}
                  inputStyle={{
                    width: '100%',
                    maxWidth: '100%',
                    height: '40px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-proxima)',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    paddingLeft: '48px',
                    boxSizing: 'border-box'
                  }}
                  buttonStyle={{
                    borderRadius: '8px 0 0 8px',
                    border: '1px solid #D1D5DB',
                    borderRight: 'none'
                  }}
                  containerStyle={{ width: '100%', maxWidth: '100%' }}
                />
              </div>

              {/* Preferred Intake */}
              <div>
                <label className="mb-1 block font-proxima text-xs font-medium text-gray-600">
                  Preferred Intake <span className="text-brand-red">*</span>
                </label>
                <select
                  required
                  value={formData.intake}
                  onChange={(e) => setFormData(prev => ({ ...prev, intake: e.target.value }))}
                  className="h-[40px] w-full rounded-lg border border-gray-300 bg-white px-3 font-proxima text-[14px] text-gray-900 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                >
                  {INTAKE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-2 text-xs text-red-600">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-brand-red font-proxima text-[15px] font-bold text-white transition-colors hover:bg-brand-red/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <IconLoader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Details"
                )}
              </button>

              <p className="text-center font-proxima text-[11px] text-gray-500">
                By submitting, you agree to our{' '}
                <a href="/terms-and-conditions" className="text-brand-red hover:underline">Terms</a> and{' '}
                <a href="/privacy-policy" className="text-brand-red hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
