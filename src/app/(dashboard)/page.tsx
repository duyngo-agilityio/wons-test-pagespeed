import { Suspense } from 'react';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
import { RecentServicesSection, TopSellingProducts } from '@/ui/main-dashboard';

// Constants
import { PAGE_TITLES } from '@/constants';

// Components
import {
  DateRangePicker,
  StatisticSection,
  SkeletonProductCard,
} from '@/components';

const DashboardPage = async () => (
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
          <Suspense fallback={<SkeletonProductCard />}>
            <TopSellingProducts />
          </Suspense>
        </div>
      </div>
    </DashBoardLayout>
  </main>
);

export default DashboardPage;
