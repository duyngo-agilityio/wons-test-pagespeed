// Libs
import { ReactNode, memo } from 'react';

interface TextProps {
  children: ReactNode;
  as?: keyof React.ReactHTML;
  className?: string;
}

const Text = ({ children, as = 'p', className = '' }: TextProps) => {
  const Component = as;

  return (
    <Component
      className={`text-3xl font-dm-sans text-blue-800 dark:text-white ${className}`}
    >
      {children}
    </Component>
  );
};

export default memo(Text);
