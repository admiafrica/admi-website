'use client'

import { Box } from '@mantine/core'
import { StudentExperienceLayout } from './StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'
import { Paragraph, Title } from '@/components/ui'

export function LabsContent() {
  // Find The Labs facility
  const labsFacility = ADMI_FACILITIES.find((f) => f.name === 'The Labs')

  const sections = [
    {
      title: 'Innovation Spaces',
      paragraphs: [
        "ADMI's specialized labs are dedicated spaces where students can experiment, innovate, and collaborate on cutting-edge projects. Each lab is designed for specific creative disciplines and equipped with specialized technology."
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      heroTitle="The Labs"
      heroKicker="Student Experience"
      intro="State-of-the-art innovation spaces for creative experimentation"
      sections={sections}
    >
      {labsFacility && (
        <Box className="w-full px-4 py-12">
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="mb-8">
              <FacilityItemCard facility={labsFacility} />
            </Box>
            <Box className="mt-8 rounded-2xl border border-[#CBECE3] bg-white p-8">
              <Title label="Lab Spaces" color="#002A23" size="22px" />
              <Paragraph className="pt-4 text-[#1F2A2A]" fontFamily="font-nexa" fontWeight={400} size="17px">
                Our labs include:
              </Paragraph>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[#002A23]">
                <li className="font-nexa text-[16px] font-semibold">Mac and PC computers with dual setup</li>
                <li className="font-nexa text-[16px] font-semibold">
                  Industry-standard software including Final Cut, ProTools, DaVinci
                </li>
                <li className="font-nexa text-[16px] font-semibold">
                  Adobe Premier, Autodesk suite, and Avid Composer
                </li>
                <li className="font-nexa text-[16px] font-semibold">Collaborative workstations for group projects</li>
                <li className="font-nexa text-[16px] font-semibold">
                  Hands-on guidance from experienced lab technicians
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      )}
    </StudentExperienceLayout>
  )
}
