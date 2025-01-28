import Image from 'next/image';
import { Card, Text } from '@mantine/core';
import { Button } from '../ui';

import IconAward from '@/assets/icons/Award';
import IconTimer from '@/assets/icons/timer.svg';
import IconHourGlass from '@/assets/icons/hourglass-start.svg';
import IconAvatar from '@/assets/icons/avatar.svg';
import { useRouter } from 'next/router';

type Props = {
  programType: any;
  creditHours: number;
  awardLevel: string;
  isCampaign?: boolean;
};

export default function CourseSummaryCard(props: Props) {
  const router = useRouter();

  const handleEnquiry = () => {
    router.push('/v3/enquiry');
  };

  return (
    <Card
      className="h-fit max-w-screen-2xl justify-center sm:h-[7.125rem]"
      bg={'admiShamrok'}
      radius={6}
      w={props.isCampaign ? 'fit-content' : '100%'}
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
        </div>
        {!props.isCampaign && (
          <div className="md:py-auto mx-auto py-4">
            <Button size="xl" backgroundColor="admiRed" label="Get in Touch" onClick={handleEnquiry} />
          </div>
        )}
      </div>
    </Card>
  );
}
