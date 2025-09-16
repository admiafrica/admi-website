import React from 'react'
import { Box, Grid } from '@mantine/core'
import { useRouter } from 'next/router'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title, Button } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ImpactAlumniSuccessPage() {
  const router = useRouter()
  const isMobile = useIsMobile()

  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Impact & Alumni Success | ADMI - From KES 10K to KES 100K+ Monthly Income"
        description="Discover how ADMI graduates achieve 3x income growth by Year 3. 70% launch successful freelance careers earning KES 50K+ monthly. Real alumni income progression data from our 2024 survey."
        keywords="ADMI alumni success, income growth, career outcomes, graduate salaries Kenya, creative careers income, freelance success, ADMI impact, alumni earnings, graduate employment rates"
      />

      <div className="w-full">
        {/* HERO SECTION - 60% White space */}
        <Box className="mb-8 w-full py-16 md:mb-12 md:py-24" bg="#002A23">
          <Box className="mx-auto max-w-4xl px-6 text-center md:px-8">
            <Title
              label="Real Stories of Creative Success"
              color="#F1FE37"
              size={isMobile ? '32px' : '44px'}
              className="mb-8 leading-tight"
            />
            <Paragraph
              className="mx-auto max-w-2xl leading-relaxed text-white"
              fontFamily="font-nexa"
              size={isMobile ? '16px' : '18px'}
            >
              In August 2025, we surveyed over 700 ADMI alumni to understand their career journeys. What we discovered
              tells a powerful story of transformation through creative education.
            </Paragraph>

            <Box className="mt-12 flex justify-center">
              <Box className="w-auto">
                <Button
                  size="md"
                  backgroundColor="#01C6A5"
                  label="Read Their Stories"
                  onClick={() => {
                    document.getElementById('stories-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* THE REALITY OF CREATIVE CAREERS - 30% Accent */}
        <Box id="stories-section" className="mb-8 w-full py-16 md:mb-12 md:py-20" bg="#F0F9FF">
          <Box className="mx-auto max-w-4xl px-6 md:px-8">
            <Title
              label="The Reality Behind the Numbers"
              color="#002A23"
              size={isMobile ? '28px' : '36px'}
              className="mb-12 text-center"
            />

            <Box className="mb-16 space-y-8">
              <Paragraph
                fontFamily="font-nexa"
                className="leading-relaxed text-gray-700"
                size={isMobile ? '16px' : '18px'}
              >
                Our survey reached over 700 ADMI alumni across six programs: Film & TV, Sound Engineering, Music
                Production, Graphic Design, Multimedia, and Animation. Of the 43 detailed responses we received, a clear
                pattern emerged that challenges conventional expectations about creative careers.
              </Paragraph>

              <Paragraph
                fontFamily="font-nexa"
                className="leading-relaxed text-gray-700"
                size={isMobile ? '16px' : '18px'}
              >
                <strong>The first year is tough.</strong> Nearly every graduate we spoke to described their first year
                as financially challenging, with many earning under KES 20,000 per month. But those who persisted tell a
                different story by their third year.
              </Paragraph>
            </Box>

            <Grid gutter={isMobile ? 'lg' : 'xl'} className="mb-16">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Paragraph
                    size={isMobile ? '40px' : '48px'}
                    fontFamily="font-nexa"
                    className="mb-4 font-bold text-[#01C6A5]"
                  >
                    3x
                  </Paragraph>
                  <Title label="Income Growth" color="#002A23" size={isMobile ? '18px' : '20px'} className="mb-4" />
                  <Paragraph className="leading-relaxed text-gray-600" size={isMobile ? '14px' : '16px'}>
                    The average income multiplier achieved by determined graduates between Year 1 and Year 3. This isn't
                    a promise—it's what actually happened.
                  </Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Paragraph
                    size={isMobile ? '40px' : '48px'}
                    fontFamily="font-nexa"
                    className="mb-4 font-bold text-[#F60834]"
                  >
                    70%
                  </Paragraph>
                  <Title label="Choose Freelance" color="#002A23" size={isMobile ? '18px' : '20px'} className="mb-4" />
                  <Paragraph className="leading-relaxed text-gray-600" size={isMobile ? '14px' : '16px'}>
                    Most alumni became independent freelancers rather than traditional employees. The creative economy
                    rewards entrepreneurship.
                  </Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Paragraph
                    size={isMobile ? '36px' : '40px'}
                    fontFamily="font-nexa"
                    className="mb-4 font-bold text-[#F76335]"
                  >
                    KES 50K+
                  </Paragraph>
                  <Title label="Year 3 Median" color="#002A23" size={isMobile ? '18px' : '20px'} className="mb-4" />
                  <Paragraph className="leading-relaxed text-gray-600" size={isMobile ? '14px' : '16px'}>
                    Monthly earnings achieved by successful graduates who stayed in their field. Some earn significantly
                    more.
                  </Paragraph>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>

        {/* INCOME JOURNEY STORY - 60% White space */}
        <Box className="mb-8 w-full py-16 md:mb-12 md:py-20" bg="white">
          <Box className="mx-auto max-w-4xl px-6 md:px-8">
            <Title
              label="The Three-Year Journey"
              color="#002A23"
              size={isMobile ? '28px' : '36px'}
              className="mb-12 text-center"
            />

            <Box className="mb-16 text-center">
              <Paragraph
                fontFamily="font-nexa"
                className="mx-auto max-w-2xl leading-relaxed text-gray-700"
                size={isMobile ? '16px' : '18px'}
              >
                Alumni described a consistent pattern across all six programs. The journey isn't easy, but those who
                persist see dramatic improvements.
              </Paragraph>
            </Box>

            {/* Simple Timeline - Desktop */}
            {!isMobile && (
              <Box className="relative">
                <Box className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-gray-300"></Box>

                <Box className="mb-16 flex items-center">
                  <Box className="w-1/2 pr-8 text-right">
                    <Box className="rounded-lg bg-white p-6 shadow-md">
                      <Title label="Year 1: The Struggle" color="black" size="20px" className="mb-3" />
                      <Paragraph fontFamily="font-nexa" className="mb-4 text-gray-600">
                        "The first year is difficult, with many earning under KES 20,000/month. Unpaid internships are
                        common. Some graduates essentially had zero income while building portfolios."
                      </Paragraph>
                      <Paragraph className="font-semibold text-[#01C6A5]">KES 10-20K typical range</Paragraph>
                    </Box>
                  </Box>
                  <Box className="absolute left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-[#01C6A5]"></Box>
                  <Box className="w-1/2 pl-8"></Box>
                </Box>

                <Box className="mb-16 flex items-center">
                  <Box className="w-1/2 pr-8"></Box>
                  <Box className="absolute left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-[#F76335]"></Box>
                  <Box className="w-1/2 pl-8">
                    <Box className="rounded-lg bg-white p-6 shadow-md">
                      <Title label="Year 2: Building Momentum" color="black" size="20px" className="mb-3" />
                      <Paragraph fontFamily="font-nexa" className="mb-4 text-gray-600">
                        "By the second year, many who switched to freelance saw incomes rise to ~KES 50K/month by taking
                        on multiple projects. A competent creative tends to command somewhere in the KES 20–50K range."
                      </Paragraph>
                      <Paragraph className="font-semibold text-[#F76335]">KES 25-50K typical range</Paragraph>
                    </Box>
                  </Box>
                </Box>

                <Box className="flex items-center">
                  <Box className="w-1/2 pr-8 text-right">
                    <Box className="rounded-lg bg-white p-6 shadow-md">
                      <Title label="Year 3: Breaking Through" color="black" size="20px" className="mb-3" />
                      <Paragraph fontFamily="font-nexa" className="mb-4 text-gray-600">
                        "By Year 3, determined graduates earn KES 50,000–100,000/month, often through freelancing. Many
                        alumni achieve substantially higher earnings, with some top performers greatly exceeding that
                        benchmark."
                      </Paragraph>
                      <Paragraph className="font-semibold text-[#F60834]">KES 50-100K+ typical range</Paragraph>
                    </Box>
                  </Box>
                  <Box className="absolute left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-[#F60834]"></Box>
                  <Box className="w-1/2 pl-8"></Box>
                </Box>
              </Box>
            )}

            {/* Simple Timeline - Mobile */}
            {isMobile && (
              <Box className="space-y-8">
                <Box className="rounded-lg border-l-4 border-[#01C6A5] bg-white p-6">
                  <Title label="Year 1: The Struggle" color="black" size="18px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-4 text-gray-600">
                    The first year is difficult, with many earning under KES 20,000/month.
                  </Paragraph>
                  <Paragraph className="font-semibold text-[#01C6A5]">KES 10-20K</Paragraph>
                </Box>

                <Box className="rounded-lg border-l-4 border-[#F76335] bg-white p-6">
                  <Title label="Year 2: Building Momentum" color="black" size="18px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-4 text-gray-600">
                    Incomes start to climb as graduates build client networks.
                  </Paragraph>
                  <Paragraph className="font-semibold text-[#F76335]">KES 25-50K</Paragraph>
                </Box>

                <Box className="rounded-lg border-l-4 border-[#F60834] bg-white p-6">
                  <Title label="Year 3: Breaking Through" color="black" size="18px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-4 text-gray-600">
                    Determined graduates achieve substantial earnings through established practices.
                  </Paragraph>
                  <Paragraph className="font-semibold text-[#F60834]">KES 50-100K+</Paragraph>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {/* REAL ALUMNI VOICES - 30% Accent */}
        <Box id="career-pathways" className="mb-8 w-full py-16 md:mb-12 md:py-20" bg="#F0F9FF">
          <Box className="mx-auto max-w-4xl px-6 md:px-8">
            <Title
              label="What Our Graduates Actually Do"
              color="#002A23"
              size={isMobile ? '28px' : '36px'}
              className="mb-12 text-center"
            />

            <Box className="mb-16 text-center">
              <Paragraph
                fontFamily="font-nexa"
                className="mx-auto max-w-2xl leading-relaxed text-gray-700"
                size={isMobile ? '16px' : '18px'}
              >
                The creative industry rewards different approaches. Our survey revealed that{' '}
                <strong>freelancing dominates</strong>
                (~70%), offering higher income than entry jobs but requiring business and soft skills.
              </Paragraph>
            </Box>

            <Grid gutter={isMobile ? 'lg' : 'xl'} className="mb-16">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Paragraph
                    size={isMobile ? '28px' : '32px'}
                    fontFamily="font-nexa"
                    className="mb-4 font-bold text-[#01C6A5]"
                  >
                    70%
                  </Paragraph>
                  <Title label="Freelance Path" color="#002A23" size={isMobile ? '20px' : '24px'} className="mb-6" />
                  <Paragraph
                    fontFamily="font-nexa"
                    className="mb-6 leading-relaxed text-gray-600"
                    size={isMobile ? '14px' : '16px'}
                  >
                    "A proactive graduate can sometimes make in a weekend wedding shoot what we'd pay them in a month as
                    an assistant." - Industry Employer
                  </Paragraph>
                  <Box className="rounded-xl bg-gray-50 p-6">
                    <Paragraph className="mb-3 font-semibold text-gray-800" size={isMobile ? '14px' : '16px'}>
                      Typical progression:
                    </Paragraph>
                    <Box className="space-y-2">
                      <Paragraph className="font-semibold text-gray-600" size={isMobile ? '13px' : '14px'}>
                        Year 1: <span className="font-bold">KES 15-25K</span>
                      </Paragraph>
                      <Paragraph className="font-semibold text-gray-600" size={isMobile ? '13px' : '14px'}>
                        Year 2: <span className="font-bold">KES 30-50K</span>
                      </Paragraph>
                      <Paragraph className="font-semibold text-gray-600" size={isMobile ? '13px' : '14px'}>
                        Year 3+: <span className="font-bold">KES 60-120K</span>
                      </Paragraph>
                    </Box>
                  </Box>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Paragraph
                    size={isMobile ? '28px' : '32px'}
                    fontFamily="font-nexa"
                    className="mb-4 font-bold text-[#F60834]"
                  >
                    30%
                  </Paragraph>
                  <Title label="Employment Path" color="#002A23" size={isMobile ? '20px' : '24px'} className="mb-6" />
                  <Paragraph
                    fontFamily="font-nexa"
                    className="mb-6 leading-relaxed text-gray-600"
                    size={isMobile ? '14px' : '16px'}
                  >
                    Alumni who join established companies, agencies, or organizations, often in creative and marketing
                    roles with steady growth opportunities.
                  </Paragraph>
                  <Box className="rounded-xl bg-gray-50 p-6">
                    <Paragraph className="mb-3 font-semibold text-gray-800" size={isMobile ? '14px' : '16px'}>
                      Typical progression:
                    </Paragraph>
                    <Box className="space-y-2">
                      <Paragraph className="font-semibold text-gray-600" size={isMobile ? '13px' : '14px'}>
                        Year 1: <span className="font-bold">KES 20-30K</span>
                      </Paragraph>
                      <Paragraph className="font-semibold text-gray-600" size={isMobile ? '13px' : '14px'}>
                        Year 2: <span className="font-bold">KES 35-55K</span>
                      </Paragraph>
                      <Paragraph className="font-semibold text-gray-600" size={isMobile ? '13px' : '14px'}>
                        Year 3+: <span className="font-bold">KES 50-90K</span>
                      </Paragraph>
                    </Box>
                  </Box>
                </Box>
              </Grid.Col>
            </Grid>

            {/* Global Opportunity */}
            <Box className="mb-16 rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-100 to-green-100 p-8 shadow-lg md:p-12">
              <Title
                label="The Global Opportunity"
                color="#002A23"
                size={isMobile ? '20px' : '24px'}
                className="mb-6"
              />
              <Paragraph
                fontFamily="font-nexa"
                className="mb-6 leading-relaxed text-gray-700"
                size={isMobile ? '15px' : '16px'}
              >
                "A minority of alumni who tapped global markets earned significantly more, showing untapped potential.
                Some Sound and Animation graduates took on remote gigs via Upwork/Fiverr, earning USD $100–200 per
                project, which at ~KES 13K+ each is far above typical local single-project rates."
              </Paragraph>
              <Paragraph fontFamily="font-nexa" className="italic text-gray-600" size={isMobile ? '14px' : '15px'}>
                — ADMI Alumni Survey Report, 2024
              </Paragraph>
            </Box>
          </Box>
        </Box>

        {/* INDIVIDUAL PROGRAM STORIES - 60% White space */}
        <Box className="mb-8 w-full py-16 md:mb-12 md:py-20" bg="white">
          <Box className="mx-auto max-w-5xl px-6 md:px-8">
            <Title
              label="Success Across All Programs"
              color="#002A23"
              size={isMobile ? '28px' : '36px'}
              className="mb-16 text-center"
            />

            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Title label="Film & TV Production" color="#01C6A5" size="20px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-3 text-sm text-gray-600">
                    "Film & TV alumni commonly create their own opportunities. Many gravitated to freelance
                    videography/editing or launched small production businesses soon after graduation."
                  </Paragraph>
                  <Paragraph className="text-sm font-semibold">Common earnings by Year 3: KES 80-90K+</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Title label="Sound Engineering" color="#F76335" size="20px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-3 text-sm text-gray-600">
                    "Event audio engineering emerged as highly lucrative. Graduates reported rates of KES 5–10K per day
                    for providing sound setup/mixing at events, and up to KES 30K for large one-off events."
                  </Paragraph>
                  <Paragraph className="text-sm font-semibold">Common earnings by Year 3: KES 60-80K+</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Title label="Music Production" color="#F60834" size="20px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-3 text-sm text-gray-600">
                    "A number of enterprising alumni broke into the KES 80K–100K+ tier by Year 3 by producing for
                    well-known artists, getting corporate jingle contracts, or running their own small labels."
                  </Paragraph>
                  <Paragraph className="text-sm font-semibold">Common earnings by Year 3: KES 80-100K+</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Title label="Graphic Design" color="#01C6A5" size="20px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-3 text-sm text-gray-600">
                    "Seasoned freelancers by Year 3 often leveraged long-term contracts and retainers to stabilize
                    income. Several mentioned locking in regular corporate clients on retainer."
                  </Paragraph>
                  <Paragraph className="text-sm font-semibold">Common earnings by Year 3: KES 50-70K+</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Title label="Multimedia" color="#F76335" size="20px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-3 text-sm text-gray-600">
                    "A successful multimedia professional in Year 3 might be making KES 80K–120K per month. This
                    typically comes from ongoing retainers, frequent sponsored deals, and consultative roles."
                  </Paragraph>
                  <Paragraph className="text-sm font-semibold">Common earnings by Year 3: KES 80-120K+</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Box className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                  <Title label="Animation" color="#F60834" size="20px" className="mb-3" />
                  <Paragraph fontFamily="font-nexa" className="mb-3 text-sm text-gray-600">
                    "Those who secured retainer contracts with companies saw big improvements. High-demand freelancers
                    who built a name could charge KES 8K–10K per day on short gigs."
                  </Paragraph>
                  <Paragraph className="text-sm font-semibold">Common earnings by Year 3: KES 50-70K+</Paragraph>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>

        {/* COMPETITIVE CONTEXT - 30% Accent */}
        <Box className="mb-8 w-full py-16 md:mb-12 md:py-20" bg="#F0F9FF">
          <Box className="mx-auto max-w-4xl px-6 md:px-8">
            <Title
              label="Leading the Industry in Graduate Outcomes"
              color="#002A23"
              size={isMobile ? '28px' : '36px'}
              className="mb-12 text-center"
            />

            <Box className="mb-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg md:p-12">
              <Paragraph fontFamily="font-nexa" className="mb-6 text-center text-xl font-semibold text-gray-800">
                ADMI graduates achieve earnings that surpass industry benchmarks by significant margins
              </Paragraph>

              <Grid gutter={isMobile ? 'lg' : 'xl'} className="mb-8">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Box className="rounded-xl border border-gray-200 bg-gradient-to-r from-red-50 to-orange-50 p-6 text-center">
                    <Paragraph
                      size={isMobile ? '28px' : '32px'}
                      fontFamily="font-nexa"
                      className="mb-2 font-black text-[#F60834]"
                    >
                      KSh 24-30K
                    </Paragraph>
                    <Paragraph className="mb-3 font-semibold text-gray-800" size={isMobile ? '16px' : '18px'}>
                      Industry "Success" Benchmark
                    </Paragraph>
                    <Paragraph className="text-sm text-gray-600">
                      What peers in skilling programs and large scholarship initiatives consider a "thriving wage" for
                      graduates
                    </Paragraph>
                  </Box>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Box className="rounded-xl border border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 p-6 text-center">
                    <Paragraph
                      size={isMobile ? '28px' : '32px'}
                      fontFamily="font-nexa"
                      className="mb-2 font-black text-[#01C6A5]"
                    >
                      KSh 50-100K+
                    </Paragraph>
                    <Paragraph className="mb-3 font-semibold text-gray-800" size={isMobile ? '16px' : '18px'}>
                      ADMI Graduate Reality
                    </Paragraph>
                    <Paragraph className="text-sm text-gray-600">
                      What our graduates actually achieve by Year 3 - consistently exceeding industry expectations
                    </Paragraph>
                  </Box>
                </Grid.Col>
              </Grid>

              <Paragraph
                fontFamily="font-nexa"
                className="mb-6 leading-relaxed text-gray-700"
                size={isMobile ? '16px' : '18px'}
              >
                While industry programs celebrate reaching KSh 24-30K as significant achievements for their graduates,
                ADMI alumni routinely surpass these benchmarks by 65-230%. This isn't just success—it's transformation
                at a scale that sets new standards for creative education outcomes in Kenya.
              </Paragraph>

              <Paragraph
                fontFamily="font-nexa"
                className="text-center italic text-gray-600"
                size={isMobile ? '14px' : '15px'}
              >
                — ADMI: Setting new standards for creative career outcomes in East Africa
              </Paragraph>
            </Box>
          </Box>
        </Box>

        {/* EMPLOYER PREFERENCE - 60% White space */}
        <Box className="mb-8 w-full py-16 md:mb-12 md:py-20" bg="white">
          <Box className="mx-auto max-w-4xl px-6 md:px-8">
            <Title
              label="What Employers Say About ADMI Graduates"
              color="#002A23"
              size={isMobile ? '28px' : '36px'}
              className="mb-12 text-center"
            />

            <Box className="mb-16 rounded-2xl border border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 p-8 shadow-lg md:p-12">
              <Paragraph fontFamily="font-nexa" className="mb-6 text-center text-xl font-semibold text-gray-800">
                "We have a clear preference for ADMI graduates"
              </Paragraph>
              <Paragraph
                fontFamily="font-nexa"
                className="mb-6 leading-relaxed text-gray-700"
                size={isMobile ? '16px' : '18px'}
              >
                Industry employers consistently report a strong preference for hiring ADMI graduates. When we
                interviewed 8 employers across the creative sector, they highlighted ADMI graduates' practical skills,
                work-ready attitude, and professional approach as key differentiators.
              </Paragraph>
              <Paragraph
                fontFamily="font-nexa"
                className="mb-6 leading-relaxed text-gray-700"
                size={isMobile ? '16px' : '18px'}
              >
                "ADMI graduates come to us with real-world experience and a portfolio that demonstrates their
                capabilities. They understand client needs and can hit the ground running," reported one creative agency
                director.
              </Paragraph>
              <Paragraph
                fontFamily="font-nexa"
                className="text-center italic text-gray-600"
                size={isMobile ? '14px' : '15px'}
              >
                — Consistent feedback from industry employers, ADMI Alumni Survey 2024
              </Paragraph>
            </Box>
          </Box>
        </Box>

        {/* METHODOLOGY & TRANSPARENCY - 30% Accent */}
        <Box className="mb-8 w-full py-16 md:mb-12 md:py-20" bg="#F0F9FF">
          <Box className="mx-auto max-w-4xl px-6 md:px-8">
            <Title
              label="How We Gathered This Data"
              color="#002A23"
              size={isMobile ? '28px' : '36px'}
              className="mb-12 text-center"
            />

            <Box className="mb-8">
              <Paragraph fontFamily="font-nexa" className="mb-6 text-gray-700" size="18px">
                In August 2025, we conducted structured phone interviews and email follow-ups with ADMI alumni. This
                survey emphasized <strong>depth of insight over breadth</strong>—we highlight common patterns reported
                by engaged alumni and employers.
              </Paragraph>
            </Box>

            <Grid gutter="lg" className="mb-8">
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box className="text-center">
                  <Paragraph size="32px" fontFamily="font-nexa" className="mb-2 font-bold text-[#01C6A5]">
                    700+
                  </Paragraph>
                  <Paragraph className="font-semibold">Emails Sent</Paragraph>
                  <Paragraph className="text-sm text-gray-600">Across six programs</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box className="text-center">
                  <Paragraph size="32px" fontFamily="font-nexa" className="mb-2 font-bold text-[#F76335]">
                    110
                  </Paragraph>
                  <Paragraph className="font-semibold">Phone Follow-ups</Paragraph>
                  <Paragraph className="text-sm text-gray-600">Direct conversations</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box className="text-center">
                  <Paragraph size="32px" fontFamily="font-nexa" className="mb-2 font-bold text-[#F60834]">
                    43
                  </Paragraph>
                  <Paragraph className="font-semibold">Detailed Responses</Paragraph>
                  <Paragraph className="text-sm text-gray-600">With income data</Paragraph>
                </Box>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 3 }}>
                <Box className="text-center">
                  <Paragraph size="32px" fontFamily="font-nexa" className="mb-2 font-bold text-[#002A23]">
                    8
                  </Paragraph>
                  <Paragraph className="font-semibold">Employer Insights</Paragraph>
                  <Paragraph className="text-sm text-gray-600">Industry perspective</Paragraph>
                </Box>
              </Grid.Col>
            </Grid>

            <Box className="rounded-xl border border-gray-300 bg-gray-100 p-6 shadow-sm">
              <Paragraph fontFamily="font-nexa" className="text-sm text-gray-700">
                <strong>Important:</strong> Income ranges represent reported earnings from survey respondents and may
                not reflect outcomes for all graduates. Individual results vary based on market conditions, individual
                effort, specialization, and economic circumstances. ADMI provides training and support but cannot
                guarantee specific income outcomes. These findings emphasize common patterns but may not capture every
                individual experience.
              </Paragraph>
            </Box>
          </Box>
        </Box>

        {/* FINAL CALL TO ACTION - 10% Accent */}
        <Box className="w-full py-16 md:py-24" bg="#002A23">
          <Box className="mx-auto max-w-3xl px-6 text-center md:px-8">
            <Title
              label="Your Creative Career Starts Here"
              color="#F1FE37"
              size={isMobile ? '28px' : '36px'}
              className="mb-8"
            />
            <Paragraph
              className="mx-auto mb-12 max-w-2xl leading-relaxed text-white"
              fontFamily="font-nexa"
              size={isMobile ? '16px' : '18px'}
            >
              These stories aren't promises—they're proof of what's possible. ADMI provides excellent creative training,
              but your success depends on your determination, hustle, and willingness to build your career step by step.
            </Paragraph>

            <Box className="flex flex-col justify-center gap-4 sm:flex-row">
              <Box className="w-auto">
                <Button
                  size="md"
                  backgroundColor="#01C6A5"
                  label="View Our Programs"
                  onClick={() => router.push('/courses')}
                />
              </Box>
              <Box className="w-auto">
                <Button
                  size="md"
                  backgroundColor="#F60834"
                  label="Start Your Application"
                  onClick={() => router.push('/enquiry')}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </MainLayout>
  )
}
