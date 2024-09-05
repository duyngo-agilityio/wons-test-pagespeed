import { memo, ReactNode } from 'react';

interface LayoutProps {
  image: ReactNode;
  children: ReactNode;
}

const AuthLayout = ({ image, children }: LayoutProps) => {
  return (
    <div className="md:flex md:flex-row h-screen">
      <div className="h-screen md:w-[31%] lg:w-[37%] bg-white dark:bg-gray-400 px-[20px] md:px-[50px]">
        {children}
      </div>
      <div className="bg-gray-50 flex-1 hidden md:flex items-center justify-center dark:bg-gray-600">
        {image}
      </div>
    </div>
  );
};

export default memo(AuthLayout);
