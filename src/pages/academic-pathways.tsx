import Link from 'next/link'
import { IconArrowDown, IconArrowRight } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getIcon } from '@/utils/icon-map'
import { getPageCached } from '@/utils/contentful-cached'
import type {
  AcademicPathwaysPageData,
  PathwayStep,
  ArticulationCardCMS,
  CreditCard
} from '@/types/academic-pathways'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FALLBACK: AcademicPathwaysPageData = {
  pathwaySteps: [
    { step: 1, duration: '3 MONTHS', title: 'Foundation Certificate', description: 'Build core creative skills and discover your specialisation. Earn foundational credits that articulate directly into professional programmes.', credits: '15 ECTS Credits', price: 'KES 5,000/mo', certification: 'ADMI Certified', borderColor: '#EF7B2E', bgColor: '#FFFFFF' },
    { step: 2, duration: '6 MONTHS', title: 'Professional Certificate', description: 'Deepen your expertise in your chosen field. Industry-aligned curriculum with hands-on projects and professional portfolio development.', credits: '30 ECTS Credits', price: 'KES 8,500/mo', certification: 'Pearson BTEC', borderColor: '#0A3D3D', bgColor: '#FFFFFF' },
    { step: 3, duration: '18 MONTHS', title: 'Diploma Programme', description: 'Comprehensive programme combining theory and practice. Graduate industry-ready with a nationally recognised qualification and substantial credit accumulation.', credits: '90 ECTS Credits', price: 'KES 15,000/mo', certification: 'Woolf ECTS', borderColor: '#C1272D', bgColor: '#FFFFFF' },
    { step: 4, duration: 'DEGREE PATHWAY', title: 'Bachelor\u2019s Degree via Woolf University', description: 'Articulate your ADMI credits into a full EU-accredited bachelor\u2019s degree through Woolf University. Study online with international recognition and ECTS credit transfer.', credits: '180 ECTS Credits  \u00b7  EU Accredited', price: null, certification: 'EU Accredited', borderColor: '#8EBFB0', bgColor: '#F0FDFA' }
  ],
  articulationCards: [
    { icon: 'school', iconColor: '#0A3D3D', iconBg: 'bg-secondary/15', title: 'Woolf University', description: 'EU-accredited degree-granting institution. ADMI diploma graduates can articulate credits towards a full bachelor\u2019s degree with international recognition.' },
    { icon: 'shield-check', iconColor: '#C1272D', iconBg: 'bg-brand-red/15', title: 'KNQF Alignment', description: 'All ADMI programmes are aligned with the Kenya National Qualifications Framework, ensuring national recognition and seamless credit transfer.' },
    { icon: 'award', iconColor: '#EF7B2E', iconBg: 'bg-brand-orange/15', title: 'ECTS Credits', description: 'European Credit Transfer System credits ensure your qualifications are recognised across Europe and beyond, enabling global mobility.' }
  ],
  creditCards: [
    { value: '100%', valueColor: '#EF7B2E', description: 'Credit articulation between ADMI programmes' },
    { value: 'ECTS', valueColor: '#0A3D3D', description: 'European credits recognised in 48+ countries worldwide' },
    { value: 'KNQF', valueColor: '#C1272D', description: 'Kenya National Qualifications Framework aligned for local recognition' }
  ],
  seoTitle: 'Academic Pathways',
  seoDescription: 'ADMI offers an accredited academic pathway from foundation courses through to an internationally recognised bachelor\'s degree. Discover how every step of your journey counts with ECTS credit transfer and Woolf University articulation.'
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ page: AcademicPathwaysPageData }> = async () => {
  let page = FALLBACK

  try {
    const entry = await getPageCached('academicPathwaysPage', 'page:academic-pathways')
    if (entry?.fields) {
      const f = entry.fields
      page = {
        pathwaySteps: f.pathwaySteps || FALLBACK.pathwaySteps,
        articulationCards: f.articulationCards || FALLBACK.articulationCards,
        creditCards: f.creditCards || FALLBACK.creditCards,
        seoTitle: f.seoTitle || FALLBACK.seoTitle,
        seoDescription: f.seoDescription || FALLBACK.seoDescription
      }
    }
  } catch (error) {
    console.error('[Academic Pathways] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { page },
    revalidate: 300
  }
}

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function SectionLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="block h-[3px] w-10 rounded-full" style={{ backgroundColor: color }} />
      <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px]" style={{ color }}>
        {children}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AcademicPathwaysPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title={page.seoTitle}
        description={page.seoDescription}
        keywords="ADMI academic pathways, ECTS credits Kenya, Woolf University pathway, creative education progression, diploma to degree Kenya, credit transfer"
      />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="w-full bg-gradient-to-b from-[#0F2E2A] to-[#091110]">
          <div className="section-container">
            <div className="flex flex-col justify-center gap-5 pb-16 pt-28 md:pb-20 md:pt-36">
              <div className="flex items-center gap-3">
                <span className="block h-[3px] w-10 bg-secondary" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-secondary">
                  Academic Pathways
                </span>
              </div>
              <h1 className="font-proxima max-w-[700px] text-[36px] font-bold leading-[1.15] text-white md:text-[48px]">
                Academic Pathways and Progression
              </h1>
              <p className="max-w-[700px] font-proxima text-[17px] leading-[1.6] text-white/80 md:text-[18px]">
                ADMI offers an accredited academic pathway from foundation courses through to an internationally
                recognised bachelor&rsquo;s degree, ensuring every step of your journey counts.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. PATHWAY DIAGRAM                                           */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <SectionLabel color="#0A3D3D">Your Journey</SectionLabel>
            <h2 className="font-proxima mt-4 text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
              From Foundation to Degree
            </h2>

            <div className="mt-12 flex flex-col gap-0">
              {page.pathwaySteps.map((step: PathwayStep, index: number) => (
                <div key={step.step} className="flex flex-col">
                  {/* Card */}
                  <div
                    className="flex overflow-hidden rounded-xl border"
                    style={{
                      backgroundColor: step.bgColor,
                      borderColor: step.step === 4 ? '#8EBFB0' : '#E5E5E5',
                      borderWidth: step.step === 4 ? 2 : 1
                    }}
                  >
                    <div className="w-1.5 shrink-0 rounded-l-xl" style={{ backgroundColor: step.borderColor }} />
                    <div className="flex flex-1 flex-col gap-2 px-5 py-5 md:px-7 md:py-6">
                      <p className="font-proxima text-[12px] font-bold uppercase tracking-[2px]" style={{ color: step.borderColor }}>
                        Step {step.step} &middot; {step.duration}
                      </p>
                      <h3 className="font-proxima text-[20px] font-bold text-admi-black md:text-[22px]">{step.title}</h3>
                      <p className="max-w-[800px] font-proxima text-[15px] leading-[1.6] text-[#555]">{step.description}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-4">
                        <span className="font-proxima text-[13px] font-semibold" style={{ color: step.borderColor === '#8EBFB0' ? '#0A3D3D' : step.borderColor }}>
                          {step.credits}
                        </span>
                        {step.price && (
                          <>
                            <span className="text-[#ccc]">&middot;</span>
                            <span className="font-proxima text-[13px] text-[#888]">{step.price}</span>
                          </>
                        )}
                        <span className="text-[#ccc]">&middot;</span>
                        <span className="font-proxima text-[13px] text-[#888]">{step.certification}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  {index < page.pathwaySteps.length - 1 && (
                    <div className="flex w-full items-center justify-center py-3">
                      <IconArrowDown size={24} className="text-[#0A3D3D]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. ARTICULATION AGREEMENTS                                   */}
        {/* ============================================================ */}
        <section className="w-full bg-[#F5F5F5]">
          <div className="section-container section-padding">
            <SectionLabel color="#C1272D">Partnerships</SectionLabel>
            <h2 className="font-proxima mt-4 text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
              Articulation Agreements
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {page.articulationCards.map((card: ArticulationCardCMS) => {
                const CardIcon = getIcon(card.icon)
                return (
                  <div key={card.title} className="flex flex-col gap-4 rounded-xl border border-[#E5E5E5] bg-white p-8">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full ${card.iconBg}`}>
                      {CardIcon && <CardIcon size={28} style={{ color: card.iconColor }} />}
                    </div>
                    <h3 className="font-proxima text-[20px] font-bold text-admi-black">{card.title}</h3>
                    <p className="font-proxima text-[15px] leading-[1.6] text-[#555]">{card.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. CREDIT TRANSFER                                           */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <SectionLabel color="#8EBFB0">Credit Transfer</SectionLabel>
            <h2 className="font-proxima mt-4 text-[30px] font-bold leading-[1.15] text-admi-black md:text-[36px]">
              How Credits Transfer
            </h2>
            <p className="mt-4 max-w-[900px] font-proxima text-[16px] leading-[1.7] text-[#555]">
              Every programme at ADMI is designed with credit articulation in mind. Your foundation credits count
              towards your professional certificate, your professional credits towards your diploma, and your diploma
              credits towards a full degree.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {page.creditCards.map((card: CreditCard) => (
                <div key={card.value} className="flex flex-col gap-3 rounded-xl bg-[#F9FAFB] p-7">
                  <span className="font-proxima text-[32px] font-bold" style={{ color: card.valueColor }}>
                    {card.value}
                  </span>
                  <p className="font-proxima text-[14px] leading-[1.5] text-[#555]">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. CTA                                                       */}
        {/* ============================================================ */}
        <section className="w-full bg-gradient-to-b from-[#0F2E2A] to-[#091110]">
          <div className="section-container section-padding text-center">
            <h2 className="font-proxima text-[30px] font-bold leading-[1.15] text-white md:text-[36px]">
              Start Your Pathway Today
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] font-proxima text-[16px] leading-[1.6] text-white/80">
              Explore our programmes and find the right starting point for your creative career.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-8 py-3.5 font-proxima text-[15px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Explore Programmes <IconArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border border-white/60 px-8 py-3.5 font-proxima text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Chat with Admissions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
