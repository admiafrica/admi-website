import Image from 'next/image';
import { Box, Card, Divider, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { Paragraph, Title } from '@/components/ui';
import { PageSEO } from '@/components/shared/v3';
import { LearnMoreCard } from '@/components/cards';
import { ADMI_ACCOMODATION_FEATURES } from '@/utils';

import IconQwetu from '@/assets/icons/qwetu-residence.svg';
import IconQwetuLight from '@/assets/icons/qwetu-residence-light.svg';
import IconQejani from '@/assets/icons/qejani-residence.svg';
import IconQejaniLight from '@/assets/icons/qejani-residence-light.svg';
import ImageCommunityBg from '@/assets/images/community-bg.png';
import ImageAccomodationLanding from '@/assets/images/accomodation-landing.png';
import IconArrowTipRight from '@/assets/icons/ArrowTipRight';

export default function AccomodationsPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MainLayout footerBgColor="#F5FFFD">
      <PageSEO title="Accomodation" />
      <Modal radius="lg" opened={opened} onClose={close} size={'72rem'}>
        <LearnMoreCard />
      </Modal>
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full cursor-pointer" bg={'blue'} onClick={open}>
          <Image
            src={ImageAccomodationLanding}
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
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 20%, rgba(246, 8, 52, 1) 100%)',
            }}
          ></div>
          <Box className="relative z-10 mx-auto flex h-[50vh] w-full max-w-screen-xl flex-row px-4 sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Title label="Accomodation" color="#F1FE37" size="64px" />
              <Box className="grow"></Box>
              <Box className="flex w-full pb-12">
                <Paragraph fontFamily="font-nexa" className="w-[50%] pr-4 text-white">
                  At Africa Digital Media Institute (ADMI), we understand that finding the right accommodation is
                  essential for your academic success and overall well-being. 
                </Paragraph>
                <Divider orientation="vertical" size={2} color="admiShamrok" />
                <Paragraph fontFamily="font-nexa" className="w-[50%] pl-4 text-white">
                  That’s why we have partnered with Qwetu and Qejani, two leading providers of modern student
                  accommodation, to offer you a comfortable and vibrant living experience close to campus. We believe
                  that a supportive living environment plays a crucial role in your educational journey, and we are here
                  to ensure you have the best options available.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Floating Card */}
        <div className="w-full px-4 2xl:px-0">
          <div className="absolute left-1/2 top-[10vh] z-10 w-full max-w-screen-xl -translate-x-1/2 transform px-4 sm:top-[60vh] 2xl:px-0">
            <Card radius={8}>
              <Card.Section>
                <Box bg={'#36030D'} className="px-6">
                  <Title label="Your Home Away from Home" color="white" />
                </Box>
                <Box className="flex w-full p-6" bg={'#840018'}>
                  <Box className="w-[60%]">
                    <Paragraph fontFamily="font-nexa" fontWeight={400} size="24px" className="text-white">
                      Qwetu and Qejani are designed with you in mind, providing a new kind of student living experience
                      that prioritizes safety, comfort, and community.
                    </Paragraph>
                    <Paragraph fontFamily="font-nexa" className="py-4 text-white">
                      Both options are the number one choice for student accommodation, offering a range of amenities
                      that cater to your needs as a student. Living in these residences means you can focus on your
                      studies while enjoying a fulfilling student life.
                    </Paragraph>
                  </Box>
                  <Box className="flex w-[40%] flex-col items-end">
                    <Card bg={'white'} radius={8} my={4} w={300} className="flex items-center">
                      <Image src={IconQwetu} alt="Qwetu Residences" width={150} height={80} />
                    </Card>
                    <Card bg={'white'} radius={8} my={4} w={300} className="flex items-center">
                      <Image src={IconQejani} alt="Qejani Residences" width={150} height={80} />
                    </Card>
                  </Box>
                </Box>
              </Card.Section>
            </Card>
          </div>
        </div>
        <Box className="h-[90px] w-full" bg={'rgba(246, 8, 52, 1)'}>
          {' '}
        </Box>
        {/* FEATURES */}
        <Box className="mx-auto w-full max-w-screen-xl px-4 pb-8 2xl:px-0">
          <Box className="w-full pt-80">
            <div className="mx-auto my-8 w-fit">
              <Title label="Key Features of Qwetu and Qejani Accomodation" size="24px" color="black" />
            </div>
          </Box>

          <div className="relative z-20 flex flex-col justify-between sm:flex-row sm:flex-wrap">
            {ADMI_ACCOMODATION_FEATURES.map((dept, index) => (
              <Card shadow="md" className="mb-8 sm:w-[30%]" key={`dept-${index}`} radius={8}>
                <div className="flex px-4 pt-4">
                  {/* <dept.icon width={48} height={48} /> */}
                  <Image src={dept.icon} alt={dept.title} width={48} height={48} />
                  <Paragraph fontFamily="font-nexa" fontWeight={900} className="my-auto pl-4">
                    {dept.title}
                  </Paragraph>
                </div>
                <Paragraph className="py-6" fontFamily="font-nexa">
                  {dept.description}
                </Paragraph>
              </Card>
            ))}
          </div>
        </Box>
      </div>
      {/* BOOKING */}
      <Box className="w-full" bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-xl px-4 py-6">
          <Box className="w-full">
            <div className="mx-auto my-8 w-fit">
              <Title label="How to Book Your Accomodation" size="24px" color="black" />
            </div>
            <div className="mx-auto mb-8 w-full max-w-screen-xl">
              <Paragraph fontFamily="font-nexa text-center" className="py-4">
                We encourage you to take the next step in securing your accommodation at Qwetu or Qejani. Booking your
                room is simple and straightforward. Visit their respective websites to explore available options and
                find the perfect fit for your needs:
              </Paragraph>
              <Box className="mx-auto flex w-fit">
                <Card className="flex h-[128px] w-[340px] flex-col items-center sm:mr-4" bg={'#E9530E'}>
                  <Image src={IconQwetuLight} alt="Qwetu Residences" width={150} height={80} />
                  <Box className="mx-auto flex">
                    <Paragraph className="my-auto text-white">Book with Qwetu</Paragraph>
                    <IconArrowTipRight color="white" />
                  </Box>
                </Card>
                <Card className="flex h-[128px] w-[340px] flex-col items-center sm:ml-4" bg={'#542883'}>
                  <Image src={IconQejaniLight} alt="Qejani Residences" width={150} height={80} />
                  <Box className="mx-auto flex">
                    <Paragraph className="my-auto text-white">Book with Qejani</Paragraph>
                    <IconArrowTipRight color="white" />
                  </Box>
                </Card>
              </Box>
              <Paragraph fontFamily="font-nexa" className="py-4 text-center">
                When booking, be sure to use the <strong>Referral Code: STU-0016368</strong> to enjoy exclusive benefits
                and offers tailored for ADMI students.
              </Paragraph>
            </div>
          </Box>
        </Box>
      </Box>
      {/* COMMUNITY */}
      <Box bg={'#F5FFFD'}>
        <Box className="mx-auto w-full max-w-screen-xl px-4 py-6">
          <Card className="w-full" bg={'#F1FE37'} radius={8}>
            <Card.Section className="w-full">
              <Box className="flex w-full">
                <Box className="grow p-16">
                  <Title label="Community and Support" color="black" />
                  <Paragraph fontFamily="font-nexa" fontWeight={400} size="24px">
                    Qwetu or Qejani means becoming part of a vibrant community of fellow students from diverse
                    backgrounds.
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" className="py-6">
                    Engage in social events, workshops, and activities that foster connections and friendships that can
                    last a lifetime. The supportive environment encourages collaboration, networking, and personal
                    growth, allowing you to make the most of your time at ADMI.
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" className="py-6">
                    At ADMI, we are committed to supporting your journey as a student, and we believe that finding the
                    right accommodation is a crucial step in that process. With Qwetu and Qejani, you’ll find a
                    welcoming community that enhances your educational experience and helps you thrive both academically
                    and personally. Embrace the opportunity to live in a space that inspires you to achieve your goals
                    and enjoy your university life to the fullest!
                  </Paragraph>
                </Box>
                <Box className="w-[50%] items-end">
                  <Image src={ImageCommunityBg} alt="community and support" />
                </Box>
              </Box>
            </Card.Section>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}
