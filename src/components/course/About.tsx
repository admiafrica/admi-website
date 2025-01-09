import { Card, Group, Text, Image } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { EnquiryForm } from '../forms';
import { Title } from '../ui';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';

type Props = {
  description: any;
  isCampaign?: boolean;
  intakes: string;
};
export default function CourseAbout({ description, isCampaign = false, intakes }: Props) {
  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pt-32">
        <div className="flex w-full">
          <div className="flex w-1/2 flex-col">
            <div className="font-nexa text-admiRed">
              <Title label="About this course" />
            </div>
            <div
              className="mt-1 font-nexa text-lg"
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(description),
              }}
            ></div>
          </div>
          {isCampaign && (
            <div className="absolute left-[80%] top-[24rem] z-10 h-fit w-full -translate-x-1/2 transform sm:w-[48em]">
              <Card padding="lg" radius="md" className="mx-auto mt-24 w-full sm:w-[64%]" bg={'#F5FFFD'}>
                <EnquiryForm />
              </Card>
            </div>
          )}
          {!isCampaign && (
            <div className="z-10 my-0 flex h-fit w-[32em] w-full pt-20">
              <div className="grow"></div>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={200}
                    alt="Norway"
                  />
                </Card.Section>

                <Card.Section className="px-6">
                  <Group mt="md" mb="xs">
                    <IconCheck size={24} className="text-admiRed" />
                    <div className="font-proxima">
                      <Text>Norway Fjord Adventures</Text>
                    </div>
                  </Group>
                </Card.Section>

                <Card.Section className="bg-[#F76335] px-6 py-4 text-white">
                  <div className="flex">
                    <IconExclamationCircle size={24} />
                    <div className="font-proxima">
                      <Text pl={16}>{intakes}</Text>
                    </div>
                  </div>
                </Card.Section>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
