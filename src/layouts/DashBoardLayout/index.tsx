import { memo, ReactNode } from 'react';

// Components
import { Heading } from '@/components';
import clsx from 'clsx';

interface IDashboardLayout {
  title: string;
  children: ReactNode;
  rightContent?: ReactNode;
}

const DashboardLayout = ({
  title,
  children,
  rightContent,
}: IDashboardLayout) => (
  <section>
    <div
      className={clsx(
        'base:mb-6 md:mb-7.5',
        rightContent && 'md:flex justify-between md:items-center',
      )}
    >
      <Heading title={title} />
      {rightContent}
    </div>
    {children}
  </section>
);

export default memo(DashboardLayout);
