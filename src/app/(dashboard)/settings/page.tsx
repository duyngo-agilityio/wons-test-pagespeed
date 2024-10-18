import { Metadata } from 'next';
import { Suspense } from 'react';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Components
import { SkeletonUserDetail } from '@/components';

// UIs
import { UserDetailContainer } from '@/ui';

// Constants
import { IMAGES, PAGE_TITLES } from '@/constants';

export const metadata: Metadata = {
  title: 'Wons Setting',
  description: 'Manage logged in account information',
  openGraph: {
    title: 'Wons Setting',
    description: 'Manage logged in account information',
    images: [
      {
        url: IMAGES.PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const SettingsPage = () => (
  <DashBoardLayout title={PAGE_TITLES.PROFILE}>
    <Suspense fallback={<SkeletonUserDetail />}>
      <UserDetailContainer />
    </Suspense>
  </DashBoardLayout>
);

export default SettingsPage;
