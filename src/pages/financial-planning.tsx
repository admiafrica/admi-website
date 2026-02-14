import { Accordion, Box } from '@mantine/core'
import Link from 'next/link'
import { IconDownload, IconCheck, IconStar, IconHeart, IconUsers, IconBriefcase } from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const feeCards = [
  {
    title: 'Diploma Programmes',
    price: 'From KES 15,000/month',
    duration: '18 months',
    badge: 'EU-Accredited via Woolf',
    borderColor: '#BA2E36',
    features: [
      'Woolf University ECTS credits',
      'Full studio access',
      'Industry mentorship',
      'Portfolio development'
    ]
  },
  {
    title: 'Professional Certificates',
    price: 'From KES 8,500/month',
    duration: '6 months',
    badge: 'In-person / Online',
    borderColor: '#0A3D3D',
    features: [
      'Pearson BTEC certified',
      'Flexible scheduling',
      'Industry projects',
      'Career support'
    ]
  },
  {
    title: 'Foundation Certificates',
    price: 'From KES 5,000/month',
    duration: '3 months',
    badge: 'In-person \u00b7 ADMI Certified',
    borderColor: '#F76335',
    features: [
      'Beginner-friendly',
      'Hands-on training',
      'Portfolio starter',
      'Pathway to Professional'
    ]
  },
  {
    title: "Bachelor\u2019s Programme",
    price: 'Contact for Pricing',
    duration: '1\u20132 years',
    badge: 'Rubika International',
    borderColor: '#1a1a4e',
    features: [
      'International degree',
      'Exchange opportunities',
      'Advanced specialisation',
      'Global network'
    ]
  }
]

const paymentPlans = [
  {
    title: 'Monthly Instalments',
    subtitle: 'From KES 5,000/mo',
    description:
      'Spread your fees across manageable monthly payments throughout each semester. Ideal for students who prefer predictable, smaller payments.',
    tag: 'Most Popular',
    tagColor: '#BA2E36'
  },
  {
    title: 'Per Semester',
    subtitle: 'Save 5%',
    description:
      'Pay your full semester fees upfront and enjoy a 5% discount. A great balance between savings and flexibility across the programme duration.',
    tag: null,
    tagColor: null
  },
  {
    title: 'Full Payment',
    subtitle: 'Save 10%',
    description:
      'Settle your entire programme fee at enrolment and receive the maximum 10% discount. Best for families and sponsors planning ahead.',
    tag: 'Best Value',
    tagColor: '#0A3D3D'
  }
]

const scholarships = [
  {
    title: 'Merit-Based Scholarships',
    description:
      'Outstanding academic achievers and creative talents can receive up to 50% tuition coverage. Awarded based on portfolio strength, academic results, and demonstrated creative excellence.',
    coverage: 'Up to 50% coverage',
    bgColor: '#FFF0F0',
    iconColor: '#BA2E36',
    Icon: IconStar
  },
  {
    title: 'Need-Based Financial Aid',
    description:
      'ADMI is committed to making creative education accessible. Need-based aid is available for students who demonstrate financial need and a strong commitment to their creative career.',
    coverage: 'Assessed individually',
    bgColor: '#EEF9F7',
    iconColor: '#0A3D3D',
    Icon: IconHeart
  },
  {
    title: 'Industry Partner Sponsorships',
    description:
      'Leading creative studios, agencies, and media companies sponsor talented students through ADMI partnership programmes. Includes mentorship and potential employment pathways.',
    coverage: 'Varies by partner',
    bgColor: '#FFF8F0',
    iconColor: '#F76335',
    Icon: IconBriefcase
  }
]

