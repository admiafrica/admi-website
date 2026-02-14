import Link from 'next/link'
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconPalette,
  IconHeartHandshake,
  IconCalculator,
  IconMovie,
  IconUsers,
  IconBriefcase,
  IconWifi
} from '@tabler/icons-react'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type { HubCard, CampusFeature } from '@/types/student-life'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HUB_CARDS: HubCard[] = [
  {
    icon: IconPalette,
    title: 'Student Showcase',
    desc: 'Browse portfolios, films, animations, and design projects from current students and recent graduates.',
    link: '/student-showcase',
    linkText: 'Explore Showcase',
    image: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: IconHeartHandshake,
    title: 'Student Support',
    desc: 'Academic advising, wellness resources, career coaching, and accessibility services \u2014 all in one place.',
    link: '/student-support',
    linkText: 'Get Support',
    image: 'https://images.unsplash.com/photo-1571055931484-22dce9d6c510?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: IconCalculator,
    title: 'Financial Planning & Fees',
    desc: 'Fee structures, payment plans, scholarship opportunities, and financial aid options for every programme.',
    link: '/financial-planning',
    linkText: 'View Fees & Aid',
    image: 'https://images.unsplash.com/photo-1656049471454-ff3c59812741?auto=format&fit=crop&w=800&q=80'
  }
]

const CAMPUS_FEATURES: CampusFeature[] = [
  {
    icon: IconMovie,
    title: 'Studio Access',
    desc: 'Professional film, animation, audio, and design studios available for student projects and practice sessions.'
  },
  {
    icon: IconUsers,
    title: 'Community Events',
    desc: 'Regular showcases, hackathons, film screenings, and networking events connecting students with industry professionals.'
  },
  {
    icon: IconBriefcase,
    title: 'Career Services',
    desc: 'CV workshops, interview prep, portfolio reviews, and direct introductions to employers across creative industries.'
  },
  {
    icon: IconWifi,
    title: 'Hybrid Learning',
    desc: 'Flexible online and on-campus learning model with digital tools, virtual studios, and remote collaboration support.'
  }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StudentLifePage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Student Life | ADMI"
        description="From creative studios to career support — everything you need to thrive as an ADMI student."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="relative h-[520px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1669508595978-9db290965da3?auto=format&fit=crop&w=1920&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A18]/85 to-[#0A1A18]/40" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl items-end px-4 pb-16 xl:px-20">
            <div className="max-w-[800px]">
              <p className="font-proxima text-[14px] font-bold tracking-[1px] text-[#B7D8CF]">/student-life</p>
              <h1 className="mt-5 font-fraunces text-[52px] font-bold leading-[1.14] text-white">
                Student Life at ADMI
              </h1>
              <p className="mt-5 max-w-[700px] font-proxima text-[18px] leading-[1.6] text-white/80">
                From creative studios to career support &mdash; everything you need to thrive as an ADMI student.
              </p>
            </div>
          </div>
        </section>

        {/* ── Hub Cards ── */}
        <section className="px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-[#BA2E36]">EXPLORE STUDENT LIFE</p>
            <h2 className="mt-2 font-fraunces text-[40px] font-bold text-[#171717]">Everything You Need to Succeed</h2>
            <p className="mt-2.5 max-w-[900px] font-proxima text-[17px] leading-[1.6] text-[#555]">
              ADMI wraps creative education with the support systems, community, and resources students need to graduate and launch careers.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {HUB_CARDS.map((card) => (
                <Link key={card.title} href={card.link} className="group overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white transition hover:shadow-lg">
                  <div className="h-[240px] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${card.image}')` }} />
                  <div className="p-7">
                    <card.icon size={28} className="text-[#BA2E36]" />
                    <h3 className="mt-3 font-fraunces text-[24px] font-bold text-[#171717]">{card.title}</h3>
                    <p className="mt-3 font-proxima text-[15px] leading-[1.6] text-[#555]">{card.desc}</p>
                    <p className="mt-3 font-proxima text-[15px] font-bold text-[#BA2E36]">{card.linkText} &rarr;</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Campus Life Features ── */}
        <section className="bg-[#F9F9F9] px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <p className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-[#BA2E36]">CAMPUS LIFE</p>
            <h2 className="mt-2 font-fraunces text-[40px] font-bold text-[#171717]">More Than a Classroom</h2>
            <p className="mt-2.5 font-proxima text-[17px] leading-[1.6] text-[#555]">
              Life at ADMI is a blend of creative studios, collaborative projects, industry mentors, and a vibrant student community.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CAMPUS_FEATURES.map((feat) => (
                <article key={feat.title} className="rounded-xl bg-white p-7">
                  <feat.icon size={32} className="text-[#BA2E36]" />
                  <h3 className="mt-3 font-fraunces text-[20px] font-bold text-[#171717]">{feat.title}</h3>
                  <p className="mt-3 font-proxima text-[14px] leading-[1.6] text-[#555]">{feat.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-gradient-to-br from-[#BA2E36] via-[#8E2028] to-[#1A1A1A] px-4 py-24 text-center text-white xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <h2 className="font-fraunces text-[44px] font-bold">Ready to Experience ADMI?</h2>
            <p className="mx-auto mt-4 max-w-[700px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Visit campus, meet students, and see our studios in action. Book an Open Day or start your application today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-proxima text-[15px] font-bold text-[#0A0A0A] transition hover:bg-white/90"
              >
                Apply Now <IconArrowRight size={18} />
              </Link>
              <Link
                href="https://wa.me/254741132751"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white hover:text-[#0A0A0A]"
              >
                <IconBrandWhatsapp size={18} /> Book an Open Day
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
