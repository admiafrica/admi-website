import React from 'react'
import Image from 'next/image'
import { Avatar, Box, Card } from '@mantine/core'

import IconLinkedIn from '@/assets/icons/linkedin-blue.svg'
import { Paragraph, Title } from '../ui'
import { useIsMobile } from '@/hooks/useIsMobile'

type Props = {
  user: any
}

export default function UserProfileCard(props: Props) {
  const isMobile = useIsMobile()

  const getInitials = (name: string) => {
    if (!name) return ''
    const words = name.split(' ')
    return words.map((word) => word.charAt(0).toUpperCase()).join('')
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="border-1 border-grey-500 border-solid shadow-md"
      w={isMobile ? '160px' : '240px'}
      h={isMobile ? '220px' : '240px'}
    >
      <Card.Section>
        <Box className="relative grow" h={isMobile ? '150px' : '170px'}>
          {props.user.image ? (
            <Image
              fill
              sizes="(max-width: 768px) 160px, 240px"
              src={props.user.image}
              alt="about course"
              objectFit="cover"
              priority
            />
          ) : (
            <Avatar color="admiRed" w={'100%'} h={'100%'} radius={0} size={72}>
              {getInitials(props.user.name)}
            </Avatar>
          )}
        </Box>
      </Card.Section>
      <Card.Section className={isMobile ? 'px-2' : 'px-4'}>
        <div className="flex flex-col py-2">
          <div className="pb-2">
            <Title size={isMobile ? '14px' : '16px'} label={props.user.name} color="black" />
          </div>
          <div className="flex w-full">
            <Paragraph className="grow" size={isMobile ? '12px' : '16px'}>
              {props.user.title}
            </Paragraph>
            {props.user.linkedin && (
              <a href={props.user.linkedin} target="_blank" className="cursor-pointer">
                <Image width={20} height={20} src={IconLinkedIn} alt="linkedin profile" style={{ marginLeft: 8 }} />
              </a>
            )}
          </div>
        </div>
      </Card.Section>
    </Card>
  )
}
