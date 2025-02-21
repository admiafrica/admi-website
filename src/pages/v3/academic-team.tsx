import Image from 'next/image';
import { Box } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { InfoCard, PlainCard, UserProfileCard } from '@/components/cards';
import { ADMI_ACADEMIC_PATHWAYS, ADMI_ACADEMIC_TEAM_MINIMAL } from '@/utils';

import ImagePathwaysLanding from '@/assets/images/academic-pathways-landing.jpeg';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function AcademicTeamPage() {
  const isMobile = useIsMobile();

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Academic Team" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'#002A23'}>
          <Box className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-row px-4 sm:h-[60vh] sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Box className="flex">
                <Title label="Academic" color="#F1FE37" size={isMobile ? '36px' : '64px'} />
                <Box className="px-1"></Box>
                <Title label="Team" color="admiShamrok" size={isMobile ? '36px' : '64px'} />
              </Box>
              <Box className="flex w-full flex-col pt-12 sm:flex-row">
                <Box className="flex flex-col sm:w-[50%]">
                  <Paragraph fontFamily="font-nexa" className="pb-4 text-white sm:pr-4" size="26px" fontWeight={400}>
                    At Africa Digital Media Institute (ADMI), we are committed to providing our students with a
                    world-class education that opens doors to endless possibilities.
                  </Paragraph>
                </Box>
                <Box className="relative h-[360px] sm:w-[50%]">
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
        {/* ACADEMIC TEAM */}
        <Box className="w-full px-4 py-8">
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="flex w-full flex-row pb-4">
              <Box className="w-full">
                <Title label="Academic Team" color="black" />
              </Box>
            </Box>
            <Box className="flex w-full flex-wrap">
              {ADMI_ACADEMIC_TEAM_MINIMAL.map((member, index) => (
                <div className="mb-4 mr-4" key={`academic-member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
      </div>
    </MainLayout>
  );
}
