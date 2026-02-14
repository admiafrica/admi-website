import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import type {
  HeroStat,
  IncomeYearCard,
  ProgrammeOutcome,
  BenchmarkCard,
  CareerPathCard,
  CompanyPill,
  AlumniStory,
  AwardRow,
  MethodologyStat,
  CtaBottomStat
} from '@/types/our-impact'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HERO_STATS: HeroStat[] = [
  { value: '4,500+', label: 'Students & Alumni', color: '#08F6CF' },
  { value: '88%', label: 'Employment Rate', color: '#ffffff' },
  { value: '3x', label: 'Income Growth by Year 3', color: '#F76335' },
  { value: '15+', label: 'Countries Reached', color: '#BA2E36' }
]

const INCOME_YEAR_CARDS: IncomeYearCard[] = [
  {
    badge: 'Year 1 \u2014 The Hustle',
    badgeBg: '#FFF0F0',
    badgeColor: '#BA2E36',
    value: 'KES 10-20K',
    valueColor: '#171717',
    subtitle: 'monthly',
    subtitleColor: '#999999',
    description:
      'Building portfolios, taking on freelance gigs, and gaining real-world experience. The foundation years.',
    descColor: '#666666',
    bgColor: '#f9f9f9'
  },
  {
    badge: 'Year 2 \u2014 Building Momentum',
    badgeBg: '#FFF8F0',
    badgeColor: '#F76335',
    value: 'KES 25-50K',
    valueColor: '#171717',
    subtitle: 'monthly',
    subtitleColor: '#999999',
    description: 'Reputation growing, clients returning, and specialisation kicking in. Income doubles.',
    descColor: '#666666',
    bgColor: '#f9f9f9'
  },
  {
    badge: 'Year 3 \u2014 Breaking Through',
    badgeBg: 'rgba(255,255,255,0.12)',
    badgeColor: '#08F6CF',
    value: 'KES 50-100K+',
    valueColor: '#ffffff',
    subtitle: 'monthly',
    subtitleColor: '#08F6CF',
    description: 'Industry leaders, business owners, and in-demand professionals. 65-230% above industry benchmarks.',
    descColor: '#cccccc',
    bgColor: '#0A3D3D'
  }
]

const PROGRAMME_OUTCOMES_ROW1: ProgrammeOutcome[] = [
  {
    name: 'Film & TV Production',
    value: 'KES 80-90K+',
    color: '#08F6CF',
    barWidth: '75%',
    note: '85% employed within 6 months'
  },
  {
    name: 'Music Production',
    value: 'KES 80-100K+',
    color: '#F76335',
    barWidth: '80%',
    note: 'Highest earning potential among all programmes'
  },
  {
    name: 'Multimedia',
    value: 'KES 80-120K+',
    color: '#BA2E36',
    barWidth: '85%',
    note: 'Most versatile career options'
  }
]

const PROGRAMME_OUTCOMES_ROW2: ProgrammeOutcome[] = [
  {
    name: 'Sound Engineering',
    value: 'KES 60-80K+',
    color: '#08F6CF',
    barWidth: '65%',
    note: 'High demand in live events and studios'
  },
  {
    name: 'Graphic Design',
    value: 'KES 50-70K+',
    color: '#F76335',
    barWidth: '55%',
    note: 'Strong freelance and agency demand'
  },
  {
    name: 'Animation',
    value: 'KES 50-70K+',
    color: '#BA2E36',
    barWidth: '55%',
    note: 'Growing international remote opportunities'
  }
]

const BENCHMARK_CARDS: BenchmarkCard[] = [
  {
    value: 'KES 24-30K',
    valueColor: 'rgba(255,255,255,0.6)',
    label: 'Industry Benchmark',
    labelColor: 'rgba(255,255,255,0.8)',
    description: 'Typical creative industry salary in Kenya',
    descColor: 'rgba(255,255,255,0.6)',
    bgColor: 'rgba(255,255,255,0.15)'
  },
  {
    value: 'KES 50-100K+',
    valueColor: '#BA2E36',
    label: 'ADMI Graduate Reality',
    labelColor: '#171717',
    description: 'Year 3 median monthly earnings',
    descColor: '#666666',
    bgColor: '#ffffff'
  }
]

