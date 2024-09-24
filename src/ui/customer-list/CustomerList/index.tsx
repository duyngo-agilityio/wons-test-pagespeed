// apis
import { getCustomerById, getCustomers } from '@/api';

// constants
import { API_PATH } from '@/constants';

// uis
import { CustomerListClient } from '@/ui';

// Utils
import { isAdmin } from '@/utils';

type TCustomerListProps = {
  page?: number;
};

const CustomerList = async ({ page }: TCustomerListProps) => {
  const { data: customerRes, meta } = await getCustomers({
    page,
    nextOptions: { tags: [API_PATH.CUSTOMERS] },
  });

  const isSuperAdmin = await isAdmin();

  await getCustomerById({ id: 2 });

  const { pagination } = meta || {};
  const { pageCount = 0 } = pagination || {};

  return (
    <CustomerListClient
      customerList={customerRes}
      pageCount={pageCount}
      isReadOnly={!isSuperAdmin}
    />
  );
};

export default CustomerList;
