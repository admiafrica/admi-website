import Link from 'next/link'
import {
  IconSchool,
  IconShieldCheck,
  IconAward,
  IconCertificate,
  IconGlobe,
  IconArrowsExchange,
  IconBriefcase,
  IconTrendingUp,
  IconClipboardCheck,
  IconLayersSubtract,
  IconUsers,
  IconChecklist
} from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { Accreditation, QualityStandard, AccreditationBenefit } from '@/types/accreditation'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ACCREDITATIONS: Accreditation[] = [
  {
    title: 'Woolf University',
    subtitle: 'EU-Accredited Degree Partner',
    description:
      'Woolf is an EU-accredited, degree-granting institution. Through our partnership, ADMI diploma graduates can earn ECTS credits recognised across the European Higher Education Area.',
    Icon: IconSchool,
    borderColor: '#08F6CF',
    accentColor: '#0A3D3D',
    iconBg: '#08F6CF22',
    tagBg: '#08F6CF22',
    tags: ['ECTS Credits', 'EU Accredited', 'International']
  },
  {
    title: 'TVETA Kenya',
    subtitle: 'National Technical Education Authority',
    description:
      'Registered with Kenya\'s Technical and Vocational Education and Training Authority. All programmes meet national quality standards and comply with KNQF requirements.',
    Icon: IconShieldCheck,
    borderColor: '#BA2E36',
    accentColor: '#BA2E36',
    iconBg: '#BA2E3622',
    tagBg: '#BA2E3622',
    tags: ['KNQF Compliant', 'National Recognition']
  },
  {
    title: 'Pearson BTEC',
    subtitle: 'Globally Recognised Professional Certification',
    description:
      'Professional certificates carry Pearson BTEC certification, globally recognised by employers and universities as a mark of vocational excellence.',
    Icon: IconAward,
    borderColor: '#F76335',
    accentColor: '#F76335',
    iconBg: '#F7633522',
    tagBg: '#F7633522',
    tags: ['Employer Recognised', 'Global Standard']
  }
]

const QUALITY_STANDARDS: QualityStandard[] = [
  {
    title: 'ECTS Credits',
    description:
      'European Credit Transfer System ensures your qualifications are portable and recognised across the continent.',
    Icon: IconCertificate,
    iconColor: '#08F6CF'
  },
  {
    title: 'KNQF Level Mapping',
    description:
      'Each programme maps to specific KNQF levels, ensuring alignment with national education standards and employer expectations.',
    Icon: IconLayersSubtract,
    iconColor: '#0A3D3D'
  },
  {
    title: 'Quality Assurance',
    description:
      'Rigorous internal and external quality processes ensure curriculum relevance, teaching excellence, and student success.',
    Icon: IconClipboardCheck,
    iconColor: '#BA2E36'
  },
  {
    title: 'Industry Advisory Board',
    description:
      'Leading creative industry professionals review and guide programme content to ensure graduates are career-ready.',
    Icon: IconUsers,
    iconColor: '#F76335'
  }
]

