'use client'

import { Box } from '@mantine/core'
import { StudentExperienceLayout } from './StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'
import { Paragraph, Title } from '@/components/ui'

export function EquipmentContent() {
  // Find The Equipment facility
  const equipmentFacility = ADMI_FACILITIES.find((f) => f.name === 'The Equipment')

  const sections = [
    {
      title: 'Equipment Vault',
      paragraphs: [
        'ADMI is one of the few regional film schools teaching in HD and digital film formats. We pride ourselves on providing students with access to professional-grade equipment used by industry leaders.'
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      heroTitle="Equipment Vault"
      heroKicker="Student Experience"
      intro="Professional-grade creative tools"
      sections={sections}
    >
      {equipmentFacility && (
        <Box className="w-full px-4 py-12">
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="mb-8">
              <FacilityItemCard facility={equipmentFacility} />
            </Box>
            <Box className="mt-8 rounded-2xl border border-[#CBECE3] bg-white p-8">
              <Title label="Available Equipment" color="#002A23" size="22px" />
              <Paragraph className="pt-4 text-[#1F2A2A]" fontFamily="font-nexa" fontWeight={400} size="17px">
                Our comprehensive equipment inventory includes:
              </Paragraph>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[#002A23]">
                <li className="font-nexa text-[16px] font-semibold">
                  Small HD camcorders for first-year students to master fundamentals
                </li>
                <li className="font-nexa text-[16px] font-semibold">
                  High-end HD formats and digital cinema cameras from Sony, Canon, Panasonic & Blackmagic
                </li>
                <li className="font-nexa text-[16px] font-semibold">Professional lighting and grip equipment</li>
                <li className="font-nexa text-[16px] font-semibold">Audio recording consoles and mixing equipment</li>
                <li className="font-nexa text-[16px] font-semibold">
                  Industry software: ProTools, Logic, Final Cut Pro, Adobe Suite, Avid Composer, and more
                </li>
                <li className="font-nexa text-[16px] font-semibold">VR and motion capture technology</li>
              </ul>
              <Box className="mt-8 border-t border-[#CBECE3] pt-8">
                <Title label="Progression Path" color="#002A23" size="22px" />
                <Paragraph className="pt-4 text-[#1F2A2A]" fontFamily="font-nexa" fontWeight={400} size="17px">
                  Students progress from small-format cameras in year one to high-end professional cinema equipment as
                  they advance through the program, ensuring skill development matches equipment complexity.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </StudentExperienceLayout>
  )
}
