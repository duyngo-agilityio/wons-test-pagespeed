import { Metadata } from 'next';
import { lazy, Suspense } from 'react';

// Constants
import { IMAGES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';
import { CalendarSkeleton } from '@/components';

// UI
const LazyCalendar = lazy(() => import('@/ui/calendar'));

export const metadata: Metadata = {
  title: 'Wons Calendar',
  description: 'Event management related to personalization',
  openGraph: {
    title: 'Wons Calendar',
    description: 'Event management related to personalization',
    images: [
      {
        url: IMAGES.PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const CalendarPage = () => (
  <DashBoardLayout>
    <Suspense fallback={<CalendarSkeleton />}>
      <LazyCalendar />
    </Suspense>
  </DashBoardLayout>
);

export default CalendarPage;
