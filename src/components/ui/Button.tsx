import { Button as MantineButton, Text } from '@mantine/core';

type Props = {
  label: string;
  size: string;
  backgroundColor?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: string
};

export default function Button(props: Props) {
  const { label, size, backgroundColor, onClick, type = 'button', color='white', ...rest } = props;

  return (
    <div className="w-full">
      <MantineButton
        size={size}
        bg={backgroundColor || 'admiRed'}
        radius={6}
        w={'100%'}
        onClick={onClick}
        type={type}
        {...rest} // any other props
      >
        <div className="font-nexa">
          <Text size={size} fw={900} c={color}>
            {label}
          </Text>
        </div>
      </MantineButton>
    </div>
  );
}
