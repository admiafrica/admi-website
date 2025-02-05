import React, { useState } from 'react';

import { Card, Box, Divider } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Paragraph } from '@/components/ui';

type Props = {
  data: Array<{ year: number; achievements: Array<string> }>;
};

export default function Timeline({ data }: Props) {
  const [activeYear, setActiveYear] = useState(data[0]);

  const handleYearSelected = (value: { year: number; achievements: Array<string> }) => {
    setActiveYear(value);
  };
  return (
    <Box className="w-full">
      <Box className="relative flex w-full flex-col">
        <Box className="absolute top-[22px] z-0 mx-auto w-full px-6">
          <Divider color="admiShamrok" />
        </Box>
        <Box className="z-10 flex w-full">
          {data.map((item: any) => (
            <Card
              key={item.year}
              className="mx-auto cursor-pointer"
              bg={activeYear.year == item.year ? 'admiRed' : 'admiShamrok'}
              onClick={() => handleYearSelected(item)}
            >
              <Paragraph
                fontFamily="font-nexa"
                size="12px"
                fontWeight={900}
                className={activeYear.year == item.year ? 'text-white' : 'text-black'}
              >
                {item.year}
              </Paragraph>
            </Card>
          ))}
        </Box>
        <Box className="flex w-full py-6">
          <Box className="w-[20%] w-[240px]">
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
