'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  IconSchool,
  IconHeartHandshake,
  IconBriefcase,
  IconCash,
  IconBook,
  IconAccessible,
  IconArrowRight,
  IconBrandWhatsapp,
  IconDownload
} from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { SupportTab, FeeCard, HelpDesk } from '@/types/student-support'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SUPPORT_TABS: SupportTab[] = [
  {
    key: 'academic',
    label: 'Academic',
    Icon: IconSchool,
    color: '#0A3D3D',
    title: 'Academic Advising',
    desc: 'Advisors help plan online and on-campus modules, deadlines, and interventions.',
    cards: [
      { title: 'Module Planning', desc: 'Get personalised guidance on selecting modules that align with your goals.' },
      { title: 'Progress Tracking', desc: 'Regular check-ins to monitor your academic progress and address challenges early.' },
      { title: 'Study Skills', desc: 'Workshops on time management, note-taking, research methods, and exam prep.' }
    ]
  },
  {
    key: 'wellness',
    label: 'Wellness',
    Icon: IconHeartHandshake,
    color: '#BA2E36',
    title: 'Wellness Support',
    desc: 'Counselling and wellbeing support available virtually and on campus.',
    cards: [
      { title: 'Counselling', desc: 'Private sessions with certified counsellors for personal and academic challenges.' },
      { title: 'Peer Support', desc: 'Student-led support groups and mentoring programmes for community wellbeing.' },
      { title: 'Crisis Support', desc: 'Immediate support and referral pathways for urgent wellbeing concerns.' }
    ]
  },
  {
    key: 'career',
    label: 'Career',
    Icon: IconBriefcase,
    color: '#F76335',
    title: 'Career Services',
    desc: 'Career coaching across virtual sessions, portfolio reviews, and campus showcases.',
    cards: [
      { title: 'Portfolio Reviews', desc: 'One-on-one sessions with industry professionals to strengthen your portfolio.' },
      { title: 'Interview Prep', desc: 'Mock interviews, CV workshops, and employer introduction sessions.' },
      { title: 'Internship Matching', desc: 'Direct connections to internship opportunities with creative industry partners.' }
    ]
  },
  {
    key: 'financial',
    label: 'Financial Aid',
    Icon: IconCash,
    color: '#08F6CF',
    title: 'Funding & Financial Aid',
    desc: 'Flexible funding guidance for blended schedules and staged tuition.',
    cards: [
      { title: 'Payment Plans', desc: 'Spread your fees across the duration of your programme with no interest charges.' },
      { title: 'Scholarships', desc: 'Merit-based and need-based scholarship opportunities for qualifying students.' },
      { title: 'Financial Counselling', desc: 'One-on-one sessions to plan your education finances and explore aid options.' }
    ]
  },
  {
    key: 'learning',
    label: 'Learning',
    Icon: IconBook,
    color: '#0A3D3D',
    title: 'Learning Support',
    desc: 'Tutoring, software support, and study coaching for hybrid coursework.',
    cards: [
      { title: 'Tutoring', desc: 'Peer tutoring and faculty office hours for additional academic support.' },
      { title: 'Software Training', desc: 'Workshops on industry-standard tools: Adobe Suite, DaVinci Resolve, and more.' },
      { title: 'Study Coaching', desc: 'Personalised coaching to develop effective study habits and techniques.' }
    ]
  },
  {
    key: 'accessibility',
    label: 'Accessibility',
    Icon: IconAccessible,
    color: '#BA2E36',
    title: 'Accessibility Support',
    desc: 'Inclusive accommodations and assistive support for online and campus delivery.',
    cards: [
      { title: 'Accommodations', desc: 'Tailored learning accommodations for students with disabilities or learning differences.' },
      { title: 'Assistive Tech', desc: 'Access to assistive technologies and adaptive equipment in labs and studios.' },
      { title: 'Inclusive Design', desc: 'All learning materials designed with accessibility standards in mind.' }
    ]
  }
]

