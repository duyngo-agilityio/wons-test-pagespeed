'use client';

// Libs
import { useCallback, useState } from 'react';

// Components
import { CustomerTable, LoadingIndicator } from '@/components';

// Types
import { TCustomerDataResponse } from '@/types';

// Hooks
import { useToast } from '@/hooks';

// Constants
import { MESSAGE_STATUS, SUCCESS_MESSAGES } from '@/constants';

// Actions
import { deleteCustomer } from '@/actions';

export type TCustomerListClientProps = {
  customerList: TCustomerDataResponse[];
  pageCount: number;
};

const CustomerListClient = ({
  customerList,
  pageCount,
}: TCustomerListClientProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  // TODO: Update later
  const handleEdit = useCallback(() => {}, []);

  const handleDelete = useCallback(
    async (id: number) => {
      setIsLoading(true);

      const res = await deleteCustomer(id);

      setIsLoading(false);

      const { error } = res || {};

      showToast({
        description: error || SUCCESS_MESSAGES.DELETE_CUSTOMER,
        status: error ? MESSAGE_STATUS.ERROR : MESSAGE_STATUS.SUCCESS,
      });
    },
    [showToast],
  );

  // TODO: Update later
  const handleToggleSelectStart = useCallback(() => {}, []);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <CustomerTable
        data={customerList}
        pageCount={pageCount}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleSelectStar={handleToggleSelectStart}
      />
    </>
  );
};

export default CustomerListClient;
