// Constants
import { PAGE_TITLES } from '@/constants';

// Components
import { DateRangePicker, Heading } from '@/components';

const DashboardAction = () => (
  <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
    <Heading title={PAGE_TITLES.DASHBOARD} />
    <DateRangePicker />
  </div>
);

export default DashboardAction;
