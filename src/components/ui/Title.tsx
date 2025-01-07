import { Text } from '@mantine/core';

type Props = {
  label: string;
  size?: string;
  onClick?: () => void;
  color?: string;
};

export default function Title({ label, size, color = 'admiRed' }: Props) {
  return (
    <div className="w-fit font-nexa">
      <Text size={size ? size : '2em'} fw={900} c={color}>
        {label}
      </Text>
    </div>
  );
}
