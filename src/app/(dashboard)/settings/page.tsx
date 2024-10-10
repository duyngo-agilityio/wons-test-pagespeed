import { Suspense } from 'react';

// Layouts
import { DashBoardLayout } from '@/layouts';
import { SkeletonUserDetail } from '@/components';

// UIs
import { UserDetailContainer } from '@/ui';

// Constants
import { PAGE_TITLES } from '@/constants';

const SettingsPage = () => (
  <DashBoardLayout title={PAGE_TITLES.PROFILE}>
    <Suspense fallback={<SkeletonUserDetail />}>
      <UserDetailContainer />
    </Suspense>
  </DashBoardLayout>
);

export default SettingsPage;
