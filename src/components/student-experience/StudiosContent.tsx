'use client'

import { Box } from '@/lib/tw-mantine'
import { StudentExperienceLayout } from './StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'
import { Paragraph, Title } from '@/components/ui'

export function StudiosContent() {
  // Find The Studios facility
  const studiosFacility = ADMI_FACILITIES.find((f) => f.name === 'The Studios')

  const sections = [
    {
      title: 'Professional Studio Spaces',
      paragraphs: [
        'Our studios are equipped with industry-standard equipment and designed for hands-on learning. Each studio is a fully functional creative workspace where students collaborate on real-world projects.'
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      heroTitle="Professional Studios"
      heroKicker="Student Experience"
      intro="Industry-standard creative workspace"
      sections={sections}
    >
      {studiosFacility && (
        <Box className="w-full px-4 py-12">
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="mb-8">
              <FacilityItemCard facility={studiosFacility} />
            </Box>
            <Box className="mt-8 rounded-2xl border border-[#CBECE3] bg-white p-8">
              <Title label="Studio Features" color="#002A23" size="22px" />
              <Paragraph className="pt-4 text-[#1F2A2A]" fontFamily="font-nexa" fontWeight={400} size="17px">
                Each studio space is designed for specific creative disciplines:
              </Paragraph>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[#002A23]">
                <li className="font-nexa text-[16px] font-semibold">
                  TV Studio with tracking floor and professional lighting grid
                </li>
                <li className="font-nexa text-[16px] font-semibold">
                  Music Studio with vocal booth for individual and band rehearsals
                </li>
                <li className="font-nexa text-[16px] font-semibold">
                  Professional control rooms with ProTools and Logic software
                </li>
                <li className="font-nexa text-[16px] font-semibold">Real-world production workflow experience</li>
                <li className="font-nexa text-[16px] font-semibold">
                  Mentorship and real-time feedback from industry professionals
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      )}
    </StudentExperienceLayout>
  )
}
