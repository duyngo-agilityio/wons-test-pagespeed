'use client';
import { memo } from 'react';
import {
  Card as CardNextUI,
  CardProps,
  CardHeader,
  CardBody,
  CardFooter,
} from '@nextui-org/react';

// components
import { ImageFallback } from '@/components';

interface CustomCardProps extends CardProps {
  rounded?: string;
  bgColor?: string;
  padding?: string;
  borderColor?: string;
  hoverEffect?: boolean;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
}

const Card = ({
  rounded,
  bgColor,
  padding,
  borderColor,
  hoverEffect,
  header,
  body,
  footer,
  image,
  ...props
}: CustomCardProps) => (
  <CardNextUI
    {...props}
    style={{
      borderRadius: `${rounded}`,
      backgroundColor: `${bgColor}`,
      padding: `${padding}`,
      border: `1px solid ${borderColor}`,
      boxShadow: hoverEffect ? `0 4px 6px rgba(0, 0, 0, 0.1)` : 'none',
    }}
  >
    {header && <CardHeader>{header}</CardHeader>}
    <CardBody>
      {body}
      {image && (
        <ImageFallback src={image} alt="Card image" width={100} height={100} />
      )}
    </CardBody>
    {footer && <CardFooter>{footer}</CardFooter>}
  </CardNextUI>
);

export default memo(Card);
