'use client';

import { useMemo } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

// Models
import { IInvoice } from '@/models';

// Constants
import { InvoiceStatus } from '@/constants';

// Components
import {
  InvoiceStatus as InvoiceStatusComponent,
  CalendarIcon,
  EmailIcon,
  Image,
  Table,
  Text,
  FaStar,
  DropdownActions,
} from '@/components';

type InvoicesTableProps = {
  data: IInvoice[];
};

const InvoicesTable = ({ data }: InvoicesTableProps): JSX.Element => {
  const mappingContentColumns = useMemo(
    () => [
      {
        header: 'Invoice Id',
        accessor: (invoice: IInvoice) => {
          const { id = '' } = invoice || {};

          return <Text size="md" text={`#${id}`} />;
        },
        isSort: true,
      },
      {
        header: 'Name',
        accessor: (invoice: IInvoice) => {
          const { customer } = invoice || {};
          const { avatar = '', firstName = '', lastName = '' } = customer || {};

          return (
            <div className="flex gap-3.5 items-center">
              <div className="relative w-9 h-9 rounded-full">
                <Image
                  src={avatar}
                  alt="customer avatar"
                  fill
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>

              <Text size="md" text={`${firstName} ${lastName}`} />
            </div>
          );
        },
        isSort: true,
      },
      {
        header: 'Email',
        accessor: (invoice: IInvoice) => {
          const { customer } = invoice || {};
          const { email = '' } = customer || {};

          return (
            <div className="flex gap-2.5 items-center">
              <EmailIcon className="text-blue-500 dark:text-purple-600" />
              <Text size="md" text={email} />
            </div>
          );
        },
        isSort: true,
      },
      {
        header: 'Date',
        accessor: (invoice: IInvoice) => {
          const { date = '' } = invoice || {};

          return (
            <div className="flex gap-2.5 items-center">
              <CalendarIcon
                width={13}
                height={14}
                className="text-teal-500 dark:text-teal-300"
              />
              <Text size="md" text={dayjs(date).format('DD MMM, YYYY')} />
            </div>
          );
        },
        isSort: true,
      },
      {
        header: 'Status',
        accessor: (invoice: IInvoice) => {
          const { status = InvoiceStatus.PENDING } = invoice || {};

          return <InvoiceStatusComponent variant={status} />;
        },
      },
      {
        accessor: (invoice: IInvoice) => {
          const { isSelected = false } = invoice || {};

          return (
            <FaStar
              className={clsx(
                'w-[17px] h-4 text-teal-500',
                isSelected
                  ? 'text-teal-500 dark:text-teal-300'
                  : 'text-blue-800/30 dark:text-white/30',
              )}
            />
          );
        },
      },
      {
        // TODO: Update later when handle delete, edit
        accessor: () => <DropdownActions />,
      },
    ],
    [],
  );

  return (
    <Table
      selectionMode="multiple"
      // Simulate data
      columns={mappingContentColumns}
      data={data}
    />
  );
};

export default InvoicesTable;
