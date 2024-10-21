'use client';

import { Skeleton } from '@nextui-org/react';

// Components
import { TableSkeleton } from '@/components';

// Layouts
import { TableLayout } from '@/layouts';

const MAPPING_PRODUCT_SKELETON = [
  {
    header: 'SN',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    header: 'Name',
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
    header: 'Total Sale',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
  {
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
];

const ProductListSkeleton = () => (
  <TableLayout>
    <TableSkeleton columns={MAPPING_PRODUCT_SKELETON} />
  </TableLayout>
);

export default ProductListSkeleton;
