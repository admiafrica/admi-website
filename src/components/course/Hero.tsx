import Image from 'next/image';
import { Badge, Card, Group, Text } from '@mantine/core';
import { Button } from '../ui';

import IconTrophy from '@/assets/icons/trophy.svg';
import IconTimer from '@/assets/icons/timer.svg';
import IconHourGlass from '@/assets/icons/hour-glass.svg';
import IconAward from '@/assets/icons/award-level.svg';

// 1.
export default function CourseHero() {
  return (
    <div className="relative h-[60vh] w-full bg-gray-300 px-4">
      {/* Floating Card */}
      <Card
        className="absolute left-1/2 top-[35rem] z-10 h-fit w-[92vw] -translate-x-1/2 transform justify-center shadow-lg md:h-[7.125rem] md:w-[60rem]"
        bg={'admiShamrok'}
        radius={6}
      >
        <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
          <div className="grow pt-3">
            <div className="flex grow">
              <div className="flex">
                <Image width={24} height={24} src={IconTimer} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100}>
                    Duration
                  </Text>
                  <Text size="16px" fw={600}>
                    1 Term
                  </Text>
                </div>
              </div>
              <div className="flex">
                <Image width={24} height={24} src={IconHourGlass} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100}>
                    Credit Hours
                  </Text>
                  <Text size="16px" fw={600}>
                    Hrs 1200
                  </Text>
                </div>
              </div>
              <div className="flex">
                <Image width={24} height={24} src={IconAward} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100}>
                    Award Level
                  </Text>
                  <Text size="16px" fw={600}>
                    Diploma Certificate
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div className="md:py-auto mx-auto py-4">
            <Button size="xl" backgroundColor="admiRed" label="Get in Touch" />
          </div>
        </div>
      </Card>
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="w-1/2 pt-32">
          <Badge h={36} bg={'black'}>
            <Group m={8}>
              <Image width={24} height={24} src={IconTrophy} alt="email" />
              <div className="font-nexa">
                <Text size="sm" fw={900}>
                  Diploma Courses
                </Text>
              </div>
            </Group>
          </Badge>
          <div className="font-nexa">
            <Text size="60px" fw={900}>
              Animation & Motion Graphics Diploma
            </Text>
          </div>
          <div className="mt-8 font-proxima">
            <Text size="1.2em" fw={600}>
              Unleash your creativity and bring your imagination to life with
              ADMI's Animation and Motion Graphics Diploma.
            </Text>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
