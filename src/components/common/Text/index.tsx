// Libs
import { memo } from 'react';

interface TextProps {
  text: string;
  as?: keyof React.ReactHTML;
  className?: string;
}

const Text = ({ text, as = 'p', className = '' }: TextProps) => {
  const Component = as;

  return (
    <Component
      className={`text-3xl font-dm-sans text-blue-800 dark:text-white ${className}`}
    >
      {text}
    </Component>
  );
};

export default memo(Text);
