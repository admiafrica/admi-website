import Link from 'next/link'
import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getIcon } from '@/utils/icon-map'
import { getPageCached } from '@/utils/contentful-cached'
import type { StudentLifePageData, HubCardCMS, CampusFeatureCMS } from '@/types/student-life'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FALLBACK: StudentLifePageData = {
  hubCards: [
    {
      icon: 'palette',
      title: 'Student Showcase',
      desc: 'Browse portfolios, films, animations, and design projects from current students and recent graduates.',
      link: '/student-showcase',
      linkText: 'Explore Showcase',
      image: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: 'heart-handshake',
      title: 'Student Support',
      desc: 'Academic advising, wellness resources, career coaching, and accessibility services \u2014 all in one place.',
      link: '/student-support',
      linkText: 'Get Support',
      image: 'https://images.unsplash.com/photo-1571055931484-22dce9d6c510?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: 'calculator',
      title: 'Financial Planning & Fees',
      desc: 'Fee structures, payment plans, scholarship opportunities, and financial aid options for every programme.',
      link: '/financial-planning',
      linkText: 'View Fees & Aid',
      image: 'https://images.unsplash.com/photo-1656049471454-ff3c59812741?auto=format&fit=crop&w=800&q=80'
    }
  ],
  campusFeatures: [
    {
      icon: 'movie',
      title: 'Studio Access',
      desc: 'Professional film, animation, audio, and design studios available for student projects and practice sessions.'
    },
    {
      icon: 'users',
      title: 'Community Events',
      desc: 'Regular showcases, hackathons, film screenings, and networking events connecting students with industry professionals.'
    },
    {
      icon: 'briefcase',
      title: 'Career Services',
      desc: 'CV workshops, interview prep, portfolio reviews, and direct introductions to employers across creative industries.'
    },
    {
      icon: 'wifi',
      title: 'Hybrid Learning',
      desc: 'Flexible online and on-campus learning model with digital tools, virtual studios, and remote collaboration support.'
    }
  ],
  seoTitle: 'Student Life | ADMI',
  seoDescription: 'From creative studios to career support \u2014 everything you need to thrive as an ADMI student.'
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ page: StudentLifePageData }> = async () => {
  let page = FALLBACK

  try {
    const entry = await getPageCached('studentLifePage', 'page:student-life')
    if (entry?.fields) {
      const f = entry.fields
      page = {
        hubCards: f.hubCards || FALLBACK.hubCards,
        campusFeatures: f.campusFeatures || FALLBACK.campusFeatures,
        seoTitle: f.seoTitle || FALLBACK.seoTitle,
        seoDescription: f.seoDescription || FALLBACK.seoDescription
      }
    }
  } catch (error) {
    console.error('[Student Life] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { page },
    revalidate: 300
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function StudentLifePage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout footerBgColor="#1a1a1a" heroOverlap>
      <PageSEO title={page.seoTitle} description={page.seoDescription} />

      <div className="w-full">
        {/* -- Hero -- */}
        <section className="relative h-[420px] overflow-hidden md:h-[520px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1669508595978-9db290965da3?auto=format&fit=crop&w=1920&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A18]/85 to-[#0A1A18]/40" />
          <div className="section-container relative z-10 flex h-full items-end pb-10 md:pb-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-secondary" />
                <span className="section-label text-[#B7D8CF]">STUDENT LIFE</span>
              </div>
              <h1 className="section-heading-dark mb-4 lg:text-[52px]">
                Student Life at ADMI
              </h1>
              <p className="section-subheading-dark max-w-[700px]">
                From creative studios to career support &mdash; everything you need to thrive as an ADMI student.
              </p>
            </div>
          </div>
        </section>

        {/* -- Hub Cards -- */}
        <section className="section-padding">
          <div className="section-container">
            <p className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-brand-red">
              EXPLORE STUDENT LIFE
            </p>
            <h2 className="mt-2 font-proxima text-[26px] font-bold text-[#171717] md:text-[40px]">Everything You Need to Succeed</h2>
            <p className="mt-2.5 max-w-[900px] font-proxima text-[17px] leading-[1.6] text-[#555]">
              ADMI wraps creative education with the support systems, community, and resources students need to graduate
              and launch careers.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {page.hubCards.map((card: HubCardCMS) => {
                const CardIcon = getIcon(card.icon)
                return (
                  <Link
                    key={card.title}
                    href={card.link}
                    className="group overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white transition hover:shadow-lg"
                  >
                    <div
                      className="h-[240px] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${card.image}')` }}
                    />
                    <div className="p-7">
                      {CardIcon && <CardIcon size={28} className="text-brand-red" />}
                      <h3 className="mt-3 font-proxima text-[24px] font-bold text-[#171717]">{card.title}</h3>
                      <p className="mt-3 font-proxima text-[15px] leading-[1.6] text-[#555]">{card.desc}</p>
                      <p className="mt-3 font-proxima text-[15px] font-bold text-brand-red">{card.linkText} &rarr;</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* -- Campus Life Features -- */}
        <section className="section-padding bg-[#F9F9F9]">
          <div className="section-container">
            <p className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-brand-red">CAMPUS LIFE</p>
            <h2 className="mt-2 font-proxima text-[26px] font-bold text-[#171717] md:text-[40px]">More Than a Classroom</h2>
            <p className="mt-2.5 font-proxima text-[17px] leading-[1.6] text-[#555]">
              Life at ADMI is a blend of creative studios, collaborative projects, industry mentors, and a vibrant
              student community.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {page.campusFeatures.map((feat: CampusFeatureCMS) => {
                const FeatIcon = getIcon(feat.icon)
                return (
                  <article key={feat.title} className="rounded-xl bg-white p-7">
                    {FeatIcon && <FeatIcon size={32} className="text-brand-red" />}
                    <h3 className="mt-3 font-proxima text-[20px] font-bold text-[#171717]">{feat.title}</h3>
                    <p className="mt-3 font-proxima text-[14px] leading-[1.6] text-[#555]">{feat.desc}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* -- CTA -- */}
        <section className="bg-gradient-to-br from-brand-red via-[#8E2028] to-[#1A1A1A] py-24 text-center text-white">
          <div className="section-container">
            <h2 className="font-proxima text-[28px] font-bold md:text-[44px]">Ready to Experience ADMI?</h2>
            <p className="mx-auto mt-4 max-w-[700px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Visit campus, meet students, and see our studios in action. Book an Open Day or start your application
              today.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-proxima text-[15px] font-bold text-admi-black transition hover:bg-white/90"
              >
                Apply Now <IconArrowRight size={18} />
              </Link>
              <Link
                href="https://wa.me/254741132751"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white hover:text-admi-black"
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
