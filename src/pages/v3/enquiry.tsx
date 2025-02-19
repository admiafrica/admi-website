import { Box } from '@mantine/core';
import Image from 'next/image';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { EnquiryForm } from '@/components/forms';
import { Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { useIsMobile } from '@/hooks/useIsMobile';

import ImageEnquiry1 from '../../assets/images/enquiry-1.png';
import ImageEnquiry2 from '@/assets/images/enquiry-2.png';
import ImageEnquiry3 from '@/assets/images/enquiry-3.png';

import IconTrophy from '@/assets/icons/Trophy';
import IconDoorkey from '@/assets/icons/DoorKey';
import IconShootingStar from '@/assets/icons/ShootingStar';
import IconLightbulbOn from '@/assets/icons/LightbulbOn';
import IconHat from '@/assets/icons/Hat';

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg';
import IconBgImageRed from '@/assets/icons/ellipse-red.svg';

export default function EnquiryPage() {
  const isMobile = useIsMobile();

  return (
    <MainLayout minimizeFooter minimizeHeader footerBgColor="#002A23">
      <PageSEO title="Enquiry" description="Enquire about a course to get more information." />
      <div className="min-h-[100vh] w-full bg-[#002A23] pt-16">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[54%] top-[24vh] h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full justify-end pr-[10%]">
            <Image src={IconBgImageYellow} alt={'background image'} />
          </div>
        </div>

        <div className="absolute left-[50%] top-[20vh] h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full">
            <Image src={IconBgImageRed} alt={'background image'} />
          </div>
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-col px-4 sm:flex-row 2xl:px-0">
          <div className="sm:w-1/2">
            <Box mb={4}>
              <Title label="Take the first steps" color="#F1FE38" size={isMobile ? '30px' : '48px'} />
            </Box>
            <Box mb={4}>
              <Title label="to building your" color="white" size={isMobile ? '30px' : '48px'} />
            </Box>
            <Box mb={4}>
              <Title label="career with ADMI" color="white" size={isMobile ? '30px' : '48px'} />
            </Box>
            {!isMobile && (
              <Box className="flex flex-row">
                <Box className="flex w-full max-w-[300px] flex-col px-2">
                  <Image width={280} src={ImageEnquiry2} alt="about course" objectFit="cover" className="mb-8" />
                  <Box
                    className="mb-8 flex h-[12vh] w-full items-center justify-between rounded-xl px-[8%]"
                    bg={'admiShamrok'}
                  >
                    <IconLightbulbOn width={54} height={54} color="white" />
                    <IconHat width={44} height={44} color="white" />
                    <IconShootingStar width={54} height={54} color="white" />
                  </Box>
                  <Image width={280} src={ImageEnquiry3} alt="about course" objectFit="cover" />
                </Box>
                <Box className="flex w-1/2 flex-col px-2">
                  <Box className="pb-4">
                    <Image
                      src={ImageEnquiry1}
                      alt="about course"
                      objectFit="cover"
                      style={{ width: '90%', height: '100%' }}
                    />
                  </Box>
                  <Box className="flex flex-row justify-between" h={'100%'} w={'90%'}>
                    <Box
                      className="flex w-[32%] items-center justify-center rounded-xl"
                      bg={'#F1FE37'}
                      h={'8em'}
                      mr={16}
                    >
                      <IconTrophy width={40} height={40} />
                    </Box>
                    <Box className="flex w-[64%] items-center justify-center rounded-xl" bg={'admiRed'} h={'8em'}>
                      <IconDoorkey width={48} height={48} color="white" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </div>
          <div className="sm:w-1/2">
            <div className="mx-auto max-w-xl py-12">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
