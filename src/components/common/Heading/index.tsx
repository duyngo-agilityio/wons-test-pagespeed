// Libs
import { memo } from 'react';

interface HeadingProps {
  title: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const Heading = ({
  title,
  as: Component = 'h2',
  className = '',
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

  return (
    <Component
      aria-level={ariaLevel}
      className={`text-5xl font-bold font-dm-sans text-blue-800 dark:text-white ${className}`}
    >
      {title}
    </Component>
  );
};

export default memo(Heading);
