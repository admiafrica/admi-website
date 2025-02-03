import { Text } from '@mantine/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { CollapsibleContent } from '../shared/v3';

type Props = {
  processes: any[];
};

export default function CourseApplicationProcess({ processes }: Props) {
  if (processes.length < 1) return null;

  return (
    <div className="relative z-20 w-full pb-16">
      <div className="mx-auto w-full max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-16 font-nexa">
          <Text size="2em" fw={900}>
            Application Process
          </Text>
        </div>
        <div className="font-proxima">
          <Text size="1.2em" fw={500}>
            The application process is straightforward and designed to guide you step-by-step, from submitting your
            documents to securing your spot in our creative programs.
          </Text>
        </div>
        {processes.map((process, index) => (
          <CollapsibleContent
            key={`application-process-${index}`}
            title={process.fields.title}
            content={
              <div
                className="z-20 font-proxima text-lg"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(process.fields.text),
                }}
              ></div>
            }
          />
        ))}
      </div>
    </div>
  );
}
