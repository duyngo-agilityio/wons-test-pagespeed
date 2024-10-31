// Libs
import { memo } from 'react';
import clsx from 'clsx';

// Constants
import { HEADING_SIZE_MAP } from '@/constants';

interface HeadingProps {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  textColor?: string;
  customSize?: string;
}

const Heading = ({
  title,
  size = 'lg',
  as: Component = 'h2',
  className = '',
  textColor = '',
  customSize = '',
}: HeadingProps) => {
  const ariaLevels: { [key: string]: number } = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
  };

  const ariaLevel = ariaLevels[Component];
  const fontSizeClass = HEADING_SIZE_MAP[size];

  return (
    <Component
      aria-level={ariaLevel}
      className={clsx(
        'font-bold font-dm-sans',
        textColor || 'text-blue-800 dark:text-white',
        customSize || fontSizeClass,
        className,
      )}
    >
      {title}
    </Component>
  );
};

export default memo(Heading);
