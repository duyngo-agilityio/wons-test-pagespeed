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
  ImageFallback,
  Table,
  Text,
  DropdownActions,
  MdDelete,
  Button,
  StarButton,
} from '@/components';
import Link from 'next/link';

const Pagination = dynamic(() => import('@/components/common/Pagination'));
const ConfirmModal = dynamic(() => import('@/components/common/ConfirmModal'));

type TInvoiceData = TInvoiceDataResponse;

type TInvoicesTableProps = {
  data: TInvoiceData[];
  pageCount: number;
  isReadOnly?: boolean;
  onEdit: (id: number) => void;
  onDelete: (invoiceId: number, invoiceProductIds: number[]) => void;
  onDeleteMultiple: (ids: number[], invoiceProductIds: number[]) => void;
  onToggleSelectStar: (id: number, isSelected: boolean) => void;
  onSort: (field: string) => void;
  onRowAction: (key: Key) => void;
};

const InvoicesTable = ({
  data = [],
  pageCount,
  isReadOnly = true,
  onEdit,
  onDelete,
  onDeleteMultiple,
  onToggleSelectStar,
  onSort,
  onRowAction,
}: TInvoicesTableProps): JSX.Element => {
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = useCallback(
    (invoiceId: number) => {
      const deletedInvoice = data.find((invoice) => {
        const { id } = invoice || {};

        return invoiceId === id;
      });

      const { attributes } = deletedInvoice || {};
      const { invoice_products: invoiceProducts } = attributes || {};
      const { data: invoiceProductsData = [] } = invoiceProducts || {};

      const invoiceProductIds = invoiceProductsData.map((item) => {
        const { id } = item || {};

        return id;
      });

      onDelete(invoiceId, invoiceProductIds);
    },
    [data, onDelete],
  );

  const handleOpenConfirmModal = useCallback(() => setIsModalOpen(true), []);

  const handleConfirmDeleteMultiple = useCallback(() => {
    const deletedInvoiceProductIds: number[] = [];

    selectedInvoiceIds.forEach((invoiceId) => {
      const deletedInvoice = data.find((invoice) => {
        const { id } = invoice || {};

        return invoiceId === id;
      });

      const { attributes } = deletedInvoice || {};
      const { invoice_products: invoiceProducts } = attributes || {};
      const { data: invoiceProductsData = [] } = invoiceProducts || {};

      const invoiceProductIds = invoiceProductsData.map((item) => {
        const { id } = item || {};

        return id;
      });

      deletedInvoiceProductIds.push(...invoiceProductIds);
    });

    onDeleteMultiple(selectedInvoiceIds, deletedInvoiceProductIds);
    setIsModalOpen(false);
  }, [data, onDeleteMultiple, selectedInvoiceIds]);

  const handleCancelDeleteMultiple = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const mappingContentColumns = useMemo(
    () =>
      [
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
              <div className="flex gap-3.5 items-center h-9">
                <ImageFallback
                  src={avatar}
                  alt="customer avatar"
                  width={36}
                  height={36}
                  sizes="36px"
                  className="rounded-full h-full object-cover"
                />
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
                <Link href={`mailto:${email}`}>
                  <Text size="md" text={email} className="text-nowrap" />
                </Link>
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
            const { attributes: invoiceAttributes, id } = invoice || {};
            const { isSelected = false } = invoiceAttributes || {};

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
          ...(!isReadOnly && {
            header: (
              <Button
                data-testid="multiple-delete-btn"
                isIconOnly
                isDisabled={!selectedInvoiceIds.length}
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
                <DropdownActions
                  id={id}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                />
              );
            },
          }),
        },
      ].filter((item) => Object.keys(item).length !== 0),
    [
      handleDelete,
      handleOpenConfirmModal,
      isReadOnly,
      onEdit,
      onToggleSelectStar,
      selectedInvoiceIds.length,
    ],
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
        selectionMode={!isReadOnly ? 'multiple' : 'none'}
        columns={mappingContentColumns}
        data={data}
        onSort={onSort}
        onSelectChange={handleSelectChange}
        onRowAction={onRowAction}
      />

      {pageCount > 0 && <Pagination total={pageCount} />}

      {isModalOpen && (
        <ConfirmModal
          title="Delete Item"
          content="Are you sure you want to delete these items?"
          isOpen={isModalOpen}
          onConfirm={handleConfirmDeleteMultiple}
          onCancel={handleCancelDeleteMultiple}
        />
      )}
    </div>
  );
};

export default InvoicesTable;
