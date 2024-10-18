'use client';

// Libs
import { Key, useCallback, useState, useTransition } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import {
  Button,
  CustomerDetails,
  CustomerForm,
  CustomerTable,
  LoadingIndicator,
} from '@/components';

// Types
import { TCustomerDataResponse } from '@/types';

// Mocks
import { CUSTOMER_MOCK } from '@/mocks';

// Hooks
import { useToast } from '@/hooks';

// Constants
import { MESSAGE_STATUS, MESSAGES, ORDER, SEARCH_QUERIES } from '@/constants';

// Actions
import { deleteCustomer, updateCustomer } from '@/actions';

// Models
import { ICustomer } from '@/models';

// Icons
import { IoClose } from 'react-icons/io5';

// Utils
import { formatPhoneNumberTyping } from '@/utils';
import { uploadImage } from '@/api';

export type TCustomerListClientProps = {
  customerList: TCustomerDataResponse[];
  pageCount: number;
  isReadOnly?: boolean;
  order?: string;
};

const CustomerListClient = ({
  customerList,
  pageCount,
  order = '',
  isReadOnly = true,
}: TCustomerListClientProps): JSX.Element => {
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [customerDetails, setCustomerDetails] = useState<ICustomer>(
    CUSTOMER_MOCK[1],
  );
  const [avatarFile, setAvatarFile] = useState<File>();
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);

  const [isPending, startTransition] = useTransition();

  const [customerForm, setCustomerForm] = useState<ICustomer>();
  const [idCustomer, setIdCustomer] = useState<number>();
  const [toggleForm, setToggleForm] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const paramsObject = searchParams
    ? Object.fromEntries(searchParams.entries())
    : {};

  const handleCloseFormDrawer = () => {
    setToggleForm(false);
  };

  const handleEdit = useCallback(
    (id: number) => {
      setIdCustomer(id);

      const data: TCustomerDataResponse = customerList.find(
        (customer) => customer.id === id,
      ) as TCustomerDataResponse;

      setCustomerForm(data?.attributes);

      setToggleForm(true);
    },
    [customerList, setCustomerForm, setToggleForm],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      setIsLoading(true);

      const res = await deleteCustomer(id);

      setIsLoading(false);

      const { error } = res || {};

      showToast({
        description: error || MESSAGES.SUCCESS.DELETE_CUSTOMER,
        status: error ? MESSAGE_STATUS.ERROR : MESSAGE_STATUS.SUCCESS,
      });
    },
    [showToast],
  );

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(SEARCH_QUERIES.SORT_BY, value);
      params.set(
        SEARCH_QUERIES.ORDER,
        order === ORDER.DESC ? ORDER.ASC : ORDER.DESC,
      );
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCloseDrawer = () => {
    setToggleDetails(false);
  };

  const handleRowAction = useCallback(
    async (key: Key) => {
      setToggleDetails(true);
      setIsLoadingDetails(true);

      const data: TCustomerDataResponse = customerList.find(
        (customer) => customer.id === Number(key),
      ) as TCustomerDataResponse;

      setCustomerDetails(data?.attributes);
      setIsLoadingDetails(false);
    },
    [customerList],
  );

  const handleAvatarChange = useCallback((avatarFile: File) => {
    setAvatarFile(avatarFile);
    setIsAvatarDirty(true);
  }, []);

  const handleFormSubmit = useCallback(
    async (payload: ICustomer) => {
      if (avatarFile && isAvatarDirty) {
        try {
          const uploadImageResponse = await uploadImage(avatarFile);

          if (uploadImageResponse?.downloadURL) {
            payload.avatar = uploadImageResponse.downloadURL;
          } else {
            return { error: uploadImageResponse.error };
          }
        } catch (error) {
          return error;
        }
      }

      startTransition(async () => {
        if (idCustomer) {
          const formattedPayload = {
            ...payload,
            phone: formatPhoneNumberTyping(payload.phone),
          };

          const { error } = await updateCustomer(idCustomer, formattedPayload);

          if (error) {
            showToast({
              description: error,
              status: MESSAGE_STATUS.ERROR,
            });

            return;
          }

          showToast({
            description: MESSAGES.SUCCESS.UPDATE_CUSTOMER,
            status: MESSAGE_STATUS.SUCCESS,
          });
        }
      });

      setToggleForm(false);
    },
    [idCustomer, showToast, avatarFile, isAvatarDirty],
  );

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <CustomerTable
        isReadOnly={isReadOnly}
        data={customerList}
        onSort={handleSort}
        sortBy={paramsObject.sortBy}
        order={paramsObject.order}
        pageCount={pageCount}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowAction={handleRowAction}
      />

      {/* Customer Form Edit Drawer */}
      {(customerForm || toggleForm) && (
        <Drawer
          open={toggleForm}
          onClose={handleCloseFormDrawer}
          direction="right"
          size={400}
          className="!w-full md:!w-[400px]"
        >
          <div className="p-5 relative bg-white dark:bg-gray-400 h-full max-w-full">
            <Button
              onClick={handleCloseFormDrawer}
              className="absolute top-5 right-5 !bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
            >
              <IoClose size={20} />
            </Button>
            <CustomerForm
              previewData={customerForm}
              isDisabledField={isPending}
              onAvatarChange={handleAvatarChange}
              onSubmit={handleFormSubmit}
            />
          </div>
        </Drawer>
      )}

      {/* Customer Details Drawer */}
      {toggleDetails && (
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
      )}
    </>
  );
};

export default CustomerListClient;
