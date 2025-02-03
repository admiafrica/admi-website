import React from 'react';
import clsx from 'clsx'; // Helps merge classes dynamically
import { Text } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  size?: string; // Default size for Text component
  className?: string; // Extra styles
  fontFamily?: string; // Font Family
};

const Paragraph: React.FC<Props> = ({ children, size = '18px', className = '', fontFamily = 'font-proxima' }) => {
  return (
    <div className={clsx(fontFamily, className)}>
      <Text size={size}>{children}</Text>
    </div>
  );
};

export default Paragraph;
