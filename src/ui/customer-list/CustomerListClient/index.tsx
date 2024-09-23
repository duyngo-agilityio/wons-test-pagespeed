'use client';

// Libs
import { Key, useCallback, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

// Components
import { CustomerDetails, CustomerTable, LoadingIndicator } from '@/components';

// Types
import { TCustomerDataResponse } from '@/types';

// Mocks
import { CUSTOMER_MOCK } from '@/mocks';

// Hooks
import { useToast } from '@/hooks';

// Constants
import { MESSAGE_STATUS, SUCCESS_MESSAGES } from '@/constants';

// Actions
import { deleteCustomer } from '@/actions';
import { ICustomer } from '@/models';

export type TCustomerListClientProps = {
  customerList: TCustomerDataResponse[];
  pageCount: number;
};

const CustomerListClient = ({
  customerList,
  pageCount,
}: TCustomerListClientProps): JSX.Element => {
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [customerDetails, setCustomerDetails] = useState<ICustomer>(
    CUSTOMER_MOCK[1],
  );

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

  const handleCloseDrawer = useCallback(() => {
    setToggleDetails(false);
  }, []);

  const handleRowAction = useCallback(async (key: Key) => {
    setToggleDetails(true);
    setIsLoadingDetails(true);

    const data: TCustomerDataResponse = customerList.find(
      (customer) => customer.id === Number(key),
    ) as TCustomerDataResponse;

    setCustomerDetails(data?.attributes);
    setIsLoadingDetails(false);
  }, [customerList]);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <CustomerTable
        data={customerList}
        pageCount={pageCount}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleSelectStar={handleToggleSelectStart}
        onRowAction={handleRowAction}
      />
      <Drawer
        open={toggleDetails}
        onClose={handleCloseDrawer}
        direction="right"
        className="!w-[302px] !max-w-[302px]"
      >
        <CustomerDetails
          customer={customerDetails}
          isLoading={isLoadingDetails}
        />
      </Drawer>
    </>
  );
};

export default CustomerListClient;
