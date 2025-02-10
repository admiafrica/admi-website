import { Text } from '@mantine/core';
import clsx from 'clsx';

type Props = {
  label: string;
  size?: string;
  onClick?: () => void;
  color?: string;
  className?: string;
};

export default function Title({ label, size, color = 'admiRed', className = '' }: Props) {
  return (
    <div className={clsx('w-fit font-nexa', className)}>
      <Text size={size ? size : '2em'} fw={900} c={color}>
        {label}
      </Text>
    </div>
  );
}
