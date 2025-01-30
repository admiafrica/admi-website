import React from 'react';
import Image from 'next/image';
import { Group, Text, Collapse, Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import IconArrowLeft from '@/assets/icons/arrow-left.svg';
import IconArrowDown from '@/assets/icons/arrow-down.svg';
import IconLinkedIn from '@/assets/icons/linkedin-blue.svg';
import Link from 'next/link';

type Props = {
  title: string;
  subTitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  isProfile?: boolean;
  profileLink?: string;
};

export default function CollapsibleContent({ icon, title, subTitle, content, isProfile = false, profileLink }: Props) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Card shadow="md" className="mt-8 w-full" mx="auto" p={isProfile ? 0 : 24}>
      <Group justify="center">
        <Group onClick={toggle} className="w-full cursor-pointer">
          {icon && icon}
          <div className="w-[84%] font-nexa sm:w-auto sm:grow">
            <Text size="1.4em" fw={900}>
              {title}
              {isProfile && (
                <a href={profileLink || '#'} target="_blank">
                  <Image width={20} height={20} src={IconLinkedIn} alt="linkedin profile" style={{ marginLeft: 8 }} />
                </a>
              )}
            </Text>
            {subTitle ? (
              <Text size="1.1em" fw={500}>
                {subTitle}
              </Text>
            ) : (
              <></>
            )}
          </div>
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
        </Group>
      </Group>

      <Collapse in={opened}>
        <div className="w-full bg-[#FEFFF5] p-4 font-proxima">{content}</div>
      </Collapse>
    </Card>
  );
}
