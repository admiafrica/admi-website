import React from 'react';
import { Box, Card, Tabs } from '@mantine/core';
import { Paragraph, Title } from '../ui';

type Props = {
  values: any;
  showRightIcons?: boolean;
};
export default function CompanyValuesCard({ values, showRightIcons = true }: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Tabs defaultValue="global" orientation="vertical">
        <Tabs.List>
          {values.map((item: any) => (
            <Tabs.Tab value={item.id} key={item.name}>
              <Box className="flex">
                <item.icon />
                <Paragraph className="my-auto pl-2">{item.name}</Paragraph>
              </Box>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {values.map((item: any) => (
          <Tabs.Panel value={item.id} key={`content-${item.name}`}>
            <Box className="flex h-full w-full px-8" bg={'#FEFFF5'}>
              <Box>
                <Title label={item.name} color="black" />
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
      </Tabs>
    </Card>
  );
}
