import React from 'react';
import { Button, Group, Text, Collapse, Box, Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCaretDown, IconCaretLeft } from '@tabler/icons-react';

type Props = {
  title: string;
  subTitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

export default function CollapsibleContent({
  icon,
  title,
  subTitle,
  content,
}: Props) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Card shadow="md" className="my-8 w-full" mx="auto">
      <Group justify="center" mb={5}>
        <Group onClick={toggle} className="w-full cursor-pointer">
          {icon && icon}
          <div className="w-[86%] grow font-nexa sm:w-auto">
            <Text size="1.4em" fw={900}>
              {title}
            </Text>
            {subTitle ? (
              <Text size="1.1em" fw={500}>
                {subTitle}
              </Text>
            ) : (
              <></>
            )}
          </div>
          {opened ? <IconCaretDown /> : <IconCaretLeft />}
        </Group>
      </Group>

      <Collapse in={opened}>
        <div className="w-full font-proxima">{content}</div>
      </Collapse>
    </Card>
  );
}
