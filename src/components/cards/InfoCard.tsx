import React from 'react';
import { Box, Card } from '@mantine/core';

import { Paragraph } from '../ui';
import IconAttach from '@/assets/icons/Attach';

type Props = {
  item: any;
  bgColor?: string;
};

export default function InfoCard({ item, bgColor = '#081E1A' }: Props) {
  return (
    <Card className="z-10 h-full w-full" bg={bgColor} withBorder>
      <Box className="flex">
        {item.icon ? (
          <item.icon width={36} height={36} color={item.iconColor || 'white'} />
        ) : (
          <IconAttach width={24} height={24} color="white" />
        )}
        <Paragraph fontFamily="font-nexa" fontWeight={900} className="my-auto w-[90%] px-4 text-white">
          {item.name}
        </Paragraph>
      </Box>
      <Paragraph fontFamily="font-nexa" fontWeight={100} className="px-2 py-4 text-white" size="16px">
        {item.description}
      </Paragraph>
      <Box className="flex h-full flex-row"></Box>
    </Card>
  );
}
