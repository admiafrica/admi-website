import { Avatar, Group, Text } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';

export default function CourseMentors() {
  return (
    <Group bg={'#F76335'} py={32}>
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="font-nexa text-white">
          <Text size="2em" fw={900}>
            Course Leader & Mentor
          </Text>

          <CollapsibleContent
            icon={<Avatar />}
            title="Benjamin Waithaka"
            subTitle="Course Mentor"
            content={<Text>Content here</Text>}
          />

          <CollapsibleContent
            icon={<Avatar />}
            title="Eddy Mwazige"
            subTitle="Course Mentor"
            content={<Text>Content here</Text>}
          />
        </div>
      </div>
    </Group>
  );
}
