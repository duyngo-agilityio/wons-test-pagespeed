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
    <Component className={`text-3xl font-dm-sans dark:text-white ${className}`}>
      {text}
    </Component>
  );
};

export default memo(Text);
