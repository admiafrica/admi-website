import { Avatar, Group, Text } from '@mantine/core';
import { CollapsibleContent } from '../shared/v3';

type Props = {
  mentors: any[];
};

export default function CourseMentors(props: Props) {
  const showMentors = props.mentors.length > 1;

  if (!showMentors) return;

  return (
    <Group bg={'#F76335'} py={32}>
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="font-nexa text-white mt-4">
          <Text size="2em" fw={900}>
            Course Leader & Mentor
          </Text>

          {props.mentors &&
            props.mentors.map((mentor) => (
              <CollapsibleContent
                icon={<Avatar />}
                title={mentor.name}
                subTitle={mentor.title}
                content={<Text size="1.1em">{mentor.description}</Text>}
              />
            ))}
        </div>
      </div>
    </Group>
  );
}
