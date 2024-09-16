'use client';

import { useMemo } from 'react';

// Models
import { ICustomer } from '@/models';

// Components
import {
  Table,
  Text,
  DropdownActions,
  GenderStatusComponent,
  Image,
} from '@/components';

type CustomersTableProps = {
  data: ICustomer[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSelectStar: (id: string) => void;
};

const CustomersTable = ({
  data,
  onEdit,
  onDelete,
}: CustomersTableProps): JSX.Element => {
  const mappingContentColumns = useMemo(
    () => [
      {
        header: 'Name',
        accessor: (customer: ICustomer) => {
          const { avatar = '', firstName = '', lastName = '' } = customer || {};

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
        accessor: (customer: ICustomer) => {
          const { email = '' } = customer || {};

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
        accessor: (customer: ICustomer) => {
          const { phone = '' } = customer || {};

          return <Text size="md" text={phone} className="text-nowrap" />;
        },
        isSort: true,
      },
      {
        header: 'Gender',
        accessor: (customer: ICustomer) => {
          const gender = customer.gender || 'male';
          return <GenderStatusComponent gender={gender as 'male' | 'female'} />;
        },
        isSort: true,
      },
      {
        accessor: (customer: ICustomer) => {
          const { id } = customer || {};

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
