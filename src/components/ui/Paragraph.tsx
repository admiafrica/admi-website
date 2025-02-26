import React from 'react';
import clsx from 'clsx'; // merge classes dynamically
import { Text } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  size?: string; // Default size for Text component
  className?: string; // Extra styles
  fontFamily?: string; // Font Family
  fontWeight?: number;
};

const Paragraph: React.FC<Props> = ({
  children,
  size = '18px',
  className = '',
  fontFamily = 'font-proxima',
  fontWeight = 500,
}) => {
  return (
    <div className={clsx(fontFamily, className)}>
      <Text size={size} fw={fontWeight}>
        {children}
      </Text>
    </div>
  );
};

export default Paragraph;
