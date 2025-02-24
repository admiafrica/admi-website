import Image from 'next/image';
import { Box } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { PageSEO } from '@/components/shared/v3';
import { UserProfileCard } from '@/components/cards';
import { ADMI_ACADEMIC_MENTORS, ADMI_ACADEMIC_TEAM } from '@/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';
import { Title } from '@/components/ui';

export default function AcademicTeamPage() {
  const isMobile = useIsMobile();

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO title="Academic Team" />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative z-0 h-[16em] w-full bg-[#002A23]">
          {/* BACKGROUND IMAGES */}
          <div className="absolute left-[62%] top-[60px] z-0 h-fit w-full -translate-x-1/2 transform">
            <div className="flex w-full justify-end pr-[10%]">
              <Image src={IconBgImageYellow} alt={'background image'} />
            </div>
          </div>

          <div className="absolute left-1/2 z-0 h-fit w-full -translate-x-1/2 transform">
            <div className="flex w-full">
              <Image src={IconBgImageRed} alt={'background image'} />
            </div>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
            <Title label="Academic Team" size="48px" color="white" className="mx-auto" />
          </div>
        </Box>
        {/* ACADEMIC TEAM */}
        <Box className="relative z-10 w-full px-4 py-8" bg={'#F5FFFD'}>
          <Box className="mx-auto w-full max-w-screen-xl">
            <Box className="flex w-full flex-wrap">
              {ADMI_ACADEMIC_TEAM.map((member, index) => (
                <div className="mb-4 mr-4" key={`academic-member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
        {/* ACADEMIC MENTORS */}
        <Box className="relative z-10 w-full px-4 py-8" bg={'#F5FFFD'}>
          <Box className="mx-auto w-full max-w-screen-xl">
            <Title label="Mentors" size="32px" color="black" />
            <Box className="flex w-full flex-wrap pt-12">
              {ADMI_ACADEMIC_MENTORS.map((member, index) => (
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
