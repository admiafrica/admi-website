import { Box, Card, Divider, Tabs } from '@mantine/core';

import { PageSEO } from '@/components/shared/v3';
import { MainLayout } from '@/layouts/v3/MainLayout';
import {} from '@tabler/icons-react';
import { EmptyCard } from '@/components/cards';
import { Paragraph } from '@/components/ui';

import IconDiary from '@/assets/icons/Diary';

export default function NewsEventsDetailPage() {
  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="News & Events" />
      <Box className="w-full">
        <Tabs defaultValue="news">
          <Tabs.List w={'100%'}>
            <Tabs.Tab value="news" rightSection={<IconDiary width={12} height={12} />} className="grow" w={'50%'}>
              News
            </Tabs.Tab>
            <Tabs.Tab value="events" rightSection={<IconDiary width={12} height={12} />} className="grow" w={'50%'}>
              Events
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="news">
            <Box className="mx-auto flex w-full max-w-screen-xl px-4 py-16 2xl:px-0">
              <Box className="flex w-[200px] flex-col">
                <Box className="pb-6">
                  <Paragraph>Share on:</Paragraph>
                </Box>
                <Card className="flex w-full flex-col" shadow="lg">
                  <Box className="py-4">
                    <Paragraph fontFamily="font-nexa" size="16px">
                      Facebook
                    </Paragraph>
                  </Box>
                  <Divider />
                  <Box className="py-4">
                    <Paragraph fontFamily="font-nexa" size="16px">
                      LinkedIn
                    </Paragraph>
                  </Box>
                  <Divider />
                  <Box className="py-4">
                    <Paragraph fontFamily="font-nexa" size="16px">
                      Whatsapp
                    </Paragraph>
                  </Box>
                  <Divider />
                  <Box className="py-4">
                    <Paragraph fontFamily="font-nexa" size="16px">
                      Copy Link
                    </Paragraph>
                  </Box>
                </Card>
              </Box>
              <Card className="ml-8 h-[80vh] w-full" withBorder>
                <Paragraph>News Article Content</Paragraph>
              </Card>
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="events" w={'100%'} h={'80vh'} className="flex items-center justify-center px-4">
            <EmptyCard
              title="No events available!"
              subtext="Hello there! Seems like we currently don’t have any event ongoing. Kindly check again"
            />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </MainLayout>
  );
}
