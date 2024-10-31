import { memo } from 'react';

// Constants
import { TABLE_TITLES } from '@/constants';

// components
import { Heading } from '@/components';

interface ITableLayout {
  children: React.ReactNode;
  title?: string;
  rightContent?: React.ReactNode;
  className?: string;
}

const TableLayout = ({
  children,
  title = TABLE_TITLES.RECENT_ORDERS,
  rightContent,
  className = '',
}: ITableLayout) => (
  <section
    className={`bg-white dark:bg-gray-400 base:p-6 md:p-7 rounded-10 ${className}`}
  >
    <div className="flex justify-between mb-2">
      <Heading
        title={title}
        size="sm"
        className="!text-blue-400 dark:!text-gray-850 font-medium"
      />
      {rightContent}
    </div>
    {children}
  </section>
);

export default memo(TableLayout);
