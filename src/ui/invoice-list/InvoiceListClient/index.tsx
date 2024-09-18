'use client';

// Libs
import { Key, useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Types
import { TInvoiceDataResponse } from '@/types';

// Constants
import {
  ORDER,
  DEFAULT_PAGE,
  SEARCH_QUERIES,
  MESSAGE_STATUS,
  SUCCESS_MESSAGES,
  ROUTES,
} from '@/constants';

// Actions
import { deleteInvoice, deleteMultipleInvoice, updateInvoice } from '@/actions';

// Hooks
import { useToast } from '@/hooks';

// Components
import { InvoicesTable } from '@/components';

const LoadingIndicator = dynamic(
  () => import('@/components/common/LoadingIndicator'),
);

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
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { showToast } = useToast();
  const router = useRouter();

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

  const handleEdit = useCallback(
    (id: number) => {
      const params = new URLSearchParams(searchParams);

      if (id) {
        params.set(SEARCH_QUERIES.ID, id.toString());

        router.push(`${ROUTES.EDIT_INVOICE}?${params.toString()}`);
      }
    },
    [searchParams, router],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      setIsLoading(true);

      const res = await deleteInvoice(id);

      setIsLoading(false);
      const { error } = res || {};

      showToast({
        description: error ? error : SUCCESS_MESSAGES.UPDATE_INVOICE,
        status: error ? MESSAGE_STATUS.ERROR : MESSAGE_STATUS.SUCCESS,
      });
    },
    [showToast],
  );

  const handleDeleteMultiple = useCallback(
    async (ids: number[]) => {
      setIsLoading(true);

      const res = await deleteMultipleInvoice(ids);

      setIsLoading(false);
      const { error } = res || {};

      showToast({
        description: error ? error : SUCCESS_MESSAGES.DELETE_INVOICE,
        status: error ? MESSAGE_STATUS.ERROR : MESSAGE_STATUS.SUCCESS,
      });
    },
    [showToast],
  );

  const handleToggleSelectStart = useCallback(
    async (id: number, isSelected: boolean) => {
      setIsLoading(true);

      const res = await updateInvoice(id, { isSelected: !isSelected });

      setIsLoading(false);
      const { error } = res || {};

      showToast({
        description: error ? error : SUCCESS_MESSAGES.UPDATE_INVOICE,
        status: error ? MESSAGE_STATUS.ERROR : MESSAGE_STATUS.SUCCESS,
      });
    },
    [showToast],
  );

  const handleRowAction = useCallback(
    (key: Key) => replace(`${pathname}/${key}`),
    [pathname, replace],
  );

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <InvoicesTable
        data={invoiceList}
        total={total}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDeleteMultiple={handleDeleteMultiple}
        onToggleSelectStar={handleToggleSelectStart}
        onSort={handleSort}
        onRowAction={handleRowAction}
      />
    </>
  );
};

export default InvoiceListClient;
