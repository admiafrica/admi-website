import Link from 'next/link'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getIcon } from '@/utils/icon-map'
import { getPageCached } from '@/utils/contentful-cached'
import type {
  AccreditationPageData,
  AccreditationCMS,
  QualityStandardCMS,
  AccreditationBenefitCMS
} from '@/types/accreditation'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FALLBACK: AccreditationPageData = {
  accreditations: [
    {
      title: 'Woolf University',
      subtitle: 'EU-Accredited Degree Partner',
      description:
        'Woolf is an EU-accredited, degree-granting institution. Through our partnership, ADMI diploma graduates can earn ECTS credits recognised across the European Higher Education Area.',
      icon: 'school',
      borderColor: '#8EBFB0',
      accentColor: '#0A3D3D',
      iconBg: '#8EBFB022',
      tagBg: '#8EBFB022',
      tags: ['ECTS Credits', 'EU Accredited', 'International']
    },
    {
      title: 'TVETA Kenya',
      subtitle: 'National Technical Education Authority',
      description:
        'Registered with Kenya\'s Technical and Vocational Education and Training Authority. All programmes meet national quality standards and comply with KNQF requirements.',
      icon: 'shield-check',
      borderColor: '#C1272D',
      accentColor: '#C1272D',
      iconBg: '#C1272D22',
      tagBg: '#C1272D22',
      tags: ['KNQF Compliant', 'National Recognition']
    },
    {
      title: 'Pearson BTEC',
      subtitle: 'Globally Recognised Professional Certification',
      description:
        'Professional certificates carry Pearson BTEC certification, globally recognised by employers and universities as a mark of vocational excellence.',
      icon: 'award',
      borderColor: '#EF7B2E',
      accentColor: '#EF7B2E',
      iconBg: '#EF7B2E22',
      tagBg: '#EF7B2E22',
      tags: ['Employer Recognised', 'Global Standard']
    }
  ],
  qualityStandards: [
    { title: 'ECTS Credits', description: 'European Credit Transfer System ensures your qualifications are portable and recognised across the continent.', icon: 'certificate', iconColor: '#8EBFB0' },
    { title: 'KNQF Level Mapping', description: 'Each programme maps to specific KNQF levels, ensuring alignment with national education standards and employer expectations.', icon: 'layers-subtract', iconColor: '#0A3D3D' },
    { title: 'Quality Assurance', description: 'Rigorous internal and external quality processes ensure curriculum relevance, teaching excellence, and student success.', icon: 'clipboard-check', iconColor: '#C1272D' },
    { title: 'Industry Advisory Board', description: 'Leading creative industry professionals review and guide programme content to ensure graduates are career-ready.', icon: 'users', iconColor: '#EF7B2E' }
  ],
  benefits: [
    { title: 'International Recognition', description: 'Your qualifications are recognised across Europe and beyond through ECTS credit alignment.', icon: 'globe', iconColor: '#8EBFB0' },
    { title: 'Credit Transfer', description: 'Seamlessly transfer credits between ADMI programmes and towards international degree pathways.', icon: 'arrows-exchange', iconColor: '#0A3D3D' },
    { title: 'Employer Confidence', description: 'Accredited qualifications give employers confidence in the standards and rigour of your education.', icon: 'briefcase', iconColor: '#C1272D' },
    { title: 'Pathway to Degrees', description: 'Progress from certificate to diploma to degree through a structured, credit-bearing academic pathway.', icon: 'trending-up', iconColor: '#EF7B2E' },
    { title: 'Government-Registered Programmes', description: 'All programmes are registered with TVETA Kenya, meeting the national standards for technical and vocational education.', icon: 'checklist', iconColor: '#0A3D3D' },
    { title: 'Student Protection Standards', description: 'Robust quality frameworks safeguard your learning experience with regular audits and transparent reporting.', icon: 'shield-check', iconColor: '#C1272D' }
  ],
  seoTitle: 'Accreditation',
  seoDescription:
    'ADMI holds accreditation from Woolf University (EU-accredited ECTS credits), TVETA Kenya, and Pearson BTEC. Internationally recognised standards that validate the quality of every programme.'
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ page: AccreditationPageData }> = async () => {
  let page = FALLBACK

  try {
    const entry = await getPageCached('accreditationPage', 'page:accreditation')
    if (entry?.fields) {
      const f = entry.fields
      page = {
        accreditations: f.accreditations || FALLBACK.accreditations,
        qualityStandards: f.qualityStandards || FALLBACK.qualityStandards,
        benefits: f.benefits || FALLBACK.benefits,
        seoTitle: f.seoTitle || FALLBACK.seoTitle,
        seoDescription: f.seoDescription || FALLBACK.seoDescription
      }
    }
  } catch (error) {
    console.error('[Accreditation] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { page },
    revalidate: 300 // ISR: revalidate every 5 minutes
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AccreditationPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title={page.seoTitle}
        description={page.seoDescription}
        keywords="ADMI accreditation, Woolf University, TVETA Kenya, Pearson BTEC, ECTS credits, creative arts accreditation, Kenya university accreditation, quality assurance"
      />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="w-full bg-admi-black">
          <div className="section-container">
            <div className="pb-20 pt-28 md:pb-24 md:pt-36">
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-10 bg-brand-red" />
                <p className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                  Quality Assurance
                </p>
              </div>
              <h1 className="mt-5 max-w-[750px] font-proxima text-[36px] font-bold leading-[1.15] text-white md:text-[48px]">
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
            <h2 className="mt-4 font-proxima text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
              Recognised Standards of Excellence
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {page.accreditations.map((acc: AccreditationCMS) => {
                const Icon = getIcon(acc.icon)
                return (
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
                      {Icon && <Icon size={32} style={{ color: acc.accentColor }} />}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="mt-5 font-proxima text-[24px] font-bold text-admi-black">
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
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. QUALITY FRAMEWORK                                         */}
        {/* ============================================================ */}
        <section className="w-full bg-[#F5F5F5]">
          <div className="section-container section-padding">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-10 bg-brand-orange" />
              <p className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">
                Quality Framework
              </p>
            </div>
            <h2 className="mt-4 font-proxima text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
              Our Quality Standards
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {page.qualityStandards.map((item: QualityStandardCMS) => {
                const Icon = getIcon(item.icon)
                return (
                  <div
                    key={item.title}
                    className="flex flex-col rounded-xl bg-white p-8 transition-shadow hover:shadow-md"
                  >
                    {Icon && <Icon size={32} style={{ color: item.iconColor }} />}
                    <h3 className="mt-4 font-proxima text-[20px] font-bold text-admi-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-proxima text-[14px] leading-[1.6] text-[#555]">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. WHAT THIS MEANS FOR YOU                                   */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-10 bg-secondary" />
              <p className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">
                For You
              </p>
            </div>
            <h2 className="mt-4 font-proxima text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
              What This Means For You
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.benefits.map((benefit: AccreditationBenefitCMS) => {
                const Icon = getIcon(benefit.icon)
                return (
                  <div
                    key={benefit.title}
                    className="flex flex-col rounded-xl bg-[#F9FAFB] p-7 transition-shadow hover:shadow-md"
                  >
                    {Icon && <Icon size={28} style={{ color: benefit.iconColor }} />}
                    <h3 className="mt-4 font-proxima text-[18px] font-bold text-admi-black">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 font-proxima text-[14px] leading-[1.6] text-[#555]">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. CTA                                                       */}
        {/* ============================================================ */}
        <section className="w-full bg-admi-black">
          <div className="section-container section-padding text-center">
            <h2 className="font-proxima text-[30px] font-bold leading-[1.15] text-white md:text-[36px]">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] font-proxima text-[16px] leading-[1.65] text-white/80">
              Join a community of learners with internationally recognised qualifications.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center rounded-lg bg-brand-red px-8 py-3.5 font-proxima text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
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
