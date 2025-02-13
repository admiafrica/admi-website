import Image from 'next/image';
import { Box } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { InfoCard, PlainCard } from '@/components/cards';
import { ADMI_ACADEMIC_PATHWAYS } from '@/utils';

import ImagePathwaysLanding from '@/assets/images/academic-pathways-landing.jpeg';

export default function AcademicPathwaysPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Academic Pathways" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'#002A23'}>
          <Box className="relative z-10 mx-auto flex h-[60vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Box className="flex">
                <Title label="Academic" color="#F1FE37" size="64px" />
                <Box className="px-1"></Box>
                <Title label="Pathways" color="admiShamrok" size="64px" />
              </Box>
              <Box className="flex w-full pt-12">
                <Box className="flex w-[50%] flex-col">
                  <Paragraph fontFamily="font-nexa" className="pb-4 text-white sm:pr-4" size="26px" fontWeight={400}>
                    At Africa Digital Media Institute (ADMI), we are committed to providing our students with a
                    world-class education that opens doors to endless possibilities.
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" className="py-4 text-white sm:pr-4">
                    Through our strategic partnerships with leading institutions both locally and internationally, we
                    offer seamless academic pathways that allow our graduates to transition smoothly to further their
                    studies or pursue their careers.
                  </Paragraph>
                </Box>
                <Box className="relative h-[360px] w-[50%]">
                  <Image
                    fill
                    src={ImagePathwaysLanding}
                    alt="academic pathways"
                    style={{ objectFit: 'cover', borderRadius: 16 }}
                  />
                </Box>
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
              {ADMI_ACADEMIC_PATHWAYS.map((pathway, index) => (
                <Box key={`pathway-${index}`} p={8} className="w-[25%]">
                  <InfoCard item={pathway} />
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
