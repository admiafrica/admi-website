import { Text } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';

// 3
export default function CourseFAQs() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="font-nexa">
        <Text size="2em" fw={900}>
          Frequently Asked Questions
        </Text>
      </div>

      <CollapsibleContent
        title="Is prior animation experience needed?"
        content={<Text>Content here</Text>}
      />

      <CollapsibleContent
        title="What software is used on the course?"
        content={<Text>Content here</Text>}
      />

      <CollapsibleContent
        title="How are the assesments conducted?"
        content={<Text>Content here</Text>}
      />

      <CollapsibleContent
        title="Are there opportuities for industry exposure?"
        content={<Text>Content here</Text>}
      />
    </div>
  );
}
