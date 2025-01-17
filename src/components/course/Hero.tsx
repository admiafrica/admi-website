import Image from 'next/image';
import { Badge, Card, Group, NumberFormatter, Text } from '@mantine/core';
import { Button } from '../ui';

import IconAward from '@/assets/icons/Award';
import IconTimer from '@/assets/icons/timer.svg';
import IconHourGlass from '@/assets/icons/hourglass-start.svg';
import IconHourGlassBlack from '@/assets/icons/hourglass.svg';
import IconAvatar from '@/assets/icons/avatar.svg';

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
        {props.isCampaign ? (
          <Card
            className="top-[66vh] z-10 h-fit w-full max-w-screen-2xl transform shadow-lg sm:absolute sm:left-[70%] sm:top-[45vh] sm:-translate-x-1/2 md:h-[7.125rem]"
            bg={'admiShamrok'}
            radius={6}
          >
            <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
              <div className="my-auto grow">
                <div className="flex flex-col md:flex-row">
                  <div className="my-2 mr-8 flex sm:my-auto">
                    <Image width={32} src={IconTimer} alt="duration" />
                    <div className="w-full px-4 text-left md:text-left">
                      <Text size="16px" fw={100} pb={8}>
                        Duration
                      </Text>
                      <Text size="16px" fw={900}>
                        {props.programType.fields.duration}
                      </Text>
                    </div>
                  </div>
                  <div className="my-2 mr-8 flex sm:my-auto">
                    <Image width={32} src={IconHourGlassBlack} alt="term length" />
                    <div className="px-4 text-left md:text-left">
                      <Text size="16px" fw={100} pb={8}>
                        Credit Hours
                      </Text>
                      <Text size="16px" fw={900}>
                        <NumberFormatter value={props.creditHours} thousandSeparator />
                      </Text>
                    </div>
                  </div>
                  <div className="my-2 flex sm:my-auto">
                    <IconAward />
                    <div className="px-4 text-left md:text-left">
                      <Text size="16px" fw={100} pb={8}>
                        Award Level
                      </Text>
                      <Text size="16px" fw={900}>
                        {props.awardLevel}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              {!props.isCampaign && (
                <div className="md:py-auto mx-auto py-4">
                  <Button size="xl" backgroundColor="admiRed" label="Get in Touch" />
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card
            className="absolute left-1/2 top-[66vh] z-10 h-fit w-full max-w-screen-2xl -translate-x-1/2 transform justify-center shadow-lg sm:top-[45vh] md:h-[7.125rem]"
            bg={'admiShamrok'}
            radius={6}
          >
            <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
              <div className="my-auto grow">
                <div className="flex flex-col md:flex-row">
                  <div className="mr-8 flex">
                    <Image width={32} src={IconTimer} alt="duration" />
                    <div className="px-4 text-left">
                      <Text size="16px" fw={100} pb={8}>
                        Duration
                      </Text>
                      <Text size="16px" fw={900}>
                        {props.programType.fields.duration}
                      </Text>
                    </div>
                  </div>
                  <div className="mr-8 flex">
                    <Image width={40} src={IconHourGlass} alt="term length"/>
                    <div className="px-4 text-left">
                      <Text size="16px" fw={100} pb={8}>
                        Term Length
                      </Text>
                      <Text size="16px" fw={900}>
                        {props.programType.fields.termLength}
                      </Text>
                    </div>
                  </div>
                  <div className="mr-8 flex">
                    <Image width={40} src={IconAvatar} alt="email" />
                    <div className="px-4 text-left">
                      <Text size="16px" fw={100} pb={8}>
                        Delivery Mode
                      </Text>
                      <Text size="16px" fw={900}>
                        {props.programType.fields.deliveryMode}
                      </Text>
                    </div>
                  </div>
                  <div className="flex">
                    <IconAward />
                    <div className="px-4 text-left">
                      <Text size="16px" fw={100} pb={8}>
                        Award Level
                      </Text>
                      <Text size="16px" fw={900}>
                        {props.awardLevel}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              {!props.isCampaign && (
                <div className="md:py-auto mx-auto py-4">
                  <Button size="xl" backgroundColor="admiRed" label="Get in Touch" />
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`relative z-10 mx-auto w-full max-w-screen-2xl text-white ${props.isCampaign ? '' : 'mt-[-8em] sm:mt-0'}`}
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
              <IconAward color="white" width={24} height={24} />
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
