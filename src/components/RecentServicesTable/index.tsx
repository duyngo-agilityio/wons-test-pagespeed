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
        accessor: (data: TRecentServices) => <Text text={`#${data.orderID}`} />,
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
            <Text text={data.serviceName} />
          </div>
        ),
        isSort: true,
      },
      {
        header: 'Price',
        accessor: (data: TRecentServices) => (
          <Text text={`$${formatPrice(data.price)}`} />
        ),
        isSort: true,
      },
      {
        header: 'Total Order',
        accessor: (data: TRecentServices) => (
          <Chip className="bg-blue-500/20 text-blue-500 px-5 py-2 rounded-[8.45px]">
            {data.totalOrder}
          </Chip>
        ),
        isSort: true,
      },
      {
        header: 'Total Amount',
        accessor: (data: TRecentServices) => (
          <Text text={`$${formatPrice(data.totalAmount)}`} />
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
