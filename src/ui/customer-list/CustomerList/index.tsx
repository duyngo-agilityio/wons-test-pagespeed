// apis
import { getCustomers } from '@/api';

// constants
import { API_PATH } from '@/constants';

// uis
import { CustomerListClient } from '@/ui';

// Utils
import { isAdmin } from '@/utils';

type TCustomerListProps = {
  page?: number;
  sortBy?: string;
  order?: string;
};

const CustomerList = async ({
  page,
  sortBy = '',
  order = '',
}: TCustomerListProps) => {
  const { data: customerRes, meta } = await getCustomers({
    page,
    sortBy,
    order,
    nextOptions: { tags: [API_PATH.CUSTOMERS] },
  });

  const isSuperAdmin = await isAdmin();

  const { pagination } = meta || {};
  const { pageCount = 0 } = pagination || {};

  return (
    <CustomerListClient
      order={order}
      customerList={customerRes}
      pageCount={pageCount}
      isReadOnly={!isSuperAdmin}
    />
  );
};

export default CustomerList;
