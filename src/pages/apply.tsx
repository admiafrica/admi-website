import { useState } from 'react'
import Link from 'next/link'
import {
  IconCircleCheck,
  IconCalendar,
  IconMail,
  IconPhone,
  IconFileText,
  IconBrandWhatsapp
} from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { ApplicationFormData, SelectOption, KeyDate } from '@/types/apply'

const PROGRAMME_OPTIONS: SelectOption[] = [
  { value: 'Film Production Diploma', label: 'Film Production Diploma' },
  { value: 'Music Production Diploma', label: 'Music Production Diploma' },
  { value: 'Animation Diploma', label: 'Animation Diploma' },
  { value: 'Graphic Design Professional Certificate', label: 'Graphic Design Professional Certificate' },
  { value: 'Digital Marketing Certificate', label: 'Digital Marketing Certificate' },
  { value: 'Photography Foundation', label: 'Photography Foundation' },
  { value: 'Sound Engineering Professional Certificate', label: 'Sound Engineering Professional Certificate' },
  { value: 'UI/UX Design Professional Certificate', label: 'UI/UX Design Professional Certificate' }
]

const INTAKE_OPTIONS: SelectOption[] = [
  { value: 'May 2026', label: 'May 2026' },
  { value: 'September 2026', label: 'September 2026' },
  { value: 'January 2027', label: 'January 2027' }
]

const HERO_CHECKLIST = [
  'No application fee',
  'Decisions within 2 weeks',
  'Scholarship options available',
  '3 intake windows per year'
]

const KEY_DATES: KeyDate[] = [
  { intake: 'May 2026 Intake', deadline: 'Applications close: March 15' },
  { intake: 'September 2026 Intake', deadline: 'Applications close: July 23' },
  { intake: 'January 2027 Intake', deadline: 'Opens: Aug 2026' }
]

const REQUIREMENTS = [
  'National ID or Passport copy',
  'Recent passport photo',
  'Previous academic certificates'
]

