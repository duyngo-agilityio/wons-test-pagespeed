// Libs
import { memo } from 'react';

// Components
import { ThemeSwitcher } from '@/components';

interface LayoutProps {
  image: JSX.Element;
  children: React.ReactNode;
}

const AuthLayout = ({ image, children }: LayoutProps) => (
  <div className="md:flex md:flex-row min-h-screen">
    <div className=" flex flex-col min-h-screen base:w-full lg:w-[40%] xl:w-[31%] bg-white dark:bg-gray-400 px-[20px] md:px-[50px]">
      <div className="pt-10 self-end">
        <ThemeSwitcher />
      </div>

      {children}
    </div>
    <div className="bg-gray-50 dark:bg-gray-600 flex-1 hidden md:flex items-center justify-center ">
      {image}
    </div>
  </div>
);

export default memo(AuthLayout);
