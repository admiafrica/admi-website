import Link from 'next/link'
import { IconArrowRight, IconMapPin, IconClock } from '@tabler/icons-react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { getIcon } from '@/utils/icon-map'
import { getPageCached } from '@/utils/contentful-cached'
import type { FacultyMember, JobOpening, WorkBenefitCMS, TeamMember, WorkWithUsPageData } from '@/types/work-with-us'

/* ------------------------------------------------------------------ */
/*  Fallback data (used when Contentful is unavailable)                */
/* ------------------------------------------------------------------ */

const FALLBACK: WorkWithUsPageData = {
  faculty: [
    {
      name: 'Prof. Michael Otieno',
      title: 'Head of Film & TV',
      description:
        'Award-winning filmmaker with over 15 years of experience in East African cinema and broadcast television.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sarah Kamau',
      title: 'Lead, Digital Design',
      description:
        'Former creative director at a leading Nairobi agency, specialising in brand identity and UX for African markets.',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'James Mwangi',
      title: 'Director, Music Production',
      description:
        'Grammy-nominated producer and sound engineer who has shaped the Kenyan music scene for over a decade.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    }
  ],
  openings: [
    {
      title: 'Film Production Lecturer',
      type: 'Full-time',
      location: 'Nairobi',
      posted: 'Posted Jan 2026',
      description:
        'Deliver practical modules across screenwriting, cinematography, and post-production workflows for diploma learners.'
    },
    {
      title: 'Motion Graphics Instructor',
      type: 'Full-time / Contract',
      location: 'Nairobi',
      posted: 'Posted Jan 2026',
      description: 'Teach motion design principles using After Effects, Cinema 4D, and emerging real-time tools.'
    },
    {
      title: 'Graphic Design Instructor',
      type: 'Full-time',
      location: 'Hybrid',
      posted: 'Posted Feb 2026',
      description: 'Guide learners through brand identity, editorial layout, and digital illustration projects.'
    },
    {
      title: 'Sound Engineering Lab Technician',
      type: 'Full-time',
      location: 'Nairobi',
      posted: 'Posted Feb 2026',
      description:
        'Maintain studio equipment, support practical sessions, and ensure lab readiness for audio production classes.'
    }
  ],
  benefits: [
    {
      icon: 'bulb',
      title: 'Creative Environment',
      description: 'Work alongside industry professionals in state-of-the-art studios and labs.'
    },
    {
      icon: 'rocket',
      title: 'Impact-Driven',
      description: 'Shape the future of creative education across East Africa.'
    },
    {
      icon: 'briefcase',
      title: 'Professional Growth',
      description: 'Access to industry events, workshops, and continuous learning opportunities.'
    },
    {
      icon: 'heart',
      title: 'Strong Community',
      description: 'Join a diverse team of passionate educators and creatives.'
    }
  ],
  teamMembers: [
    {
      name: 'Angela Ndegwa',
      role: 'Director of Admissions',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'David Ochieng',
      role: 'Head of Student Affairs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Fatima Hassan',
      role: 'HR & People Lead',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Brian Kiplagat',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
    }
  ],
  seoTitle: 'Work With Us',
  seoDescription:
    "Join ADMI's award-winning faculty and team. Explore open positions in film, design, music production, and creative education in Nairobi, Kenya.",
  seoKeywords:
    'ADMI careers, work at ADMI, creative education jobs, teaching jobs Nairobi, film lecturer, design instructor'
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

export const getStaticProps: GetStaticProps<{ page: WorkWithUsPageData }> = async () => {
  let page = FALLBACK

  try {
    const entry = await getPageCached('workWithUsPage', 'page:work-with-us')
    if (entry?.fields) {
      const f = entry.fields
      page = {
        faculty: f.faculty || FALLBACK.faculty,
        openings: f.openings || FALLBACK.openings,
        benefits: f.benefits || FALLBACK.benefits,
        teamMembers: f.teamMembers || FALLBACK.teamMembers,
        seoTitle: f.seoTitle || FALLBACK.seoTitle,
        seoDescription: f.seoDescription || FALLBACK.seoDescription,
        seoKeywords: f.seoKeywords || FALLBACK.seoKeywords
      }
    }
  } catch (error) {
    console.error('[Work With Us] CMS fetch failed, using fallback:', error)
  }

  return {
    props: { page },
    revalidate: 300 // ISR: revalidate every 5 minutes
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WorkWithUsPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { faculty, openings, benefits, teamMembers } = page

  return (
    <MainLayout footerBgColor="#1a1a1a" heroOverlap>
      <PageSEO title={page.seoTitle} description={page.seoDescription} keywords={page.seoKeywords} />

      <div className="w-full">
        {/* ============================================================ */}
        {/* 1. HERO                                                      */}
        {/* ============================================================ */}
        <div className="relative min-h-[520px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center md:min-h-[580px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
          <div className="section-container relative z-10 flex h-full min-h-[520px] flex-col justify-end pb-14 md:min-h-[580px]">
            <span className="mb-5 inline-block w-fit rounded-full bg-brand-red px-4 py-1.5 font-nexa text-[12px] font-bold uppercase tracking-[0.15em] text-white">
              Careers at ADMI
            </span>
            <h1 className="max-w-[800px] font-proxima text-[36px] font-bold leading-[1.1] text-white md:text-[48px] lg:text-[52px]">
              Shape the Future of Creative Education in Africa
            </h1>
            <p className="max-w-[680px] pt-4 font-nexa text-[16px] leading-relaxed text-white/70 md:text-[18px]">
              Join an award-winning faculty of industry professionals, filmmakers, designers, and musicians who are
              training Africa&apos;s next generation of creative talent.
            </p>
            <a
              href="#open-positions"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-nexa text-[15px] font-bold text-white transition hover:bg-[#a02630]"
            >
              View Open Positions
              <IconArrowRight size={18} stroke={2} />
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. FACULTY AWARDS                                            */}
        {/* ============================================================ */}
        <div className="bg-[#F9F9F9] py-16 md:py-20">
          <div className="section-container">
            <p className="font-nexa text-[12px] font-bold uppercase tracking-[0.18em] text-brand-red">
              Award-Winning Faculty
            </p>
            <h2 className="pt-3 font-proxima text-[34px] font-bold leading-[1.15] text-[#171717] md:text-[40px]">
              Our Educators Are Industry Leaders
            </h2>
            <p className="max-w-[720px] pt-3 font-nexa text-[16px] leading-relaxed text-[#555] md:text-[17px]">
              ADMI faculty members are practising professionals who have shaped Kenya&apos;s creative industries. They
              bring real-world expertise into every classroom, studio session, and critique.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-3">
              {faculty.map((member: FacultyMember) => (
                <div
                  key={member.name}
                  className="group overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white transition hover:shadow-lg"
                >
                  <div
                    className="h-[260px] bg-cover bg-center transition group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <div className="p-6">
                    <h3 className="font-proxima text-[22px] font-bold text-[#171717]">{member.name}</h3>
                    <p className="pt-1 font-nexa text-[13px] font-bold uppercase tracking-[0.08em] text-brand-red">
                      {member.title}
                    </p>
                    <p className="pt-3 font-nexa text-[15px] leading-relaxed text-[#555]">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. OPEN POSITIONS                                            */}
        {/* ============================================================ */}
        <div id="open-positions" className="bg-white py-16 md:py-20">
          <div className="section-container">
            <p className="font-nexa text-[12px] font-bold uppercase tracking-[0.18em] text-brand-red">Open Positions</p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <h2 className="font-proxima text-[34px] font-bold leading-[1.15] text-[#171717] md:text-[40px]">
                Join Our Team
              </h2>
              <span className="rounded-full bg-brand-red/10 px-3 py-1 font-nexa text-[13px] font-bold text-brand-red">
                {openings.length} Open Roles
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              {openings.map((role: JobOpening) => (
                <div
                  key={role.title}
                  className="group flex flex-col items-start justify-between gap-4 rounded-xl border border-[#E8E8E8] bg-white p-6 transition hover:border-brand-red/30 hover:shadow-md md:flex-row md:items-center"
                >
                  <div className="flex-1">
                    <h3 className="font-proxima text-[22px] font-bold leading-tight text-[#171717] md:text-[24px]">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F4F4F4] px-2.5 py-1 font-nexa text-[12px] font-bold text-[#555]">
                        <IconClock size={14} stroke={1.8} />
                        {role.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F4F4F4] px-2.5 py-1 font-nexa text-[12px] font-bold text-[#555]">
                        <IconMapPin size={14} stroke={1.8} />
                        {role.location}
                      </span>
                      <span className="font-nexa text-[12px] text-[#999]">{role.posted}</span>
                    </div>
                    <p className="mt-3 max-w-[600px] font-nexa text-[15px] leading-relaxed text-[#666]">
                      {role.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-white transition group-hover:bg-[#a02630]">
                      <IconArrowRight size={20} stroke={2} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. WHY ADMI                                                  */}
        {/* ============================================================ */}
        <div className="bg-admi-black py-16 md:py-20">
          <div className="section-container">
            <p className="font-nexa text-[12px] font-bold uppercase tracking-[0.18em] text-brand-red">
              Why Work With Us
            </p>
            <h2 className="pt-3 font-proxima text-[34px] font-bold leading-[1.15] text-white md:text-[40px]">
              More Than a Workplace
            </h2>
            <p className="max-w-[680px] pt-3 font-nexa text-[16px] leading-relaxed text-white/70 md:text-[17px]">
              At ADMI, you don&apos;t just teach &mdash; you create. Our environment is built for collaboration,
              innovation, and meaningful impact on the next generation of African creatives.
            </p>

            <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-2">
              {benefits.map((benefit: WorkBenefitCMS) => {
                const Icon = getIcon(benefit.icon)
                return (
                  <div
                    key={benefit.title}
                    className="rounded-xl border border-white/10 bg-[#1A1A1A] p-7 transition hover:border-white/20"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/15">
                      {Icon && <Icon size={24} stroke={1.8} className="text-brand-red" />}
                    </div>
                    <h3 className="font-proxima text-[22px] font-bold text-white">{benefit.title}</h3>
                    <p className="pt-2 font-nexa text-[15px] leading-relaxed text-white/70">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. MEET THE TEAM                                             */}
        {/* ============================================================ */}
        <div className="bg-white py-16 md:py-20">
          <div className="section-container">
            <p className="font-nexa text-[12px] font-bold uppercase tracking-[0.18em] text-brand-red">Meet the Team</p>
            <h2 className="pt-3 font-proxima text-[34px] font-bold leading-[1.15] text-[#171717] md:text-[40px]">
              The People Behind ADMI
            </h2>

            <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-4">
              {teamMembers.map((member: TeamMember) => (
                <div key={member.name} className="group text-center">
                  <div
                    className="mx-auto h-[200px] w-full overflow-hidden rounded-2xl bg-cover bg-center transition group-hover:shadow-lg sm:h-[240px] md:h-[280px]"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <h3 className="pt-4 font-proxima text-[18px] font-bold text-[#171717] md:text-[20px]">
                    {member.name}
                  </h3>
                  <p className="pt-1 font-nexa text-[13px] text-[#666] md:text-[14px]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. CTA                                                       */}
        {/* ============================================================ */}
        <div className="bg-gradient-to-r from-brand-red to-[#5A0F16] py-16 text-white md:py-20">
          <div className="section-container text-center">
            <h2 className="font-proxima text-[36px] font-bold leading-[1.15] md:text-[44px]">
              Don&apos;t See Your Role?
            </h2>
            <p className="mx-auto max-w-[640px] pt-4 font-nexa text-[16px] leading-relaxed text-white/85 md:text-[18px]">
              We&apos;re always looking for exceptional educators and creative professionals. Send us your CV and tell
              us how you&apos;d contribute to the ADMI experience.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:careers@admi.ac.ke"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-nexa text-[15px] font-bold text-brand-red transition hover:bg-white/90"
              >
                Send Your CV
                <IconArrowRight size={18} stroke={2} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-3 font-nexa text-[15px] font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                Contact HR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
