import { Box } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { InfoCard, PlainCard } from '@/components/cards';
import { ADMI_ACADEMIC_PATHWAYS } from '@/utils';

export default function AcademicPathwaysPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Academic Pathways" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'#002A23'}>
          <Box className="relative z-10 mx-auto flex h-[50vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Box className="flex">
                <Title label="Academic" color="#B9C601" size="64px" />
                <Box className="px-1"></Box>
                <Title label="Pathways" color="admiShamrok" size="64px" />
              </Box>
              <Box className="flex w-full flex-col pt-12">
                <Paragraph fontFamily="font-nexa" className="w-1/2 py-4 text-white" size="26px" fontWeight={400}>
                  At Africa Digital Media Institute (ADMI), we are committed to providing our students with a
                  world-class education that opens doors to endless possibilities.
                </Paragraph>
                <Paragraph fontFamily="font-nexa" className="w-1/2 py-4 text-white">
                  Through our strategic partnerships with leading institutions both locally and internationally, we
                  offer seamless academic pathways that allow our graduates to transition smoothly to further their
                  studies or pursue their careers.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* WORK */}
        <Box className="relative z-10 w-full bg-[#002A23] pb-48 pt-8">
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col">
            <Box className="w-full px-4 py-6 text-white 2xl:px-0 2xl:pr-4">
              <Title label="Why Work at ADMI?" color="white" />
            </Box>
            <Box className="flex w-full flex-col justify-between sm:flex-row sm:px-0">
              {ADMI_ACADEMIC_PATHWAYS.map((support, index) => (
                <Box key={`support-${index}`} p={8}>
                  <InfoCard support={support} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="relative w-full px-4 2xl:px-0">
          <div className="absolute left-1/2 top-[10vh] z-10 w-full max-w-screen-xl -translate-x-1/2 transform px-4 sm:top-[-8vh] 2xl:px-0">
            <PlainCard>
              <Title label="Career Opportunities" size="20px" color="black" />
              <Paragraph className="py-4" fontFamily="font-nexa">
                In addition to academic pathways, our programs are tailored to equip our students with the skills and
                knowledge needed to thrive in the digital media industry. Through our industry-focused curriculum,
                hands-on learning experiences, and career development services, we help our students build a strong
                foundation for their future careers.
              </Paragraph>
              <Paragraph className="py-4" fontFamily="font-nexa">
                At ADMI, we believe that education is the key to unlocking one’s potential. By aligning our programs
                with international standards and forging strategic partnerships with leading institutions, we aim to
                provide our students with the tools and opportunities they need to succeed in a rapidly evolving world.
              </Paragraph>
            </PlainCard>
          </div>
        </div>
        <Box className="mx-auto w-full pt-56"></Box>
      </div>
    </MainLayout>
  );
}
