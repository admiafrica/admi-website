import { Card } from '@mantine/core';
import { EnquiryForm } from '../forms';
import { ParagraphContentful, Title } from '../ui';
import { CourseVideoCard } from '../cards';
import { useIsMobile } from '@/hooks/useIsMobile';

type Props = {
  description: any;
  intakes: string;
  courseVideo: any;
  educationalLevel: string;
  isCampaign?: boolean;
};
export default function CourseAbout(props: Props) {
  const isMobile = useIsMobile();

  return (
    <div className={isMobile ? 'w-full pb-16 pt-12 sm:pt-0' : 'w-full pb-16 pt-48 sm:pt-0'}>
      <div className="mx-auto w-full max-w-screen-xl px-4 2xl:px-0">
        <div className="flex w-full flex-col sm:flex-row">
          {props.isCampaign && (
            <>
              <div className="mt-24 flex flex-col sm:w-1/2">
                <Title label="About this course" size={isMobile ? '24px' : '36px'} color="admiRed" />

                <ParagraphContentful className="mt-1 text-lg" fontFamily="font-nexa">
                  {props.description}
                </ParagraphContentful>
              </div>
              <div className="top-[36vh] z-10 h-fit w-full transform sm:absolute sm:left-[80%] sm:w-[48em] sm:-translate-x-1/2">
                <Card padding="lg" radius="md" className="mx-auto mt-8 w-full sm:w-[64%]" bg={'#F5FFFD'}>
                  <EnquiryForm />
                </Card>
              </div>
            </>
          )}
          {!props.isCampaign && (
            <>
              <div className="relative flex flex-col pt-32 sm:w-1/2">
                <div className="font-nexa text-admiRed">
                  <Title label="About this course" />
                </div>
                <ParagraphContentful className="mt-1 text-lg sm:pr-4" fontFamily="font-nexa">
                  {props.description}
                </ParagraphContentful>
              </div>
              <div className="z-10 my-0 flex h-fit justify-end sm:w-1/2 sm:pt-36">
                <CourseVideoCard
                  intakes={props.intakes}
                  courseVideo={props.courseVideo}
                  educationalLevel={props.educationalLevel}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