const BENEFITS: AccreditationBenefit[] = [
  {
    title: 'International Recognition',
    description:
      'Your qualifications are recognised across Europe and beyond through ECTS credit alignment.',
    Icon: IconGlobe,
    iconColor: '#08F6CF'
  },
  {
    title: 'Credit Transfer',
    description:
      'Seamlessly transfer credits between ADMI programmes and towards international degree pathways.',
    Icon: IconArrowsExchange,
    iconColor: '#0A3D3D'
  },
  {
    title: 'Employer Confidence',
    description:
      'Accredited qualifications give employers confidence in the standards and rigour of your education.',
    Icon: IconBriefcase,
    iconColor: '#BA2E36'
  },
  {
    title: 'Pathway to Degrees',
    description:
      'Progress from certificate to diploma to degree through a structured, credit-bearing academic pathway.',
    Icon: IconTrendingUp,
    iconColor: '#F76335'
  },
  {
    title: 'Government-Registered Programmes',
    description:
      'All programmes are registered with TVETA Kenya, meeting the national standards for technical and vocational education.',
    Icon: IconChecklist,
    iconColor: '#0A3D3D'
  },
  {
    title: 'Student Protection Standards',
    description:
      'Robust quality frameworks safeguard your learning experience with regular audits and transparent reporting.',
    Icon: IconShieldCheck,
    iconColor: '#BA2E36'
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AccreditationPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Accreditation"
        description="ADMI holds accreditation from Woolf University (EU-accredited ECTS credits), TVETA Kenya, and Pearson BTEC. Internationally recognised standards that validate the quality of every programme."
        keywords="ADMI accreditation, Woolf University, TVETA Kenya, Pearson BTEC, ECTS credits, creative arts accreditation, Kenya university accreditation, quality assurance"
      />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A0A0A]">
          <div className="section-container">
            <div className="pb-20 pt-28 md:pb-24 md:pt-36">
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-10 bg-[#BA2E36]" />
                <p className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#BA2E36]">
                  Quality Assurance
                </p>
              </div>
              <h1 className="mt-5 max-w-[750px] font-fraunces text-[36px] font-bold leading-[1.15] text-white md:text-[48px]">
                Our Accreditations and Quality Assurance
              </h1>
              <p className="mt-5 max-w-[650px] font-proxima text-[17px] leading-[1.65] text-white/80">
                Internationally recognised standards that validate the quality and rigour of every ADMI programme.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. PRIMARY ACCREDITATIONS                                    */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-10 bg-[#0A3D3D]" />
              <p className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">
                Primary Accreditations
              </p>
            </div>
            <h2 className="mt-4 font-fraunces text-[30px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[36px]">
              Recognised Standards of Excellence
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {ACCREDITATIONS.map((acc) => (
                <div
                  key={acc.title}
                  className="flex flex-col rounded-2xl bg-white p-8 md:p-10"
                  style={{ border: `2px solid ${acc.borderColor}` }}
                >
                  {/* Icon */}
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: acc.iconBg }}
                  >
                    <acc.Icon size={32} style={{ color: acc.accentColor }} />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-5 font-fraunces text-[24px] font-bold text-[#0A0A0A]">
                    {acc.title}
                  </h3>
                  <p
                    className="mt-1 font-proxima text-[14px] font-semibold"
                    style={{ color: acc.accentColor }}
                  >
                    {acc.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-4 font-proxima text-[15px] leading-[1.7] text-[#555]">
                    {acc.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {acc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-3.5 py-1.5 font-proxima text-[12px] font-semibold"
                        style={{
                          backgroundColor: acc.tagBg,
                          color: acc.accentColor
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. QUALITY FRAMEWORK                                         */}
        {/* ============================================================ */}
        <section className="w-full bg-[#F5F5F5]">
          <div className="section-container section-padding">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-10 bg-[#F76335]" />
              <p className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#F76335]">
                Quality Framework
              </p>
            </div>
            <h2 className="mt-4 font-fraunces text-[30px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[36px]">
              Our Quality Standards
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {QUALITY_STANDARDS.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col rounded-xl bg-white p-8 transition-shadow hover:shadow-md"
                >
                  <item.Icon size={32} style={{ color: item.iconColor }} />
                  <h3 className="mt-4 font-fraunces text-[20px] font-bold text-[#0A0A0A]">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-proxima text-[14px] leading-[1.6] text-[#555]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. WHAT THIS MEANS FOR YOU                                   */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-10 bg-[#08F6CF]" />
              <p className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">
                For You
              </p>
            </div>
            <h2 className="mt-4 font-fraunces text-[30px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[36px]">
              What This Means For You
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col rounded-xl bg-[#F9FAFB] p-7 transition-shadow hover:shadow-md"
                >
                  <benefit.Icon size={28} style={{ color: benefit.iconColor }} />
                  <h3 className="mt-4 font-fraunces text-[18px] font-bold text-[#0A0A0A]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 font-proxima text-[14px] leading-[1.6] text-[#555]">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. CTA                                                       */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A0A0A]">
          <div className="section-container section-padding text-center">
            <h2 className="font-fraunces text-[30px] font-bold leading-[1.15] text-white md:text-[36px]">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] font-proxima text-[16px] leading-[1.65] text-white/80">
              Join a community of learners with internationally recognised qualifications.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center rounded-lg bg-[#BA2E36] px-8 py-3.5 font-proxima text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Apply Now
              </Link>
              <Link
                href="/academic-pathways"
                className="inline-flex items-center rounded-lg border border-white/60 px-8 py-3.5 font-proxima text-[16px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Explore Programmes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