const CAREER_PATHS: CareerPathCard[] = [
  {
    percentage: '70%',
    percentColor: '#08F6CF',
    label: 'Choose Freelance',
    labelColor: '#ffffff',
    bgColor: '#0A3D3D',
    timeline: [
      { dotColor: '#08F6CF', text: 'Year 1: KES 15-25K \u2014 Building client base', textColor: '#cccccc' },
      { dotColor: '#08F6CF', text: 'Year 2: KES 30-50K \u2014 Repeat clients, referrals', textColor: '#cccccc' },
      { dotColor: '#08F6CF', text: 'Year 3+: KES 60-120K \u2014 Industry leader', textColor: '#ffffff' }
    ]
  },
  {
    percentage: '30%',
    percentColor: '#BA2E36',
    label: 'Choose Employment',
    labelColor: '#171717',
    bgColor: '#ffffff',
    borderColor: '#E8E8E8',
    timeline: [
      { dotColor: '#BA2E36', text: 'Year 1: KES 20-30K \u2014 Junior creative roles', textColor: '#666666' },
      { dotColor: '#BA2E36', text: 'Year 2: KES 35-55K \u2014 Mid-level positions', textColor: '#666666' },
      { dotColor: '#BA2E36', text: 'Year 3+: KES 50-90K \u2014 Senior / Lead roles', textColor: '#171717' }
    ]
  }
]

const COMPANY_PILLS_ROW1: CompanyPill[] = [
  { name: 'NTV Kenya' },
  { name: 'Ogilvy Africa' },
  { name: 'MSC Cruises' },
  { name: 'Safaricom' },
  { name: 'Ogopa DJs' },
  { name: 'Nation Media' }
]

const COMPANY_PILLS_ROW2: CompanyPill[] = [
  { name: 'WPP Scangroup' },
  { name: 'Showmax' },
  { name: 'Citizen TV' },
  { name: 'Weza Tele' },
  { name: 'Netflix Africa' },
  { name: 'Tubidy Studios' }
]

const ALUMNI_STORIES: AlumniStory[] = [
  {
    image:
      'https://images.unsplash.com/photo-1615453261261-77494754424e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80',
    name: 'Grace Muthoni',
    role: 'Senior Editor, NTV Kenya',
    roleColor: '#08F6CF',
    quote:
      '"ADMI gave me the technical skills and industry connections that launched my career in broadcast journalism."',
    meta: 'Film Production Diploma, Class of 2022'
  },
  {
    image:
      'https://images.unsplash.com/photo-1622295023825-6e319464b810?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80',
    name: 'David Kimani',
    role: 'Creative Director, Ogilvy Africa',
    roleColor: '#F76335',
    quote:
      '"The hands-on approach at ADMI prepared me for real agency life. Within 3 years, I was leading creative campaigns for major brands."',
    meta: 'Graphic Design Diploma, Class of 2021'
  },
  {
    image:
      'https://images.unsplash.com/photo-1685634115415-4fd59062a34e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=220&q=80',
    name: 'Wanjiku Njeri',
    role: 'Sound Engineer, Ogopa DJs',
    roleColor: '#BA2E36',
    quote:
      '"From student projects to mixing tracks for top Kenyan artists. ADMI\'s studio facilities and mentorship made all the difference."',
    meta: 'Sound Engineering Diploma, Class of 2023'
  }
]

