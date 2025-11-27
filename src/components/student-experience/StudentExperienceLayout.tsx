import { ReactNode } from 'react'
import { Box } from '@mantine/core'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title } from '@/components/ui'

type Section = {
  title: string
  paragraphs?: ReactNode[] | string[] | null
  bullets?: ReactNode[] | string[] | null
}

type StudentExperienceLayoutProps = {
  heroTitle: string
  heroKicker?: string | null
  intro: ReactNode
  sections: Section[]
  footerBgColor?: string
  children?: ReactNode
}

export function StudentExperienceLayout({
  heroTitle,
  heroKicker = 'Student Experience',
  intro,
  sections,
  footerBgColor = '#F5FFFD',
  children
}: StudentExperienceLayoutProps) {
  return (
    <MainLayout footerBgColor={footerBgColor}>
      <Box className="bg-[#002A23] text-white">
        <Box className="mx-auto max-w-screen-xl px-4 py-16 2xl:px-0">
          <p className="text-xs uppercase tracking-[0.3em] text-admiShamrok">{heroKicker}</p>
          <Title label={heroTitle} color="#F1FE37" size="48px" className="pt-2" />
          <Paragraph className="pt-4 text-white" fontFamily="font-nexa" fontWeight={400}>
            {intro}
          </Paragraph>
        </Box>
      </Box>
      <Box className="bg-[#F5FFFD]">
        <Box className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 px-4 py-12 2xl:px-0">
          {sections.map((section, index) => (
            <Box
              key={`${section.title}-${index}`}
              className="rounded-2xl border border-[#CBECE3] bg-white p-6 shadow-sm md:p-8"
            >
              <Title label={section.title} color="#002A23" size="22px" />
              {section.paragraphs?.map((copy, copyIndex) => (
                <Paragraph
                  key={`${section.title}-paragraph-${copyIndex}`}
                  className="pt-4 text-[#1F2A2A]"
                  fontFamily="font-nexa"
                  fontWeight={400}
                  size="17px"
                >
                  {copy}
                </Paragraph>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[#002A23]">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${section.title}-bullet-${bulletIndex}`} className="font-nexa text-[16px] font-semibold">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          ))}
        </Box>
        {children && <Box className="mx-auto max-w-screen-xl px-4 pb-16 2xl:px-0">{children}</Box>}
      </Box>
    </MainLayout>
  )
}
