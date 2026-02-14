import Image from 'next/image'
import { Box, Divider, Text } from '@/lib/tw-mantine'
import { Button, Paragraph, Title } from '@/components/ui'
import { useRouter } from 'next/router'

import ImageEnquiry1 from '../../assets/images/learn-more-1.svg'
import ImageEnquiry2 from '@/assets/images/learn-more-2.svg'
import ImageEnquiry3 from '@/assets/images/learn-more-3.svg'

import IconLogo from '@/assets/logo-dark.svg'
import IconTrophy from '@/assets/icons/Trophy'
import IconDoorkey from '@/assets/icons/DoorKey'
import IconShootingStar from '@/assets/icons/ShootingStar'
import IconLightbulbOn from '@/assets/icons/LightbulbOn'
import IconHat from '@/assets/icons/Hat'

export default function LearnMoreCard() {
  const router = useRouter()

  const handleViewCourses = () => {
    router.push('/courses')
  }

  const handleViewEnquiry = () => {
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = router.query
    const query = utm_source ? { utm_source, utm_medium, utm_campaign, utm_term, utm_content } : undefined

    router.push({
      pathname: '/enquiry',
      query
    })
  }

  return (
    <Box className="mx-auto flex w-full max-w-screen-lg flex-col px-6">
      <Image src={IconLogo} alt="about course" objectFit="cover" className="mb-6 h-[60px] w-[120px]" />
      <Box className="mx-auto flex w-full flex-col sm:flex-row">
        <div className="sm:w-1/2">
          <div className="flex h-full w-full flex-col sm:pr-28">
            <Box className="flex flex-col">
              <Title label="With ADMI, we" color="black" size="48px" />
              <Title label="make learning" color="black" size="48px" />
              <Box className="flex">
                <Title label="made" color="black" size="48px" />
                <div className="px-1"></div>
                <Title label="coool" color="admiRed" size="48px" />
                <Title label="!!" color="black" size="48px" />
              </Box>
            </Box>
            <Box className="flex w-full py-6">
              <Box className="w-1/3">
                <Paragraph fontFamily="font-nexa">Enroll with</Paragraph>
                <Paragraph fontFamily="font-nexa">today low as</Paragraph>
              </Box>
              <Box className="grow">
                <Box className="relative">
                  <Divider size={2} color="admiRed" className="absolute inset-0 top-[12px] z-0 w-[84%]" />
                </Box>
                <Paragraph size="24px" fontWeight={400} fontFamily="font-nexa">
                  KES 20,000
                </Paragraph>
              </Box>
              <Box>
                <Paragraph size="24px" fontFamily="font-nexa" fontWeight={400}>
                  KES 0.00
                </Paragraph>
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
            <Box className="flex w-full max-w-[240px] flex-col px-2">
              <Image
                src={ImageEnquiry1}
                alt="about course"
                objectFit="cover"
                className="mb-2"
                style={{ width: '100%' }}
              />
              <Box>
                <Box
                  className="mb-3 flex h-[12vh] w-full items-center justify-between rounded-xl px-[8%]"
                  bg={'#E6F608'}
                >
                  <IconLightbulbOn width={54} height={54} color="black" />
                  <IconHat width={44} height={44} color="black" />
                  <IconShootingStar width={54} height={54} color="black" />
                </Box>
              </Box>
              <Image src={ImageEnquiry2} alt="about course" objectFit="cover" style={{ width: '100%' }} />
            </Box>
            <Box className="flex w-1/2 flex-col px-2">
              <Box className="w-full pb-4">
                <Image
                  src={ImageEnquiry3}
                  alt="about course"
                  objectFit="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
              <Box className="flex flex-row" h={'100%'} w={'100%'}>
                <Box className="flex w-[32%] items-center justify-center rounded-xl" bg={'#EF7B2E'} h={'4em'} mr={16}>
                  <IconTrophy width={40} height={40} />
                </Box>
                <Box className="flex w-[64%] items-center justify-center rounded-xl" bg={'admiShamrok'} h={'4em'}>
                  <IconDoorkey width={48} height={48} color="black" />
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  )
}
