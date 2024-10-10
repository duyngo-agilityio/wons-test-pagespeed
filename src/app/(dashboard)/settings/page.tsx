// Layouts
import { DashBoardLayout } from '@/layouts';

// UIs
import { UserDetailContainer } from '@/ui';

// Constants
import { PAGE_TITLES } from '@/constants';

const SettingsPage = () => (
  <DashBoardLayout title={PAGE_TITLES.PROFILE}>
    <UserDetailContainer />
  </DashBoardLayout>
);

export default SettingsPage;
