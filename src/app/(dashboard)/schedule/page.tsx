import { Suspense } from 'react';

// Mocks
import { TASK_TABS } from '@/mocks';

// Constants
import { PAGE_TITLES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Tabs
import { Tabs, SkeletonTaskListBoard } from '@/components';

// ui
import { ScheduleListFilter, TaskListBoard, ScheduleListActions } from '@/ui';

// Types
import { ISearchParams } from '@/types';

interface ISchedulePage {
  searchParams: ISearchParams;
}

const SchedulePage = async ({ searchParams }: ISchedulePage) => {
  return (
    <main>
      <DashBoardLayout
        isFilter
        title={PAGE_TITLES.TASK_PREVIEW}
        rightContent={<ScheduleListFilter />}
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
          <ScheduleListActions />
        </div>
        <Suspense fallback={<SkeletonTaskListBoard />}>
          <TaskListBoard searchParams={searchParams} />
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default SchedulePage;
