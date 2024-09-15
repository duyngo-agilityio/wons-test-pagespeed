'use client';

// Libs
import { useCallback } from 'react';

// Types
import { TInvoiceDataResponse } from '@/types';

// Components
import { InvoicesTable } from '@/components';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ORDER, PARAMS } from '@/constants';

export type TInvoiceListClientProps = {
  invoiceList: TInvoiceDataResponse[];
  sortOrder?: string;
};

const InvoiceListClient = ({
  invoiceList,
  sortOrder = '',
}: TInvoiceListClientProps): JSX.Element => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(PARAMS.SORT_BY, value);
        params.set(
          PARAMS.ORDER_PARAM,
          sortOrder === ORDER.DESC ? ORDER.ASC : ORDER.DESC,
        );
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [sortOrder, pathname, replace, searchParams],
  );

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
      onSort={handleSort}
    />
  );
};

export default InvoiceListClient;
