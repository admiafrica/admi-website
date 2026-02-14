import { Box } from '@mantine/core'
import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { Paragraph, Title } from '@/components/ui'
import { ADMI_ACADEMIC_TEAM_SUMMARY } from '@/utils'

export default function AboutPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="About ADMI"
        description="Our story, mission, leadership, academic team, and institutional partnerships at Africa Digital Media Institute."
        keywords="About ADMI, ADMI mission, ADMI leadership, ADMI academic team"
      />

      <Box className="w-full">
        <Box className="relative h-[560px] overflow-hidden bg-[url('https://images.unsplash.com/photo-1643651577068-57d08a386760?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <Box className="absolute inset-0 bg-black/55" />
          <Box className="relative z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col justify-end px-4 pb-16 text-white xl:px-0">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/about</p>
            <h1 className="pt-4 font-fraunces text-[52px] font-bold leading-[1.1]">About ADMI</h1>
            <p className="max-w-[820px] pt-4 font-nexa text-[18px] text-white/85">
              We prepare Africa&apos;s next generation of creative professionals through practical learning,
              industry-connected teaching, and project-based training.
            </p>
          </Box>
        </Box>

        <Box className="bg-[#0A3D3D]">
          <Box className="mx-auto flex w-full max-w-screen-xl items-center justify-around px-4 py-7 xl:px-0">
            <Box className="text-center">
              <p className="font-fraunces text-[32px] font-bold text-white">2007</p>
              <p className="font-nexa text-[14px] text-white/80">Founded</p>
            </Box>
            <Box className="h-[40px] w-px bg-white/30" />
            <Box className="text-center">
              <p className="font-fraunces text-[32px] font-bold text-white">15K+</p>
              <p className="font-nexa text-[14px] text-white/80">Learners Impacted</p>
            </Box>
            <Box className="h-[40px] w-px bg-white/30" />
            <Box className="text-center">
              <p className="font-fraunces text-[32px] font-bold text-white">Pan-African</p>
              <p className="font-nexa text-[14px] text-white/80">Creative Network</p>
            </Box>
          </Box>
        </Box>

        <Box className="bg-white py-16">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Our Story" color="black" size="42px" />
            <Paragraph className="max-w-[920px] pt-4" fontFamily="font-nexa" size="18px">
              Africa Digital Media Institute is a creative media and technology training institution based in Nairobi.
              Our model blends technical craft, creative confidence, and employability preparation so graduates can
              move from classroom to career with momentum.
            </Paragraph>
          </Box>
        </Box>

        <Box className="bg-[#F9F9F9] py-16">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Mission & Values" color="black" size="40px" />
            <Box className="grid grid-cols-1 gap-5 pt-8 md:grid-cols-3">
              {['Industry-Relevant Learning', 'Creative Confidence', 'Career Readiness'].map((item) => (
                <Box key={item} className="rounded-xl border border-[#E8E8E8] bg-white p-6">
                  <h3 className="font-fraunces text-[28px] font-bold text-[#171717]">{item}</h3>
                  <p className="pt-2 font-nexa text-[16px] text-[#555]">
                    We prioritize practical projects, collaborative learning, and outcomes that translate into real
                    opportunities.
                  </p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-[#0A0A0A] py-16 text-white">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Our Journey" color="white" size="40px" />
            <Box className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-4">
              {[
                'Launch and early curriculum development',
                'Studio and lab expansion',
                'Hybrid model and industry partnership growth',
                'Regional talent pipeline with stronger graduate outcomes'
              ].map((milestone, idx) => (
                <Box key={milestone} className="rounded-xl border border-white/20 bg-white/5 p-5">
                  <p className="font-nexa text-[13px] uppercase tracking-[0.1em] text-[#B7D8CF]">Phase {idx + 1}</p>
                  <p className="pt-2 font-nexa text-[16px] text-white/90">{milestone}</p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-white py-16">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Leadership" color="black" size="40px" />
            <Paragraph className="max-w-[900px] pt-4" fontFamily="font-nexa" size="17px">
              ADMI is led by educators and practitioners who combine creative industry experience with a strong
              commitment to learner outcomes.
            </Paragraph>

            <Title label="Academic Team" color="black" size="34px" className="pt-12" />
            <Box className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-3">
              {ADMI_ACADEMIC_TEAM_SUMMARY.slice(0, 9).map((member, index) => (
                <Box key={`${member.name}-${index}`} className="rounded-xl border border-[#E8E8E8] bg-white p-5">
                  <p className="font-fraunces text-[26px] font-bold text-[#171717]">{member.name}</p>
                  <p className="pt-1 font-nexa text-[14px] text-[#BA2E36]">{member.title}</p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-[#F9F9F9] py-16">
          <Box className="mx-auto w-full max-w-screen-xl px-4 xl:px-0">
            <Title label="Campus Facilities" color="black" size="40px" />
            <Paragraph className="max-w-[900px] pt-4" fontFamily="font-nexa" size="17px">
              Learning takes place in production-ready studios, collaborative project spaces, and specialist labs
              designed for practical creative training.
            </Paragraph>

            <Title label="Partners & Accreditation" color="black" size="34px" className="pt-12" />
            <Box className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-5">
              {['TVETA', 'Industry Studios', 'Broadcast Partners', 'Creative Agencies', 'Technology Partners'].map((p) => (
                <Box key={p} className="rounded-lg border border-[#E8E8E8] bg-white p-4 text-center font-nexa text-[14px] font-bold text-[#333]">
                  {p}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="bg-gradient-to-r from-[#BA2E36] via-[#8B1A24] to-[#0A0A0A] px-4 py-20 text-white xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl text-center">
            <h2 className="font-fraunces text-[44px] font-bold leading-[1.15]">Build Your Creative Career With ADMI</h2>
            <p className="mx-auto max-w-[760px] pt-4 font-nexa text-[18px] text-white/85">
              Explore programmes, speak with admissions, and choose a pathway aligned to your goals.
            </p>
            <Link href="/enquiry" className="mt-7 inline-block rounded-lg border border-white/40 px-6 py-3 font-nexa text-[15px] font-bold text-white hover:bg-white hover:text-[#171717]">
              Start Your Application
            </Link>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}
