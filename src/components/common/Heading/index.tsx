// Libs
import { memo } from 'react';

// Constants
import { HEADING_SIZE_MAP } from '@/constants';

interface HeadingProps {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const Heading = ({
  title,
  size = 'lg',
  as: Component = 'h2',
  className = '',
}: HeadingProps) => {
  const fontSizeClass = HEADING_SIZE_MAP[size];

  return (
    <Component
      className={`font-bold font-dm-sans text-blue-800 dark:text-white ${fontSizeClass} ${className}`}
    >
      {title}
    </Component>
  );
};

export default memo(Heading);
