'use client';

import { Skeleton } from '@nextui-org/react';

// Components
import { TableSkeleton } from '@/components';

// Layouts
import { TableLayout } from '@/layouts';

export const MAPPING_RECENT_SERVICES_SKELETON = [
  {
    header: 'Order ID',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    header: 'Service Name',
    accessor: () => (
      <div className="flex gap-2 items-center">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-8 w-3/5 rounded-lg" />
      </div>
    ),
  },
  {
    header: 'Price',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    header: 'Total Order',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    header: 'Total Amount',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
];

const RecentServicesSkeleton = () => (
  <TableLayout>
    <TableSkeleton columns={MAPPING_RECENT_SERVICES_SKELETON} />
  </TableLayout>
);

export default RecentServicesSkeleton;
