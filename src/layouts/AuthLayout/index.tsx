import { memo, ReactNode } from 'react';

interface LayoutProps {
  image: JSX.Element;
  children: ReactNode;
}

const AuthLayout = ({ image, children }: LayoutProps) => (
  <div className="md:flex md:flex-row min-h-screen">
    <div className="min-h-screen base:w-full lg:w-[40%] xl:w-[31%] bg-white dark:bg-gray-400 px-[20px] md:px-[50px]">
      {children}
    </div>
    <div className="bg-gray-50 dark:bg-gray-600 flex-1 hidden md:flex items-center justify-center ">
      {image}
    </div>
  </div>
);

export default memo(AuthLayout);
