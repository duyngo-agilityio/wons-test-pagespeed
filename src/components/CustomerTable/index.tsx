'use client';

import { Key, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Components
import {
  Table,
  Text,
  DropdownActions,
  GenderStatusComponent,
  Image,
} from '@/components';

// Types
import { TCustomerDataResponse } from '@/types';

const Pagination = dynamic(() => import('@/components/common/Pagination'));

type TCustomerData = TCustomerDataResponse;

type CustomersTableProps = {
  data: TCustomerData[];
  pageCount: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleSelectStar: (id: string) => void;
  onRowAction?: (key: Key) => void;
};

const CustomersTable = ({
  data = [],
  pageCount,
  onEdit,
  onDelete,
  onRowAction,
}: CustomersTableProps): JSX.Element => {
  const mappingContentColumns = useMemo(
    () => [
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
            <div className="flex gap-3.5 items-center">
              <div className="relative w-9 h-9 rounded-full">
                <Image
                  src={avatar}
                  alt="customer avatar"
                  fill
                  objectFit="cover"
                  className="rounded-full "
                />
              </div>

              <Text
                size="md"
                text={`${firstName} ${lastName}`}
                className="text-nowrap"
              />
            </div>
          );
        },
        isSort: true,
      },
      {
        header: 'Email',
        accessor: (customerData: TCustomerData) => {
          const { attributes } = customerData || {};
          const { email = '' } = attributes || {};

          return (
            <div className="flex gap-2.5 items-center">
              <Text size="md" text={email} className="text-nowrap" />
            </div>
          );
        },
        isSort: true,
      },
      {
        header: 'Phone Number',
        accessor: (customerData: TCustomerData) => {
          const { attributes } = customerData || {};
          const { phone = '' } = attributes || {};

          return <Text size="md" text={phone} className="text-nowrap" />;
        },
        isSort: true,
      },
      {
        header: 'Gender',
        accessor: (customerData: TCustomerData) => {
          const { attributes } = customerData || {};
          const gender = attributes?.gender || 'male';

          return <GenderStatusComponent gender={gender as 'male' | 'female'} />;
        },
        isSort: true,
      },
      {
        accessor: (customerData: TCustomerData) => {
          const { id } = customerData || {};

          return (
            <DropdownActions id={id} onEdit={onEdit} onDelete={onDelete} />
          );
        },
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <div className="flex flex-col gap-10">
      <Table
        columns={mappingContentColumns}
        data={data}
        onRowAction={onRowAction}
      />

      {pageCount > 0 && <Pagination total={pageCount} />}
    </div>
  );
};

export default CustomersTable;