const AWARD_ROWS: AwardRow[] = [
  {
    bgColor: '#f9f9f9',
    imageUrl:
      'https://images.unsplash.com/photo-1642104744809-14b986179927?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=560&h=380&q=80',
    imageSide: 'left',
    badge: 'STUDENT FILM AWARD',
    badgeColor: '#BA2E36',
    badgeBg: '#FFF0F0',
    title: 'Kalasha International Film Awards',
    titleColor: '#171717',
    description:
      'ADMI film students have won multiple Kalasha Awards for Best Student Film, Best Cinematography, and Best Short Documentary. Competing against entries from across Africa, our students consistently prove they can hold their own on the continental stage.',
    descColor: '#666666',
    tags: [
      { text: 'Best Student Film 2023', textColor: '#171717', bgColor: '#ffffff', borderColor: '#E8E8E8' },
      { text: 'Best Cinematography 2024', textColor: '#171717', bgColor: '#ffffff', borderColor: '#E8E8E8' }
    ]
  },
  {
    bgColor: '#0A0A0A',
    imageUrl:
      'https://images.unsplash.com/photo-1713453450934-ffa72b233597?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=560&h=400&q=80',
    imageSide: 'right',
    badge: 'TOP 10 SME IN KENYA',
    badgeColor: '#08F6CF',
    badgeBg: 'rgba(255,255,255,0.08)',
    title: 'Recognised Among Kenya\u2019s Top Businesses',
    titleColor: '#ffffff',
    description:
      'ADMI was named among Kenya\u2019s Top 10 SMEs \u2014 a testament to our impact on the creative economy. From a single campus in 2011 to shaping 4,500+ careers, we\u2019ve proven that investing in creative education delivers measurable returns.',
    descColor: '#cccccc',
    tags: [],
    stats: [
      { value: 'Top 10', label: 'SME in Kenya' },
      { value: 'EU Accredited', label: 'Via Woolf University' }
    ]
  },
  {
    bgColor: '#0A3D3D',
    imageUrl:
      'https://images.unsplash.com/photo-1599840448769-f4ac7aac8d8b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=560&h=380&q=80',
    imageSide: 'left',
    badge: 'ALUMNI ACHIEVEMENT',
    badgeColor: '#08F6CF',
    badgeBg: 'rgba(255,255,255,0.08)',
    title: 'Alumni Leading the Creative Industry',
    titleColor: '#ffffff',
    description:
      'From Senior Editors at NTV to Creative Directors at Ogilvy Africa, ADMI alumni are winning industry awards and leading creative teams across the continent.',
    descColor: '#cccccc',
    tags: [
      { text: 'Loeries Africa Winners', textColor: '#08F6CF', bgColor: 'rgba(255,255,255,0.08)' },
      { text: 'International Commissions', textColor: '#08F6CF', bgColor: 'rgba(255,255,255,0.08)' },
      { text: 'Company Founders', textColor: '#08F6CF', bgColor: 'rgba(255,255,255,0.08)' }
    ]
  }
]

const METHODOLOGY_STATS: MethodologyStat[] = [
  { value: '700+', label: 'Emails Sent', description: 'Across all six diploma programmes' },
  { value: '110', label: 'Phone Follow-ups', description: 'Personal calls for deeper insights' },
  { value: '43', label: 'Detailed Responses', description: 'With verified income data' },
  { value: '8', label: 'Employer Insights', description: 'Industry partner hiring feedback' }
]

