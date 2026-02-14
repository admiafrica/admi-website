import Image from 'next/image'
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
    <div className="mx-auto flex w-full max-w-screen-lg flex-col px-6">
      <Image src={IconLogo} alt="about course" objectFit="cover" className="mb-6 h-[60px] w-[120px]" />
      <div className="mx-auto flex w-full flex-col sm:flex-row">
        <div className="sm:w-1/2">
          <div className="flex h-full w-full flex-col sm:pr-28">
            <div className="flex flex-col">
              <Title label="With ADMI, we" color="black" size="48px" />
              <Title label="make learning" color="black" size="48px" />
              <div className="flex">
                <Title label="made" color="black" size="48px" />
                <div className="px-1"></div>
                <Title label="coool" color="admiRed" size="48px" />
                <Title label="!!" color="black" size="48px" />
              </div>
            </div>
            <div className="flex w-full py-6">
              <div className="w-1/3">
                <Paragraph fontFamily="font-nexa">Enroll with</Paragraph>
                <Paragraph fontFamily="font-nexa">today low as</Paragraph>
              </div>
              <div className="grow">
                <div className="relative">
                  <hr
                    className="absolute inset-0 top-[12px] z-0 w-[84%] border-gray-200"
                    style={{ borderColor: 'var(--admi-red, #C1272D)', borderWidth: 2 }}
                  />
                </div>
                <Paragraph size="24px" fontWeight={400} fontFamily="font-nexa">
                  KES 20,000
                </Paragraph>
              </div>
              <div>
                <Paragraph size="24px" fontFamily="font-nexa" fontWeight={400}>
                  KES 0.00
                </Paragraph>
              </div>
            </div>
            <Button label="Enquire Today" size="lg" onClick={handleViewEnquiry} />

            <div className="mx-auto w-fit cursor-pointer py-6 font-proxima">
              <p
                className="text-gray-700"
                style={{ fontSize: '20px', fontWeight: 900, color: 'var(--admi-red, #C1272D)', cursor: 'pointer' }}
                onClick={handleViewCourses}
              >
                View all courses
              </p>
            </div>
            <div className="grow"></div>
            <div className="flex w-full">
              <Paragraph size="16px" className="pr-1">
                <strong>Note:</strong> All courses have a specific tuition fee and subject to our{' '}
                <span className="font-nexa text-admiRed">Terms & Conditions</span>
              </Paragraph>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2">
          <div className="flex flex-row">
            <div className="flex w-full max-w-[240px] flex-col px-2">
              <Image
                src={ImageEnquiry1}
                alt="about course"
                objectFit="cover"
                className="mb-2"
                style={{ width: '100%' }}
              />
              <div>
                <div
                  className="mb-3 flex h-[12vh] w-full items-center justify-between rounded-xl px-[8%]"
                  style={{ backgroundColor: '#E6F608' }}
                >
                  <IconLightbulbOn width={54} height={54} color="black" />
                  <IconHat width={44} height={44} color="black" />
                  <IconShootingStar width={54} height={54} color="black" />
                </div>
              </div>
              <Image src={ImageEnquiry2} alt="about course" objectFit="cover" style={{ width: '100%' }} />
            </div>
            <div className="flex w-1/2 flex-col px-2">
              <div className="w-full pb-4">
                <Image
                  src={ImageEnquiry3}
                  alt="about course"
                  objectFit="cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="flex flex-row" style={{ height: '100%', width: '100%' }}>
                <div
                  className="flex w-[32%] items-center justify-center rounded-xl"
                  style={{ backgroundColor: '#EF7B2E', height: '4em', marginRight: 16 }}
                >
                  <IconTrophy width={40} height={40} />
                </div>
                <div
                  className="flex w-[64%] items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'var(--admi-shamrok, #08F6CF)', height: '4em' }}
                >
                  <IconDoorkey width={48} height={48} color="black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
