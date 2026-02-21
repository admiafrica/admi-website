import Link from 'next/link'
import { IconCircleCheckFilled, IconArrowRight } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getIcon } from '@/utils/icon-map'
import { getPageCached } from '@/utils/contentful-cached'
import type { FellowshipPageData, FellowshipBenefitCMS, ApplicationStep } from '@/types/fellowship'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FALLBACK: FellowshipPageData = {
  benefits: [
    { icon: 'users', iconColor: '#0A3D3D', title: 'Mentorship', description: 'One-on-one guidance from industry leaders and seasoned creative professionals throughout the programme.' },
    { icon: 'cash', iconColor: '#C1272D', title: 'Funding', description: 'Financial support for creative projects, equipment, and professional development opportunities.' },
    { icon: 'network', iconColor: '#EF7B2E', title: 'Industry Access', description: 'Exclusive access to industry events, studio visits, networking opportunities, and potential internships.' },
    { icon: 'layout-grid', iconColor: '#8EBFB0', title: 'Portfolio Development', description: 'Structured support to build an industry-standard portfolio that showcases your unique creative vision.' }
  ],
  eligibilityCriteria: [
    'Graduate of any ADMI diploma or professional certificate programme',
    'Strong creative portfolio demonstrating technical skill and originality',
    'Demonstrated leadership potential and commitment to the creative industries',
    'Clear vision for a creative project or venture to develop during the fellowship',
    'Available to commit to the full 12-month programme'
  ],
  applicationSteps: [
    { number: '1', bgColor: '#EF7B2E', title: 'Submit Application', description: 'Complete the online application form with your personal details, creative statement, and project proposal.' },
    { number: '2', bgColor: '#0A3D3D', title: 'Portfolio Review', description: 'Our panel of industry experts and faculty members review your portfolio and creative body of work.' },
    { number: '3', bgColor: '#C1272D', title: 'Interview', description: 'Shortlisted candidates are invited for a personal interview to discuss their vision, goals, and fellowship plans.' }
  ],
  seoTitle: 'Fellowship',
  seoDescription: 'The ADMI Fellowship is a 12-month programme for outstanding graduates, offering mentorship, funding, industry access, and portfolio development to nurture Africa\'s next creative leaders.'
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ page: FellowshipPageData }> = async () => {
  let page = FALLBACK

  try {
    const entry = await getPageCached('fellowshipPage', 'page:fellowship')
    if (entry?.fields) {
      const f = entry.fields
      page = {
        benefits: f.benefits || FALLBACK.benefits,
        eligibilityCriteria: f.eligibilityCriteria || FALLBACK.eligibilityCriteria,
        applicationSteps: f.applicationSteps || FALLBACK.applicationSteps,
        seoTitle: f.seoTitle || FALLBACK.seoTitle,
        seoDescription: f.seoDescription || FALLBACK.seoDescription
      }
    }
  } catch (error) {
    console.error('[Fellowship] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { page },
    revalidate: 300
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FellowshipPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout footerBgColor="#1a1a1a" heroOverlap>
      <PageSEO
        title={page.seoTitle}
        description={page.seoDescription}
        keywords="ADMI fellowship, creative fellowship Kenya, mentorship programme, creative leaders Africa, ADMI graduates, fellowship application"
      />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section
          className="relative w-full overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #0A3D3D 0%, #061E1E 100%)' }}
        >
          <div className="section-container flex min-h-[420px] flex-col justify-center py-20 pt-28 md:py-24 md:pt-36">
            <div className="mb-5 flex items-center gap-3">
              <span className="block h-[3px] w-10 bg-secondary" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-secondary">Fellowship</span>
            </div>
            <h1 className="max-w-[700px] font-proxima text-[36px] font-bold leading-[1.15] text-white md:text-[48px]">
              ADMI Fellowship Programme
            </h1>
            <p className="mt-5 max-w-[650px] font-proxima text-[17px] leading-[1.6] text-white/80 md:text-[18px]">
              Nurturing emerging creative leaders through mentorship, funding, and industry access.
            </p>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. WHAT IS THE FELLOWSHIP                                     */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <span className="block h-[3px] w-10 bg-brand-red" />
                  <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">About the Programme</span>
                </div>
                <h2 className="font-proxima text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
                  What is the ADMI Fellowship?
                </h2>
                <p className="mt-6 max-w-[520px] font-proxima text-[16px] leading-[1.7] text-[#555]">
                  The ADMI Fellowship is a 12-month programme designed for exceptional graduates who demonstrate outstanding creative talent and leadership potential. Fellows receive dedicated mentorship from industry leaders, funding support for creative projects, privileged access to industry networks, and structured portfolio development.
                </p>
                <p className="mt-4 max-w-[520px] font-proxima text-[16px] leading-[1.7] text-[#555]">
                  This programme is our commitment to nurturing the next generation of creative leaders who will shape Africa&apos;s creative industries.
                </p>
              </div>
              <div className="w-full flex-shrink-0 md:w-[480px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#0A3D3D]/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1537861295351-76bb831ece99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Creative professionals collaborating in a studio environment"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. PROGRAMME BENEFITS                                         */}
        {/* ============================================================ */}
        <section className="w-full bg-[#F5F5F5]">
          <div className="section-container section-padding">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-[3px] w-10 bg-secondary" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#0A3D3D]">Programme Benefits</span>
            </div>
            <h2 className="font-proxima text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
              What Fellows Receive
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {page.benefits.map((benefit: FellowshipBenefitCMS) => {
                const Icon = getIcon(benefit.icon)
                return (
                  <div key={benefit.title} className="flex flex-col rounded-xl bg-white p-7 transition-shadow hover:shadow-md">
                    {Icon && <Icon size={28} style={{ color: benefit.iconColor }} stroke={1.5} />}
                    <h3 className="mt-4 font-proxima text-[18px] font-bold text-admi-black">{benefit.title}</h3>
                    <p className="mt-3 font-proxima text-[14px] leading-[1.6] text-[#555]">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. ELIGIBILITY                                                */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-[3px] w-10 bg-brand-red" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">Eligibility</span>
            </div>
            <h2 className="font-proxima text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">Who Can Apply</h2>
            <p className="mt-6 max-w-[700px] font-proxima text-[16px] leading-[1.6] text-[#555]">
              The fellowship is open to outstanding ADMI graduates who meet the following criteria:
            </p>
            <ul className="mt-8 space-y-4 pl-2">
              {page.eligibilityCriteria.map((criterion: string) => (
                <li key={criterion} className="flex items-start gap-4">
                  <IconCircleCheckFilled size={22} className="mt-0.5 flex-shrink-0 text-secondary" />
                  <span className="font-proxima text-[15px] leading-[1.5] text-[#333]">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. HOW TO APPLY                                               */}
        {/* ============================================================ */}
        <section className="w-full bg-[#F5F5F5]">
          <div className="section-container section-padding">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-[3px] w-10 bg-brand-orange" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-orange">Application Process</span>
            </div>
            <h2 className="font-proxima text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">How to Apply</h2>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {page.applicationSteps.map((step: ApplicationStep) => (
                <div key={step.number} className="flex flex-col rounded-xl bg-white p-8 transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: step.bgColor }}>
                    <span className="font-proxima text-[20px] font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="mt-4 font-proxima text-[20px] font-bold text-admi-black">{step.title}</h3>
                  <p className="mt-3 font-proxima text-[14px] leading-[1.6] text-[#555]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. CTA                                                        */}
        {/* ============================================================ */}
        <section className="w-full" style={{ background: 'linear-gradient(180deg, #0A3D3D 0%, #061E1E 100%)' }}>
          <div className="section-container section-padding text-center">
            <h2 className="font-proxima text-[30px] font-bold leading-[1.15] text-white md:text-[36px]">
              Applications Open for 2026 Cohort
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] font-proxima text-[16px] leading-[1.6] text-white/80">
              Take the next step in your creative career. Apply for the ADMI Fellowship today.
            </p>
            <div className="mt-8">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-3.5 font-proxima text-[16px] font-semibold text-[#0A3D3D] transition-opacity hover:opacity-90"
              >
                Apply for Fellowship <IconArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
