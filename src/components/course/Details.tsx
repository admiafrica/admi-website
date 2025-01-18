import Image from 'next/image';
import { Card, Text } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { getAssetDetails } from '@/utils';
import { CollapsibleContent } from '../shared/v3';
import { Title } from '../ui';
import { CourseEnquiryCard } from '../cards';

import IconCheckbox from '@/assets/icons/checkbox.svg';
import IconBook from '@/assets/icons/book.svg';
import IconHatBlack from '@/assets/icons/hat-black.svg';
import IconBackgroundImageA from '@/assets/icons/ellipse-yellow-cut.svg';
import IconBackgroundImageB from '@/assets/icons/ellipse-orange.svg';

type Props = {
  programType: any;
  creditHours: number;
  tuitionFees: string;
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

          <CourseEnquiryCard
            programType={props.programType}
            creditHours={props.creditHours}
            tuitionFees={props.tuitionFees}
          />
        </div>
      </div>
    </div>
  );
}
