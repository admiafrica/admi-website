import Link from 'next/link'
import { IconArrowDown, IconSchool, IconShieldCheck, IconAward, IconArrowRight } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pathwaySteps = [
  {
    step: 1,
    duration: '3 MONTHS',
    title: 'Foundation Certificate',
    description:
      'Build core creative skills and discover your specialisation. Earn foundational credits that articulate directly into professional programmes.',
    credits: '15 ECTS Credits',
    price: 'KES 5,000/mo',
    certification: 'ADMI Certified',
    borderColor: '#F76335',
    bgColor: '#FFFFFF'
  },
  {
    step: 2,
    duration: '6 MONTHS',
    title: 'Professional Certificate',
    description:
      'Deepen your expertise in your chosen field. Industry-aligned curriculum with hands-on projects and professional portfolio development.',
    credits: '30 ECTS Credits',
    price: 'KES 8,500/mo',
    certification: 'Pearson BTEC',
    borderColor: '#0A3D3D',
    bgColor: '#FFFFFF'
  },
  {
    step: 3,
    duration: '18 MONTHS',
    title: 'Diploma Programme',
    description:
      'Comprehensive programme combining theory and practice. Graduate industry-ready with a nationally recognised qualification and substantial credit accumulation.',
    credits: '90 ECTS Credits',
    price: 'KES 15,000/mo',
    certification: 'Woolf ECTS',
    borderColor: '#BA2E36',
    bgColor: '#FFFFFF'
  },
  {
    step: 4,
    duration: 'DEGREE PATHWAY',
    title: 'Bachelor\u2019s Degree via Woolf University',
    description:
      'Articulate your ADMI credits into a full EU-accredited bachelor\u2019s degree through Woolf University. Study online with international recognition and ECTS credit transfer.',
    credits: '180 ECTS Credits  \u00b7  EU Accredited',
    price: null,
    certification: 'EU Accredited',
    borderColor: '#08F6CF',
    bgColor: '#F0FDFA'
  }
]

const articulationCards = [
  {
    Icon: IconSchool,
    iconColor: '#0A3D3D',
    iconBg: 'bg-[#08F6CF]/15',
    title: 'Woolf University',
    description:
      'EU-accredited degree-granting institution. ADMI diploma graduates can articulate credits towards a full bachelor\u2019s degree with international recognition.'
  },
  {
    Icon: IconShieldCheck,
    iconColor: '#BA2E36',
    iconBg: 'bg-[#BA2E36]/15',
    title: 'KNQF Alignment',
    description:
      'All ADMI programmes are aligned with the Kenya National Qualifications Framework, ensuring national recognition and seamless credit transfer.'
  },
  {
    Icon: IconAward,
    iconColor: '#F76335',
    iconBg: 'bg-[#F76335]/15',
    title: 'ECTS Credits',
    description:
      'European Credit Transfer System credits ensure your qualifications are recognised across Europe and beyond, enabling global mobility.'
  }
]

const creditCards = [
  {
    value: '100%',
    valueColor: '#F76335',
    description: 'Credit articulation between ADMI programmes'
  },
  {
    value: 'ECTS',
    valueColor: '#0A3D3D',
    description: 'European credits recognised in 48+ countries worldwide'
  },
  {
    value: 'KNQF',
    valueColor: '#BA2E36',
    description: 'Kenya National Qualifications Framework aligned for local recognition'
  }
]

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

export default function AcademicPathwaysPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Academic Pathways"
        description="ADMI offers an accredited academic pathway from foundation courses through to an internationally recognised bachelor's degree. Discover how every step of your journey counts with ECTS credit transfer and Woolf University articulation."
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
                <span className="block h-[3px] w-10 bg-[#08F6CF]" />
                <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#08F6CF]">
                  Academic Pathways
                </span>
              </div>

              <h1 className="font-fraunces max-w-[700px] text-[36px] font-bold leading-[1.15] text-white md:text-[48px]">
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
            <h2 className="font-fraunces mt-4 text-[30px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[36px]">
              From Foundation to Degree
            </h2>

            <div className="mt-12 flex flex-col gap-0">
              {pathwaySteps.map((step, index) => (
                <div key={step.step} className="flex flex-col">
                  {/* Card */}
                  <div
                    className="flex overflow-hidden rounded-xl border"
                    style={{
                      backgroundColor: step.bgColor,
                      borderColor: step.step === 4 ? '#08F6CF' : '#E5E5E5',
                      borderWidth: step.step === 4 ? 2 : 1
                    }}
                  >
                    {/* Left colour accent */}
                    <div className="w-1.5 shrink-0 rounded-l-xl" style={{ backgroundColor: step.borderColor }} />

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-2 px-5 py-5 md:px-7 md:py-6">
                      <p
                        className="font-proxima text-[12px] font-bold uppercase tracking-[2px]"
                        style={{ color: step.borderColor }}
                      >
                        Step {step.step} &middot; {step.duration}
                      </p>

                      <h3 className="font-fraunces text-[20px] font-bold text-[#0A0A0A] md:text-[22px]">
                        {step.title}
                      </h3>

                      <p className="max-w-[800px] font-proxima text-[15px] leading-[1.6] text-[#555]">
                        {step.description}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-4">
                        <span
                          className="font-proxima text-[13px] font-semibold"
                          style={{ color: step.borderColor === '#08F6CF' ? '#0A3D3D' : step.borderColor }}
                        >
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

                  {/* Arrow connector (not after the last card) */}
                  {index < pathwaySteps.length - 1 && (
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
            <SectionLabel color="#BA2E36">Partnerships</SectionLabel>
            <h2 className="font-fraunces mt-4 text-[30px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[36px]">
              Articulation Agreements
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {articulationCards.map((card) => (
                <div key={card.title} className="flex flex-col gap-4 rounded-xl border border-[#E5E5E5] bg-white p-8">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full ${card.iconBg}`}>
                    <card.Icon size={28} style={{ color: card.iconColor }} />
                  </div>

                  <h3 className="font-fraunces text-[20px] font-bold text-[#0A0A0A]">{card.title}</h3>

                  <p className="font-proxima text-[15px] leading-[1.6] text-[#555]">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. CREDIT TRANSFER                                           */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <SectionLabel color="#08F6CF">Credit Transfer</SectionLabel>
            <h2 className="font-fraunces mt-4 text-[30px] font-bold leading-[1.15] text-[#0A0A0A] md:text-[36px]">
              How Credits Transfer
            </h2>
            <p className="mt-4 max-w-[900px] font-proxima text-[16px] leading-[1.7] text-[#555]">
              Every programme at ADMI is designed with credit articulation in mind. Your foundation credits count
              towards your professional certificate, your professional credits towards your diploma, and your diploma
              credits towards a full degree.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {creditCards.map((card) => (
                <div key={card.value} className="flex flex-col gap-3 rounded-xl bg-[#F9FAFB] p-7">
                  <span className="font-fraunces text-[32px] font-bold" style={{ color: card.valueColor }}>
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
            <h2 className="font-fraunces text-[30px] font-bold leading-[1.15] text-white md:text-[36px]">
              Start Your Pathway Today
            </h2>

            <p className="mx-auto mt-4 max-w-[560px] font-proxima text-[16px] leading-[1.6] text-white/80">
              Explore our programmes and find the right starting point for your creative career.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-lg bg-[#BA2E36] px-8 py-3.5 font-proxima text-[15px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Explore Programmes
                <IconArrowRight size={18} />
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
