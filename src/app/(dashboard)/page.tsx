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
      <div className="mb-8">
        <StatisticSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        <div className="md:col-span-6">
          <RecentServicesSection />
        </div>
        <div className="md:col-span-4">
          <TopSellingProducts />
        </div>
      </div>
    </DashBoardLayout>
  </main>
);

export default DashboardPage;
