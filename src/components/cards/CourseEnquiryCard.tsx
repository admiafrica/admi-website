import Image from 'next/image';
import { Card, Text, NumberFormatter, Divider } from '@mantine/core';

import { Button } from '../ui';

import IconHourglass from '@/assets/icons/hour-glass-white.svg';
import IconCurrency from '@/assets/icons/group-6.svg';

type Props = {
  programType: any;
  creditHours: number;
  tuitionFees: string;
};

export default function CourseEnquiryCard(props: Props) {
  return (
    <Card
      className="mx-auto mt-16 h-fit w-[92vw] justify-center shadow-lg md:h-[7.125rem] md:w-full"
      bg={'black'}
      radius={6}
    >
      <div className="my-auto flex w-full flex-col p-2 text-white md:flex-row md:p-4">
        <div className="my-auto flex w-full flex-col items-center pt-3 md:flex-row">
          <div className="mb-4 mr-8 w-fit text-center font-nexa md:text-left">
            <Text size="25px" fw={900} c={'admiShamrok'} pb={8}>
              Earn your course
            </Text>
            <Text size="25px" fw={900}>
              {props.programType.fields.name.toLowerCase()} today
            </Text>
          </div>
          <div className="my-auto flex grow flex-col md:flex-row">
            <Divider orientation="vertical" size={1} opacity="30%" mx={8} />
            <div className="flex sm:w-1/3 sm:justify-center">
              <Image width={32} height={32} src={IconHourglass} alt="email" />
              <div className="px-4 text-left md:text-left">
                <Text size="16px" fw={100} pb={8}>
                  Credit Hours
                </Text>
                <Text size="16px" fw={900}>
                  <NumberFormatter prefix="Hrs " value={props.creditHours} thousandSeparator />
                </Text>
              </div>
            </div>
            <Divider orientation="vertical" size={1} opacity="30%" mx={8} />
            <div className="flex sm:w-1/3 sm:justify-center">
              <Image width={32} height={32} src={IconCurrency} alt="email" />
              <div className="px-4 text-left md:text-left">
                <Text size="16px" fw={100} pb={8}>
                  Tuition Fees
                </Text>
                <Text size="16px" fw={900}>
                  {props.tuitionFees}
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
  );
}
