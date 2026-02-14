import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getPageCached, getEntriesCached } from '@/utils/contentful-cached'
import { getIcon } from '@/utils/icon-map'
import type { AlumniStat, FeaturedAlumni, CompanyRow, NetworkBenefitCMS } from '@/types/alumni'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FALLBACK_STATS: AlumniStat[] = [
  { value: '4,000+', label: 'Graduates' },
  { value: '87%', label: 'Employment Rate' },
  { value: '15+', label: 'Countries Reached' },
  { value: '200+', label: 'Partner Companies' }
]

const FALLBACK_FEATURED_ALUMNI: FeaturedAlumni[] = [
  {
    name: 'Grace Muthoni',
    role: 'Senior Editor at NTV Kenya',
    programme: 'Film Production Diploma, Class of 2022',
    quote:
      'The hands-on training at ADMI gave me the confidence to walk into a professional newsroom and deliver from day one. I was editing broadcast-ready packages within my first month at NTV.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'David Kimani',
    role: 'Creative Director at Ogilvy Africa',
    programme: 'Graphic Design Diploma, Class of 2021',
    quote:
      'My portfolio coming out of ADMI was stronger than what most agencies see from candidates with years of experience. The faculty pushed us to think beyond templates and create original work.',
    image: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Wanjiku Njeri',
    role: 'Sound Engineer at Ogopa DJs',
    programme: 'Sound Engineering Diploma, Class of 2023',
    quote:
      'ADMI connected me directly to the industry. By the time I graduated, I already had freelance clients and a clear path into one of Kenya\u2019s biggest music production houses.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80'
  }
]

const FALLBACK_COMPANY_ROWS: CompanyRow[] = [
  { names: ['NTV Kenya', 'Ogilvy Africa', 'MSC Cruises', 'Ogopa DJs', 'Sensorflick'] },
  { names: ['Citizen TV', 'Scanad Kenya', 'inABLE', 'BBC Africa'] }
]

const FALLBACK_NETWORK_BENEFITS: NetworkBenefitCMS[] = [
  {
    icon: 'briefcase',
    title: 'Career Support',
    desc: 'Access job boards, CV reviews, and career coaching exclusively for ADMI graduates. Our careers team works with 200+ partner companies to match alumni with opportunities.'
  },
  {
    icon: 'users',
    title: 'Networking Events',
    desc: 'Quarterly meetups, industry mixers, and annual homecoming events that keep you connected to fellow graduates and industry leaders across East Africa.'
  },
  {
    icon: 'heart-handshake',
    title: 'Mentorship Programme',
    desc: 'Give back by mentoring current students or connect with senior alumni for guidance. Our structured mentorship programme pairs graduates across disciplines and experience levels.'
  },
  {
    icon: 'speakerphone',
    title: 'Alumni Spotlight',
    desc: 'Get featured on our platforms and amplify your work. From social media takeovers to campus talks, we celebrate alumni achievements and help you build your public profile.'
  }
]

/* ------------------------------------------------------------------ */
/*  Static Props                                                       */
/* ------------------------------------------------------------------ */

interface AlumniPageProps {
  stats: AlumniStat[]
  featuredAlumni: FeaturedAlumni[]
  companyRows: CompanyRow[]
  networkBenefits: NetworkBenefitCMS[]
}

