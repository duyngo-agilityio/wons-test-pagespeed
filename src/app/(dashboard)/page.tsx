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

// Types
import { ISearchParams } from '@/types';

// Components
import {
  DateRangePicker,
  SkeletonProductCard,
  TableSkeleton,
  SkeletonStatistic,
} from '@/components';

interface IDashboardPage {
  searchParams: ISearchParams;
}

const DashboardPage = async ({ searchParams }: IDashboardPage) => {
  const {
    sortBy = '',
    order = '',
    startTime = '',
    endTime = '',
  } = searchParams || {};

  return (
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

        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-10 gap-6">
          <div className="xl:col-span-6">
            <Suspense
              key={sortBy + order + startTime + endTime}
              fallback={
                <TableLayout>
                  <TableSkeleton columns={MAPPING_RECENT_SERVICES_SKELETON} />
                </TableLayout>
              }
            >
              <LazyRecentServicesSection searchParams={searchParams} />
            </Suspense>
          </div>
          <div className="xl:col-span-4">
            <Suspense fallback={<SkeletonProductCard />}>
              <TopSellingProducts />
            </Suspense>
          </div>
        </div>
      </DashBoardLayout>
    </main>
  );
};

export default DashboardPage;
