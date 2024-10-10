import { memo } from 'react';

// Layouts
import { DashBoardLayout } from '@/layouts';

// UIs
import { UserDetailContainer } from '@/ui/setting';

// Constants
import { PAGE_TITLES } from '@/constants';

const SettingsPage = async () => {
  return (
    <DashBoardLayout title={PAGE_TITLES.PROFILE}>
      <UserDetailContainer />
    </DashBoardLayout>
  );
};

export default memo(SettingsPage);
