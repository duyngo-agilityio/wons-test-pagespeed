'use client';

// Libs
import { Key, useCallback, useMemo, useState } from 'react';
import { Selection } from '@nextui-org/react';
import dayjs from 'dayjs';

// Constants
import { InvoiceStatus } from '@/constants';

// Types
import { TInvoiceDataResponse } from '@/types';

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
  Pagination,
} from '@/components';

type TInvoiceData = TInvoiceDataResponse;

type TInvoicesTableProps = {
  data: TInvoiceData[];
  total: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteMultiple: (ids: number[]) => void;
  onToggleSelectStar: (id: string) => void;
  onSort: (field: string) => void;
  onRowAction?: (key: Key) => void;
};

const InvoicesTable = ({
  data = [],
  total,
  onEdit,
  onDelete,
  onDeleteMultiple,
  onToggleSelectStar,
  onSort,
  onRowAction,
}: TInvoicesTableProps): JSX.Element => {
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<number[]>([]);

  const handleDeleteMultiple = useCallback(
    () => onDeleteMultiple(selectedInvoiceIds),
    [onDeleteMultiple, selectedInvoiceIds],
  );

  const mappingContentColumns = useMemo(
    () => [
      {
        header: 'Invoice Id',
        accessor: (invoiceData: TInvoiceData) => {
          const { attributes } = invoiceData || {};

          const { invoiceId } = attributes || {};

          return <Text size="md" text={`#${invoiceId}`} />;
        },
        value: 'invoiceId',
        isSort: true,
      },
      {
        header: 'Name',
        accessor: (invoice: TInvoiceData) => {
          const { attributes: invoiceAttributes } = invoice || {};
          const { customer } = invoiceAttributes || {};
          const { data } = customer || {};
          const { attributes: customerAttributes } = data || {};

          const { avatar = '', fullName = '' } = customerAttributes || {};

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

              <Text size="md" text={fullName} className="text-nowrap" />
            </div>
          );
        },
        value: 'customer.fullName',
        isSort: true,
      },
      {
        header: 'Email',
        accessor: (invoice: TInvoiceData) => {
          const { attributes: invoiceAttributes } = invoice || {};
          const { email } = invoiceAttributes || {};

          return (
            <div className="flex gap-2.5 items-center">
              <EmailIcon className="text-blue-500 dark:text-purple-600" />
              <Text size="md" text={email} className="text-nowrap" />
            </div>
          );
        },
        value: 'email',
        isSort: true,
      },
      {
        header: 'Date',
        accessor: (invoice: TInvoiceData) => {
          const { attributes: invoiceAttributes } = invoice || {};
          const { date = '' } = invoiceAttributes || {};

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
        value: 'date',
        isSort: true,
      },
      {
        header: 'Status',
        accessor: (invoice: TInvoiceData) => {
          const { attributes: invoiceAttributes } = invoice || {};
          const { status = InvoiceStatus.PENDING } = invoiceAttributes || {};

          return <InvoiceStatusComponent variant={status} />;
        },
        value: 'status',
        isSort: true,
      },
      {
        accessor: (invoice: TInvoiceData) => {
          const { attributes: invoiceAttributes } = invoice || {};
          const { isSelected = false, invoiceId = '' } =
            invoiceAttributes || {};

          return (
            <StarButton
              id={invoiceId}
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

        accessor: (invoice: TInvoiceData) => {
          const { id } = invoice || {};

          return (
            <DropdownActions id={id} onEdit={onEdit} onDelete={onDelete} />
          );
        },
      },
    ],
    [handleDeleteMultiple, onDelete, onEdit, onToggleSelectStar],
  );

  const handleSelectChange = useCallback(
    (keys: Selection) => {
      const ids =
        typeof keys === 'string'
          ? data.map((invoice) => invoice.id)
          : Array.from(keys).map(Number);

      setSelectedInvoiceIds(ids);
    },
    [data],
  );

  return (
    <div className="flex flex-col gap-10">
      <Table
        selectionMode="multiple"
        // Simulate data
        columns={mappingContentColumns}
        data={data}
        onSort={onSort}
        onSelectChange={handleSelectChange}
        onRowAction={onRowAction}
      />

      <Pagination total={total} />
    </div>
  );
};

export default InvoicesTable;
