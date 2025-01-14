import Image from 'next/image';
import { Card, Text, NumberFormatter, Divider } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { getAssetDetails } from '@/utils';
import { CollapsibleContent } from '../shared/v3';
import { Button, Title } from '../ui';

import IconCheckbox from '@/assets/icons/checkbox.svg';
import IconBook from '@/assets/icons/book.svg';
import IconHatBlack from '@/assets/icons/hat-black.svg';
import IconHourglass from '@/assets/icons/hour-glass-white.svg';
import IconCurrency from '@/assets/icons/group-6.svg';
import IconBackgroundImageA from '@/assets/icons/ellipse-yellow-cut.svg';
import IconBackgroundImageB from '@/assets/icons/ellipse-orange.svg';

type Props = {
  programType: any;
  creditHours: number;
  tuitionFees: number;
  benefits: any[];
  assets: any[];
  careerOptions: any;
  learningOutcomes: any;
  courseDescription: any;
};

export default function CourseDetails(props: Props) {
  return (
    <div className="relative w-full bg-[#F5FFFD] pb-32">
      {/* BACKGROUND IMAGES */}
      <div className="absolute left-1/2 top-[1rem] z-10 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full justify-end">
          <Image src={IconBackgroundImageA} alt={'background image'} />
        </div>
      </div>

      <div className="absolute left-1/2 top-[20rem] z-10 h-fit w-full -translate-x-1/2 transform">
        <div className="flex w-full">
          <Image src={IconBackgroundImageB} alt={'background image'} />
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-screen-2xl px-4">
        <div className="z-20 mx-auto mb-8 w-fit pt-16 text-center font-nexa">
          <Title label="Why you should take this course" color="black" />
        </div>
        <div className="relative z-20 flex flex-col justify-between sm:flex-row">
          {props.benefits.map((benefit) => (
            <Card shadow="md" className="mb-8 sm:mb-auto sm:w-1/4" key={benefit.sys.id}>
              <div className="flex px-4 pt-4">
                <Image
                  src={`https:${getAssetDetails(props.assets, benefit.fields.icon.sys.id)?.fields.file.url}`}
                  alt={benefit.fields.icon.sys.id}
                  width={32}
                  height={32}
                />
                <div className="min-h-[3em] pl-4 font-nexa">
                  <Text size="1.2em" fw={900}>
                    {benefit.fields.title}
                  </Text>
                </div>
              </div>
              <div
                className="px-4 py-2 font-proxima text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(benefit.fields.text),
                }}
              ></div>
            </Card>
          ))}
        </div>

        <div className="relative z-20">
          <CollapsibleContent
            title="Course Description"
            content={
              <div
                className="z-20 font-proxima text-lg"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(props.courseDescription),
                }}
              ></div>
            }
            icon={<Image width={24} height={24} src={IconCheckbox} alt="email" />}
          />
          <CollapsibleContent
            title="Learning Outcomes"
            content={
              <div
                className="z-20 font-proxima text-lg"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(props.learningOutcomes),
                }}
              ></div>
            }
            icon={<Image width={24} height={24} src={IconBook} alt="email" />}
          />
          <CollapsibleContent
            title="Career Options"
            content={
              <div
                className="z-20 font-proxima text-lg"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(props.careerOptions),
                }}
              ></div>
            }
            icon={<Image width={24} height={24} src={IconHatBlack} alt="email" />}
          />

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
        </div>
      </div>
    </div>
  );
}
