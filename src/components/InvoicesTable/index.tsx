'use client';

// Libs
import { Key, useCallback, useMemo, useState } from 'react';
import { Selection } from '@nextui-org/react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

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
} from '@/components';

const Pagination = dynamic(() => import('@/components/common/Pagination'));
const ConfirmModal = dynamic(() => import('@/components/common/ConfirmModal'));

type TInvoiceData = TInvoiceDataResponse;

type TInvoicesTableProps = {
  data: TInvoiceData[];
  total: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteMultiple: (ids: number[]) => void;
  onToggleSelectStar: (id: string) => void;
  onSort: (field: string) => void;
  onRowAction: (key: Key) => void;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenConfirmModal = useCallback(() => setIsModalOpen(true), []);

  const handleConfirmDelete = useCallback(() => {
    onDeleteMultiple(selectedInvoiceIds);
    setIsModalOpen(false);
  }, [onDeleteMultiple, selectedInvoiceIds]);

  const handleCancelDelete = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
            onClick={handleOpenConfirmModal}
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
    [handleOpenConfirmModal, onDelete, onEdit, onToggleSelectStar],
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

      {total > 0 && <Pagination total={total} />}

      {isModalOpen && (
        <ConfirmModal
          title="Delete Item"
          content="Are you sure you want to delete these items?"
          isOpen={isModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default InvoicesTable;
