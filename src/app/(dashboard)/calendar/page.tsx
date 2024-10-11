import { lazy, Suspense } from 'react';

// Constants
import { PAGE_TITLES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UI
const LazyCalendar = lazy(() => import('@/ui/calendar'));

const CalendarPage = () => {
  return (
    <DashBoardLayout title={PAGE_TITLES.CALENDAR}>
      <Suspense>
        <LazyCalendar />
      </Suspense>
    </DashBoardLayout>
  );
};

export default CalendarPage;
