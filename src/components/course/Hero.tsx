import Image from 'next/image';
import { Badge, Card, Group, NumberFormatter, Text } from '@mantine/core';
import { Button } from '../ui';

import IconTrophy from '@/assets/icons/trophy.svg';
import IconTimer from '@/assets/icons/timer.svg';
import IconHourGlass from '@/assets/icons/hour-glass.svg';
import IconAward from '@/assets/icons/award-level.svg';

type Props = {
  name: string;
  banner: any;
  duration: string;
  creditHours: number;
};

export default function CourseHero(props: Props) {
  // Extract the last word and the remaining name
  const words = props.name.trim().split(' ');
  const lastWord = words.pop(); // Removes and returns the last word
  const remainingName = words.join(' ');

  return (
    <div className="relative w-full px-4 md:h-[60vh]">
      {/* Background Image */}
      <Image
        src={`https:${props.banner.fields.file.url}`}
        alt="Course Banner"
        fill
        className="absolute inset-0 z-0"
        style={{ objectFit: 'cover' }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="z-5 absolute inset-0"
        style={{
          background: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 80%)`,
        }}
      ></div>

      {/* Floating Card */}
      <Card
        className="absolute left-1/2 top-[35rem] z-10 h-fit w-[92vw] -translate-x-1/2 transform justify-center shadow-lg md:h-[7.125rem] md:w-[85vw]"
        bg={'admiShamrok'}
        radius={6}
      >
        <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
          <div className="my-auto grow">
            <div className="flex">
              <div className="flex sm:w-1/4">
                <Image width={32} height={32} src={IconTimer} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100} pb={8}>
                    Duration
                  </Text>
                  <Text size="16px" fw={900}>
                    {props.duration}
                  </Text>
                </div>
              </div>
              <div className="flex sm:w-1/4">
                <Image width={32} height={32} src={IconHourGlass} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100} pb={8}>
                    Credit Hours
                  </Text>
                  <Text size="16px" fw={900}>
                    <NumberFormatter prefix="Hrs " value={props.creditHours} thousandSeparator />
                  </Text>
                </div>
              </div>
              <div className="flex">
                <Image width={32} height={32} src={IconAward} alt="email" />
                <div className="px-4 text-center md:text-left">
                  <Text size="16px" fw={100} pb={8}>
                    Award Level
                  </Text>
                  <Text size="16px" fw={900}>
                    {lastWord}
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

      {/* Content Section */}
      <div className="relative z-10 mx-auto w-full max-w-screen-2xl text-white">
        <div className="w-1/2 md:pt-32">
          <Badge
            h={36}
            mb={8}
            style={{
              backgroundColor: `rgba(255, 255, 255, 0.07)`, // Adjust the color and opacity
              backdropFilter: `blur(4px)`, // Optional: adds a blur effect
            }}
          >
            <Group m={8}>
              <Image width={24} height={24} src={IconTrophy} alt="email" />
              <div className="font-nexa">
                <Text size="sm" fw={900}>
                  {lastWord} Courses
                </Text>
              </div>
            </Group>
          </Badge>

          <div className="font-nexa">
            <Text size="60px" fw={900}>
              {remainingName} <span className="text-[#F1FE38]">{lastWord}</span>
            </Text>
          </div>
          <div className="mt-8 font-proxima">
            <Text size="1.2em" fw={600}>
              Unleash your creativity and bring your imagination to life with ADMI&apos;s Animation and Motion Graphics
              Diploma.
            </Text>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
