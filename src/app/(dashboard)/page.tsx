import { lazy, Suspense } from 'react';

// Layouts
import { DashBoardLayout, TableLayout } from '@/layouts';

// UI
const LazyRecentServicesSection = lazy(
  () => import('@/ui/main-dashboard/RecentServicesSection'),
);
const LazyStatisticSection = lazy(
  () => import('@/ui/main-dashboard/StatisticSection'),
);
const LazyTopSellingProducts = lazy(
  () => import('@/ui/main-dashboard/TopSellingProduct'),
);

// Constants
import { MAPPING_RECENT_SERVICES_SKELETON } from '@/constants/skeleton';

// Types
import { ISearchParams } from '@/types';

// Components
import {
  SkeletonProductCard,
  TableSkeleton,
  SkeletonStatistic,
  DateRangePicker,
} from '@/components';

// Constants
import { PAGE_TITLES } from '@/constants';

interface IDashboardPage {
  searchParams: ISearchParams;
}

const DashboardPage = ({ searchParams = {} }: IDashboardPage) => {
  const {
    sortBy = '',
    order = '',
    startTime = '',
    endTime = '',
  } = searchParams;

  return (
    <DashBoardLayout
      title={PAGE_TITLES.DASHBOARD}
      rightContent={<DateRangePicker />}
    >
      <div className="mb-8">
        <Suspense fallback={<SkeletonStatistic />}>
          <LazyStatisticSection />
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
            <LazyTopSellingProducts />
          </Suspense>
        </div>
      </div>
    </DashBoardLayout>
  );
};

export default DashboardPage;
