import { useState } from 'react'
import Link from 'next/link'
import { IconPlus, IconMinus, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { CourseCard } from '@/components/courses/CourseCard'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { getCoursesCached } from '@/utils/contentful-cached'

interface DiplomaCourse {
  name: string
  slug: string
  description: string
  duration: string
  deliveryMode: string
  imageUrl?: string
}

const advantages = [
  {
    badge: 'EU ACCREDITED',
    title: 'Woolf Accreditation',
    description:
      'Earn internationally recognized EU-accredited credits towards a degree. Our partnership with Woolf University means your diploma carries weight globally - a credential parents and employers trust.',
    features: [
      'Credits transferable to degree programs worldwide',
      'TVETA Kenya registered qualification',
      'Pathway from diploma to full university degree'
    ]
  },
  {
    title: 'Industry Connections',
    description:
      'Learn from active industry professionals and build your network while studying. Our 500+ employer partnerships give you direct access to the creative media industry.',
    features: [
      'Industry mentors from Safaricom, NMG, Standard Group',
      'Guest lectures and masterclasses from working professionals',
      'Portfolio reviews and networking events with employers'
    ]
  },
  {
    title: 'Guaranteed Internship Placement',
    description:
      'Every diploma student completes a mandatory industry internship semester. This is your bridge from classroom to career - real work, real companies, real experience.',
    features: [
      'Mandatory internship semester at top media companies',
      '88% of interns receive full-time job offers',
      'Dedicated placement coordinator matches you to your field'
    ]
  }
]

const diplomaFeatures = [
  'Starting salary: 60,000 - 120,000 KES/month',
  'Guaranteed industry internship placement',
  'EU-accredited via Woolf University partnership',
  '88% employed within 3 months of graduating',
  'Pathway from diploma to full university degree',
  '500+ employer partnerships for job placement'
]

const certificateFeatures = [
  'Starting salary: 25,000 - 50,000 KES/month',
  'No internship included',
  'Foundation-level skills only'
]

const testimonials = [
  {
    quote:
      "The diploma gave me hands-on skills that no university could. Within 2 months of graduating, I landed a role at Safaricom's content team earning 85,000 KES/month.",
    name: 'Grace Wanjiku',
    role: 'Film Production Diploma, 2024'
  },
  {
    quote:
      "I started as a complete beginner. ADMI's music production diploma connected me with industry mentors and now I produce for some of Kenya's top artists.",
    name: 'Brian Ochieng',
    role: 'Music Production Diploma, 2023'
  }
]

const faqs = [
  {
    question: "What's the difference between a diploma and a certificate?",
    answer:
      'Our 2-year diploma programs provide comprehensive professional training with industry internships, leading to higher-level careers with average starting salaries of 60,000-120,000 KES/month. Certificate programs (6 months) offer foundational skills for entry-level roles.'
  },
  {
    question: 'Can I afford an ADMI diploma program?',
    answer:
      'Yes! We offer flexible payment plans starting at 15,000 KES/month. Our diploma graduates earn an average of 75,000 KES/month within 3 months of graduation, making the investment highly profitable.'
  },
  {
    question: 'Will a diploma get me a better job than a certificate?',
    answer:
      '85% of our diploma graduates secure mid-level positions within 3 months, with average salaries 2-3x higher than certificate graduates. Employers prefer diploma holders for supervisory and creative leadership roles.'
  },
  {
    question: 'What payment plans are available?',
    answer:
      'We offer three options: Monthly (15,000 KES/month for 30 months), Per Semester (100,000 KES per semester), or Pay Upfront (405,000 KES - save 45,000 KES). All programs include 4 academic semesters plus a mandatory internship semester.'
  },
  {
    question: 'Do I need prior experience to apply?',
    answer:
      'No prior experience needed! Our diploma programs are designed for passionate individuals at all skill levels. All equipment and software are provided. You just need commitment and a willingness to learn.'
  }
]

export default function DiplomaCoursesPage({ diplomaCourses = [] }: { diplomaCourses: DiplomaCourse[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <MainLayout heroOverlap>
      <PageSEO
        title="Diploma Programmes - ADMI Kenya | Career Transformation in Digital Media"
        description="Launch your digital media career with ADMI's comprehensive diploma programmes. 88% graduate employment rate. Flexible payment plans from 15,000 KES/month. Study Film, Music, Design, Animation & more."
        keywords="diploma programmes Kenya, ADMI diplomas, digital media diploma, music production diploma, graphic design diploma, animation diploma, video game development, Nairobi diplomas"
        url="/courses/diploma-programs"
      />

      <div className="font-proxima">
        {/* Hero Section */}
        <section className="w-full bg-white">
          <div className="section-container flex flex-col items-center gap-5 pb-16 pt-28 md:pb-24 md:pt-36 lg:flex-row lg:items-center lg:gap-10">
            {/* Left Content */}
            <div className="flex flex-1 flex-col">
              <span className="mb-5 w-fit rounded-full bg-[#FFF0EE] px-4 py-1.5 text-[12px] font-semibold text-[#E85A4F]">
                May 2026 Intake Now Open
              </span>
              <h1 className="section-heading-light mb-4">
                Launch Your Professional Career with Industry-Recognized Diplomas
              </h1>
              <p className="section-subheading-light mb-6 max-w-[560px]">
                2-year comprehensive diploma programmes in Film, Music, Design &amp; more. 88% graduate employment rate.
                Flexible payment plans from 15,000 KES/month.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/enquiry"
                  className="inline-flex items-center rounded-lg bg-brand-red px-9 py-[18px] font-proxima text-[17px] font-semibold text-white transition hover:bg-[#a02830]"
                >
                  Apply Now
                </Link>
                <Link
                  href="/enquiry"
                  className="inline-flex items-center rounded-lg border-2 border-solid border-brand-red bg-[#FFF0F0] px-9 py-[18px] font-proxima text-[17px] font-medium text-brand-red transition hover:bg-brand-red hover:text-white"
                >
                  Enquire Now
                </Link>
                <a
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to learn more about diploma programmes")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Diploma Programs Hero')}
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
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-red to-[#E85A4F] text-white">
                <span className="text-lg font-medium opacity-60">Hero Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="w-full bg-[#1a1a1a] py-6 md:py-10">
          <div className="section-container flex flex-col items-center justify-around gap-5 md:flex-row md:gap-8">
            {[
              { value: '88%', label: 'Employment Rate' },
              { value: '65K', label: 'Avg. Starting Salary (KES/mo)' },
              { value: '92%', label: 'Working in Their Field' },
              { value: '47%', label: 'Promoted in Year 1' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-nexa text-[32px] font-bold leading-none tracking-tight text-white sm:text-[48px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] font-medium uppercase tracking-[1px] text-[#999999]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Programs Grid */}
        <section className="section-padding w-full bg-white">
          <div className="section-container">
            <div className="mb-12">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                DIPLOMA PROGRAMS
              </span>
              <h2 className="mb-3 font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[42px]">
                Choose Your Creative Career Path
              </h2>
              <p className="text-[17px] text-[#555555]">
                2-year industry-recognized programs with mandatory internship and job placement support
              </p>
            </div>

            <div className="grid auto-rows-[440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {diplomaCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  name={course.name}
                  slug={course.slug}
                  description={course.description}
                  duration={course.duration}
                  deliveryMode={course.deliveryMode}
                  imageUrl={course.imageUrl}
                  accentColor="#C1272D"
                  accentBg="#FFF0F0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Diploma Advantages */}
        <section className="section-padding w-full bg-[#f9f9f9]">
          <div className="section-container">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                WHY CHOOSE AN ADMI DIPLOMA
              </span>
              <h2 className="mb-3 font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[42px]">
                More Than a Qualification
              </h2>
              <p className="mx-auto max-w-[700px] text-[17px] text-[#555555]">
                An ADMI diploma gives you internationally recognized credentials, real industry experience, and
                guaranteed work placement
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {advantages.map((adv, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-[#eeeeee] bg-white p-5 shadow-md transition-shadow hover:shadow-xl sm:p-8"
                >
                  {adv.badge && (
                    <span className="mb-4 inline-block rounded-md bg-[#FFF0EE] px-3 py-1 text-[11px] font-bold uppercase tracking-[2px] text-brand-red">
                      {adv.badge}
                    </span>
                  )}
                  <h3 className="mb-3 text-[20px] font-bold text-[#171717]">{adv.title}</h3>
                  <p className="mb-5 text-[14px] leading-[1.6] text-[#555555]">{adv.description}</p>
                  <ul className="space-y-3">
                    {adv.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 flex-shrink-0"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#C1272D"
                          strokeWidth="2.5"
                        >
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        <span className="text-[14px] text-[#171717]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Comparison */}
        <section className="section-padding w-full bg-white">
          <div className="section-container">
            <div className="mb-12">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-secondary">
                DIPLOMA vs CERTIFICATE
              </span>
              <h2 className="mb-3 font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[42px]">
                Diploma Graduates Earn 3x More
              </h2>
              <p className="text-[17px] text-[#555555]">
                See how a 2-year diploma investment pays for itself within months of graduation
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Diploma Card */}
              <div className="overflow-hidden rounded-2xl border-2 border-brand-red bg-white p-5 shadow-md transition-shadow hover:shadow-xl sm:p-8">
                <span className="mb-4 inline-block rounded-md bg-[#FFF0EE] px-3 py-1 text-[11px] font-bold uppercase tracking-[2px] text-brand-red">
                  RECOMMENDED
                </span>
                <h3 className="mb-2 text-[20px] font-bold text-[#171717] sm:text-[24px]">Diploma Programme</h3>
                <p className="mb-6 text-[16px] font-medium text-brand-red sm:text-[18px]">From 68,000 KES/semester</p>
                <ul className="mb-8 space-y-4">
                  {diplomaFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 flex-shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#C1272D"
                        strokeWidth="2.5"
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span className="text-[14px] text-[#171717] sm:text-[15px]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/enquiry"
                  className="flex w-full items-center justify-center rounded-xl bg-brand-red py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#a02830] sm:text-[16px]"
                >
                  Apply for Diploma
                </Link>
              </div>

              {/* Certificate Card */}
              <div className="overflow-hidden rounded-2xl border border-[#eeeeee] bg-[#f9f9f9] p-5 shadow-md transition-shadow hover:shadow-xl sm:p-8">
                <h3 className="mb-2 text-[20px] font-bold text-[#555555] sm:text-[24px]">Certificate Programme</h3>
                <p className="mb-6 text-[15px] font-medium text-[#555555] sm:text-[16px]">48,000 KES one-time</p>
                <ul className="mb-8 space-y-4">
                  {certificateFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 flex-shrink-0"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999999"
                        strokeWidth="2"
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span className="text-[14px] text-[#555555] sm:text-[15px]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/courses/professional-certificates"
                  className="flex w-full items-center justify-center rounded-xl bg-[#555555] py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#444444] sm:text-[16px]"
                >
                  Apply for Certificate
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Plan */}
        <section className="section-padding w-full bg-[#f9f9f9]">
          <div className="section-container">
            <div className="mb-12">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                SEMESTER PAYMENT PLAN
              </span>
              <h2 className="font-nexa text-3xl font-semibold tracking-tight text-[#171717] md:text-[42px]">
                Pay Per Semester, in 3 Easy Installments
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: '1st Installment',
                  pct: '50%',
                  color: '#C1272D',
                  desc: 'Due at registration (e.g. 50,000 KES for 100K semester)'
                },
                {
                  title: '2nd Installment',
                  pct: '30%',
                  color: '#C1272D',
                  desc: 'Due mid-semester (e.g. 30,000 KES for 100K semester)'
                },
                {
                  title: '3rd Installment',
                  pct: '20%',
                  color: '#EF7B2E',
                  desc: 'Due before exams (e.g. 20,000 KES for 100K semester)'
                }
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 shadow-md transition-shadow hover:shadow-xl sm:p-8 ${i === 0 ? 'border-brand-red bg-[#FFF8F6]' : 'border-[#eeeeee] bg-white'}`}
                >
                  <h3 className="mb-3 text-[20px] font-bold text-[#171717]">{plan.title}</h3>
                  <p className="mb-3 text-[28px] font-bold tracking-tight sm:text-[36px]" style={{ color: plan.color }}>
                    {plan.pct}
                  </p>
                  <p className="text-[14px] text-[#555555]">{plan.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-2 text-center">
              <p className="text-[14px] text-[#777777]">
                Semester fees range from 68,000 - 100,000 KES depending on your program. Fees are reviewed each
                semester.
              </p>
              <p className="text-[14px] font-semibold text-[#555555]">
                All programs: 4 academic semesters + 1 mandatory internship semester
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding w-full bg-[#1a1a1a]">
          <div className="section-container">
            <div className="mb-12">
              <span className="mb-3 inline-block text-[13px] font-bold uppercase tracking-[3px] text-secondary">
                SUCCESS STORIES
              </span>
              <h2 className="font-nexa text-3xl font-semibold tracking-tight text-white md:text-[42px]">
                Hear From Our Diploma Graduates
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <article
                  key={i}
                  className="rounded-2xl bg-[#2a2a2a] p-5 shadow-md transition-shadow hover:shadow-lg sm:p-8"
                >
                  <blockquote className="mb-6">
                    <p className="text-[16px] italic leading-[1.6] text-[#cccccc]">&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 flex-shrink-0 rounded-full ${i === 0 ? 'bg-brand-red' : 'bg-secondary'}`}
                    />
                    <div>
                      <p className="text-[15px] font-semibold text-white">{t.name}</p>
                      <p className="text-[13px] text-[#888888]">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding w-full bg-gradient-to-br from-brand-red to-[#E85A4F]">
          <div className="section-container flex max-w-[800px] flex-col items-center text-center">
            <h2 className="mb-4 font-nexa text-3xl font-bold tracking-tight text-white md:text-[48px] md:leading-[1.1]">
              Start Your High-Impact Diploma Journey
            </h2>
            <p className="mb-8 max-w-[600px] text-[18px] leading-[1.7] text-white/80">
              Apply by February 28 and save 20,000 KES on your first semester. Limited spots available for May 2026
              intake.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/enquiry"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-[15px] font-bold text-brand-red transition-colors hover:bg-gray-100 sm:px-8 sm:text-[17px]"
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
                href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to apply for a diploma programme")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Diploma Programs CTA')}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-whatsapp px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1da851] sm:px-8 sm:text-[17px]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
            <p className="mt-6 text-[14px] text-white/50">
              No application fee. 48-hour admission decision. 100% refundable deposit.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding w-full bg-[#f9f9f9]">
          <div className="section-container">
            <div className="mx-auto mb-8 max-w-[600px] text-center md:mb-12">
              <span className="section-label-light">DIPLOMA FAQS</span>
              <h2 className="section-heading-light">Everything You Need to Know</h2>
              <p className="section-subheading-light mt-4">
                Common questions about our diploma programmes, fees, and career outcomes.
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
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I have a question about ADMI diploma programmes.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, 'Diploma FAQ Banner')}
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

    const diplomaCourses: DiplomaCourse[] = courses
      .map(cleanCourseName)
      .filter((course: any) => {
        try {
          const programType = correctCourseMapping(course)
          return programType.toLowerCase().includes('diploma')
        } catch {
          return false
        }
      })
      .map((course: any) => ({
        name: course.fields.name,
        slug: course.fields.slug,
        description: getPlainTextFromRichText(course.fields.description),
        duration: course.fields.programType?.fields?.duration || '18 months',
        deliveryMode: course.fields.programType?.fields?.deliveryMode || 'In-person',
        imageUrl: course.fields.coverImage?.fields?.file?.url
          ? course.fields.coverImage.fields.file.url.startsWith('http')
            ? course.fields.coverImage.fields.file.url
            : `https:${course.fields.coverImage.fields.file.url}`
          : undefined
      }))

    return {
      props: { diplomaCourses },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error fetching diploma courses:', error)
    return {
      props: { diplomaCourses: [] },
      revalidate: 300
    }
  }
}
