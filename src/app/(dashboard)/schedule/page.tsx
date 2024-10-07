import { Suspense } from 'react';

// Mocks
import { TASK_TABS } from '@/mocks';

// Constants
import { PAGE_TITLES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Tabs
import { Filter, SearchInput, Tabs, SkeletonTaskListBoard } from '@/components';

// ui
import { TaskListBoard } from '@/ui';

// Types
import { ISearchParams } from '@/types';

// Api
import { getUsers } from '@/api';

// Models
import { TUser } from '@/models';

// Utils
import { formatFilterOptions } from '@/utils';

interface ISchedulePage {
  searchParams: ISearchParams;
}

const SchedulePage = async ({ searchParams }: ISchedulePage) => {
  const users: TUser[] = await getUsers({});

  const filterOptions = formatFilterOptions(users);

  return (
    <DashBoardLayout
      isFilter
      title={PAGE_TITLES.TASK_PREVIEW}
      rightContent={<Filter title="Filter" items={filterOptions} />}
    >
      <div className="md:flex md:justify-between md:items-center">
        <Tabs
          tabs={TASK_TABS}
          customVariant="secondary"
          className="px-0 base:w-full md:w-fit"
          classNames={{
            tabList: 'base:w-full md:w-fit',
          }}
        />
        <SearchInput className="base:w-full md:w-fit" />
      </div>
      <Suspense fallback={<SkeletonTaskListBoard />}>
        <TaskListBoard searchParams={searchParams} />
      </Suspense>
    </DashBoardLayout>
  );
};

export default SchedulePage;
