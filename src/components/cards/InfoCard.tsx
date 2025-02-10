import React from 'react';
import { Box, Card } from '@mantine/core';

import { Paragraph, Title } from '../ui';
import Image from 'next/image';
import IconAttach from '@/assets/icons/Attach';

type Props = {
  support: any;
};

export default function InfoCard({ support }: Props) {
  return (
    <Card className="z-10 h-full w-full" bg={'#081E1A'} withBorder>
      <Box className="flex">
        <IconAttach width={24} height={24} color="white" />
        <Paragraph fontFamily="font-nexa" fontWeight={900} className="w-[90%] px-4 text-white">
          {support.name}
        </Paragraph>
      </Box>
      <Paragraph fontFamily="font-nexa" fontWeight={100} className="py-4 text-white" size="16px">
        {support.description}
      </Paragraph>
      <Box className="flex h-full flex-row"></Box>
    </Card>
  );
}
