// Mocks
import { TASK_TABS } from '@/mocks';

// Constants
import { PAGE_TITLES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Tabs
import { SearchInput, Tabs } from '@/components';

/**
 * TODO: Add search params later
 * @prop - search params
 */
const SchedulePage = () => (
  <DashBoardLayout title={PAGE_TITLES.TASK_PREVIEW}>
    <div className="flex justify-between items-center">
      <Tabs tabs={TASK_TABS} customVariant="secondary" className="px-0" />
      <div className="w-fit">
        <SearchInput />
      </div>
    </div>
    {/* TODO: Add list later */}
  </DashBoardLayout>
);

export default SchedulePage;
