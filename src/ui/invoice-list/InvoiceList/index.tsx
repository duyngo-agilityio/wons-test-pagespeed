'use client';
// Libs
import { useCallback } from 'react';

// Models
import { TInvoice } from '@/models';

// Components
import { InvoicesTable } from '@/components';

const InvoiceList = (): JSX.Element => {
  // TODO: Update later
  const data: TInvoice[] = [];

  // TODO: Update later
  const handleEdit = useCallback(() => {}, []);

  // TODO: Update later
  const handleDelete = useCallback(() => {}, []);

  // TODO: Update later
  const handleToggleSelectStart = useCallback(() => {}, []);

  return (
    <InvoicesTable
      data={data}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleSelectStar={handleToggleSelectStart}
    />
  );
};

export default InvoiceList;
