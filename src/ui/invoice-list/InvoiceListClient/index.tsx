'use client';

// Libs
import { Key, memo, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Types
import { TInvoiceDataResponse } from '@/types/invoice';

// Constants
import { ORDER, SEARCH_QUERIES } from '@/constants/params';
import { DEFAULT_PAGE } from '@/constants/pagination';
import { ROUTES } from '@/constants/routes';
import { MESSAGES } from '@/constants/messages';

// Actions
import {
  deleteInvoice,
  deleteMultipleInvoice,
  updateInvoice,
} from '@/actions/invoice';

// Hooks
import { useToast } from '@/hooks';

// Components
import { InvoicesTable } from '@/components';

const LoadingIndicator = dynamic(
  () => import('@/components/common/LoadingIndicator'),
);

export type TInvoiceListClientProps = {
  invoiceList: TInvoiceDataResponse[];
  pageCount: number;
  sortOrder?: string;
};

const InvoiceListClient = ({
  invoiceList,
  pageCount,
  sortOrder = '',
}: TInvoiceListClientProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const { showToast } = useToast();

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

        push(`${ROUTES.EDIT_INVOICE}?${params.toString()}`);
      }
    },
    [searchParams, push],
  );

  const handleDelete = useCallback(
    async (invoiceId: number, invoiceProductIds: number[]) => {
      setIsLoading(true);

      const res = await deleteInvoice(invoiceId, invoiceProductIds);

      setIsLoading(false);
      const { error } = res || {};

      showToast({
        description: error || MESSAGES.SUCCESS.DELETE_INVOICE,
        status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
      });
    },
    [showToast],
  );

  const handleDeleteMultiple = useCallback(
    async (ids: number[], invoiceProductIds: number[]) => {
      setIsLoading(true);

      const res = await deleteMultipleInvoice(ids, invoiceProductIds);

      setIsLoading(false);
      const { error } = res || {};

      showToast({
        description: error || MESSAGES.SUCCESS.DELETE_INVOICE,
        status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
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
        description: error || MESSAGES.SUCCESS.UPDATE_INVOICE,
        status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
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
        pageCount={pageCount}
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

export default memo(InvoiceListClient, isEqual);
