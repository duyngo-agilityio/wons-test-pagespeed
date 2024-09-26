import { memo, ReactNode } from 'react';
import clsx from 'clsx';

// Components
import { Heading } from '@/components';

interface IDashboardLayout {
  children: ReactNode;
  title?: string;
  rightContent?: ReactNode;
}

const DashboardLayout = ({
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
        {title && <Heading className="w-full" title={title} />}
        {rightContent}
      </div>
      {children}
    </section>
  );
};

export default memo(DashboardLayout);
