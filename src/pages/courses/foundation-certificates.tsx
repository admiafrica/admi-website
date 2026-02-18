import { useState } from 'react'
import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

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
    title: 'Diploma Program',
    description:
      '2-year comprehensive training with internship. Launch your professional career earning 60K-120K/month.',
    badge: 'Highest ROI',
    bgColor: '#C1272D',
    textColor: '#FFFFFF'
  }
]

const foundationPrograms = [
  {
    title: 'Multimedia Certificate',
    description: 'Explore film, music, design, and animation. Discover which creative path is right for you.',
    price: '48,000 KES',
    duration: '6 Months',
    slug: 'multimedia-certificate',
    layout: 'large'
  },
  {
    title: 'AI Adoption & Digital Transformation',
    description:
      'Build essential digital skills including AI tools, data literacy, and digital transformation fundamentals.',
    price: '48,000 KES',
    duration: '6 Months',
    slug: 'ai-adoption-digital-transformation',
    layout: 'large'
  },
  {
    title: 'Music Production & Sound Engineering',
    description: 'Introduction to music theory, basic recording, sound design & audio editing',
    price: '93,100 KES',
    slug: 'music-production-and-sound-engineering-certificate',
    layout: 'small'
  },
  {
    title: 'Photography',
    description: 'Camera techniques, lighting, composition & post-processing fundamentals',
    price: '48,000 KES',
    slug: 'photography-certificate',
    layout: 'small'
  },
  {
    title: '2D Animation (Rubika)',
    description: 'Character animation, storyboarding, digital illustration & motion principles',
    price: '93,100 KES',
    slug: '2d-animation-certificate-rubika',
    layout: 'small'
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
      'Absolutely! Foundation certificates are Step 1 of our career pathway. Many students progress to Professional Certificates and then to 2-year Diploma Programs for maximum career impact.'
  },
  {
    question: 'What schedule options are available?',
    answer:
      'We offer flexible scheduling: weekday evenings (6-9pm) or Saturday full-day (9am-5pm). This allows you to study while working or attending school.'
  }
]

