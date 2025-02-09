import React from 'react';
import { Box, Card } from '@mantine/core';

import { Paragraph, Title } from '../ui';
import Image from 'next/image';
import IconAttach from '@/assets/icons/Attach';

type Props = {
  support: any;
};

export default function ClipCard({ support }: Props) {
  return (
    <Card className="z-10 mx-4 h-full w-[300px]" bg={'#081E1A'} withBorder>
      <Box>
        <IconAttach width={24} height={24} color="white" />
      </Box>
      <Paragraph fontFamily="font-nexa" fontWeight={900} className="py-4 text-white">
        {support.header}
      </Paragraph>
      <Paragraph fontFamily="font-nexa" fontWeight={100} className="py-4 text-white">
        {support.footer}
      </Paragraph>
      <Box className="flex h-full flex-row"></Box>
    </Card>
  );
}
