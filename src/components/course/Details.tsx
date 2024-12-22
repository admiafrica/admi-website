import { Card, Image, Text, Badge, Group } from '@mantine/core';
import { IconCheck, IconExclamationCircle, IconKey } from '@tabler/icons-react';
import { CollapsibleContent } from '../shared/v3';
import { Button } from '../ui';
// import { Text } from '@mantine/core';

// 3
export default function CourseDetails() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4">
      <div className="text-center font-nexa">
        <Text size="1.78em" fw={900}>
          Why you should take this course
        </Text>
      </div>
      <div className="flex flex-row">
        <Card shadow="md" className="w-1/4">
          <Group>
            <IconKey />
            <div className="font-nexa">
              <Text fw={900}>Title here</Text>
            </div>
          </Group>
          <div>
            <Text>Description here</Text>
          </div>
        </Card>
        <Card shadow="md" className="w-1/4">
          <Group>
            <IconKey />
            <Text>Title here</Text>
          </Group>
          <Text>Description here</Text>
        </Card>
        <Card shadow="md" className="w-1/4">
          <Group>
            <IconKey />
            <Text>Title here</Text>
          </Group>
          <Text>Description here</Text>
        </Card>
        <Card shadow="md" className="w-1/4">
          <Group>
            <IconKey />
            <Text>Title here</Text>
          </Group>
          <Text>Description here</Text>
        </Card>
      </div>

      <CollapsibleContent
        title="Course Overview"
        content={<Text>Content here</Text>}
      />
      <CollapsibleContent
        title="Learning Outcomes"
        content={<Text>Content here</Text>}
      />
      <CollapsibleContent
        title="Career Options"
        content={<Text>Content here</Text>}
      />

      <Card
        className="mx-auto h-fit w-[92vw] justify-center shadow-lg md:h-[7.125rem] md:w-[60rem]"
        bg={'black'}
        radius={6}
      >
        <div className="my-auto flex w-full flex-col p-2 text-white md:flex-row md:p-4">
          <div className="flex pt-3">
            <div className="mb-4 text-center font-nexa md:text-left">
              <Text size="25px" fw={900}>
                Earn your course
              </Text>
              <Text size="25px">certificate today</Text>
            </div>
            <div className="flex grow">
              <div className="px-4 text-center md:text-left">
                <Text size="16px" fw={100}>
                  Duration
                </Text>
                <Text size="16px" fw={600}>
                  Duration
                </Text>
              </div>
              <div className="px-4 text-center md:text-left">
                <Text size="16px" fw={100}>
                  Credit Hours
                </Text>
                <Text size="16px" fw={600}>
                  Credit Hours
                </Text>
              </div>
              <div className="px-4 text-center md:text-left">
                <Text size="16px" fw={100}>
                  Student Fees
                </Text>
                <Text size="16px" fw={600}>
                  Student Fees
                </Text>
              </div>
            </div>
          </div>
          <div className="md:py-auto mx-auto py-4 md:w-[30%]">
            <Button size="xl" backgroundColor="admiRed" label="Enquire Today" />
          </div>
        </div>
      </Card>
    </div>
  );
}
