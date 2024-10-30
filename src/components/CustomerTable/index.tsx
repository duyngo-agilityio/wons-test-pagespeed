import { Key, memo, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Utils
import { formatPhoneNumberTyping } from '@/utils';

// Components
import {
  Table,
  Text,
  DropdownActions,
  GenderStatusComponent,
  ImageFallback,
} from '@/components';

// Types
import { TCustomerDataResponse } from '@/types';
import Link from 'next/link';

const Pagination = dynamic(() => import('@/components/common/Pagination'));

type TCustomerData = TCustomerDataResponse;

type CustomersTableProps = {
  data: TCustomerData[];
  pageCount: number;
  isReadOnly?: boolean;
  sortBy?: string;
  order?: string;
  onEdit: (id: number) => void;
  onSort: (field: string) => void;
  onDelete: (id: number) => void;
  onRowAction?: (key: Key) => void;
};

const CustomersTable = ({
  data = [],
  pageCount,
  isReadOnly = true,
  sortBy = '',
  order = '',
  onEdit,
  onSort,
  onDelete,
  onRowAction,
}: CustomersTableProps): JSX.Element => {
  const mappingContentColumns = useMemo(
    () =>
      [
        {
          header: 'Name',
          accessor: (customerData: TCustomerData) => {
            const { attributes } = customerData || {};
            const {
              avatar = '',
              firstName = '',
              lastName = '',
            } = attributes || {};

            return (
              <div className="flex gap-3.5 items-center h-9">
                <ImageFallback
                  width={40}
                  height={40}
                  src={avatar}
                  alt="customer avatar"
                  className="rounded-full h-full object-cover"
                  sizes="40px"
                />
                <Text
                  size="md"
                  text={`${firstName} ${lastName}`}
                  className="text-nowrap"
                />
              </div>
            );
          },
          isSort: true,
          value: 'fullName',
        },
        {
          header: 'Email',
          accessor: (customerData: TCustomerData) => {
            const { attributes } = customerData || {};
            const { email = '' } = attributes || {};

            return (
              <div className="flex gap-2.5 items-center">
                <Link href={`mailto:${email}`}>
                  <Text size="md" text={email} className="text-nowrap" />
                </Link>
              </div>
            );
          },
          isSort: true,
          value: 'email',
        },
        {
          header: 'Phone Number',
          accessor: (customerData: TCustomerData) => {
            const { attributes } = customerData || {};
            const { phone = '' } = attributes || {};

            return (
              <Link href={`tel:${phone}`}>
                <Text
                  size="md"
                  text={formatPhoneNumberTyping(phone)}
                  className="text-nowrap"
                />
              </Link>
            );
          },
          isSort: true,
          value: 'phone',
        },
        {
          header: 'Gender',
          accessor: (customerData: TCustomerData) => {
            const { attributes } = customerData || {};
            const gender = attributes?.gender || 'male';

            return (
              <GenderStatusComponent gender={gender as 'male' | 'female'} />
            );
          },
          isSort: true,
          value: 'gender',
        },
        {
          ...(!isReadOnly && {
            accessor: (customerData: TCustomerData) => {
              const { id } = customerData || {};

              return (
                <DropdownActions id={id} onEdit={onEdit} onDelete={onDelete} />
              );
            },
          }),
        },
      ].filter((item) => Object.keys(item).length !== 0),
    [isReadOnly, onDelete, onEdit],
  );

  return (
    <div className="flex flex-col gap-10">
      <Table
        onSort={onSort}
        columns={mappingContentColumns}
        data={data}
        sortBy={sortBy}
        order={order}
        onRowAction={onRowAction}
      />

      {pageCount > 0 && <Pagination total={pageCount} />}
    </div>
  );
};

export default memo(CustomersTable);
