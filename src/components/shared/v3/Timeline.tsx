import React, { useState } from 'react';

import { Card, Box } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Paragraph } from '@/components/ui';

type Props = {
  data: any;
};

export default function Timeline({ data }: Props) {
  const [activeYear] = useState(data[0]);
  return (
    <Box className="w-full">
      <Box className="flex w-full flex-col">
        <Box className="flex w-full">
          {data.map((item: any) => (
            <Card key={item.year} className="mx-auto" bg={'admiShamrok'}>
              <Paragraph fontFamily="font-nexa" size="12px">
                {item.year}
              </Paragraph>
            </Card>
          ))}
        </Box>
        <Box className="flex w-full py-6">
          <Box className="w-[20%]">
            <Paragraph fontFamily="font-nexa py-2" size="76px">
              {activeYear.year}
            </Paragraph>
          </Box>
          <Box className="flex w-[80%] flex-col">
            {activeYear.achievements.map((item: string, index: number) => (
              <Box className="flex w-full py-2" key={`achievement-${index}`}>
                <IconPlus className="my-auto mr-2 rounded-full bg-admiShamrok" size={14} />
                <Paragraph className="my-auto">{item}</Paragraph>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
