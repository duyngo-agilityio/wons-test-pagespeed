// Utils
import { isAdmin } from '@/utils';

// Components
import { CustomerDrawer } from '@/components';

const CustomerActions = async (): Promise<JSX.Element> => {
  const isSuperAdmin = await isAdmin();

  return isSuperAdmin ? <CustomerDrawer /> : <></>;
};

export default CustomerActions;
