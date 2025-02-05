import React from 'react';
import { Box, Card, Text, Tabs } from '@mantine/core';
import { Paragraph, Title } from '../ui';

type Props = {
  values: any;
};
export default function CompanyValuesCard({ values }: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Tabs defaultValue="global" orientation="vertical">
        <Tabs.List>
          {values.map((item: any) => (
            <Tabs.Tab value={item.id}>
              <Box className="flex">
                <item.icon />
                <Paragraph className="my-auto pl-2">{item.name}</Paragraph>
              </Box>
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {values.map((item: any) => (
          <Tabs.Panel value={item.id}>
            <Box className="flex h-full w-full px-8" bg={'#FEFFF5'}>
              <Box>
                <Title label={item.name} color="black" />
                {item.description.map((paragraph: string) => (
                  <Paragraph className="pb-8">{paragraph}</Paragraph>
                ))}
              </Box>
              <Box className="flex items-center justify-center">
                <item.icon width={180} height={180} color={item.iconColor} />
              </Box>
            </Box>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Card>
  );
}
