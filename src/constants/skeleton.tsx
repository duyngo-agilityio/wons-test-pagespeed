'use client';

import { Skeleton } from '@nextui-org/react';

export const MAPPING_RECENT_SERVICES_SKELETON = [
  {
    header: 'Order ID',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
    isSort: true,
  },
  {
    header: 'Service Name',
    accessor: () => (
      <div className="flex gap-2 items-center">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-3/5 rounded-lg" />
      </div>
    ),
    isSort: true,
  },
  {
    header: 'Price',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
    isSort: true,
  },
  {
    header: 'Total Order',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
    isSort: true,
  },
  {
    header: 'Total Amount',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
];
