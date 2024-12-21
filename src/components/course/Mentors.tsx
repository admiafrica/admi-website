// 4
import { Text } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';

export default function CourseMentors() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <div className="font-nexa">
        <Text size="2em" fw={900}>
          Course Leader & Mentor
        </Text>

        <CollapsibleContent
          title="Benjamin Waithaka"
          subTitle="Animation and Motion Graphics"
          content={<Text>Content here</Text>}
        />

        <CollapsibleContent
          title="Eddy Mwazige"
          subTitle="Co-Founder and Lead Animator ant Dung Beetle Studios"
          content={<Text>Content here</Text>}
        />
      </div>
    </div>
  );
}
