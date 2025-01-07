import { Button as MantineButton, Text } from '@mantine/core';

type Props = {
  label: string;
  size: string;
  onClick?: () => void;
  backgroundColor?: string;
};

export default function Button(props: Props) {
  return (
    <div className="w-full">
      <MantineButton size={props.size} bg={props.backgroundColor || 'admiRed'} radius={6} w={'100%'}>
        <div className="font-nexa">
          <Text size={props.size} fw={900}>
            {props.label}
          </Text>
        </div>
      </MantineButton>
    </div>
  );
}