const FEE_CARDS: FeeCard[] = [
  {
    badge: 'DIPLOMA',
    badgeBg: '#FFF0F0',
    badgeColor: '#BA2E36',
    title: 'Diploma Programmes',
    price: 'From KES 15,000/month',
    priceColor: '#BA2E36',
    details: '18 months \u2022 In-person\nEU-accredited via Woolf University\nFlexible payment plans available',
    btnBg: '#BA2E36'
  },
  {
    badge: 'PROFESSIONAL',
    badgeBg: '#EEF9F7',
    badgeColor: '#0A3D3D',
    title: 'Professional Certificates',
    price: 'From KES 8,500/month',
    priceColor: '#0A3D3D',
    details: '6 months \u2022 In-person / Online\nADMI & Woolf accredited\nInstalment options available',
    btnBg: '#0A3D3D'
  },
  {
    badge: 'FOUNDATION',
    badgeBg: '#FFF8F0',
    badgeColor: '#F76335',
    title: 'Foundation Certificates',
    price: 'From KES 5,000/month',
    priceColor: '#F76335',
    details: '3 months \u2022 In-person\nADMI Certified\nPay-as-you-go option',
    btnBg: '#F76335'
  },
  {
    badge: 'RUBIKA',
    badgeBg: '#EEF0FF',
    badgeColor: '#1a1a4e',
    title: 'Rubika Programmes',
    price: 'Contact for pricing',
    priceColor: '#1a1a4e',
    details: '1\u20132 years \u2022 In-person\nRubika International accredited\nScholarship options available',
    btnBg: '#1a1a4e'
  }
]