export const getStaticProps: GetStaticProps<AlumniPageProps> = async () => {
  let stats = FALLBACK_STATS
  let featuredAlumni: FeaturedAlumni[] = FALLBACK_FEATURED_ALUMNI
  let companyRows = FALLBACK_COMPANY_ROWS
  let networkBenefits = FALLBACK_NETWORK_BENEFITS

  try {
    const [pageEntry, profileEntries] = await Promise.all([
      getPageCached('alumniPage', 'page:alumni'),
      getEntriesCached('alumniProfile', 'alumni-profiles', 'order=fields.sortOrder')
    ])

    if (pageEntry?.fields) {
      const f = pageEntry.fields
      stats = f.stats || FALLBACK_STATS
      companyRows = f.companyRows || FALLBACK_COMPANY_ROWS
      networkBenefits = f.networkBenefits || FALLBACK_NETWORK_BENEFITS
    }

    if (profileEntries && profileEntries.length > 0) {
      featuredAlumni = profileEntries.map((e: any) => ({
        name: e.fields.name,
        role: e.fields.role,
        programme: e.fields.programme || '',
        quote: e.fields.quote || '',
        image: e.fields.image || ''
      }))

      if (featuredAlumni.length === 0) featuredAlumni = FALLBACK_FEATURED_ALUMNI
    }
  } catch (error) {
    console.error('[Alumni] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { stats, featuredAlumni, companyRows, networkBenefits },
    revalidate: 300
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AlumniPage({
  stats: STATS,
  featuredAlumni: FEATURED_ALUMNI,
  companyRows: COMPANY_ROWS,
  networkBenefits: NETWORK_BENEFITS
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Our Alumni | Africa Digital Media Institute"
        description="Meet 4,000+ ADMI graduates building Africa's creative future. Discover alumni stories, career outcomes, and the network that connects creative professionals across the continent."
      />

      <div className="w-full">
        {/* ── Hero ── */}
        <section className="relative h-[520px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-admi-black/90 via-admi-black/70 to-admi-black/50" />
          <div
            className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col justify-center px-4 xl:px-20"
            style={{ paddingTop: 120, paddingBottom: 80 }}
          >
            <span className="inline-flex w-fit items-center rounded-full bg-brand-red px-4 py-1.5 font-proxima text-[12px] font-bold uppercase tracking-[2px] text-white">
              OUR ALUMNI NETWORK
            </span>
            <h1 className="font-proxima mt-6 max-w-[780px] text-[52px] font-bold leading-[1.1] tracking-tight text-white">
              4,000+ Graduates Building Africa&apos;s Creative Future
            </h1>
            <p className="mt-6 max-w-[620px] font-proxima text-[18px] leading-[1.7] text-white/80">
              From Nairobi studios to global agencies, ADMI alumni are shaping the creative industries across Africa and
              beyond. Discover where our graduates are making their mark.
            </p>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="bg-admi-black">
          <div className="mx-auto flex w-full max-w-screen-xl items-center justify-around px-4 py-8 xl:px-20">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="text-center">
                  <p className="font-proxima text-[36px] font-bold text-brand-red">{s.value}</p>
                  <p className="font-proxima text-[14px] text-[#FFFFFFAA]">{s.label}</p>
                </div>
                {i < STATS.length - 1 && <div className="ml-10 h-12 w-px bg-white/20" />}
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Alumni ── */}
        <section className="bg-white px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-brand-red" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                FEATURED GRADUATES
              </span>
            </div>
            <h2 className="font-proxima mt-6 text-[40px] font-bold leading-[1.15] text-[#171717]">
              Where Our Alumni Are Now
            </h2>
            <p className="mt-4 max-w-[640px] font-proxima text-[17px] leading-[1.7] text-[#666]">
              Our graduates are leading creative teams, launching studios, and building careers at some of Africa&apos;s
              most respected companies.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {FEATURED_ALUMNI.map((alumni) => (
                <article key={alumni.name} className="overflow-hidden rounded-xl border border-[#E8E8E8] bg-white">
                  <div className="h-[320px] w-full overflow-hidden">
                    <img src={alumni.image} alt={alumni.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="px-6 pb-7 pt-6">
                    <h3 className="font-proxima text-[24px] font-bold text-[#171717]">{alumni.name}</h3>
                    <p className="mt-1.5 font-proxima text-[14px] font-bold text-brand-red">{alumni.role}</p>
                    <p className="mt-1 font-proxima text-[13px] text-[#999]">{alumni.programme}</p>
                    <p className="mt-4 font-proxima text-[14px] italic leading-[1.6] text-[#666]">
                      &ldquo;{alumni.quote}&rdquo;
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Where Alumni Work ── */}
        <section className="bg-[#F9F9F9] px-4 py-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-10 bg-brand-red" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                WHERE OUR GRADUATES WORK
              </span>
            </div>
            <h2 className="font-proxima mt-6 text-[40px] font-bold text-[#171717]">
              Trusted by Leading Companies Across Africa
            </h2>

            <div className="mt-12 flex flex-col items-center gap-4">
              {COMPANY_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center gap-4">
                  {row.names.map((name) => (
                    <span
                      key={name}
                      className="rounded-2xl border border-[#EDEDED] bg-[#F9F9F9] px-9 py-5 font-proxima text-[17px] font-semibold text-[#333]"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Network Benefits ── */}
        <section className="bg-[#F9F9F9] px-4 pb-20 xl:px-20">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-brand-red" />
              <span className="font-proxima text-[13px] font-bold uppercase tracking-[3px] text-brand-red">
                JOIN THE NETWORK
              </span>
            </div>
            <h2 className="font-proxima mt-6 text-[36px] font-bold text-[#171717]">What You Get as an ADMI Alumnus</h2>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {NETWORK_BENEFITS.map((benefit) => {
                const Icon = getIcon(benefit.icon)
                return (
                  <article key={benefit.title} className="rounded-xl bg-white p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C1272D1A]">
                      {Icon && <Icon size={24} className="text-brand-red" />}
                    </div>
                    <h3 className="font-proxima mt-5 text-[22px] font-bold text-[#171717]">{benefit.title}</h3>
                    <p className="mt-3 font-proxima text-[15px] leading-[1.7] text-[#666]">{benefit.desc}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Alumni Testimonial ── */}
        <section className="border-t border-[#EEEEEE] bg-white px-4 py-20 xl:px-20">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
            <div className="w-full flex-shrink-0 overflow-hidden rounded-3xl lg:w-[400px]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="James Ochieng, ADMI alumni"
                className="h-[480px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center lg:py-8">
              <span className="font-proxima text-[80px] leading-none text-brand-red">&ldquo;</span>
              <p className="font-proxima -mt-8 text-[22px] font-medium leading-[1.5] text-[#333]">
                ADMI did not just teach me animation &mdash; it taught me how to think as a creative entrepreneur. The
                connections I made with faculty and classmates became my first business partners. Today, Pixel Studios
                employs twelve people, and every one of our founding team met at ADMI.
              </p>
              <div className="mt-8">
                <p className="font-proxima text-[16px] font-bold text-[#171717]">James Ochieng</p>
                <p className="mt-1 font-proxima text-[14px] text-[#999]">
                  Founder, Pixel Studios &bull; Animation Diploma, Class of 2019
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="px-4 py-24 text-white xl:px-20"
          style={{ background: 'linear-gradient(135deg, #C1272D 0%, #7A1520 50%, #3D0A10 100%)' }}
        >
          <div className="mx-auto w-full max-w-screen-xl text-center">
            <h2 className="font-proxima mx-auto max-w-[600px] text-[40px] font-bold leading-[1.15]">
              Are You an ADMI Graduate?
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] font-proxima text-[18px] leading-[1.6] text-white/80">
              Join 4,000+ alumni in the ADMI network. Access career support, networking events, mentorship
              opportunities, and stay connected to your creative community.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-proxima text-[15px] font-bold text-admi-black transition hover:bg-white/90"
              >
                Join Alumni Network <IconArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 font-proxima text-[15px] font-bold text-white transition hover:bg-white hover:text-admi-black"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
