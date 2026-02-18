import React from 'react'
import Image from 'next/image'
import { useDisclosure } from '@/lib/tw-mantine-hooks'

import IconArrowLeft from '@/assets/icons/arrow-left.svg'
import IconArrowDown from '@/assets/icons/arrow-down.svg'
import IconLinkedIn from '@/assets/icons/linkedin-blue.svg'
import { Paragraph, Title } from '@/components/ui'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  title: string
  subTitle?: string
  content: React.ReactNode
  icon?: React.ReactNode
  isProfile?: boolean
  profileLink?: string
}

export default function CollapsibleContent({ icon, title, subTitle, content, isProfile = false, profileLink }: Props) {
  const isMobile = useIsMobile()
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <div
      className="mx-auto mt-8 w-full rounded-xl border border-gray-200 bg-white shadow-sm"
      style={{ padding: isProfile ? 0 : 24 }}
    >
      <div className="flex flex-wrap">
        <div onClick={toggle} className="flex w-full cursor-pointer items-center">
          {icon && icon}
          <div className="grow">
            <div className="flex w-full items-center pb-1 pl-2 sm:pl-4">
              <Title size={isMobile ? '1.1em' : '1.4em'} label={title} color="black" className="mt-1 sm:mt-auto" />
              {isProfile && (
                <a href={profileLink || '#'} target="_blank">
                  <Image width={20} height={20} src={IconLinkedIn} alt="linkedin profile" style={{ marginLeft: 8 }} />
                </a>
              )}
            </div>
            {subTitle ? (
              <Paragraph size={isMobile ? '1em' : '1.1em'} fontFamily="font-nexa" className="pl-2 sm:pl-4">
                {subTitle}
              </Paragraph>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center">
            {opened ? (
              <Image
                width={12}
                height={12}
                src={IconArrowDown}
                alt="arrow-down"
                className={isProfile ? 'mr-6 mt-1' : 'mt-1'}
              />
            ) : (
              <Image
                width={12}
                height={12}
                src={IconArrowLeft}
                alt="arrow-left"
                className={isProfile ? 'mr-6 mt-1' : 'mt-1'}
              />
            )}
          </div>
        </div>
      </div>

      {opened && <div className="w-full bg-[#FEFFF5] p-4 font-proxima">{content}</div>}
    </div>
  )
}