const CTA_BOTTOM_STATS: CtaBottomStat[] = [
  { value: '4.8/5', label: 'Student Satisfaction' },
  { value: '500+', label: 'Industry Partners' },
  { value: 'Since 2011', label: 'Shaping Creative Careers' }
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ImpactAlumniSuccessPage() {
  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Our Impact | ADMI - Transforming Lives Through Creative Education"
        description="Discover how ADMI graduates achieve 3x income growth by Year 3. 88% employment rate, 4,500+ alumni across 15+ countries. Real income data from our 2025 alumni survey."
        keywords="ADMI alumni success, income growth, career outcomes, graduate salaries Kenya, creative careers income, freelance success, ADMI impact, alumni earnings, graduate employment rates"
      />

      <div className="w-full">
        {/* ============================================================ */}
        {/*  1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A0A0A]">
          <div className="section-container">
            <div className="flex flex-col items-center gap-12 pb-20 pt-28 text-center md:pb-20 md:pt-[100px]">
              <p className="section-label text-[#08F6CF]">OUR IMPACT</p>
              <h1 className="font-fraunces mx-auto max-w-[900px] text-[36px] font-bold leading-[1.15] text-white md:text-[52px]">
                Transforming Lives Through Creative Education
              </h1>
              <p className="mx-auto max-w-[640px] font-proxima text-[18px] leading-[1.7] text-[#999999]">
                Since 2011, ADMI has been shaping East Africa&rsquo;s creative economy. Here&rsquo;s the measurable
                difference our graduates are making.
              </p>

              {/* Hero stats */}
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1">
                    <span className="font-fraunces text-[40px] font-bold md:text-[56px]" style={{ color: stat.color }}>
                      {stat.value}
                    </span>
                    <span className="font-proxima text-[14px] font-semibold text-[#999999]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  2. INCOME JOURNEY                                            */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#BA2E36]">GRADUATE EARNINGS</p>
              <h2 className="font-fraunces text-[32px] font-bold leading-[1.15] text-[#171717] md:text-[40px]">
                The 3-Year Income Journey
              </h2>
              <p className="mt-3 font-proxima text-[16px] leading-[1.6] text-[#666666]">
                Based on our August 2025 alumni survey of 700+ graduates, here&rsquo;s how ADMI alumni earnings grow
                over time.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {INCOME_YEAR_CARDS.map((card) => (
                <div
                  key={card.badge}
                  className="flex flex-col items-center gap-5 rounded-2xl p-9"
                  style={{ backgroundColor: card.bgColor }}
                >
                  {/* Badge */}
                  <span
                    className="rounded-full px-5 py-2 font-proxima text-[12px] font-bold"
                    style={{ backgroundColor: card.badgeBg, color: card.badgeColor }}
                  >
                    {card.badge}
                  </span>

                  {/* Value */}
                  <span className="font-fraunces text-[36px] font-bold" style={{ color: card.valueColor }}>
                    {card.value}
                  </span>

                  {/* Subtitle */}
                  <span className="font-proxima text-[14px]" style={{ color: card.subtitleColor }}>
                    {card.subtitle}
                  </span>

                  {/* Description */}
                  <p
                    className="max-w-[300px] text-center font-proxima text-[14px] leading-[1.6]"
                    style={{ color: card.descColor }}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  3. PROGRAMME OUTCOMES                                        */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A0A0A]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#08F6CF]">PROGRAMME OUTCOMES</p>
              <h2 className="font-fraunces text-[32px] font-bold leading-[1.15] text-white md:text-[40px]">
                Earnings by Programme
              </h2>
              <p className="mx-auto mt-3 max-w-[500px] font-proxima text-[16px] leading-[1.6] text-[#999999]">
                Year 3+ median monthly earnings by programme, based on alumni survey data.
              </p>
            </div>

            {/* Row 1 */}
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {PROGRAMME_OUTCOMES_ROW1.map((prog) => (
                <div
                  key={prog.name}
                  className="flex flex-col gap-3 rounded-2xl border border-[#333333] bg-[#1a1a1a] p-7"
                >
                  <span className="font-proxima text-[14px] font-bold text-[#999999]">{prog.name}</span>
                  <span className="font-fraunces text-[32px] font-bold" style={{ color: prog.color }}>
                    {prog.value}
                  </span>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full rounded-sm bg-[#333333]">
                    <div className="h-full rounded-sm" style={{ backgroundColor: prog.color, width: prog.barWidth }} />
                  </div>
                  <span className="font-proxima text-[12px] text-[#666666]">{prog.note}</span>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
              {PROGRAMME_OUTCOMES_ROW2.map((prog) => (
                <div
                  key={prog.name}
                  className="flex flex-col gap-3 rounded-2xl border border-[#333333] bg-[#1a1a1a] p-7"
                >
                  <span className="font-proxima text-[14px] font-bold text-[#999999]">{prog.name}</span>
                  <span className="font-fraunces text-[32px] font-bold" style={{ color: prog.color }}>
                    {prog.value}
                  </span>
                  <div className="h-1.5 w-full rounded-sm bg-[#333333]">
                    <div className="h-full rounded-sm" style={{ backgroundColor: prog.color, width: prog.barWidth }} />
                  </div>
                  <span className="font-proxima text-[12px] text-[#666666]">{prog.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  4. INDUSTRY BENCHMARK                                        */}
        {/* ============================================================ */}
        <section className="w-full bg-[#BA2E36]">
          <div className="section-container section-padding">
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-[60px]">
              {/* Left */}
              <div className="flex flex-col gap-5 md:max-w-[500px]">
                <p className="font-proxima text-[13px] font-bold uppercase tracking-[2px] text-white/80">
                  INDUSTRY COMPARISON
                </p>
                <h2 className="font-fraunces max-w-[480px] text-[30px] font-bold leading-[1.2] text-white md:text-[36px]">
                  ADMI Graduates Earn 65-230% Above Industry Benchmarks
                </h2>
                <p className="max-w-[440px] font-proxima text-[15px] leading-[1.7] text-white/80">
                  The Kenya creative industry benchmark for success is KES 24-30K monthly. ADMI graduates consistently
                  surpass this, with Year 3 median earnings of KES 50-100K+.
                </p>
              </div>

              {/* Right -- Benchmark cards */}
              <div className="flex w-full flex-1 flex-col gap-6">
                {BENCHMARK_CARDS.map((card) => (
                  <div
                    key={card.label}
                    className="flex items-center gap-6 rounded-2xl p-8"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <span
                      className="font-fraunces text-[28px] font-bold md:text-[32px]"
                      style={{ color: card.valueColor }}
                    >
                      {card.value}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-proxima text-[16px] font-bold" style={{ color: card.labelColor }}>
                        {card.label}
                      </span>
                      <span className="font-proxima text-[13px]" style={{ color: card.descColor }}>
                        {card.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  5. CAREER PATHS                                              */}
        {/* ============================================================ */}
        <section className="w-full bg-[#f9f9f9]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#0A3D3D]">CAREER PATHS</p>
              <h2 className="font-fraunces text-[32px] font-bold leading-[1.15] text-[#171717] md:text-[40px]">
                Freelance vs Employment
              </h2>
              <p className="mx-auto mt-3 max-w-[560px] font-proxima text-[16px] leading-[1.6] text-[#666666]">
                70% of ADMI graduates choose the freelance path, building their own creative businesses and client
                bases.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {CAREER_PATHS.map((path) => (
                <div
                  key={path.label}
                  className="flex flex-col gap-6 rounded-2xl p-10"
                  style={{
                    backgroundColor: path.bgColor,
                    border: path.borderColor ? `1px solid ${path.borderColor}` : undefined
                  }}
                >
                  {/* Badge row */}
                  <div className="flex items-center gap-2">
                    <span className="font-fraunces text-[40px] font-bold" style={{ color: path.percentColor }}>
                      {path.percentage}
                    </span>
                    <span className="font-proxima text-[18px] font-bold" style={{ color: path.labelColor }}>
                      {path.label}
                    </span>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-col gap-4">
                    {path.timeline.map((item) => (
                      <div key={item.text} className="flex items-center gap-4">
                        <span
                          className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: item.dotColor }}
                        />
                        <span className="font-proxima text-[14px]" style={{ color: item.textColor }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  6. WHERE ALUMNI WORK                                         */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#BA2E36]">WHERE ALUMNI WORK</p>
              <h2 className="font-fraunces text-[32px] font-bold leading-[1.15] text-[#171717] md:text-[40px]">
                500+ Industry Partners Hire Our Graduates
              </h2>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3">
              {/* Row 1 */}
              <div className="flex flex-wrap justify-center gap-3">
                {COMPANY_PILLS_ROW1.map((pill) => (
                  <span
                    key={pill.name}
                    className="rounded-xl bg-[#f9f9f9] px-8 py-4 font-proxima text-[15px] font-bold text-[#171717]"
                  >
                    {pill.name}
                  </span>
                ))}
              </div>
              {/* Row 2 */}
              <div className="flex flex-wrap justify-center gap-3">
                {COMPANY_PILLS_ROW2.map((pill) => (
                  <span
                    key={pill.name}
                    className="rounded-xl bg-[#f9f9f9] px-8 py-4 font-proxima text-[15px] font-bold text-[#171717]"
                  >
                    {pill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  7. ALUMNI STORIES                                            */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A0A0A]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#08F6CF]">SUCCESS STORIES</p>
              <h2 className="font-fraunces text-[32px] font-bold leading-[1.15] text-white md:text-[40px]">
                Faces Behind the Numbers
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {ALUMNI_STORIES.map((story) => (
                <div key={story.name} className="overflow-hidden rounded-2xl bg-[#1a1a1a]">
                  {/* Image */}
                  <div className="h-[220px] w-full overflow-hidden">
                    <img src={story.image} alt={story.name} className="h-full w-full object-cover" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-3 p-6">
                    <h3 className="font-fraunces text-[20px] font-bold text-white">{story.name}</h3>
                    <span className="font-proxima text-[13px] font-semibold" style={{ color: story.roleColor }}>
                      {story.role}
                    </span>
                    <p className="font-proxima text-[14px] leading-[1.6] text-[#cccccc]">{story.quote}</p>
                    <span className="font-proxima text-[12px] text-[#666666]">{story.meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  8. AWARDS & RECOGNITION                                      */}
        {/* ============================================================ */}
        <section className="w-full bg-white">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[800px] text-center">
              <p className="section-label text-[#BA2E36]">AWARDS &amp; RECOGNITION</p>
              <h2 className="font-fraunces text-[32px] font-bold leading-[1.15] text-[#171717] md:text-[40px]">
                Award-Winning Institution, Award-Winning Students
              </h2>
              <p className="mx-auto mt-3 max-w-[620px] font-proxima text-[16px] leading-[1.6] text-[#666666]">
                Recognised among Kenya&rsquo;s Top 10 SMEs and celebrated for excellence in creative education. Our
                students consistently win national and international competitions.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-12">
              {AWARD_ROWS.map((row) => {
                const imageBlock = (
                  <div className="h-[280px] flex-shrink-0 overflow-hidden md:h-auto md:w-[44%]">
                    <img src={row.imageUrl} alt={row.title} className="h-full w-full object-cover" />
                  </div>
                )

                const contentBlock = (
                  <div className="flex flex-1 flex-col justify-center gap-5 p-8 md:p-12">
                    {/* Badge */}
                    <span
                      className="w-fit rounded-full px-4 py-1.5 font-proxima text-[11px] font-bold uppercase tracking-[1.5px]"
                      style={{ backgroundColor: row.badgeBg, color: row.badgeColor }}
                    >
                      {row.badge}
                    </span>

                    <h3
                      className="font-fraunces text-[24px] font-bold md:text-[28px]"
                      style={{ color: row.titleColor }}
                    >
                      {row.title}
                    </h3>

                    <p className="font-proxima text-[15px] leading-[1.7]" style={{ color: row.descColor }}>
                      {row.description}
                    </p>

                    {/* Tags */}
                    {row.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {row.tags.map((tag) => (
                          <span
                            key={tag.text}
                            className="rounded-full px-3.5 py-1.5 font-proxima text-[12px] font-semibold"
                            style={{
                              backgroundColor: tag.bgColor,
                              color: tag.textColor,
                              border: tag.borderColor ? `1px solid ${tag.borderColor}` : undefined
                            }}
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats (for award row 2) */}
                    {row.stats && row.stats.length > 0 && (
                      <div className="flex gap-8">
                        {row.stats.map((stat) => (
                          <div key={stat.value} className="flex flex-col gap-0.5">
                            <span className="font-fraunces text-[24px] font-bold text-[#08F6CF]">{stat.value}</span>
                            <span className="font-proxima text-[12px] text-[#999999]">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )

                return (
                  <div
                    key={row.title}
                    className="flex flex-col overflow-hidden rounded-2xl md:flex-row"
                    style={{ backgroundColor: row.bgColor }}
                  >
                    {row.imageSide === 'left' ? (
                      <>
                        {imageBlock}
                        {contentBlock}
                      </>
                    ) : (
                      <>
                        {contentBlock}
                        {imageBlock}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  9. METHODOLOGY                                               */}
        {/* ============================================================ */}
        <section className="w-full bg-[#f9f9f9]">
          <div className="section-container section-padding">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="section-label text-[#0A3D3D]">OUR DATA</p>
              <h2 className="font-fraunces text-[30px] font-bold leading-[1.15] text-[#171717] md:text-[36px]">
                Survey Methodology
              </h2>
              <p className="mx-auto mt-3 max-w-[520px] font-proxima text-[15px] leading-[1.6] text-[#666666]">
                All data on this page comes from our comprehensive August 2025 alumni survey. Here&rsquo;s how we
                gathered it.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {METHODOLOGY_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center">
                  <span className="font-fraunces text-[40px] font-bold text-[#0A3D3D]">{stat.value}</span>
                  <span className="font-proxima text-[14px] font-bold text-[#171717]">{stat.label}</span>
                  <span className="font-proxima text-[13px] text-[#666666]">{stat.description}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  10. CTA                                                      */}
        {/* ============================================================ */}
        <section className="w-full bg-[#0A3D3D]">
          <div className="section-container section-padding">
            <div className="flex flex-col items-center gap-8 text-center">
              <h2 className="font-fraunces text-[36px] font-bold leading-[1.15] text-white md:text-[44px]">
                Be Part of the Impact
              </h2>
              <p className="mx-auto max-w-[560px] font-proxima text-[18px] leading-[1.7] text-[#cccccc]">
                Join 4,500+ alumni who are shaping East Africa&rsquo;s creative economy. Your creative career starts
                here.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center rounded-lg bg-[#08F6CF] px-9 py-4 font-proxima text-[16px] font-bold text-[#0A0A0A] transition-opacity hover:opacity-90"
                >
                  Explore Programmes
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center rounded-lg border-[1.5px] border-white bg-transparent px-9 py-4 font-proxima text-[16px] font-bold text-white transition-colors hover:bg-white/10"
                >
                  Download Full Report
                </Link>
              </div>

              {/* Bottom stats */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-10 md:gap-12">
                {CTA_BOTTOM_STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-1">
                    <span className="font-fraunces text-[28px] font-bold text-[#08F6CF]">{stat.value}</span>
                    <span className="font-proxima text-[13px] text-[#999999]">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
