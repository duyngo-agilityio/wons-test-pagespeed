'use client';

// Libs
import { useCallback } from 'react';

// Components
import { CustomerTable } from '@/components';

// Types
import { TCustomerDataResponse } from '@/types';

export type TCustomerListClientProps = {
  customerList: TCustomerDataResponse[];
  pageCount: number;
};

const CustomerListClient = ({
  customerList,
  pageCount,
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
      pageCount={pageCount}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleSelectStar={handleToggleSelectStart}
    />
  );
};

export default CustomerListClient;
