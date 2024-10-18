import { Metadata } from 'next';
import { lazy, Suspense } from 'react';

// Constants
import { IMAGES, PAGE_TITLES } from '@/constants';

// Layouts
import { DashBoardLayout } from '@/layouts';

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
  <DashBoardLayout title={PAGE_TITLES.CALENDAR}>
    <Suspense>
      <LazyCalendar />
    </Suspense>
  </DashBoardLayout>
);

export default CalendarPage;