export default function FoundationCertificatesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <MainLayout>
      <PageSEO
        title="Foundation Certificate Programs - ADMI Kenya | Start Your Creative Career"
        description="Begin your creative journey with ADMI's foundation certificate programs. No experience required. 6 months, from 48,000 KES. Creative Media, Digital Technology, Music & more."
        keywords="foundation certificate Kenya, entry level creative courses, beginner digital media, ADMI foundation, creative career start, media training Kenya"
        url="/courses/foundation-certificates"
      />

      {/* Hero Section */}
      <section className="w-full bg-white pb-16 pt-12">
        <div className="section-container flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-1 flex-col gap-6">
            <span className="w-fit rounded-full bg-[#FFF3EE] px-4 py-2 font-proxima text-[13px] font-semibold text-brand-orange">
              No Experience Required
            </span>
            <h1 className="font-nexa text-4xl font-semibold leading-[1.15] tracking-tight text-[#171717] md:text-[48px]">
              Start Your Creative Journey from Zero
            </h1>
            <p className="max-w-[560px] font-proxima text-[18px] leading-[1.6] text-[#666666]">
              Foundation certificates are your entry point into the creative media industry. Build core skills in 6
              months and step up to diploma programs for a full career transformation.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg bg-brand-orange px-8 py-3 font-proxima text-[17px] font-semibold text-white transition-colors hover:bg-[#e5552a]"
              >
                Apply Now
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg border-2 border-brand-orange bg-[#FFF3EE] px-8 py-3 font-proxima text-[17px] font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
              >
                Enquire Now
              </Link>
              <a
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about foundation certificate programs")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Foundation Certificates Hero')}
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
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-orange to-[#FFB088] text-white">
              <span className="font-proxima text-lg font-medium opacity-60">Hero Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Section */}
      <section className="section-padding w-full bg-[#f9f9f9]">
        <div className="section-container">
          <div className="mb-12">
            <span className="mb-3 inline-block font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">
              YOUR GROWTH PATHWAY
            </span>
            <h2 className="font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[40px]">
              From Beginner to Professional in 3 Steps
            </h2>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch">
            {pathwaySteps.map((step, i) => (
              <div key={i} className="flex flex-1 items-center gap-4 md:gap-0">
                <article className="flex w-full flex-col items-center gap-4 rounded-2xl border border-[#eeeeee] bg-white p-8 text-center shadow-md">
                  {/* Step Number Circle */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: step.bgColor, color: step.textColor }}
                  >
                    <span className="font-proxima text-[20px] font-bold">{step.step}</span>
                  </div>
                  <h3 className="font-proxima text-[18px] font-bold text-[#171717]">{step.title}</h3>
                  <p className="font-proxima text-[14px] leading-[1.6] text-[#555555]">{step.description}</p>
                  {step.price && (
                    <span className="font-proxima text-[16px] font-bold" style={{ color: step.priceColor }}>
                      {step.price}
                    </span>
                  )}
                  {step.badge && (
                    <span className="rounded-md bg-[#FFF0EE] px-3 py-1 font-proxima text-[12px] font-semibold text-brand-red">
                      {step.badge}
                    </span>
                  )}
                </article>
                {/* Arrow connector */}
                {i < pathwaySteps.length - 1 && (
                  <span className="hidden flex-shrink-0 px-3 font-proxima text-[24px] text-[#cccccc] md:block">
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation Programs Grid */}
      <section className="section-padding w-full bg-white">
        <div className="section-container">
          <div className="mb-12">
            <span className="mb-3 inline-block font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">
              FOUNDATION CERTIFICATES
            </span>
            <h2 className="mb-3 font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[40px]">
              Discover Your Creative Calling
            </h2>
            <p className="font-proxima text-[17px] text-[#555555]">
              Hands-on introductory programs perfect for complete beginners
            </p>
          </div>

          {/* Top 2 - larger cards */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {foundationPrograms
              .filter((p) => p.layout === 'large')
              .map((program, i) => (
                <article
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#eeeeee] bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="h-[200px] w-full bg-gradient-to-br from-[#3a2a1a] to-[#6a4a2a]" />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-proxima text-[20px] font-bold text-[#171717]">{program.title}</h3>
                    <p className="flex-1 font-proxima text-[14px] leading-[1.6] text-[#555555]">
                      {program.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-proxima text-[16px] font-bold text-brand-orange">{program.price}</span>
                      {program.duration && (
                        <span className="font-proxima text-[13px] font-medium text-[#777777]">{program.duration}</span>
                      )}
                    </div>
                    <Link
                      href={`/courses/${program.slug}`}
                      className="mt-1 font-proxima text-[14px] font-semibold text-brand-orange hover:underline"
                    >
                      View Program &rarr;
                    </Link>
                  </div>
                </article>
              ))}
          </div>

          {/* Bottom 3 - smaller cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {foundationPrograms
              .filter((p) => p.layout === 'small')
              .map((program, i) => (
                <article
                  key={i}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#eeeeee] bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="h-[140px] w-full bg-gradient-to-br from-[#2a2a2a] to-[#444444]" />
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="w-fit rounded-md bg-[#FFF3EE] px-2 py-1 font-proxima text-[12px] font-semibold text-brand-orange">
                      {program.price}
                    </span>
                    <h3 className="font-proxima text-[18px] font-bold text-[#171717]">{program.title}</h3>
                    <p className="flex-1 font-proxima text-[14px] leading-[1.5] text-[#555555]">
                      {program.description}
                    </p>
                    <Link
                      href={`/courses/${program.slug}`}
                      className="mt-1 font-proxima text-[14px] font-semibold text-brand-orange hover:underline"
                    >
                      View Program &rarr;
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding w-full bg-[#f9f9f9]">
        <div className="section-container">
          <div className="mb-12">
            <span className="mb-3 inline-block font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[40px]">
              Foundation Certificate FAQs
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
                  <span className="mt-1 flex-shrink-0 text-brand-orange" aria-hidden="true">
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
      <section className="section-padding w-full bg-gradient-to-br from-brand-orange to-[#FFB088]">
        <div className="section-container flex max-w-[700px] flex-col items-center text-center">
          <h2 className="mb-4 font-nexa text-3xl font-semibold text-white md:text-[40px] md:leading-[1.1]">
            Take the First Step Toward Your Creative Career
          </h2>
          <p className="mb-8 max-w-[580px] font-proxima text-[17px] leading-[1.5] text-[#171717]/80">
            No experience needed. Just passion and commitment. Enroll in a Foundation Certificate for 48,000 KES and
            begin your transformation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-proxima text-[17px] font-bold text-brand-orange transition-colors hover:bg-gray-100"
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
              href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about foundation certificate programs")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Foundation Certificates CTA')}
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
