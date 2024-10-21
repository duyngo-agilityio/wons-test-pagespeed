import { lazy, Suspense } from 'react';

// Layouts
import { DashBoardLayout } from '@/layouts';

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

// Types
import { ISearchParams } from '@/types';

// Components
import {
  SkeletonProductCard,
  SkeletonStatistic,
  DateRangePicker,
} from '@/components';

// UIs
import { RecentServicesSkeleton } from '@/ui';

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
            fallback={<RecentServicesSkeleton />}
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
