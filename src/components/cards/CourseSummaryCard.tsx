import Image from 'next/image';
import { Box, Card, Text } from '@mantine/core';
import { Button, Paragraph } from '../ui';

import IconAward from '@/assets/icons/Award';
import IconTimer from '@/assets/icons/timer.svg';
import IconHourGlass from '@/assets/icons/hourglass-start.svg';
import IconAvatar from '@/assets/icons/avatar.svg';
import { useRouter } from 'next/router';
import { useIsMobile } from '@/hooks/useIsMobile';

type Props = {
  programType: any;
  creditHours: number;
  awardLevel: string;
  isCampaign?: boolean;
};

export default function CourseSummaryCard(props: Props) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleEnquiry = () => {
    router.push('/enquiry');
  };

  return (
    <Card
      className="h-fit max-w-screen-xl justify-center sm:h-[7.125rem]"
      bg={'admiShamrok'}
      radius={6}
      w={props.isCampaign ? 'fit-content' : '100%'}
    >
      <div className="my-auto flex w-full flex-col p-2 md:flex-row md:p-4">
        <div className="my-auto grow">
          {isMobile ? (
            <Box className="flex flex-col p-0">
              <Box className="flex w-full">
                <div className="flex w-1/2">
                  <Image width={32} src={IconTimer} alt="duration" />
                  <div className="pl-2">
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Duration
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.programType.fields.duration}
                    </Paragraph>
                  </div>
                </div>
                <div className="flex w-1/2">
                  <IconAward />
                  <div>
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Award Level
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.awardLevel}
                    </Paragraph>
                  </div>
                </div>
              </Box>
              <Box className="flex w-full">
                <div className="flex w-1/2">
                  <Image width={40} src={IconHourGlass} alt="term length" />
                  <div>
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Term Length
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.programType.fields.termLength}
                    </Paragraph>
                  </div>
                </div>
                <div className="flex w-1/2">
                  <Image width={40} src={IconAvatar} alt="email" />
                  <div>
                    <Paragraph size={isMobile ? '14px' : '16px'} fontWeight={100} className="pb-2">
                      Delivery Mode
                    </Paragraph>
                    <Paragraph
                      size={isMobile ? '14px' : '16px'}
                      fontFamily="font-nexa"
                      fontWeight={900}
                      className="pb-2"
                    >
                      {props.programType.fields.deliveryMode}
                    </Paragraph>
                  </div>
                </div>
              </Box>
            </Box>
          ) : (
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
                <Image width={40} src={IconHourGlass} alt="term length" />
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
          )}
        </div>
        {!props.isCampaign && (
          <div
            className={
              isMobile ? 'md:py-auto mx-auto w-full cursor-pointer py-4' : 'md:py-auto mx-auto cursor-pointer py-4'
            }
          >
            <Button size="xl" backgroundColor="admiRed" label="Get in Touch" onClick={handleEnquiry} />
          </div>
        )}
      </div>
    </Card>
  );
}