const HELP_DESKS: HelpDesk[] = [
  {
    title: 'Student Desk',
    desc: 'Walk in: Mon-Fri, 8:00-5:00\nEmail: support@admi.ac.ke'
  },
  {
    title: 'Counselling Office',
    desc: 'Private sessions with certified counsellors.\nBook via portal in under 2 minutes.'
  },
  {
    title: 'Career Office',
    desc: 'CV clinic, interview prep, and internship matching with industry partners.'
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StudentSupportPage() {
  const [activeTab, setActiveTab] = useState('academic')
  const currentTab = SUPPORT_TABS.find((t) => t.key === activeTab)!

  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Student Support | ADMI"
        description="Academic, financial, wellness, and career support designed for learner success at ADMI."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-[#0F2E2A] via-[#0A1F1D] to-[#091110] px-4 py-20 xl:px-20">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
            {/* Left */}
            <div className="max-w-[640px]">
              <p className="font-proxima text-[12px] font-bold uppercase tracking-[3px] text-[#08F6CF]">STUDENT SUPPORT</p>
              <h1 className="mt-6 font-fraunces text-[44px] font-bold leading-[1.12] text-white">
                Your Success Is Our Priority &mdash; Academic, Financial &amp; Personal Support
              </h1>
              <p className="mt-6 max-w-[540px] font-proxima text-[16px] leading-[1.7] text-white/80">
                From academic advising to fee planning, wellness resources to career coaching &mdash; ADMI&rsquo;s support teams are here for every step of your journey.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#BA2E36] px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-[#a02730]"
                >
                  Book an Advisor <IconArrowRight size={18} />
                </Link>
                <Link
                  href="https://wa.me/254741132751"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white/10"
                >
                  <IconBrandWhatsapp size={18} /> Contact Support Desk
                </Link>
              </div>
            </div>

            {/* Right — Image */}
            <div
              className="h-[400px] w-full max-w-[500px] rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1648301033733-44554c74ec50?auto=format&fit=crop&w=1080&q=80')" }}
            />
          </div>
        </section>

        {/* ── Fee Structures ── */}
        <section className="bg-white px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-proxima text-[12px] font-bold uppercase tracking-[3px] text-[#BA2E36]">FEE STRUCTURES</p>
            <h2 className="mt-4 font-fraunces text-[36px] font-bold text-[#171717]">Download Fee Structures by Programme</h2>
            <p className="mt-3 max-w-[700px] font-proxima text-[16px] leading-[1.6] text-[#666]">
              Get detailed fee breakdowns, payment plans, and financing options for each programme type. All documents are up-to-date for the current intake period.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEE_CARDS.map((card) => (
                <article key={card.title} className="flex flex-col rounded-2xl border border-[#E8E8E8] bg-white p-7">
                  <span
                    className="inline-block self-start rounded-lg px-3.5 py-2 font-proxima text-[12px] font-bold"
                    style={{ backgroundColor: card.badgeBg, color: card.badgeColor }}
                  >
                    {card.badge}
                  </span>
                  <h3 className="mt-5 font-fraunces text-[22px] font-bold text-[#171717]">{card.title}</h3>
                  <p className="mt-2 font-proxima text-[14px] font-bold" style={{ color: card.priceColor }}>{card.price}</p>
                  <p className="mt-4 whitespace-pre-line font-proxima text-[13px] leading-[1.7] text-[#666]">{card.details}</p>
                  <Link
                    href="/financial-planning"
                    className="mt-6 flex items-center justify-center gap-2 rounded-lg py-3 font-proxima text-[14px] font-bold text-white transition hover:opacity-90"
                    style={{ backgroundColor: card.btnBg }}
                  >
                    <IconDownload size={16} /> Download Fees
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Support Services Hub ── */}
        <section className="bg-[#F9F9F9] px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="text-center">
              <p className="font-proxima text-[12px] font-bold uppercase tracking-[3px] text-[#BA2E36]">HOW WE SUPPORT YOU</p>
              <h2 className="mt-3 font-fraunces text-[36px] font-bold text-[#171717]">Dedicated Support for Every Aspect of Student Life</h2>
              <p className="mx-auto mt-3 max-w-[700px] font-proxima text-[16px] leading-[1.6] text-[#666]">
                Each support area has a dedicated team and resources. Click through to explore what&rsquo;s available.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {SUPPORT_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-5 transition ${
                    activeTab === tab.key
                      ? 'border-[#BA2E36] bg-white shadow-md'
                      : 'border-[#E8E8E8] bg-white hover:border-[#ccc]'
                  }`}
                >
                  <tab.Icon size={24} style={{ color: tab.color }} />
                  <span className={`font-proxima text-[13px] font-bold ${activeTab === tab.key ? 'text-[#BA2E36]' : 'text-[#555]'}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Tab Panel */}
            <div className="mt-8 rounded-2xl bg-white p-8">
              <h3 className="font-fraunces text-[28px] font-bold text-[#171717]">{currentTab.title}</h3>
              <p className="mt-2 font-proxima text-[15px] leading-[1.6] text-[#555]">{currentTab.desc}</p>
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                {currentTab.cards.map((card) => (
                  <article key={card.title} className="rounded-xl border border-[#E8E8E8] bg-white p-5">
                    <h4 className="font-fraunces text-[18px] font-bold text-[#171717]">{card.title}</h4>
                    <p className="mt-2 font-proxima text-[14px] leading-[1.6] text-[#555]">{card.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Get Help Fast ── */}
        <section className="bg-white px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-[#BA2E36]">HELP DESK</p>
            <h2 className="mt-2 font-fraunces text-[38px] font-bold text-[#171717]">Get Help Fast</h2>
            <p className="mt-2.5 max-w-[780px] font-proxima text-[17px] leading-[1.6] text-[#555]">
              Choose the channel that works best for your situation. Our team will direct you to the right office immediately.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {HELP_DESKS.map((desk) => (
                <article key={desk.title} className="rounded-xl bg-[#F9F9F9] p-6">
                  <h3 className="font-fraunces text-[28px] font-bold text-[#171717]">{desk.title}</h3>
                  <p className="mt-2.5 whitespace-pre-line font-proxima text-[15px] leading-[1.6] text-[#666]">{desk.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-br from-[#BA2E36] via-[#8E2028] to-[#1A1A1A] px-4 py-24 text-center text-white xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <h2 className="font-fraunces text-[44px] font-bold">Need Support Right Now?</h2>
            <p className="mx-auto mt-4 max-w-[860px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Connect with advisors online or on campus for immediate academic, wellbeing, and admin support.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-proxima text-[15px] font-bold text-[#0A0A0A] transition hover:bg-white/90"
              >
                Book an Advisor <IconArrowRight size={18} />
              </Link>
              <Link
                href="https://wa.me/254741132751"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white hover:text-[#0A0A0A]"
              >
                <IconBrandWhatsapp size={18} /> WhatsApp Support
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
