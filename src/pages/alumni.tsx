import Image from 'next/image';
import { Box, Divider, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { LearnMoreCard, PlainCard, UserProfileCard } from '@/components/cards';
import { JoinForm } from '@/components/forms';
import { ADMI_ALUMNI } from '@/utils';
import { useIsMobile } from '@/hooks/useIsMobile';

import IconUsersGroupAlt from '@/assets/icons/users-group-alt.svg';
import IconCelebrate from '@/assets/icons/celebrate.svg';
import ImageAlumniLanding from '@/assets/images/alumni-landing.png';

export default function AlumniPage() {
  const isMobile = useIsMobile();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Academic Pathways" />
      <Modal radius="lg" opened={opened} onClose={close} size={'72rem'}>
        <LearnMoreCard />
      </Modal>
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full cursor-pointer" bg={'#002A23'} onClick={open}>
          <Image
            src={ImageAlumniLanding}
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
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0, 42, 35, 1) 100%)',
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[500px] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[120px] flex w-full flex-col">
              <Box className="flex grow">
                <Title label="Alumni" color="#F1FE37" size={isMobile ? '36px' : '64px'} />
                <Box className="px-1"></Box>
                <Title label="Network" color="admiShamrok" size={isMobile ? '36px' : '64px'} />
              </Box>
              <Box className="flex w-full flex-col pt-12 sm:h-[180px] sm:flex-row sm:pb-12 sm:pt-0">
                <Paragraph fontFamily="font-nexa" className="my-auto pr-6 text-white sm:w-1/2">
                  Welcome to the Alumni page of Africa Digital Media Institute (ADMI)! We are proud of our graduates and
                  the incredible contributions they make to the digital media industry and beyond.
                </Paragraph>
                <Divider
                  orientation={isMobile ? 'horizontal' : 'vertical'}
                  size={2}
                  color="admiShamrok"
                  my={isMobile ? 16 : 0}
                />
                <Paragraph fontFamily="font-nexa" className="my-auto text-white sm:w-1/2 sm:pl-6">
                  Our alumni network is a vibrant community of talented individuals who have gone on to achieve
                  remarkable success in various fields, and we are excited to celebrate their accomplishments and keep
                  the connections alive.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* NETWORK */}
        <Box className="relative z-10 w-full bg-[#002A23] py-8">
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col sm:flex-row">
            <Box className="flex flex-col px-4 sm:w-[70%] xl:px-0">
              <PlainCard>
                <Box className="flex w-full">
                  <Box className="grow">
                    <Title label="Stay Connected" color="black" size="24px" />
                    <Paragraph fontFamily="font-nexa" fontWeight={400} className="py-4 sm:pr-12" size="20px">
                      As an ADMI alumnus, you are an essential part of our community, and we encourage you to register
                      and keep in touch with us.
                    </Paragraph>
                    <Paragraph fontFamily="font-nexa" className="py-4 sm:pr-12">
                      By joining our alumni network, you will receive updates on events, job opportunities, and industry
                      news that can help you stay connected to your peers and the institute. We want to hear about your
                      journey, your achievements, and how you are making an impact in your respective industries.
                    </Paragraph>
                  </Box>
                  {!isMobile && (
                    <Box className="flex w-[300px] items-center justify-center">
                      <Image src={IconUsersGroupAlt} width={90} height={90} alt="connected-img" />
                    </Box>
                  )}
                </Box>
              </PlainCard>
              <Box className="my-4" />
              <PlainCard>
                <Box className="flex w-full">
                  <Box className="grow">
                    <Title label="Celebrate Your Success" color="black" size="24px" />
                    <Paragraph fontFamily="font-nexa" fontWeight={400} className="py-4 sm:pr-12" size="20px">
                      We believe in celebrating the successes of our alumni.
                    </Paragraph>
                    <Paragraph fontFamily="font-nexa" className="py-4 sm:pr-12">
                      Whether you’ve launched your own business, landed a dream job, or made significant contributions
                      to your field, we want to share your story! By keeping us updated on your professional milestones,
                      you can inspire current students and fellow alumni while reinforcing the strength of the ADMI
                      community.
                    </Paragraph>
                  </Box>
                  {!isMobile && (
                    <Box className="flex w-[300px] items-center justify-center">
                      <Image src={IconCelebrate} width={90} height={90} alt="connected-img" />
                    </Box>
                  )}
                </Box>
              </PlainCard>
            </Box>
            <Box className="px-4 pt-8 sm:w-[30%] sm:pt-0">
              <JoinForm />
            </Box>
          </Box>
        </Box>
        {/* ALUMNI */}
        <Box className="1xl:px-0 w-full px-4 py-8" bg={'#002A23'}>
          <Box className="mx-auto w-full max-w-screen-xl">
            <Divider pb={32} opacity={'30%'} />
            <Box className="flex w-full flex-col">
              <Title label="Alumni Profiles" color="white" />
              <Paragraph className="text-white" fontFamily="font-nexa">
                Our alumni profiles showcase the diverse paths our graduates have taken and the incredible work they are
                doing. Here are just a few examples of our outstanding alumni:
              </Paragraph>
            </Box>
            <Box className="flex w-full flex-row flex-wrap py-8">
              {ADMI_ALUMNI.map((member, index) => (
                <div className="mb-4 mr-4 w-fit" key={`academic-member-${index}`}>
                  <UserProfileCard user={member} />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
        {/* CONCLUSION */}
        <Box className="mx-auto w-full max-w-screen-xl px-4">
          <Divider />
          <Box className="flex w-full flex-col py-6">
            <Title label="Conclusion" color="black" />
            <Paragraph className="" fontFamily="font-nexa">
              At ADMI, we are committed to fostering a strong and supportive alumni network that empowers you to thrive
              in your career. We look forward to celebrating your achievements and keeping you connected with fellow
              alumni and the institute. Together, we can continue to inspire and uplift each other as we navigate the
              ever-evolving landscape of the digital media industry. Thank you for being a part of the ADMI family!
            </Paragraph>
          </Box>
        </Box>
      </div>
    </MainLayout>
  );
}
