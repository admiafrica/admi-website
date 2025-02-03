import React from 'react';
import Image from 'next/image';
import { Card, Image as MantineImage, Text } from '@mantine/core';

import IconLinkedIn from '@/assets/icons/linkedin-blue.svg';

type Props = {
  user: any;
};

export default function UserProfileCard(props: Props) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="border-1 border-grey-500 1xl:w-full h-[240px] w-[240px] border-solid shadow-md"
    >
      <Card.Section className="grow">
        <MantineImage
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          alt="about course"
          height={'100%'}
        />
      </Card.Section>
      <Card.Section className="px-4">
        <div className="flex flex-col py-2">
          <div className="font-nexa">
            <Text fw={900}>{props.user.name}</Text>
          </div>
          <div className="flex w-full">
            <div className="grow font-proxima">
              <Text>Student Programs</Text>
            </div>
            <a href={props.user.linkedin || '#'} target="_blank">
                  <Image width={20} height={20} src={IconLinkedIn} alt="linkedin profile" style={{ marginLeft: 8 }} />
                </a>
          </div>
        </div>
      </Card.Section>
    </Card>
  );
}
