// Libs
import { memo } from 'react';
import clsx from 'clsx';

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
  textColor?: string;
  customSize?: string;
}

const Text = ({
  text,
  textColor = '',
  size = 'md',
  customSize = '',
  as = 'p',
  className = '',
}: TextProps) => {
  const Component = as;

  const fontSizeClass = TEXT_SIZE_MAP[size];

  return (
    <Component
      className={clsx(
        'font-dm-sans',
        textColor || 'text-blue-800 dark:text-white',
        customSize || fontSizeClass,
        className,
      )}
    >
      {text}
    </Component>
  );
};

export default memo(Text);
