'use client';

import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';

// Models
import { TInvoice } from '@/models';

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
  DropdownActions,
  MdDelete,
  Button,
  StarButton,
} from '@/components';

type InvoicesTableProps = {
  data: TInvoice[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSelectStar: (id: string) => void;
};

const InvoicesTable = ({
  data,
  onEdit,
  onDelete,
  onToggleSelectStar,
}: InvoicesTableProps): JSX.Element => {
  // TODO: Update later when handle delete invoice
  const handleDeleteMultiple = useCallback(() => {}, []);

  const mappingContentColumns = useMemo(
    () => [
      {
        header: 'Invoice Id',
        accessor: (invoice: TInvoice) => {
          const { id = '' } = invoice || {};

          return <Text size="md" text={`#${id}`} />;
        },
        isSort: true,
      },
      {
        header: 'Name',
        accessor: (invoice: TInvoice) => {
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
        accessor: (invoice: TInvoice) => {
          const { customer } = invoice || {};
          const { email = '' } = customer || {};

          return (
            <div className="flex gap-2.5 items-center">
              <EmailIcon className="text-blue-500 dark:text-purple-600" />
              <Text size="md" text={email} className="text-nowrap" />
            </div>
          );
        },
        isSort: true,
      },
      {
        header: 'Date',
        accessor: (invoice: TInvoice) => {
          const { date = '' } = invoice || {};

          return (
            <div className="flex gap-2.5 items-center">
              <CalendarIcon
                width={13}
                height={14}
                className="text-teal-500 dark:text-teal-300"
              />
              <Text
                size="md"
                text={dayjs(date).format('DD MMM, YYYY')}
                className="text-nowrap"
              />
            </div>
          );
        },
        isSort: true,
      },
      {
        header: 'Status',
        accessor: (invoice: TInvoice) => {
          const { status = InvoiceStatus.PENDING } = invoice || {};

          return <InvoiceStatusComponent variant={status} />;
        },
      },
      {
        accessor: (invoice: TInvoice) => {
          const { isSelected = false, id = '' } = invoice || {};

          return (
            <StarButton
              id={id}
              isSelected={isSelected}
              onClick={onToggleSelectStar}
            />
          );
        },
      },
      {
        header: (
          <Button
            isIconOnly
            className="w-20 h-10 !bg-transparent dark:!bg-transparent hover:!bg-transparent dark:hover:!bg-transparent"
            onClick={handleDeleteMultiple}
          >
            <MdDelete
              size={20}
              className="text-blue-800/30 dark:text-white/40"
            />
          </Button>
        ),

        accessor: (invoice: TInvoice) => {
          const { id } = invoice || {};

          return (
            <DropdownActions id={id} onEdit={onEdit} onDelete={onDelete} />
          );
        },
      },
    ],
    [handleDeleteMultiple, onDelete, onEdit, onToggleSelectStar],
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
