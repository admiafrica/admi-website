// 3
import Image from 'next/image';
import { Card, Text, Group } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';
import { Button } from '../ui';

import IconCheckbox from '@/assets/icons/checkbox.svg';
import IconBook from '@/assets/icons/book.svg';
import IconHatBlack from '@/assets/icons/hat-black.svg';
import IconHourglass from '@/assets/icons/hour-glass-white.svg';
import IconTimer from '@/assets/icons/timer-white.svg';
import IconCurrency from '@/assets/icons/group-6.svg';

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
            {/* <IconKey /> */}
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
            {/* <IconKey /> */}
            <Text>Title here</Text>
          </Group>
          <Text>Description here</Text>
        </Card>
        <Card shadow="md" className="w-1/4">
          <Group>
            {/* <IconKey /> */}
            <Text>Title here</Text>
          </Group>
          <Text>Description here</Text>
        </Card>
        <Card shadow="md" className="w-1/4">
          <Group>
            {/* <IconKey /> */}
            <Text>Title here</Text>
          </Group>
          <Text>Description here</Text>
        </Card>
      </div>

      <CollapsibleContent
        title="Course Overview"
        content={<Text>Content here</Text>}
        icon={<Image width={24} height={24} src={IconCheckbox} alt="email" />}
      />
      <CollapsibleContent
        title="Learning Outcomes"
        content={<Text>Content here</Text>}
        icon={<Image width={24} height={24} src={IconBook} alt="email" />}
      />
      <CollapsibleContent
        title="Career Options"
        content={<Text>Content here</Text>}
        icon={<Image width={24} height={24} src={IconHatBlack} alt="email" />}
      />

      <Card
        className="mx-auto mb-32 h-fit w-[92vw] justify-center shadow-lg md:h-[7.125rem] md:w-full"
        bg={'black'}
        radius={6}
      >
        <div className="my-auto flex w-full flex-col p-2 text-white md:flex-row md:p-4">
          <div className="w-full flex pt-3 my-auto">
            <div className="mb-4 text-center font-nexa md:text-left mr-8">
              <Text size="25px" fw={900} c={'admiShamrok'} pb={8}>
                Earn your course
              </Text>
              <Text size="25px" fw={900}>
                certificate today
              </Text>
            </div>
            <div className="flex grow my-auto">
              <div className="flex w-1/5">
                <Image width={32} height={32} src={IconTimer} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100} pb={8}>
                    Duration
                  </Text>
                  <Text size="16px" fw={900}>
                    1 Term
                  </Text>
                </div>
              </div>
              <div className="flex w-1/5">
                <Image width={32} height={32} src={IconHourglass} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100} pb={8}>
                    Credit Hours
                  </Text>
                  <Text size="16px" fw={900}>
                    Hrs 1200
                  </Text>
                </div>
              </div>
              <div className="flex w-1/5">
                <Image width={32} height={32} src={IconCurrency} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100} pb={8}>
                    Tuition Fees
                  </Text>
                  <Text size="16px" fw={900}>
                    KES 145,000
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="md:py-auto mx-auto py-4">
            <Button size="xl" backgroundColor="admiRed" label="Enquire Today" />
          </div>
        </div>
      </Card>
    </div>
  );
}
