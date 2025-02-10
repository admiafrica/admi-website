import { Card } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { EnquiryForm } from '../forms';
import { Title } from '../ui';
import { CourseVideoCard } from '../cards';

type Props = {
  description: any;
  intakes: string;
  courseVideo: any;
  educationalLevel: string;
  isCampaign?: boolean;
};
export default function CourseAbout( props: Props) {
  return (
    <div className="w-full pb-16 pt-48 sm:pt-0">
      <div className="mx-auto w-full max-w-screen-xl px-4 pt-32 2xl:px-0">
        <div className="flex w-full flex-col sm:flex-row">
          {props.isCampaign && (
            <>
              <div className="flex flex-col sm:w-1/2">
                <div className="font-nexa text-admiRed">
                  <Title label="About this course" />
                </div>
                <div
                  className="mt-1 font-nexa text-lg"
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(props.description),
                  }}
                ></div>
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
              <div className="flex flex-col sm:w-1/2">
                <div className="font-nexa text-admiRed">
                  <Title label="About this course" />
                </div>
                <div
                  className="mt-1 font-nexa text-lg sm:pr-4"
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(props.description),
                  }}
                ></div>
              </div>
              <div className="z-10 my-0 flex h-fit justify-end pt-8 sm:w-1/2">
                <CourseVideoCard intakes={props.intakes} courseVideo={props.courseVideo} educationalLevel={props.educationalLevel}/>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
