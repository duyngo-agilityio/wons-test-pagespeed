'use client';
// Libs
import { useCallback } from 'react';

// Components
import { CustomerTable } from '@/components';

// mocks
import { data } from '@/mocks';

const CustomerList = (): JSX.Element => {
  // TODO: Update later

  // TODO: Update later
  const handleEdit = useCallback(() => {}, []);

  // TODO: Update later
  const handleDelete = useCallback(() => {}, []);

  // TODO: Update later
  const handleToggleSelectStart = useCallback(() => {}, []);

  return (
    <CustomerTable
      data={data}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleSelectStar={handleToggleSelectStart}
    />
  );
};

export default CustomerList;
