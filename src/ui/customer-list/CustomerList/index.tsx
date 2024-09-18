import { getCustomers } from '@/api';
import { CustomerListClient } from '@/ui';

const CustomerList = async () => {
  const customerRes = await getCustomers();

  const { data: customers = [] } = customerRes || {};

  return <CustomerListClient customerList={customers} />;
};

export default CustomerList;
