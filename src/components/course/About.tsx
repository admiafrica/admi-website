import { Card } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { EnquiryForm } from '../forms';
import { Title } from '../ui';

type Props = {
  description: any;
};
export default function CourseAbout(props: Props) {
  return (
    <div className="w-full pb-24">
      <div className="mx-auto w-full max-w-screen-2xl px-4 pt-32">
        <div className="flex w-full">
          <div className="flex w-1/2 flex-col">
            <div className="font-nexa text-admiRed">
              <Title label="About this course" />
            </div>
            <div
              className="mt-6 font-nexa text-lg"
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(props.description),
              }}
            ></div>
          </div>
          <div className="flex w-1/2 flex-col">
            <Card padding="lg" radius="md" className="mx-auto mt-24 w-[64%]" bg={'#F5FFFD'}>
              <EnquiryForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
