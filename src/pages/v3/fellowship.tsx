import Image from 'next/image';
import { Box, Card, Divider, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { CompanyValuesCard, LearnMoreCard } from '@/components/cards';
import { ADMI_FELLOWSHIP_VALUES, ADMI_FELLOWSHIP_DEPARTMENTS } from '@/utils';

import ImageFellowshipLanding from '@/assets/images/fellowship-landing.png';

export default function FellowshipPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Fellowship" />
      <Modal radius="lg" opened={opened} onClose={close} size={'72rem'}>
        <LearnMoreCard />
      </Modal>
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'blue'} onClick={open}>
          <Image
            src={ImageFellowshipLanding}
            placeholder="empty"
            alt="Fellowship Banner"
            fill
            priority
            className="absolute inset-0 z-0"
            style={{ objectFit: 'cover' }}
          />
          {/* Radial Gradient Overlay */}
          <div
            className="z-5 absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 50%, rgba(9, 113, 96, 1) 100%)',
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[50vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Title label="Fellowship" color="admiShamrok" size="64px" />
              <Title label="Opportunities" color="#F1FE37" size="64px" />
              <Box className="grow"></Box>
              <Box className="flex h-[120px] w-full pt-12">
                <Paragraph fontFamily="font-nexa" className="my pr-6 text-white">
                  We are deeply commited to providing you with comprehensive support that ensures your academic and
                  personal success
                </Paragraph>
                <Divider orientation="vertical" size={2} color="#F5FFFD" />
                <Paragraph fontFamily="font-nexa" className="pl-6 text-white">
                  We are deeply commited to providing you with comprehensive support that ensures your academic and
                  personal success
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="w-full px-4 2xl:px-0">
          <div className="absolute left-1/2 top-[10vh] z-10 w-full max-w-screen-xl -translate-x-1/2 transform px-4 sm:top-[60vh] 2xl:px-0">
            <CompanyValuesCard values={ADMI_FELLOWSHIP_VALUES} showRightIcons={false} />
          </div>
        </div>
        <Box className="h-[160px] w-full" bg={'#097160'}>
          {' '}
        </Box>
        {/* ACADEMIC CONTRIBUTION */}
        <Box className="mx-auto w-full max-w-screen-xl px-4 pb-8 pt-96 lg:pt-64 xl:pt-32 2xl:px-0">
          <Box className="w-full">
            <div className="my-8 w-fit">
              <Title label="Areas of Contribution" size="24px" color="black" />
            </div>
            <div className="mb-8 w-full max-w-screen-md">
              <Paragraph fontFamily="font-nexa" className="py-4">
                Fellows at ADMI can serve in various departments, including but not limited to:
              </Paragraph>
            </div>
          </Box>

          <div className="relative z-20 flex flex-col justify-between sm:flex-row sm:flex-wrap">
            {ADMI_FELLOWSHIP_DEPARTMENTS.map((dept, index) => (
              <Card shadow="md" className="mb-8 sm:w-[24%]" key={`dept-${index}`}>
                <div className="flex px-4 pt-4">
                  <dept.icon width={48} height={48} color={dept.iconColor} />
                  <div className="min-h-[3em] pl-4 font-nexa">
                    <Text size="1.2em" fw={900}>
                      {dept.name}
                    </Text>
                  </div>
                </div>
                <Paragraph className="py-6" fontFamily="font-nexa">
                  {dept.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </Box>
      </div>
    </MainLayout>
  );
}
