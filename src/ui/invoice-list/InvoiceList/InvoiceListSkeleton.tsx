'use client';

import { Skeleton } from '@nextui-org/react';

// Components
import { TableSkeleton } from '@/components';

export const MAPPING_INVOICE_LIST_SKELETON = [
  {
    accessor: () => <Skeleton className="h-8 w-2/5 rounded-lg" />,
  },
  {
    header: 'Invoice Id',
    accessor: () => <Skeleton className="h-8 w-4/5 rounded-lg" />,
  },
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
    header: 'Date ',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    header: 'Status',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
];

const InvoiceListSkeleton = () => (
  <TableSkeleton
    variant="primary"
    quantity={10}
    isStriped={false}
    columns={MAPPING_INVOICE_LIST_SKELETON}
  />
);

export default InvoiceListSkeleton;
