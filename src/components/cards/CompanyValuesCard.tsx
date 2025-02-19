import React from 'react';
import { Box, Card, Tabs } from '@mantine/core';
import { Paragraph, Title } from '../ui';
import { useIsMobile } from '@/hooks/useIsMobile';

type Props = {
  values: any;
  showRightIcons?: boolean;
};
export default function CompanyValuesCard({ values, showRightIcons = true }: Props) {
  const isMobile = useIsMobile();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Tabs defaultValue="global" orientation="vertical">
        <Box className="flex flex-col sm:flex-row">
          <Box>
            <Tabs.List>
              {values.map((item: any) => (
                <Tabs.Tab value={item.id} key={item.name}>
                  <Box className="flex">
                    <item.icon />
                    <Paragraph className="my-auto sm:pl-2">{item.name}</Paragraph>
                  </Box>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Box>
          <Box>
            {values.map((item: any) => (
              <Tabs.Panel value={item.id} key={`content-${item.name}`}>
                <Box className="flex flex-col sm:flex-row h-full w-full px-8" bg={'#FEFFF5'}>
                  <Box>
                    <Title label={item.name} color="black" size={isMobile ? '24px' : '36px'} className="py-4" />
                    {item.description.map((paragraph: string, index: number) => (
                      <Paragraph className="pb-8" key={`paragraph-${index}`}>
                        {paragraph}
                      </Paragraph>
                    ))}
                  </Box>
                  {showRightIcons && (
                    <Box className="flex items-center justify-center">
                      <item.icon width={180} height={180} color={item.iconColor} />
                    </Box>
                  )}
                </Box>
              </Tabs.Panel>
            ))}
          </Box>
        </Box>
      </Tabs>
    </Card>
  );
}
