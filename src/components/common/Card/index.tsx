'use client';
import { memo } from 'react';

import { Card as CardNextUI, CardProps } from '@nextui-org/react';

interface CustomCardProps extends CardProps {
  rounded?: string;
  bgColor?: string;
  padding?: string;
  children?: React.ReactNode;
}

const Card = ({
  rounded,
  bgColor,
  padding,
  children,
  ...props
}: CustomCardProps) => (
  <CardNextUI
    {...props}
    style={{
      borderRadius: `${rounded}`,
      backgroundColor: `${bgColor}`,
      padding: `${padding}`,
    }}
  >
    {children}
  </CardNextUI>
);

export default memo(Card);
