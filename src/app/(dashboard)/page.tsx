'use client';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { RecentServicesSection } from '@/ui';

// Constants
import { PAGE_TITLES } from '@/constants';

// Components
import {
  DateRangePicker,
  StatisticSection,
  TopSellingProducts,
} from '@/components';

const DashboardPage = () => (
  <main>
    <DashBoardLayout
      title={PAGE_TITLES.DASHBOARD}
      rightContent={<DateRangePicker />}
    >
      <StatisticSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <RecentServicesSection />
        <TopSellingProducts />
      </div>
    </DashBoardLayout>
  </main>
);

export default DashboardPage;
