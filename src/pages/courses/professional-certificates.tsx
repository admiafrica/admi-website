import { useState } from 'react'
import Link from 'next/link'
import { IconPlus, IconMinus, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { CourseCard } from '@/components/courses/CourseCard'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { getCoursesCached } from '@/utils/contentful-cached'

interface ProfCourse {
  name: string
  slug: string
  description: string
  duration: string
  deliveryMode: string
  imageUrl?: string
}

const faqs = [
  {
    question: 'How long are the professional certificate programmes?',
    answer:
      'Professional certificate programmes run for 6 months (1 semester). Classes are available in flexible schedules including evening and weekend options.'
  },
  {
    question: 'Can I upgrade from a certificate to a diploma?',
    answer:
      'Yes! Certificate graduates can transition into our 2-year diploma programmes with credit towards their qualification. Many students start with a certificate and upgrade to earn 3x higher salaries.'
  },
  {
    question: 'What career opportunities are available after completion?',
    answer:
      'Certificate graduates typically start in entry-level and junior positions with salaries of 25,000-50,000 KES/month. Our career services team helps with job placement and portfolio building.'
  }
]

export default function ProfessionalCertificatesPage({ profCourses = [] }: { profCourses: ProfCourse[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <MainLayout>
      <PageSEO
        title="Professional Certificate Programmes - ADMI Kenya | Fast-Track Your Skills"
        description="Build professional skills in 6 months with ADMI's certificate programmes. Photography, Video Production, Digital Marketing & more. From 47,500 KES. Get hired faster."
        keywords="professional certificate Kenya, ADMI certificates, digital marketing certificate, video production, photography certificate, short courses Kenya"
        url="/courses/professional-certificates"
      />

      <div className="font-proxima">
        {/* Hero Section */}
        <section className="w-full bg-white py-6 md:py-16">
          <div className="section-container flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:gap-10">
            {/* Left Content */}
            <div className="flex flex-1 flex-col">
              <span className="w-fit rounded-full bg-[#EEF9F7] px-4 py-1.5 text-[12px] font-semibold text-[#057A65]">
                6-Month Professional Programmes
              </span>
              <h1 className="mt-2 font-nexa text-[26px] font-semibold leading-[1.15] tracking-tight text-[#171717] sm:text-3xl md:text-[44px]">
                Build Professional Skills That Get You Hired
              </h1>
              <p className="mt-1 max-w-[560px] text-[14px] leading-[1.5] text-[#666666] md:text-[15px]">
                Intensive 6-month certificate programmes designed to equip you with industry-ready skills in
                photography, video production, and digital marketing.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5 sm:gap-4">
                <Link
                  href="/enquiry"
                  className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-[15px] font-semibold text-[#0B0B0F] transition-colors hover:bg-[#06d4b2] sm:px-8 sm:text-[17px]"
                >
                  Apply Now
                </Link>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center rounded-lg border-2 border-[#057A65] bg-[#EEF9F7] px-6 py-3 text-[15px] font-medium text-[#057A65] transition-colors hover:bg-[#057A65] hover:text-white sm:px-8 sm:text-[17px]"
                >
                  Enquire Now
                </Link>
                <a
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about professional certificate programmes")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Professional Certificates Hero')}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-whatsapp px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1da851] sm:px-8 sm:text-[17px]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            {/* Hero Image */}
            <div
              className="w-full overflow-hidden rounded-xl bg-[#f0f0f0] lg:max-w-[480px] lg:rounded-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B3D3D] to-secondary text-white">
                <span className="text-lg font-medium opacity-60">Hero Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="w-full bg-white py-4 md:py-8">
          <div className="section-container flex flex-col items-center justify-around gap-5 rounded-2xl border border-[#eeeeee] bg-[#f9f9f9] px-5 py-6 shadow-md sm:px-8 md:flex-row md:gap-8 md:py-8">
            {[
              { value: '48K', label: 'KES Total Investment' },
              { value: '6', label: 'Months Duration' },
              { value: '25-50K', label: 'KES/mo Starting Salary' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-nexa text-[32px] font-bold leading-none tracking-tight text-[#057A65] sm:text-[36px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] font-medium text-[#555555]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certificate Programmes Grid */}
        <section className="section-padding w-full bg-white">
          <div className="section-container">
            <div className="mb-12">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-[#057A65]">
                PROFESSIONAL CERTIFICATES
              </span>
              <h2 className="mb-3 font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[40px]">
                Focused Skills for Immediate Impact
              </h2>
              <p className="text-[17px] text-[#555555]">
                6-month programmes designed for career starters and skill upgraders
              </p>
            </div>

            <div className="grid auto-rows-[440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {profCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  name={course.name}
                  slug={course.slug}
                  description={course.description}
                  duration={course.duration}
                  deliveryMode={course.deliveryMode}
                  imageUrl={course.imageUrl}
                  accentColor="#0A3D3D"
                  accentBg="#EEF9F7"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Diploma Upsell */}
        <section className="section-padding w-full bg-[#f9f9f9]">
          <div className="section-container">
            <div className="flex flex-col gap-8 rounded-2xl border border-[#eeeeee] bg-white p-5 shadow-md transition-shadow hover:shadow-xl sm:p-8 md:flex-row md:items-center md:p-12">
              <div className="flex-1">
                <h2 className="mb-4 font-nexa text-[28px] font-semibold leading-[1.2] text-[#171717] sm:text-[32px]">
                  Ready for More? Upgrade to a Diploma
                </h2>
                <p className="mb-6 text-[16px] leading-[1.6] text-[#666666]">
                  Certificate graduates can transition into our 2-year diploma programmes with credit towards their
                  qualification. Earn 3x higher salaries with a diploma.
                </p>
                <ul className="mb-6 space-y-3">
                  {[
                    'Diploma salary: 60K-120K KES/month',
                    'Mandatory industry internship',
                    'University accredited qualification'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg
                        className="flex-shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#057A65"
                        strokeWidth="2.5"
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span className="text-[15px] font-medium text-[#171717]">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/courses/diploma-programs"
                  className="inline-flex items-center rounded-lg bg-brand-red px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#a02830] sm:px-8 sm:text-[16px]"
                >
                  Explore Diploma Programmes
                </Link>
              </div>
              {/* Right visual */}
              <div className="hidden h-[280px] w-full max-w-[360px] rounded-2xl bg-gradient-to-br from-brand-red to-[#E85A4F] md:block" />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding w-full bg-gradient-to-br from-secondary to-[#06d4b2]">
          <div className="section-container flex max-w-[700px] flex-col items-center text-center">
            <h2 className="mb-4 font-nexa text-3xl font-semibold text-[#0B0B0F] md:text-[40px] md:leading-[1.1]">
              Start Building Your Skills Today
            </h2>
            <p className="mb-8 max-w-[550px] text-[17px] leading-[1.5] text-[#171717]/60">
              Enrol in a 6-month professional certificate programme. One-time payment of 48,000 KES. No hidden fees.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg bg-[#0B0B0F] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#333333] sm:px-8 sm:text-[17px]"
              >
                Apply Now
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg border-2 border-white bg-white/15 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/25 sm:px-8 sm:text-[17px]"
              >
                Enquire Now
              </Link>
              <a
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about professional certificate programmes")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Professional Certificates CTA')}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-whatsapp px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1da851] sm:px-8 sm:text-[17px]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding w-full bg-[#f9f9f9]">
          <div className="section-container">
            <div className="mx-auto mb-8 max-w-[600px] text-center md:mb-12">
              <span className="section-label-light" style={{ color: '#057A65' }}>
                CERTIFICATE FAQS
              </span>
              <h2 className="section-heading-light">Everything You Need to Know</h2>
              <p className="section-subheading-light mt-4">
                Common questions about our professional certificate programmes, fees, and career outcomes.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-2.5 md:space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i} className="bg-white shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
                    <button
                      className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-[#fafafa] md:gap-6 md:px-7 md:py-5"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="text-[14px] font-semibold text-[#171717] md:text-[15px]">{faq.question}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C1272D]/10 text-[#C1272D] md:h-8 md:w-8">
                        {isOpen ? <IconMinus size={16} stroke={2.5} /> : <IconPlus size={16} stroke={2.5} />}
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-200 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-3.5 md:px-7 md:pb-5">
                          <p className="text-[13px] leading-[1.65] text-[#333] md:text-[14px] md:leading-[1.7]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Banner */}
            <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] sm:mt-10 sm:flex-row sm:justify-center sm:gap-4 sm:p-7">
              <span className="text-[14px] font-semibold text-[#171717]">Still have questions?</span>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I have a question about ADMI professional certificate programmes.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Professional Certificates FAQ Banner')}
                  className="btn-whatsapp !h-9 !px-4 !text-[12px]"
                >
                  <IconBrandWhatsapp size={18} />
                  Chat on WhatsApp
                </a>
                <Link href="/contact" className="btn-outline !h-9 !px-4 !text-[12px]">
                  <IconPhone size={18} />
                  Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

// Reuse the same course categorization logic from /courses
const correctCourseMapping = (course: any): string => {
  const courseName = course.fields.name
  if (courseName === 'Digital Content Creation Certificate') return 'Professional Certificate'
  if (courseName === 'Video Production Certificate (Professional)' || courseName === 'Video Production Certificate')
    return 'Professional Certificate'
  if (courseName === 'Video Game Development Certificate (Rubika)') return 'Rubika Programs'
  if (courseName === '2D Animation Certificate (Rubika)') return 'Rubika Programs'
  return course.fields.programType.fields.name
}

const cleanCourseName = (course: any): any => {
  if (course.fields.name === 'Video Production Certificate (Professional)') {
    return { ...course, fields: { ...course.fields, name: 'Video Production Certificate' } }
  }
  if (course.fields.name === 'Entertainment Business') {
    return { ...course, fields: { ...course.fields, name: 'Entertainment Business Diploma' } }
  }
  return course
}

const getPlainTextFromRichText = (richText: any, maxLength = 120): string => {
  if (!richText?.content) return ''
  const text = richText.content
    .map((block: any) => block.content?.map((node: any) => node.value || '').join('') || '')
    .join(' ')
    .trim()
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export async function getStaticProps() {
  try {
    const courses = await getCoursesCached()

    const profCourses: ProfCourse[] = courses
      .map(cleanCourseName)
      .filter((course: any) => {
        try {
          const programType = correctCourseMapping(course)
          return programType.toLowerCase().includes('professional certificate')
        } catch {
          return false
        }
      })
      .map((course: any) => ({
        name: course.fields.name,
        slug: course.fields.slug,
        description: getPlainTextFromRichText(course.fields.description),
        duration: course.fields.programType?.fields?.duration || '6 months',
        deliveryMode: course.fields.programType?.fields?.deliveryMode || 'In-person',
        imageUrl: course.fields.coverImage?.fields?.file?.url
          ? course.fields.coverImage.fields.file.url.startsWith('http')
            ? course.fields.coverImage.fields.file.url
            : `https:${course.fields.coverImage.fields.file.url}`
          : undefined
      }))

    return {
      props: { profCourses },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching professional certificate courses:', error)
    return {
      props: { profCourses: [] },
      revalidate: 300
    }
  }
}
