'use client';

import { Skeleton } from '@nextui-org/react';

// Components
import { TableSkeleton } from '@/components';

export const MAPPING_CUSTOMER_LIST_SKELETON = [
  {
    header: 'Name',
    accessor: () => (
      <div className="flex gap-3.5 items-center min-w-36">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-8 w-3/5 rounded-lg" />
      </div>
    ),
  },
  {
    header: 'Email',
    accessor: () => <Skeleton className="h-8 w-4/5 rounded-lg" />,
  },
  {
    header: 'Phone Number ',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    header: 'Gender',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
];

const CustomerListSkeleton = () => (
  <TableSkeleton
    variant="primary"
    isStriped={false}
    columns={MAPPING_CUSTOMER_LIST_SKELETON}
  />
);

export default CustomerListSkeleton;
