import { memo, ReactNode } from 'react';
import clsx from 'clsx';

interface IDashboardLayout {
  title: string;
  children: ReactNode;
  rightContent?: ReactNode;
}

const DashboardLayout = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title = '',
  children,
  rightContent,
}: IDashboardLayout) => {
  return (
    <section>
      <div
        className={clsx(
          'base:mb-6 md:mb-7.5',
          rightContent && 'w-full md:flex justify-between md:items-center',
        )}
      >
        {/* TODO: Update heading for layout later */}
        {rightContent}
      </div>
      {children}
    </section>
  );
};

export default memo(DashboardLayout);
