import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { IconCheck, IconExclamationCircle, IconKey } from '@tabler/icons-react';
import { CollapsibleContent } from '../shared/v3';
// import { Text } from '@mantine/core';

// 3
export default function CourseApplicationProcess() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4">
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
