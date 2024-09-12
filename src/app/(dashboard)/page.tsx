import { lazy, Suspense } from 'react';

// Layouts
import { DashBoardLayout, TableLayout } from '@/layouts';

// UI
const LazyRecentServicesSection = lazy(
  () => import('@/ui/main-dashboard/RecentServicesSection'),
);
import { TopSellingProducts, StatisticSection } from '@/ui/main-dashboard';

// Constants
import { PAGE_TITLES } from '@/constants';
import { MAPPING_RECENT_SERVICES_SKELETON } from '@/constants/skeleton';

// Components
import {
  DateRangePicker,
  SkeletonProductCard,
  TableSkeleton,
  SkeletonStatistic,
} from '@/components';

const DashboardPage = async () => (
  <main>
    <DashBoardLayout
      title={PAGE_TITLES.DASHBOARD}
      rightContent={<DateRangePicker />}
    >
      <div className="mb-8">
        <Suspense fallback={<SkeletonStatistic />}>
          <StatisticSection />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
        <div className="md:col-span-6">
          <Suspense
            fallback={
              <TableLayout>
                <TableSkeleton columns={MAPPING_RECENT_SERVICES_SKELETON} />
              </TableLayout>
            }
          >
            <LazyRecentServicesSection />
          </Suspense>
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
