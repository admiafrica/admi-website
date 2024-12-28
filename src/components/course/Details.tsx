// 3
import Image from 'next/image';
import { Card, Text, NumberFormatter, Divider } from '@mantine/core';

import { CollapsibleContent } from '../shared/v3';
import { Button } from '../ui';
import { getAssetDetails } from '@/utils';

import IconCheckbox from '@/assets/icons/checkbox.svg';
import IconBook from '@/assets/icons/book.svg';
import IconHatBlack from '@/assets/icons/hat-black.svg';
import IconHourglass from '@/assets/icons/hour-glass-white.svg';
import IconTimer from '@/assets/icons/timer-white.svg';
import IconCurrency from '@/assets/icons/group-6.svg';

type Props = {
  duration: string;
  creditHours: number;
  tuitionFee: number;
  usp: any[];
  assets: any[];
};

export default function CourseDetails(props: Props) {
  return (
    <div className="w-full bg-[#F5FFFD] pb-32">
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="mb-8 pt-24 text-center font-nexa">
          <Text size="1.78em" fw={900}>
            Why you should take this course
          </Text>
        </div>
        <div className="flex flex-row">
          {props.usp.map((item) => (
            <Card shadow="md" className="mx-auto w-1/4" key={item.sys.id}>
              <div className="flex">
                <Image
                  src={`https:${getAssetDetails(props.assets, item.fields.courseUspImage.sys.id)?.fields.file.url}`}
                  alt={item.fields.courseUspImage.sys.id}
                  width={32}
                  height={32}
                />
                <div className="pl-4 font-nexa">
                  <Text size="1.2em" fw={900}>{item.fields.courseUspText}</Text>
                </div>
              </div>
              <div className="font-proxima pt-4">
                <Text size="1.1em">{item.fields.courseUspDescription}</Text>
              </div>
            </Card>
          ))}
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
          className="mx-auto h-fit w-[92vw] justify-center shadow-lg md:h-[7.125rem] md:w-full mt-16"
          bg={'black'}
          radius={6}
        >
          <div className="my-auto flex w-full flex-col p-2 text-white md:flex-row md:p-4">
            <div className="my-auto flex w-full pt-3">
              <div className="mb-4 mr-8 text-center font-nexa md:text-left">
                <Text size="25px" fw={900} c={'admiShamrok'} pb={8}>
                  Earn your course
                </Text>
                <Text size="25px" fw={900}>
                  certificate today
                </Text>
              </div>
              <div className="my-auto flex grow">
                <div className="flex">
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
                <Divider orientation="vertical" size={1} opacity="30%" mx={8} />
                <div className="flex">
                  <Image width={32} height={32} src={IconHourglass} alt="email" />
                  <div className="px-4 text-center md:text-left">
                    <Text size="16px" fw={100} pb={8}>
                      Credit Hours
                    </Text>
                    <Text size="16px" fw={900}>
                      <NumberFormatter prefix="Hrs " value={props.creditHours} thousandSeparator />
                    </Text>
                  </div>
                </div>
                <Divider orientation="vertical" size={1} opacity="30%" mx={8} />
                <div className="flex">
                  <Image width={32} height={32} src={IconCurrency} alt="email" />
                  <div className="px-4 text-center md:text-left">
                    <Text size="16px" fw={100} pb={8}>
                      Tuition Fees
                    </Text>
                    <Text size="16px" fw={900}>
                      <NumberFormatter prefix="KES " value={props.tuitionFee} thousandSeparator />
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
    </div>
  );
}
