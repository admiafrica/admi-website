// 2
import { Card, Image, Text, Group } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';

type Props = {
  description: any;
};
export default function CourseAbout(props: Props) {
  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pt-32">
        <div className="flex w-full">
          <div className="flex w-1/2 flex-col">
            <div className="font-nexa text-admiRed">
              <Text size="2em" fw={600}>
                About this course
              </Text>
            </div>
            <div
              className="mt-6 font-proxima text-lg"
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(props.description),
              }}
            ></div>
          </div>
          <div className="flex w-1/2 flex-col">
            <Card shadow="sm" padding="lg" radius="md" withBorder className="mx-auto mt-24 w-[64%]">
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group mt="md" mb="xs">
                <IconCheck size={20} className="text-admiRed" />
                <Text fw={400} w={'80%'}>
                  High School: KCSE C-
                </Text>
              </Group>

              <Group mt="md" mb="xs">
                <IconCheck size={20} className="text-admiRed" />
                <Text fw={400} w={'80%'}>
                  Basic computer proficiancy is required
                </Text>
              </Group>

              <Group mt="md" mb="xs">
                <IconCheck size={20} className="text-admiRed" />
                <Text fw={400} w={'80%'}>
                  Full time - 4 semesters + 1 semster internship intakes
                </Text>
              </Group>
              <Card.Section>
                <Group px={20} py={16} bg={'admiOrangeLight'}>
                  <IconExclamationCircle size={20} className="text-white" />
                  <Text fw={400} c={'white'}>
                    January, May, September
                  </Text>
                </Group>
              </Card.Section>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
