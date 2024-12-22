import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { IconCheck, IconExclamationCircle, IconKey } from '@tabler/icons-react';
import { CollapsibleContent } from '../shared/v3';
// import { Text } from '@mantine/core';

// 3
export default function CourseFAQs() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4">
      <div className="font-nexa">
        <Text size="2em" fw={900}>
          Frequently Asked Questions
        </Text>
      </div>

      <CollapsibleContent
        title="Is Prior Animation Experience needed?"
        content={<Text>Content here</Text>}
      />

      <CollapsibleContent
        title="Application Process - International Students"
        content={<Text>Content here</Text>}
      />
    </div>
  );
}
