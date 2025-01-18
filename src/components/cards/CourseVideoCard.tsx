import { Card, Group, Text, Image } from '@mantine/core';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';

type Props = {
  intakes: string;
};

export default function CourseVideoCard(props: Props) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="max-w-[430px] sm:w-full">
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={200}
          alt="Norway"
        />
      </Card.Section>

      <Card.Section className="px-6">
        <Group mt="md" mb="xs">
          <IconCheck size={24} className="text-admiRed" />
          <div className="font-proxima">
            <Text>Norway Fjord Adventures</Text>
          </div>
        </Group>
      </Card.Section>

      <Card.Section className="bg-[#F76335] px-6 py-4 text-white">
        <div className="flex">
          <IconExclamationCircle size={24} />
          <div className="font-proxima">
            <Text pl={16}>{props.intakes}</Text>
          </div>
        </div>
      </Card.Section>
    </Card>
  );
}
