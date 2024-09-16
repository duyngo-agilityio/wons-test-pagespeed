'use client';

// Libs
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Types
import { TInvoiceDataResponse } from '@/types';

// Constants
import { ORDER, DEFAULT_PAGE, SEARCH_QUERIES } from '@/constants';

// Components
import { InvoicesTable } from '@/components';

export type TInvoiceListClientProps = {
  invoiceList: TInvoiceDataResponse[];
  total: number;
  sortOrder?: string;
};

const InvoiceListClient = ({
  invoiceList,
  total,
  sortOrder = '',
}: TInvoiceListClientProps): JSX.Element => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(SEARCH_QUERIES.SORT_BY, value);
        params.set(
          SEARCH_QUERIES.ORDER,
          sortOrder === ORDER.DESC ? ORDER.ASC : ORDER.DESC,
        );
        params.set(SEARCH_QUERIES.PAGE, DEFAULT_PAGE.toString());
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
      total={total}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onToggleSelectStar={handleToggleSelectStart}
      onSort={handleSort}
    />
  );
};

export default InvoiceListClient;
