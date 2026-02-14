import { useState } from 'react'
import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

const certificatePrograms = [
  {
    title: 'Video Production',
    description: 'Learn filming, editing, color grading and post-production for professional video content.',
    price: '48,000 KES',
    duration: '6 Months',
    slug: 'video-production-certificate',
    layout: 'large'
  },
  {
    title: 'Digital Marketing',
    description: 'SEO, social media strategy, content marketing, analytics and paid advertising fundamentals.',
    price: '48,000 KES',
    duration: '6 Months',
    slug: 'digital-marketing-certificate',
    layout: 'large'
  },
  {
    title: 'Graphic Design',
    description: 'Visual identity, branding, digital illustration & print design fundamentals',
    price: '47,500 KES',
    duration: '6 Months',
    slug: 'graphic-design-certificate',
    layout: 'large'
  },
  {
    title: 'Data Analytics & Visualisation',
    description: 'Data visualization, business analytics, presentation skills & reporting',
    price: '47,500 KES',
    duration: '6 Months',
    slug: 'data-analytics-and-visualisation',
    layout: 'small'
  }
]

const faqs = [
  {
    question: 'How long are the professional certificate programs?',
    answer:
      'Professional certificate programs run for 6 months (1 semester). Classes are available in flexible schedules including evening and weekend options.'
  },
  {
    question: 'Can I upgrade from a certificate to a diploma?',
    answer:
      'Yes! Certificate graduates can transition into our 2-year diploma programs with credit towards their qualification. Many students start with a certificate and upgrade to earn 3x higher salaries.'
  },
  {
    question: 'What career opportunities are available after completion?',
    answer:
      'Certificate graduates typically start in entry-level and junior positions with salaries of 25,000-50,000 KES/month. Our career services team helps with job placement and portfolio building.'
  }
]