export default function ApplyPage() {
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    programme: '',
    intake: '',
    additionalInfo: '',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof ApplicationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.consent) return

    setIsSubmitting(true)

    try {
      // Placeholder handler -- replace with actual API call
      console.log('Application submitted:', formData)

      const response = await fetch('/api/v3/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submissionDate: new Date().toISOString()
        })
      }).catch(() => null)

      if (response && !response.ok) {
        console.warn('API response not OK, but form data was logged.')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.programme &&
    formData.intake &&
    formData.consent

  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Apply"
        description="Apply to ADMI for January, May, or September intakes. Study Film, Music, Animation, Graphic Design and more with EU-accredited diplomas and professional certificates."
        keywords="apply ADMI, ADMI application, creative arts application Kenya, film school application, music production application, animation diploma apply"
      />

      <div className="w-full">
        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1 -- Hero                                                  */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="relative w-full overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0F2E2A 0%, #091110 100%)' }}
        >
          <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-12 px-6 pb-20 pt-32 md:flex-row md:items-center md:gap-16 md:px-8 md:pb-24 md:pt-40">
            {/* Left content */}
            <div className="flex-1">
              <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/apply</p>
              <h1 className="mt-4 font-fraunces text-[40px] font-bold leading-[1.1] text-white md:text-[52px]">
                Start Your Application
              </h1>
              <p className="mt-5 max-w-[560px] font-nexa text-[17px] leading-[1.65] text-white/80">
                Apply for January, May, or September intakes across Diploma, Professional Certificate,
                and Foundation programmes.
              </p>
            </div>

            {/* Right -- checklist */}
            <div className="flex-shrink-0 md:w-[380px]">
              <ul className="space-y-5">
                {HERO_CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconCircleCheck size={22} className="mt-0.5 flex-shrink-0 text-[#B7D8CF]" />
                    <span className="font-nexa text-[16px] leading-[1.5] text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2 -- Application Form                                      */}
        {/* ------------------------------------------------------------------ */}
        <section className="w-full bg-white py-16 md:py-24">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-12 px-6 md:px-8 lg:flex-row lg:gap-16">
            {/* Left column -- Form */}
            <div className="flex-1">
              <h2 className="font-fraunces text-[28px] font-bold text-[#171717] md:text-[32px]">
                Application Form
              </h2>
              <p className="mt-3 max-w-[540px] font-nexa text-[16px] leading-[1.6] text-[#555]">
                Fill out the form below to begin your application. All fields marked with * are required.
              </p>

              {submitted ? (
                /* Success state */
                <div className="mt-10 rounded-xl border border-green-200 bg-green-50 p-8 text-center">
                  <IconCircleCheck size={48} className="mx-auto text-green-600" />
                  <h3 className="mt-4 font-fraunces text-[24px] font-bold text-[#171717]">
                    Application Submitted
                  </h3>
                  <p className="mt-2 font-nexa text-[16px] text-[#555]">
                    Thank you for applying to ADMI. Our admissions team will review your application
                    and get back to you within 2 weeks.
                  </p>
                  <p className="mt-4 font-nexa text-[14px] text-[#888]">
                    A confirmation email has been sent to{' '}
                    <span className="font-semibold text-[#171717]">{formData.email}</span>
                  </p>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="mt-10">
                  {/* Row 1: First Name + Last Name */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="flex flex-col">
                      <span className="mb-1.5 font-nexa text-[14px] font-semibold text-[#333]">First Name *</span>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        required
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.currentTarget.value)}
                        className="h-[48px] rounded-lg border border-[#D9D9D9] px-3 font-nexa text-[14px] text-[#171717] focus:border-[#BA2E36] focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="mb-1.5 font-nexa text-[14px] font-semibold text-[#333]">Last Name *</span>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        required
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.currentTarget.value)}
                        className="h-[48px] rounded-lg border border-[#D9D9D9] px-3 font-nexa text-[14px] text-[#171717] focus:border-[#BA2E36] focus:outline-none"
                      />
                    </label>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="flex flex-col">
                      <span className="mb-1.5 font-nexa text-[14px] font-semibold text-[#333]">Email Address *</span>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.currentTarget.value)}
                        className="h-[48px] rounded-lg border border-[#D9D9D9] px-3 font-nexa text-[14px] text-[#171717] focus:border-[#BA2E36] focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="mb-1.5 font-nexa text-[14px] font-semibold text-[#333]">Phone Number *</span>
                      <div className="flex h-[48px] rounded-lg border border-[#D9D9D9] focus-within:border-[#BA2E36]">
                        <span className="flex items-center border-r border-[#E8E8E8] px-3 font-nexa text-[14px] text-[#555]">+254</span>
                        <input
                          type="tel"
                          placeholder="712 345 678"
                          required
                          value={formData.phone}
                          onChange={(e) => {
                            const digits = e.currentTarget.value.replace(/\D/g, '')
                            updateField('phone', digits)
                          }}
                          className="w-full px-3 font-nexa text-[14px] text-[#171717] outline-none"
                        />
                      </div>
                    </label>
                  </div>

                  {/* Row 3: Programme + Intake */}
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="flex flex-col">
                      <span className="mb-1.5 font-nexa text-[14px] font-semibold text-[#333]">Programme of Interest *</span>
                      <select
                        required
                        value={formData.programme}
                        onChange={(e) => updateField('programme', e.currentTarget.value)}
                        className="h-[48px] rounded-lg border border-[#D9D9D9] bg-white px-3 font-nexa text-[14px] text-[#171717] focus:border-[#BA2E36] focus:outline-none"
                      >
                        <option value="">Select a programme</option>
                        {PROGRAMME_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="flex flex-col">
                      <span className="mb-1.5 font-nexa text-[14px] font-semibold text-[#333]">Preferred Intake *</span>
                      <select
                        required
                        value={formData.intake}
                        onChange={(e) => updateField('intake', e.currentTarget.value)}
                        className="h-[48px] rounded-lg border border-[#D9D9D9] bg-white px-3 font-nexa text-[14px] text-[#171717] focus:border-[#BA2E36] focus:outline-none"
                      >
                        <option value="">Select an intake</option>
                        {INTAKE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Row 4: Additional Information */}
                  <div className="mt-5">
                    <label className="flex flex-col">
                      <span className="mb-1.5 font-nexa text-[14px] font-semibold text-[#333]">Additional Information</span>
                      <textarea
                        placeholder="Tell us about your background, interests, or any questions you may have..."
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={(e) => updateField('additionalInfo', e.currentTarget.value)}
                        className="rounded-lg border border-[#D9D9D9] px-3 py-2.5 font-nexa text-[14px] text-[#171717] focus:border-[#BA2E36] focus:outline-none"
                      />
                    </label>
                  </div>

                  {/* Consent */}
                  <div className="mt-6">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => updateField('consent', e.currentTarget.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-[#D9D9D9] text-[#BA2E36] focus:ring-[#BA2E36]"
                      />
                      <span className="font-nexa text-[14px] text-[#555]">
                        I agree to the{' '}
                        <Link href="/privacy-policy" className="text-[#BA2E36] underline hover:text-[#8B1A24]">
                          Terms &amp; Conditions
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy-policy" className="text-[#BA2E36] underline hover:text-[#8B1A24]">
                          Privacy Policy
                        </Link>{' '}
                        *
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="mt-8 h-14 w-full rounded-lg bg-[#BA2E36] font-nexa text-[16px] font-semibold tracking-wide text-white transition hover:bg-[#a12730] disabled:cursor-not-allowed disabled:bg-[#D9D9D9] disabled:text-[#999]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>

            {/* Right column -- Sidebar cards */}
            <div className="w-full space-y-6 lg:w-[420px] lg:flex-shrink-0">
              {/* Key Dates card */}
              <div className="rounded-xl bg-[#F9F9F9] p-6">
                <div className="flex items-center gap-3">
                  <IconCalendar size={22} className="text-[#BA2E36]" />
                  <h3 className="font-fraunces text-[20px] font-bold text-[#171717]">Key Dates</h3>
                </div>
                <div className="mt-5 space-y-4">
                  {KEY_DATES.map((date) => (
                    <div key={date.intake} className="border-b border-[#E8E8E8] pb-4 last:border-0 last:pb-0">
                      <p className="font-nexa text-[15px] font-semibold text-[#171717]">{date.intake}</p>
                      <p className="mt-1 font-nexa text-[14px] text-[#666]">{date.deadline}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Questions card */}
              <div className="rounded-xl bg-[#F9F9F9] p-6">
                <h3 className="font-fraunces text-[20px] font-bold text-[#171717]">Questions?</h3>
                <p className="mt-2 font-nexa text-[14px] leading-[1.6] text-[#555]">
                  Our admissions team is here to help you through every step of the application process.
                </p>
                <div className="mt-5 space-y-4">
                  <a
                    href="mailto:admissions@admi.ac.ke"
                    className="flex items-center gap-3 transition-colors hover:opacity-80"
                  >
                    <IconMail size={18} className="flex-shrink-0 text-[#BA2E36]" />
                    <span className="font-nexa text-[14px] text-[#333]">admissions@admi.ac.ke</span>
                  </a>
                  <a
                    href="tel:+254741132751"
                    className="flex items-center gap-3 transition-colors hover:opacity-80"
                  >
                    <IconPhone size={18} className="flex-shrink-0 text-[#BA2E36]" />
                    <span className="font-nexa text-[14px] text-[#333]">+254 741 132 751</span>
                  </a>
                  <a
                    href="https://wa.me/254741132751"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-colors hover:opacity-80"
                  >
                    <IconBrandWhatsapp size={18} className="flex-shrink-0 text-[#25D366]" />
                    <span className="font-nexa text-[14px] text-[#333]">WhatsApp available</span>
                  </a>
                </div>
              </div>

              {/* What You Need card */}
              <div className="rounded-xl bg-[#F9F9F9] p-6">
                <div className="flex items-center gap-3">
                  <IconFileText size={22} className="text-[#BA2E36]" />
                  <h3 className="font-fraunces text-[20px] font-bold text-[#171717]">What You Need</h3>
                </div>
                <p className="mt-2 font-nexa text-[14px] leading-[1.6] text-[#555]">
                  Prepare the following documents for your application:
                </p>
                <ul className="mt-4 space-y-3">
                  {REQUIREMENTS.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <IconCircleCheck size={18} className="mt-0.5 flex-shrink-0 text-[#08F6CF]" />
                      <span className="font-nexa text-[14px] text-[#333]">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3 -- CTA Banner                                            */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="w-full"
          style={{ background: 'linear-gradient(135deg, #BA2E36 0%, #8B1A24 100%)' }}
        >
          <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-6 py-20 text-center md:px-8 md:py-24">
            <h2 className="font-fraunces text-[32px] font-bold leading-[1.15] text-white md:text-[42px]">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 max-w-[600px] font-nexa text-[17px] leading-[1.65] text-white/85">
              Join a community of creative professionals building careers in film, music, animation,
              design, and digital media across Africa.
            </p>
            <Link
              href="/resources"
              className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-4 font-nexa text-[16px] font-semibold text-[#BA2E36] transition-all hover:bg-white/90 hover:shadow-lg"
            >
              Download Prospectus
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
