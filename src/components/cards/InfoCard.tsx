import React from 'react';
import { Box, Card } from '@mantine/core';

import { Paragraph } from '../ui';
import IconAttach from '@/assets/icons/Attach';

type Props = {
  support: any;
};

export default function InfoCard({ support }: Props) {
  return (
    <Card className="z-10 h-full w-full" bg={'#081E1A'} withBorder>
      <Box className="flex">
        {support.icon ? (
          <support.icon width={36} height={36} color="white" />
        ) : (
          <IconAttach width={24} height={24} color="white" />
        )}
        <Paragraph fontFamily="font-nexa" fontWeight={900} className="my-auto w-[90%] px-4 text-white">
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
