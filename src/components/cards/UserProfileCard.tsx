import React from 'react';
import Image from 'next/image';
import { Box, Card, Text } from '@mantine/core';

import IconLinkedIn from '@/assets/icons/linkedin-blue.svg';
import { Paragraph } from '../ui';
import { useIsMobile } from '@/hooks/useIsMobile';

type Props = {
  user: any;
};

export default function UserProfileCard(props: Props) {
  const isMobile = useIsMobile();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="border-1 border-grey-500 border-solid shadow-md"
      w={isMobile ? '160px' : '240px'}
      h={isMobile ? '240px' : '240px'}
    >
      <Card.Section className="grow">
        <Box className="relative grow" h={isMobile ? '100px' : 'auto'}>
          <Image fill src={props.user.image} alt="about course" objectFit="cover" />
        </Box>
      </Card.Section>
      <Card.Section className="px-4">
        <div className="flex flex-col py-2">
          <div className="font-nexa">
            <Text fw={900}>{props.user.name}</Text>
          </div>
          <div className="flex w-full">
            <Paragraph className="grow" size="16px">
              {props.user.title}
            </Paragraph>
            <a href={props.user.linkedin || '#'} target="_blank" className="cursor-pointer">
              <Image width={20} height={20} src={IconLinkedIn} alt="linkedin profile" style={{ marginLeft: 8 }} />
            </a>
          </div>
        </div>
      </Card.Section>
    </Card>
  );
}
