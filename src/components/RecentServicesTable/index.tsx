'use client';

import { memo, useMemo } from 'react';
import { Chip } from '@nextui-org/react';

// Utils
import { formatPrice } from '@/utils';

// Models
import { TRecentServices } from '@/models';

// Components
import { Image, Table, Text } from '@/components/common';

interface IRecentServicesTable {
  data: TRecentServices[];
}

const RecentServicesTable = ({ data }: IRecentServicesTable) => {
  const mappingContentColumns = useMemo(
    () => [
      {
        header: 'Order ID',
        accessor: (data: TRecentServices) => (
          <Text size="sm" text={`#${data.orderID}`} />
        ),
        isSort: true,
      },
      {
        header: 'Service Name',
        accessor: (data: TRecentServices) => (
          <div className="flex gap-2 items-center">
            <Image
              src={data.image}
              alt="ui-ux-design"
              width={32}
              height={32}
              className="rounded-5"
            />
            <Text size="sm" text={data.serviceName} />
          </div>
        ),
        isSort: true,
      },
      {
        header: 'Price',
        accessor: (data: TRecentServices) => (
          <Text size="sm" text={`$${formatPrice(data.price)}`} />
        ),
        isSort: true,
      },
      {
        header: 'Total Order',
        accessor: (data: TRecentServices) => (
          <Chip
            classNames={{
              base: [
                'w-[61px] max-w-[61px] h-7.5 max-h-7.5 rounded-[8px]',
                'bg-blue-500/20 dark:bg-purple-600/20',
              ],
              content: ['text-center text-sm', 'text-blue-500 dark:text-white'],
            }}
          >
            {data.totalOrder}
          </Chip>
        ),
        isSort: true,
      },
      {
        header: 'Total Amount',
        accessor: (data: TRecentServices) => (
          <Text size="sm" text={`$${formatPrice(data.totalAmount)}`} />
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
