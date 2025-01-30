import React from 'react';
import { Box, Card, Text, Tabs } from '@mantine/core';
import { Title } from '../ui';

export default function CompanyValuesCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="w-full">
      <Tabs defaultValue="global" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="global">
            <Text>Global</Text>
          </Tabs.Tab>
          <Tabs.Tab value="practical">
            <Text>Practical</Text>
          </Tabs.Tab>
          <Tabs.Tab value="digital">
            <Text>Digital</Text>
          </Tabs.Tab>
          <Tabs.Tab value="value-driven">
            <Text>Value Driven</Text>
          </Tabs.Tab>
          <Tabs.Tab value="transformational">
            <Text>Transformational</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="global">
          <Box className="h-full grow px-8" bg={'#FEFFF5'}>
            <Title label="Global" color="black" />
            <div className="font-proxima">
              <Text size="18px">
                By joining the ADMI community, you enjoy an exceptional international education benchmarking operations
                and pedagogy against global standards. To ensure that your skills are globally marketable, we develop
                our curriculum in partnership with global industry partners and faculty recruited from leading
                international academic institutions. And best of all, you will learn alongside a diverse community that
                has hosted staff, faculty and students from over 27 different countries.
              </Text>
            </div>
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="practical">
          <Box className="h-full grow px-8" bg={'#FEFFF5'}>
            <Title label="Practical" color="black" />
            <div className="font-proxima">
              <Text size="18px">
                By joining the ADMI community, you enjoy an exceptional international education benchmarking operations
                and pedagogy against global standards. To ensure that your skills are globally marketable, we develop
                our curriculum in partnership with global industry partners and faculty recruited from leading
                international academic institutions. And best of all, you will learn alongside a diverse community that
                has hosted staff, faculty and students from over 27 different countries.
              </Text>
            </div>
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="digital">
          <Box className="h-full grow px-8" bg={'#FEFFF5'}>
            <Title label="Digital" color="black" />
            <div className="font-proxima">
              <Text size="18px">
                By joining the ADMI community, you enjoy an exceptional international education benchmarking operations
                and pedagogy against global standards. To ensure that your skills are globally marketable, we develop
                our curriculum in partnership with global industry partners and faculty recruited from leading
                international academic institutions. And best of all, you will learn alongside a diverse community that
                has hosted staff, faculty and students from over 27 different countries.
              </Text>
            </div>
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="value-driven">
          <Box className="h-full grow px-8" bg={'#FEFFF5'}>
            <Title label="Value Driven" color="black" />
            <div className="font-proxima">
              <Text size="18px">
                By joining the ADMI community, you enjoy an exceptional international education benchmarking operations
                and pedagogy against global standards. To ensure that your skills are globally marketable, we develop
                our curriculum in partnership with global industry partners and faculty recruited from leading
                international academic institutions. And best of all, you will learn alongside a diverse community that
                has hosted staff, faculty and students from over 27 different countries.
              </Text>
            </div>
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="transformational">
          <Box className="h-full grow px-8" bg={'#FEFFF5'}>
            <Title label="Transformational" color="black" />
            <div className="font-proxima">
              <Text size="18px">
                By joining the ADMI community, you enjoy an exceptional international education benchmarking operations
                and pedagogy against global standards. To ensure that your skills are globally marketable, we develop
                our curriculum in partnership with global industry partners and faculty recruited from leading
                international academic institutions. And best of all, you will learn alongside a diverse community that
                has hosted staff, faculty and students from over 27 different countries.
              </Text>
            </div>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
