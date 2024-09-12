'use client';

import { memo, useMemo } from 'react';
import { Chip } from '@nextui-org/react';

// Utils
import { formatPrice, formatTotalAmount } from '@/utils';

// Models
import { TInvoiceProduct, IProduct } from '@/models';

// Components
import { Image, Table, Text } from '@/components/common';
import { StrapiModel } from '@/types';

interface IRecentServicesTable {
  data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[];
}

const RecentServicesTable = ({ data }: IRecentServicesTable) => {
  const mappingContentColumns = useMemo(
    () => [
      {
        header: 'Order ID',
        accessor: (
          data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>,
        ) => <Text size="sm" text={`#${data.id}`} />,
        isSort: true,
      },
      {
        header: 'Service Name',
        accessor: (
          data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>,
        ) => (
          <div className="flex gap-2 items-center">
            <div className="relative w-8 h-8">
              <Image
                fill
                src={data.attributes.product.data.attributes.imageUrl}
                alt="ui-ux-design"
                className="rounded-5"
              />
            </div>
            <Text
              size="sm"
              text={data.attributes.product.data.attributes.title}
            />
          </div>
        ),
        isSort: true,
      },
      {
        header: 'Price',
        accessor: (
          data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>,
        ) => <Text size="sm" text={`$${formatPrice(data.attributes.price)}`} />,
        isSort: true,
      },
      {
        header: 'Total Order',
        accessor: (
          data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>,
        ) => (
          <Chip
            classNames={{
              base: [
                'w-[61px] max-w-[61px] h-7.5 max-h-7.5 rounded-[8px]',
                'bg-blue-500/20 dark:bg-purple-600/20',
              ],
              content: ['text-center text-sm', 'text-blue-500 dark:text-white'],
            }}
          >
            {data.attributes.quantity}
          </Chip>
        ),
        isSort: true,
      },
      {
        header: 'Total Amount',
        accessor: (
          data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>,
        ) => (
          <Text
            size="sm"
            text={`$${formatTotalAmount(data.attributes.price, data.attributes.quantity)}`}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Table
      isStriped
      variant="secondary"
      // Simulate data
      columns={mappingContentColumns}
      data={data}
    />
  );
};

export default memo(RecentServicesTable);
