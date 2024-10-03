// Mocks
import { MOCK_USERS, TASK_TABS } from '@/mocks';

// Constants
import { FILTER_OPTIONS, PAGE_TITLES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Tabs
import { Filter, SearchInput, Tabs, TaskCard } from '@/components';

/**
 * TODO: Add search params later
 * @prop - search params
 */
const SchedulePage = () => (
  <DashBoardLayout
    isFilter
    title={PAGE_TITLES.TASK_PREVIEW}
    rightContent={<Filter title="Filter" items={FILTER_OPTIONS} />}
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
    <TaskCard
      title="Dashboard Design"
      description="Discussion for management dashboard ui design"
      images={[MOCK_USERS[0].avatar]}
    />
  </DashBoardLayout>
);

export default SchedulePage;
