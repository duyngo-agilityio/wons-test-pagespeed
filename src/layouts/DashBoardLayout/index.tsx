import { memo, ReactNode } from 'react';
import clsx from 'clsx';

// Components
import { Heading } from '@/components';

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
      <Heading className="w-full" title={title} />
      {rightContent}
    </div>
    {children}
  </section>
);

export default memo(DashboardLayout);
