'use client';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { RecentServicesSection } from '@/ui';

// Constants
import { PAGE_TITLES } from '@/constants';

// Components
import { DateRangePicker } from '@/components';

const DashboardPage = () => (
  <main>
    <DashBoardLayout
      title={PAGE_TITLES.DASHBOARD}
      rightContent={<DateRangePicker />}
    >
      <RecentServicesSection />
    </DashBoardLayout>
  </main>
);

export default DashboardPage;
