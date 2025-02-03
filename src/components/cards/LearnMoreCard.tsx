import Image from 'next/image';
import { Box, Text } from '@mantine/core';
import { Button, Paragraph, Title } from '@/components/ui';
import { useRouter } from 'next/router';

import ImageEnquiry1 from '../../assets/images/learn-more-1.svg';
import ImageEnquiry2 from '@/assets/images/learn-more-2.svg';
import ImageEnquiry3 from '@/assets/images/learn-more-3.svg';

import IconLogo from '@/assets/logo-dark.svg';
import IconTrophy from '@/assets/icons/Trophy';
import IconDoorkey from '@/assets/icons/DoorKey';
import IconShootingStar from '@/assets/icons/ShootingStar';
import IconLightbulbOn from '@/assets/icons/LightbulbOn';
import IconHat from '@/assets/icons/Hat';

export default function LearnMoreCard() {
  const router = useRouter();

  const handleViewCourses = () => {
    router.push(`/v3/courses`);
  };

  const handleViewEnquiry = () => {
    router.push(`/v3/enquiry`);
  };

  return (
    <Box className="mx-auto flex w-full max-w-screen-2xl flex-col px-16">
      <Image src={IconLogo} alt="about course" objectFit="cover" className="mb-6 h-[60px] w-[120px]" />
      <Box className="mx-auto flex w-full flex-col sm:flex-row">
        <div className="sm:w-1/2">
          <div className="flex h-full w-full flex-col sm:pr-28">
            <Title label="With ADMI, we make learning made coool!!" color="black" size="64px" />
            <Box className="flex w-full py-6">
              <Box className="w-1/3">
                <Paragraph>Enroll with</Paragraph>
                <Paragraph>today low as</Paragraph>
              </Box>
              <Box className="w-1/3">
                <Box className="mx-auto w-fit font-nexa">
                  <Text size="36px" fw={400} td="line-through">
                    KES 20,000
                  </Text>
                </Box>
              </Box>
              <Box className="w-1/3">
                <Box className="mx-auto w-fit font-nexa">
                  <Text size="36px" fw={400}>
                    KES 0.00
                  </Text>
                </Box>
              </Box>
            </Box>
            <Button label="Enquire Today" size="lg" onClick={handleViewEnquiry} />

            <Box className="mx-auto w-fit cursor-pointer py-6 font-proxima">
              <Text size="20px" fw={900} c={'admiRed'} onClick={handleViewCourses}>
                View all courses
              </Text>
            </Box>
            <Box className="grow"></Box>
            <Box className="flex w-full">
              <Paragraph size="16px" className="pr-1">
                <strong>Note:</strong> All courses have a specific tuition fee and subject to our{' '}
                <span className="font-nexa text-admiRed">Terms & Conditions</span>
              </Paragraph>
            </Box>
          </div>
        </div>
        <div className="sm:w-1/2">
          <Box className="flex flex-row">
            <Box className="flex w-full max-w-[300px] flex-col px-2">
              <Image
                src={ImageEnquiry1}
                alt="about course"
                objectFit="cover"
                className="mb-8"
                style={{ width: '100%' }}
              />
              <Box className="mb-8 flex h-[12vh] w-full items-center justify-between rounded-xl px-[8%]" bg={'#E6F608'}>
                <IconLightbulbOn width={54} height={54} color="black" />
                <IconHat width={44} height={44} color="black" />
                <IconShootingStar width={54} height={54} color="black" />
              </Box>
              <Image src={ImageEnquiry2} alt="about course" objectFit="cover" style={{ width: '100%' }} />
            </Box>
            <Box className="flex w-1/2 flex-col px-2">
              <Box className="pb-4">
                <Image
                  src={ImageEnquiry3}
                  alt="about course"
                  objectFit="cover"
                  style={{ width: '90%', height: '100%' }}
                />
              </Box>
              <Box className="flex flex-row justify-between" h={'100%'} w={'90%'}>
                <Box className="flex w-[32%] items-center justify-center rounded-xl" bg={'#F76335'} h={'8em'} mr={16}>
                  <IconTrophy width={40} height={40} />
                </Box>
                <Box className="flex w-[64%] items-center justify-center rounded-xl" bg={'admiShamrok'} h={'8em'}>
                  <IconDoorkey width={48} height={48} color="black" />
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
