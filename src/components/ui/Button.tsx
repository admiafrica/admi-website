import { Button as MantineButton } from '@mantine/core';

type Props = {
  label: string;
  size: string;
  onClick?: () => void;
  backgroundColor?: string;
};

export default function Button(props: Props) {
  return (
    <div className="w-full">
      <MantineButton size={props.size} bg={props.backgroundColor || 'admiRed'} radius={6}>
        {props.label}
      </MantineButton>
    </div>
  );
}
