'use client';

import { useMemo } from 'react';

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

type TCustomerData = TCustomerDataResponse;

type CustomersTableProps = {
  data: TCustomerData[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleSelectStar: (id: string) => void;
};

const CustomersTable = ({
  data = [],
  onEdit,
  onDelete,
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
          const gender = attributes.gender || 'male';

          return <GenderStatusComponent gender={gender as 'male' | 'female'} />;
        },
        isSort: true,
      },
      {
        accessor: (customerData: TCustomerData) => {
          const { attributes } = customerData || {};
          const { id } = attributes || {};

          return (
            <DropdownActions id={id} onEdit={onEdit} onDelete={onDelete} />
          );
        },
      },
    ],
    [onDelete, onEdit],
  );

  return <Table columns={mappingContentColumns} data={data} />;
};

export default CustomersTable;
