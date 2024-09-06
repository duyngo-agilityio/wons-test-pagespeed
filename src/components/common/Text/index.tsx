// Libs
import { memo } from 'react';

// Constants
import { TEXT_SIZE_MAP } from '@/constants';

interface TextProps {
  text: string;
  size?:
    | '4xs'
    | '3xs'
    | '2xs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | '2xl'
    | '3xl'
    | '4xl';
  as?: keyof React.ReactHTML;
  className?: string;
}

const Text = ({ text, size = 'md', as = 'p', className = '' }: TextProps) => {
  const Component = as;

  const fontSizeClass = TEXT_SIZE_MAP[size];

  return (
    <Component
      className={`font-dm-sans text-blue-800 dark:text-white ${fontSizeClass} ${className}`}
    >
      {text}
    </Component>
  );
};

export default memo(Text);
