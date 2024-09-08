import { memo, ReactNode } from 'react';

// Constants
import { TABLE_TITLES } from '@/constants';

// components
import { Button, Heading, TbDots } from '@/components';

interface ITableLayout {
  children: ReactNode;
  title?: string;
  rightContent?: ReactNode;
}

const TableLayout = ({
  children,
  title = TABLE_TITLES.RECENT_ORDERS,
  rightContent,
}: ITableLayout) => {
  return (
    <section className="bg-white dark:bg-gray-400 base:p-6 md:p-7 rounded-10">
      <div className="flex justify-between mb-2">
        <Heading
          title={title}
          size="sm"
          className="text-blue-800/70 dark:text-white/70"
        />
        {rightContent || (
          <Button isIconOnly className="bg-transparent">
            <TbDots className="text-blue-800/70 dark:text-white/30" />
          </Button>
        )}
      </div>
      {children}
    </section>
  );
};

export default memo(TableLayout);