const faqItems = [
  {
    q: 'What is included in the tuition fees?',
    a: 'Tuition fees cover all teaching and instruction, access to studio facilities and equipment, learning materials and software licences, portfolio development support, and career services. Some programmes may have additional costs for specialised materials or external certification fees, which are outlined in the programme-specific fee structure.'
  },
  {
    q: 'Can I switch payment plans during my programme?',
    a: 'Yes, you can request to change your payment plan at the start of a new semester. Simply contact the Finance Office at least two weeks before the semester begins. Note that switching from a discounted plan (semester or full payment) to monthly instalments will adjust your remaining balance accordingly.'
  },
  {
    q: 'Are there any hidden fees or additional costs?',
    a: 'ADMI is committed to full transparency. Your fee structure document outlines every cost associated with your programme. The only potential additional costs are for optional items such as personal equipment purchases, external exam registrations, or elective industry workshops. There are no hidden administrative or registration fees.'
  },
  {
    q: 'How do I apply for a scholarship?',
    a: 'Scholarship applications are submitted alongside your programme application. You will need to provide your academic transcripts, a personal statement, a creative portfolio (for merit-based awards), and financial documentation (for need-based aid). The admissions team reviews applications on a rolling basis, and successful candidates are notified within two weeks of submission.'
  },
  {
    q: 'What happens if I miss a payment?',
    a: 'If you anticipate difficulty making a payment, please contact the Finance Office as early as possible. ADMI offers a grace period and can work with you to arrange a revised payment schedule. Continued non-payment may result in a temporary hold on access to certain facilities until the account is brought up to date.'
  },
  {
    q: 'Is there a refund policy?',
    a: 'Yes. ADMI offers a structured refund policy. If you withdraw within the first two weeks of a semester, you are eligible for a full refund minus an administrative fee. Partial refunds are available for withdrawals within the first month. After the first month, fees are non-refundable. Full details are available in your enrolment agreement and the fee structure document.'
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FinancialPlanningPage() {
  return (
    <MainLayout footerBgColor="#002A23">
      <PageSEO
        title="Financial Planning"
        description="Transparent fee structures, flexible payment plans, and scholarship opportunities at ADMI. Download programme-specific fee guides and plan your investment in a creative career."
        keywords="ADMI fees, tuition fees Kenya, creative education cost, ADMI scholarships, payment plans, financial aid, Woolf University fees, BTEC fees"
      />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A0A0A]">
          <div className="section-container">
            <div className="grid grid-cols-1 items-center gap-10 py-20 pt-28 md:grid-cols-2 md:py-28 md:pt-36">
              {/* Left */}
              <div>
                <p className="mb-4 font-proxima text-[13px] font-bold uppercase tracking-[3px] text-[#08F6CF]">
                  Student Support / Financial Planning
                </p>
                <h1 className="font-fraunces text-[36px] font-bold leading-[1.12] text-white md:text-[48px]">
                  Financial Planning and Fee Structures
                </h1>
                <p className="mt-5 max-w-[540px] font-proxima text-[17px] leading-[1.65] text-[#cccccc]">
                  Transparent pricing, flexible payment plans, and scholarship opportunities. Download fee structures for each programme and plan your investment in a creative career.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#fee-structures"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#08F6CF] px-6 py-3 font-proxima text-[15px] font-bold text-[#0A0A0A] transition-opacity hover:opacity-90"
                  >
                    <IconDownload size={18} />
                    Download Fee Structures
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-lg border border-white/60 px-6 py-3 font-proxima text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    Chat with Admissions
                  </Link>
                </div>
              </div>

              {/* Right -- visual placeholder */}
              <div className="hidden md:flex md:justify-end">
                <div className="relative h-[360px] w-[360px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A3D3D] to-[#08F6CF]/20">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                    <IconUsers size={48} className="text-[#08F6CF]" />
                    <p className="font-fraunces text-[22px] font-bold text-white">Plan Your Future</p>
                    <p className="font-proxima text-[14px] leading-[1.5] text-white/70">
                      Flexible payment options designed for creative students across East Africa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. FEE STRUCTURES                                            */}
        {/* ============================================================ */}
        <section id="fee-structures" className="w-full scroll-mt-20 bg-white">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#BA2E36]">Fee Structures</p>
              <h2 className="font-fraunces text-[36px] font-bold leading-[1.15] text-[#171717] md:text-[42px]">
                Download Fee Structures by Programme
              </h2>
              <p className="mt-4 font-proxima text-[17px] leading-[1.6] text-[#555]">
                Select your programme type below to download the detailed fee structure, including intake dates, payment options, and what is covered.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {feeCards.map((card) => (
                <div
                  key={card.title}
                  className="group flex flex-col rounded-xl border-t-4 bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                  style={{ borderTopColor: card.borderColor }}
                >
                  <h3 className="font-fraunces text-[20px] font-bold text-[#171717]">{card.title}</h3>
                  <p className="mt-2 font-proxima text-[22px] font-bold" style={{ color: card.borderColor }}>
                    {card.price}
                  </p>
                  <p className="mt-1 font-proxima text-[13px] text-[#888]">
                    {card.duration} &middot; {card.badge}
                  </p>

                  <ul className="mb-6 mt-5 flex flex-col gap-3">
                    {card.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <IconCheck size={16} className="mt-0.5 shrink-0" style={{ color: card.borderColor }} />
                        <span className="font-proxima text-[15px] text-[#444]">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-proxima text-[14px] font-bold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: card.borderColor }}
                    >
                      <IconDownload size={16} />
                      Download Fee Structure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. PAYMENT PLANS                                             */}
        {/* ============================================================ */}
        <section className="w-full bg-[#f9f9f9]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#0A3D3D]">Payment Options</p>
              <h2 className="font-fraunces text-[36px] font-bold leading-[1.15] text-[#171717] md:text-[42px]">
                Flexible Payment Plans
              </h2>
              <p className="mt-4 font-proxima text-[17px] leading-[1.6] text-[#555]">
                Choose a payment schedule that works for you. All plans include access to the same programme content, facilities, and support services.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {paymentPlans.map((plan) => (
                <div
                  key={plan.title}
                  className="relative flex flex-col rounded-xl border border-[#E8E8E8] bg-white p-8 transition-shadow hover:shadow-md"
                >
                  {plan.tag && (
                    <span
                      className="absolute -top-3 right-6 rounded-full px-3 py-1 font-proxima text-[12px] font-bold uppercase tracking-wider text-white"
                      style={{ backgroundColor: plan.tagColor! }}
                    >
                      {plan.tag}
                    </span>
                  )}

                  <h3 className="font-fraunces text-[22px] font-bold text-[#171717]">{plan.title}</h3>
                  <p className="mt-2 font-proxima text-[28px] font-bold text-[#0A3D3D]">{plan.subtitle}</p>
                  <p className="mt-3 font-proxima text-[15px] leading-[1.6] text-[#555]">{plan.description}</p>

                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 font-proxima text-[14px] font-bold text-[#0A3D3D] underline decoration-[#0A3D3D]/30 underline-offset-4 transition-colors hover:text-[#08F6CF]"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. SCHOLARSHIPS                                              */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#BA2E36]">Financial Aid</p>
              <h2 className="font-fraunces text-[36px] font-bold leading-[1.15] text-[#171717] md:text-[42px]">
                Scholarships &amp; Financial Aid
              </h2>
              <p className="mt-4 font-proxima text-[17px] leading-[1.6] text-[#555]">
                ADMI believes in accessible education. Explore scholarship options and financial aid programmes designed to support talented and deserving students.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {scholarships.map((s) => (
                <div
                  key={s.title}
                  className="flex flex-col rounded-xl p-8"
                  style={{ backgroundColor: s.bgColor }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${s.iconColor}15` }}
                  >
                    <s.Icon size={24} style={{ color: s.iconColor }} />
                  </div>
                  <h3 className="mt-5 font-fraunces text-[20px] font-bold text-[#171717]">{s.title}</h3>
                  <p className="mt-2 font-proxima text-[14px] font-bold uppercase tracking-wider" style={{ color: s.iconColor }}>
                    {s.coverage}
                  </p>
                  <p className="mt-3 font-proxima text-[15px] leading-[1.6] text-[#555]">{s.description}</p>

                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 font-proxima text-[14px] font-bold underline decoration-[#171717]/20 underline-offset-4 transition-colors hover:text-[#BA2E36]"
                      style={{ color: s.iconColor }}
                    >
                      Apply now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. FAQ                                                       */}
        {/* ============================================================ */}
        <section className="w-full bg-[#f9f9f9]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#0A3D3D]">Common Questions</p>
              <h2 className="font-fraunces text-[36px] font-bold leading-[1.15] text-[#171717] md:text-[42px]">
                Fees &amp; Payment FAQs
              </h2>
              <p className="mt-4 font-proxima text-[17px] leading-[1.6] text-[#555]">
                Find answers to the most common questions about tuition, payment plans, refunds, and financial aid.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-[840px]">
              <Accordion variant="separated" radius="md">
                {faqItems.map((item) => (
                  <Accordion.Item key={item.q} value={item.q}>
                    <Accordion.Control className="font-nexa text-[16px] font-bold text-[#171717]">
                      {item.q}
                    </Accordion.Control>
                    <Accordion.Panel>
                      <p className="font-proxima text-[15px] leading-[1.65] text-[#555]">{item.a}</p>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. CTA                                                       */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A3D3D]">
          <div className="section-container section-padding text-center">
            <h2 className="font-fraunces text-[36px] font-bold leading-[1.15] text-white md:text-[44px]">
              Need Help With Financial Planning?
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] font-proxima text-[17px] leading-[1.6] text-[#cccccc]">
              Our Finance Office and admissions counsellors are here to help you understand your options, build a payment plan, and explore scholarship eligibility.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-[#08F6CF] px-6 py-3 font-proxima text-[15px] font-bold text-[#0A0A0A] transition-opacity hover:opacity-90"
              >
                Book a Consultation
              </Link>
              <a
                href="https://wa.me/254711082222"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-white/60 px-6 py-3 font-proxima text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                WhatsApp Finance Office
              </a>
            </div>

            <div className="mt-10">
              <Link
                href="/student-support"
                className="font-proxima text-[15px] font-bold text-[#08F6CF] transition-opacity hover:opacity-80"
              >
                &larr; Back to Student Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
