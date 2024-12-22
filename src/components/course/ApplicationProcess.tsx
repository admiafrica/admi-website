import { Text } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';

// 3
export default function CourseApplicationProcess() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="font-nexa">
        <Text size="2em" fw={900}>
          Application Process
        </Text>
      </div>
      <div className="font-proxima">
        <Text size="1.2em" fw={500}>
          The application process is straightforward and designed to guide you
          step-by-step, from submitting your documents to securing your spot in
          our creative programs.
        </Text>
      </div>

      <CollapsibleContent
        title="Application Process EA"
        content={<Text>Content here</Text>}
      />

      <CollapsibleContent
        title="Application Process - International Students"
        content={<Text>Content here</Text>}
      />
    </div>
  );
}
