import { useState } from 'react'
import Link from 'next/link'
import { IconPlus, IconMinus, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { CourseCard } from '@/components/courses/CourseCard'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { getCoursesCached } from '@/utils/contentful-cached'

interface FoundationCourse {
  name: string
  slug: string
  description: string
  duration: string
  deliveryMode: string
  imageUrl?: string
}

const pathwaySteps = [
  {
    step: 1,
    title: 'Foundation Certificate',
    description: '6 months of core creative skills. Build your portfolio and discover your passion.',
    price: '48,000 KES',
    priceColor: '#EF7B2E',
    bgColor: '#EF7B2E',
    textColor: '#FFFFFF'
  },
  {
    step: 2,
    title: 'Professional Certificate',
    description: '6 months of specialized training. Deepen your expertise and gain industry connections.',
    price: '48,000 KES',
    priceColor: '#8EBFB0',
    bgColor: '#8EBFB0',
    textColor: '#0B0B0F'
  },
  {
    step: 3,
    title: 'Diploma Programme',
    description:
      '2-year comprehensive training with internship. Launch your professional career earning 60K-120K/month.',
    badge: 'Highest ROI',
    bgColor: '#C1272D',
    textColor: '#FFFFFF'
  }
]

const faqs = [
  {
    question: 'Do I need any prior experience?',
    answer:
      'No experience required! Foundation certificates are designed for complete beginners. All equipment and software are provided. You just need passion and commitment.'
  },
  {
    question: 'Can I progress to a diploma after a foundation certificate?',
    answer:
      'Absolutely! Foundation certificates are Step 1 of our career pathway. Many students progress to Professional Certificates and then to 2-year Diploma Programmes for maximum career impact.'
  },
  {
    question: 'What schedule options are available?',
    answer:
      'We offer flexible scheduling: weekday evenings (6-9pm) or Saturday full-day (9am-5pm). This allows you to study while working or attending school.'
  }
]

export default function FoundationCertificatesPage({
  foundationCourses = []
}: {
  foundationCourses: FoundationCourse[]
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <MainLayout heroOverlap>
      <PageSEO
        title="Foundation Certificate Programmes - ADMI Kenya | Start Your Creative Career"
        description="Begin your creative journey with ADMI's foundation certificate programmes. No experience required. 6 months, from 48,000 KES. Creative Media, Digital Technology, Music & more."
        keywords="foundation certificate Kenya, entry level creative courses, beginner digital media, ADMI foundation, creative career start, media training Kenya"
        url="/courses/foundation-certificates"
      />

      <div className="font-proxima">
        {/* Hero Section */}
        <section className="w-full bg-white">
          <div className="section-container flex flex-col items-center gap-5 pb-16 pt-28 md:pb-24 md:pt-36 lg:flex-row lg:items-center lg:gap-10">
            {/* Left Content */}
            <div className="flex flex-1 flex-col">
              <span className="mb-5 w-fit rounded-full bg-[#FFF3EE] px-4 py-1.5 text-[12px] font-semibold text-brand-orange">
                No Experience Required
              </span>
              <h1 className="section-heading-light mb-4">
                Start Your Creative Journey from Zero
              </h1>
              <p className="section-subheading-light mb-6 max-w-[560px]">
                Foundation certificates are your entry point into the creative media industry. Build core skills in 6
                months and step up to diploma programmes for a full career transformation.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/enquiry"
                  className="inline-flex items-center rounded-lg bg-brand-orange px-9 py-[18px] font-proxima text-[17px] font-semibold text-white transition hover:bg-[#e5552a]"
                >
                  Apply Now
                </Link>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center rounded-lg border-2 border-solid border-brand-orange bg-[#FFF3EE] px-9 py-[18px] font-proxima text-[17px] font-medium text-brand-orange transition hover:bg-brand-orange hover:text-white"
                >
                  Enquire Now
                </Link>
                <a
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about foundation certificate programmes")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Foundation Certificates Hero')}
                  className="inline-flex items-center gap-2.5 rounded-lg bg-brand-whatsapp px-7 py-[18px] font-proxima text-[17px] font-medium text-white transition hover:bg-[#20bd5a]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
            {/* Hero Image */}
            <div
              className="w-full overflow-hidden rounded-xl bg-[#f0f0f0] lg:max-w-[480px] lg:rounded-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-orange to-[#FFB088] text-white">
                <span className="text-lg font-medium opacity-60">Hero Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pathway Section */}
        <section className="section-padding w-full bg-[#f9f9f9]">
          <div className="section-container">
            <div className="mb-12">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">
                YOUR GROWTH PATHWAY
              </span>
              <h2 className="font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[40px]">
                From Beginner to Professional in 3 Steps
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
              {pathwaySteps.map((step, i) => (
                <div key={i} className="flex flex-1 items-center gap-4 md:gap-0">
                  <article className="flex w-full flex-col items-center gap-4 rounded-2xl border border-[#eeeeee] bg-white p-5 text-center shadow-md sm:p-8">
                    {/* Step Number Circle */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: step.bgColor, color: step.textColor }}
                    >
                      <span className="text-[20px] font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-[18px] font-bold text-[#171717]">{step.title}</h3>
                    <p className="text-[14px] leading-[1.6] text-[#555555]">{step.description}</p>
                    {step.price && (
                      <span className="text-[16px] font-bold" style={{ color: step.priceColor }}>
                        {step.price}
                      </span>
                    )}
                    {step.badge && (
                      <span className="rounded-md bg-[#FFF0EE] px-3 py-1 text-[12px] font-semibold text-brand-red">
                        {step.badge}
                      </span>
                    )}
                  </article>
                  {/* Arrow connector */}
                  {i < pathwaySteps.length - 1 && (
                    <span className="hidden flex-shrink-0 px-3 text-[24px] text-[#cccccc] md:block">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Foundation Programmes Grid */}
        <section className="section-padding w-full bg-white">
          <div className="section-container">
            <div className="mb-12">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">
                FOUNDATION CERTIFICATES
              </span>
              <h2 className="mb-3 font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[42px]">
                Discover Your Creative Calling
              </h2>
              <p className="text-[17px] text-[#555555]">
                Hands-on introductory programmes perfect for complete beginners
              </p>
            </div>

            <div className="grid auto-rows-[440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {foundationCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  name={course.name}
                  slug={course.slug}
                  description={course.description}
                  duration={course.duration}
                  deliveryMode={course.deliveryMode}
                  imageUrl={course.imageUrl}
                  accentColor="#EF7B2E"
                  accentBg="#FFF8F0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding w-full bg-gradient-to-br from-brand-orange to-[#FFB088]">
          <div className="section-container flex max-w-[700px] flex-col items-center text-center">
            <h2 className="mb-4 font-nexa text-3xl font-semibold text-white md:text-[40px] md:leading-[1.1]">
              Take the First Step Toward Your Creative Career
            </h2>
            <p className="mb-8 max-w-[580px] text-[17px] leading-[1.5] text-[#171717]/80">
              No experience needed. Just passion and commitment. Enrol in a Foundation Certificate for 48,000 KES and
              begin your transformation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-[15px] font-bold text-brand-orange transition-colors hover:bg-gray-100 sm:px-8 sm:text-[17px]"
              >
                Apply Now
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg border-2 border-solid border-white bg-white/15 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/25 sm:px-8 sm:text-[17px]"
              >
                Enquire Now
              </Link>
              <a
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about foundation certificate programmes")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Foundation Certificates CTA')}
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
              <span className="section-label-light">FOUNDATION CERTIFICATE FAQS</span>
              <h2 className="section-heading-light">Everything You Need to Know</h2>
              <p className="section-subheading-light mt-4">
                Common questions about our foundation certificate programmes, fees, and career pathways.
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
                      <span className="bg-brand-red/8 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-brand-red md:h-8 md:w-8">
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
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I have a question about ADMI foundation certificate programmes.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Foundation Certificates FAQ Banner')}
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

    const foundationCourses: FoundationCourse[] = courses
      .map(cleanCourseName)
      .filter((course: any) => {
        try {
          const programType = correctCourseMapping(course)
          return programType.toLowerCase().includes('foundation certificate')
        } catch {
          return false
        }
      })
      .map((course: any) => ({
        name: course.fields.name,
        slug: course.fields.slug,
        description: getPlainTextFromRichText(course.fields.description),
        duration: course.fields.programType?.fields?.duration || '3 months',
        deliveryMode: course.fields.programType?.fields?.deliveryMode || 'In-person',
        imageUrl: course.fields.coverImage?.fields?.file?.url
          ? course.fields.coverImage.fields.file.url.startsWith('http')
            ? course.fields.coverImage.fields.file.url
            : `https:${course.fields.coverImage.fields.file.url}`
          : undefined
      }))

    return {
      props: { foundationCourses },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching foundation certificate courses:', error)
    return {
      props: { foundationCourses: [] },
      revalidate: 300
    }
  }
}