export default function ProfessionalCertificatesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <MainLayout>
      <PageSEO
        title="Professional Certificate Programs - ADMI Kenya | Fast-Track Your Skills"
        description="Build professional skills in 6 months with ADMI's certificate programs. Photography, Video Production, Digital Marketing & more. From 47,500 KES. Get hired faster."
        keywords="professional certificate Kenya, ADMI certificates, digital marketing certificate, video production, photography certificate, short courses Kenya"
        url="/courses/professional-certificates"
      />

      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-16 pt-12 md:px-20">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-1 flex-col gap-6">
            <span className="w-fit rounded-full bg-[#E6FFFA] px-4 py-2 font-proxima text-[13px] font-semibold text-[#057A65]">
              6-Month Professional Programs
            </span>
            <h1 className="font-nexa text-4xl font-semibold leading-[1.15] tracking-tight text-[#171717] md:text-[48px]">
              Build Professional Skills That Get You Hired
            </h1>
            <p className="max-w-[560px] font-proxima text-[18px] leading-[1.6] text-[#666666]">
              Intensive 6-month certificate programs designed to equip you with industry-ready skills in photography,
              video production, and digital marketing.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg bg-secondary px-8 py-3 font-proxima text-[17px] font-semibold text-[#0B0B0F] transition-colors hover:bg-[#06d4b2]"
              >
                Apply Now
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg border-2 border-[#057A65] bg-[#EEFBF8] px-8 py-3 font-proxima text-[17px] font-medium text-[#057A65] transition-colors hover:bg-[#057A65] hover:text-white"
              >
                Enquire Now
              </Link>
              <a
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about professional certificate programs")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Professional Certificates Hero')}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-whatsapp px-8 py-3 font-proxima text-[17px] font-medium text-white transition-colors hover:bg-[#1da851]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
          {/* Right Image Placeholder */}
          <div
            className="hidden w-full max-w-[500px] overflow-hidden rounded-2xl bg-[#f0f0f0] lg:block"
            style={{ aspectRatio: '4/3' }}
          >
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B3D3D] to-secondary text-white">
              <span className="font-proxima text-lg font-medium opacity-60">Hero Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full bg-white px-4 py-8 md:px-20">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-around gap-8 rounded-2xl border border-[#eeeeee] bg-[#f9f9f9] px-8 py-8 shadow-md md:flex-row">
          {[
            { value: '48K', label: 'KES Total Investment' },
            { value: '6', label: 'Months Duration' },
            { value: '25-50K', label: 'KES/mo Starting Salary' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-proxima text-[36px] font-bold leading-none tracking-tight text-[#057A65]">
                {stat.value}
              </p>
              <p className="mt-2 font-proxima text-[13px] font-medium text-[#555555]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Programs Grid */}
      <section className="w-full bg-white px-4 py-20 md:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12">
            <span className="mb-3 inline-block font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
              PROFESSIONAL CERTIFICATES
            </span>
            <h2 className="mb-3 font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[40px]">
              Focused Skills for Immediate Impact
            </h2>
            <p className="font-proxima text-[17px] text-[#555555]">
              6-month programs designed for career starters and skill upgraders
            </p>
          </div>

          {/* Top 3 - larger cards */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {certificatePrograms
              .filter((p) => p.layout === 'large')
              .map((program, i) => (
                <article
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#eeeeee] bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  {/* Image Placeholder */}
                  <div className="h-[180px] w-full bg-gradient-to-br from-[#1a3a3a] to-[#2a5a5a]" />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-proxima text-[20px] font-bold text-[#171717]">{program.title}</h3>
                    <p className="flex-1 font-proxima text-[14px] leading-[1.6] text-[#555555]">
                      {program.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-proxima text-[16px] font-bold text-[#057A65]">{program.price}</span>
                      <span className="font-proxima text-[13px] font-medium text-[#777777]">{program.duration}</span>
                    </div>
                    <Link
                      href={`/courses/${program.slug}`}
                      className="mt-1 font-proxima text-[14px] font-semibold text-[#057A65] hover:underline"
                    >
                      View Program &rarr;
                    </Link>
                  </div>
                </article>
              ))}
          </div>

          {/* Bottom 3 - smaller cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {certificatePrograms
              .filter((p) => p.layout === 'small')
              .map((program, i) => (
                <article
                  key={i}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#eeeeee] bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="h-[140px] w-full bg-gradient-to-br from-[#2a2a2a] to-[#444444]" />
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="w-fit rounded-md bg-[#E6FFFA] px-2 py-1 font-proxima text-[12px] font-semibold text-[#057A65]">
                      {program.price}
                    </span>
                    <h3 className="font-proxima text-[18px] font-bold text-[#171717]">{program.title}</h3>
                    <p className="flex-1 font-proxima text-[14px] leading-[1.5] text-[#555555]">
                      {program.description}
                    </p>
                    <Link
                      href={`/courses/${program.slug}`}
                      className="mt-1 font-proxima text-[14px] font-semibold text-[#057A65] hover:underline"
                    >
                      View Program &rarr;
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Diploma Upsell */}
      <section className="w-full bg-[#f9f9f9] px-4 py-20 md:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col gap-8 rounded-2xl border border-[#eeeeee] bg-white p-8 shadow-md transition-shadow hover:shadow-xl md:flex-row md:items-center md:p-12">
            <div className="flex-1">
              <h2 className="mb-4 font-nexa text-[32px] font-semibold leading-[1.2] text-[#171717]">
                Ready for More? Upgrade to a Diploma
              </h2>
              <p className="mb-6 font-proxima text-[16px] leading-[1.6] text-[#666666]">
                Certificate graduates can transition into our 2-year diploma programs with credit towards their
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
                    <span className="font-proxima text-[15px] font-medium text-[#171717]">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/courses/diploma-programs"
                className="inline-flex items-center rounded-lg bg-brand-red px-8 py-3 font-proxima text-[16px] font-semibold text-white transition-colors hover:bg-[#a02830]"
              >
                Explore Diploma Programs
              </Link>
            </div>
            {/* Right visual */}
            <div className="hidden h-[280px] w-full max-w-[360px] rounded-2xl bg-gradient-to-br from-brand-red to-[#E85A4F] md:block" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white px-4 py-20 md:px-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12">
            <span className="mb-3 inline-block font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#057A65]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[40px]">
              Certificate Program FAQs
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-[#eeeeee] bg-white shadow-sm">
                <button
                  className="flex w-full items-start justify-between gap-4 px-7 py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-proxima text-[17px] font-bold text-[#171717]">{faq.question}</span>
                  <span className="mt-1 flex-shrink-0 text-[#057A65]" aria-hidden="true">
                    {openFaq === i ? '\u2212' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6">
                    <p className="font-proxima text-[15px] leading-[1.6] text-[#555555]">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-gradient-to-br from-secondary to-[#06d4b2] px-4 py-20 md:px-20">
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <h2 className="mb-4 font-nexa text-3xl font-semibold text-[#0B0B0F] md:text-[40px] md:leading-[1.1]">
            Start Building Your Skills Today
          </h2>
          <p className="mb-8 max-w-[550px] font-proxima text-[17px] leading-[1.5] text-[#171717]/60">
            Enroll in a 6-month professional certificate program. One-time payment of 48,000 KES. No hidden fees.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-lg bg-[#0B0B0F] px-8 py-3 font-proxima text-[17px] font-semibold text-white transition-colors hover:bg-[#333333]"
            >
              Apply Now
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-lg border-2 border-white bg-white/15 px-8 py-3 font-proxima text-[17px] font-medium text-white transition-colors hover:bg-white/25"
            >
              Enquire Now
            </Link>
            <a
              href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about professional certificate programs")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Professional Certificates CTA')}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-whatsapp px-8 py-3 font-proxima text-[17px] font-medium text-white transition-colors hover:bg-[#1da851]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}
