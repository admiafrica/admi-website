import React from 'react';
import clsx from 'clsx'; // Helps merge classes dynamically
import { Text } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  size?: string; // Default size for Text component
  className?: string; // Extra styles
};

const Paragraph: React.FC<Props> = ({ children, size = '18px', className = '' }) => {
  return (
    <div className={clsx('font-proxima', className)}>
      <Text size={size}>{children}</Text>
    </div>
  );
};

export default Paragraph;
