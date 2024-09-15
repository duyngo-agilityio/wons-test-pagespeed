'use client';

// Libs
import { useCallback } from 'react';

// Types
import { TInvoiceDataResponse } from '@/types';

// Components
import { InvoicesTable } from '@/components';

export type TInvoiceListClientProps = {
  invoiceList: TInvoiceDataResponse[];
};

const InvoiceListClient = ({
  invoiceList,
}: TInvoiceListClientProps): JSX.Element => {
  // TODO: Update later
  const handleEdit = useCallback(() => {}, []);

  // TODO: Update later
  const handleDelete = useCallback(() => {}, []);

  // TODO: Update later
  const handleToggleSelectStart = useCallback(() => {}, []);

  return (
    <InvoicesTable
      data={invoiceList}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleSelectStar={handleToggleSelectStart}
    />
  );
};

export default InvoiceListClient;
