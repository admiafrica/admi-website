import Image from 'next/image';
import { Badge, Card, Group, NumberFormatter, Text } from '@mantine/core';
import { Button } from '../ui';

import IconAward from '@/assets/icons/Award';
import IconTimer from '@/assets/icons/timer.svg';
import IconHourGlass from '@/assets/icons/hourglass-start.svg';
import IconHourGlassBlack from '@/assets/icons/hourglass.svg';
import IconAvatar from '@/assets/icons/avatar.svg';
import { CourseSummaryCard } from '../cards';

type Props = {
  name: string;
  coverImage: any;
  programType: any;
  creditHours: number;
  awardLevel: string;
  isCampaign?: boolean;
};

export default function CourseHero(props: Props) {
  const words = props.name.trim().split(' ');
  // Remove last word
  const lastWord = words.pop();
  const remainingName = words.join(' ');

  return (
    <div className="relative h-[64vh] w-full px-4 sm:h-[50vh]">
      {/* Background Image */}
      <Image
        src={`https:${props.coverImage.fields.file.url}`}
        placeholder="empty"
        alt="Course Banner"
        fill
        priority
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
      <div className={props.isCampaign ? 'w-full px-1 sm:w-fit' : 'w-full px-1'}>
        <div className="absolute left-1/2 top-[66vh] z-10 w-full max-w-screen-2xl -translate-x-1/2 transform px-4 sm:top-[45vh] 2xl:px-0">
          {props.isCampaign ? (
            <CourseSummaryCard
              programType={props.programType}
              creditHours={props.creditHours}
              awardLevel={props.awardLevel}
              isCampaign={props.isCampaign}
            />
          ) : (
            <CourseSummaryCard
              programType={props.programType}
              creditHours={props.creditHours}
              awardLevel={props.awardLevel}
              isCampaign={props.isCampaign}
            />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div
        className="relative z-10 mx-auto w-full max-w-screen-2xl text-white pt-[15vh]"
      >
        <div className="md:w-1/2">
          <Badge
            h={36}
            mb={8}
            style={{
              backgroundColor: `rgba(255, 255, 255, 0.07)`, // Adjust the color and opacity
              backdropFilter: `blur(4px)`, // Optional: adds a blur effect
            }}
          >
            <Group m={8}>
              <IconAward color="white" width={28} height={28} />
              <div className="font-nexa">
                <Text size="sm" fw={900}>
                  {props.programType.fields.name}
                </Text>
              </div>
            </Group>
          </Badge>

          <div className="font-nexa">
            <Text size="60px" fw={900}>
              {remainingName}
            </Text>
          </div>
          <div className="font-nexa text-[#F1FE38]">
            <Text size="60px" fw={900}>
              {lastWord}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
