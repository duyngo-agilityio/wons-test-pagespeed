'use client';

// Libs
import { useCallback } from 'react';

// Components
import { CustomerTable } from '@/components';

// Types
import { TCustomerDataResponse } from '@/types';

export type TCustomerListClientProps = {
  customerList: TCustomerDataResponse[];
};

const CustomerListClient = ({
  customerList,
}: TCustomerListClientProps): JSX.Element => {
  // TODO: Update later

  // TODO: Update later
  const handleEdit = useCallback(() => {}, []);

  // TODO: Update later
  const handleDelete = useCallback(() => {}, []);

  // TODO: Update later
  const handleToggleSelectStart = useCallback(() => {}, []);

  return (
    <CustomerTable
      data={customerList}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleSelectStar={handleToggleSelectStart}
    />
  );
};

export default CustomerListClient;
