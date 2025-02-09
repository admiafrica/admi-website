import React from 'react';
import Image from 'next/image';
import { Card } from '@mantine/core';

import { Paragraph, Title } from '../ui';

import ImageNotFound from '@/assets/icons/audio-phone-alt.svg';

type Props = {
  title: string;
  subtext: string;
};

export default function EmptyCard({ title, subtext }: Props) {
  return (
    <Card className="z-10 flex flex-col items-center justify-center sm:h-[400px] sm:w-[600px]" withBorder shadow="xl">
      <Image src={ImageNotFound} alt="not found" />
      <Paragraph fontFamily="font-nexa" size="32px" className="py-4">
        {title}
      </Paragraph>
      <Paragraph fontFamily="font-nexa" className="py-4 text-center">
        {subtext}
      </Paragraph>
    </Card>
  );
}
