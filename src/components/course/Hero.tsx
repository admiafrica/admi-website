import Image from 'next/image';
import { Badge, Box, Group } from '@mantine/core';
import { CourseSummaryCard } from '../cards';

import IconAward from '@/assets/icons/Award';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Paragraph, Title } from '../ui';
import { EnquiryForm } from '../forms';

type Props = {
  name: string;
  coverImage: any;
  programType: any;
  creditHours: number;
  awardLevel: string;
  isCampaign?: boolean;
};

export default function CourseHero(props: Props) {
  const isMobile = useIsMobile();
  const words = props.name.trim().split(' ');
  // Remove last word
  const lastWord = words.pop();
  const remainingName = words.join(' ');

  return (
    <div className="relative h-[56vh] w-full px-4 sm:h-[50vh]">
      {/* Background Image */}
      <Image
        src={`https:${props.coverImage.fields.file.url}`}
        placeholder="empty"
        alt="Course Banner"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0"
        style={{ objectFit: 'cover' }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="z-5 absolute inset-0"
        style={{
          background: `radial-gradient(38.35% 91.08% at 66.59% 45.79%, rgba(0, 0, 0, 0) 14.71%, #000000 100%)`,
        }}
      ></div>

      {/* Floating Card */}
      <div className={props.isCampaign ? 'w-full px-1 sm:w-full' : 'w-full px-1'}>
        <div
          className={
            props.isCampaign
              ? 'absolute left-1/2 top-[400px] z-20 flex w-full max-w-screen-xl -translate-x-1/2 transform flex-col px-4 sm:top-[45vh] sm:flex-row xl:px-0'
              : 'absolute left-1/2 top-[400px] z-20 flex w-full max-w-screen-xl -translate-x-1/2 transform px-4 sm:top-[45vh] xl:px-0'
          }
        >
          <CourseSummaryCard
            programType={props.programType}
            creditHours={props.creditHours}
            awardLevel={props.awardLevel}
            isCampaign={props.isCampaign}
          />
          {props.isCampaign && (
            <Box className="relative w-full max-w-[480px] sm:top-[-120px] sm:ml-2">
              <EnquiryForm />
            </Box>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl pt-[15vh] text-white">
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
              <Paragraph size="sm" fontFamily="font-nexa" fontWeight={900}>
                {props.programType.fields.name}
              </Paragraph>
            </Group>
          </Badge>

          <Title size={isMobile ? '32px' : '60px'} label={remainingName} color="white" />

          <Title size={isMobile ? '32px' : '60px'} label={lastWord || 'Certificate'} color="#F1FE38" />
        </div>
      </div>
    </div>
  );
}
