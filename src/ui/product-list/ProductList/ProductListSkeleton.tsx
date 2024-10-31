'use client';

import { Skeleton } from '@nextui-org/react';

// Components
import { TableSkeleton } from '@/components';

// Layouts
import { TableLayout } from '@/layouts';

// Constants
import { TABLE_TITLES } from '@/constants';

const MAPPING_PRODUCT_SKELETON = [
  {
    header: 'SN',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
    isSort: true,
  },
  {
    header: 'Name',
    accessor: () => (
      <div className="flex gap-2 items-center">
        <Skeleton className="h-8 w-10/12 rounded-lg" />
      </div>
    ),
    isSort: true,
  },
  {
    header: 'Price',
    accessor: () => <Skeleton className="h-8 w-3/6 rounded-lg" />,
    isSort: true,
  },
  {
    header: 'Total Order',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
    isSort: true,
  },
  {
    header: 'Total Sale',
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
    isSort: true,
  },
  {
    accessor: () => <Skeleton className="h-8 w-3/5 rounded-lg" />,
  },
];

const ProductListSkeleton = () => (
  <TableLayout title={TABLE_TITLES.TOP_SELLING_PRODUCTS}>
    <TableSkeleton columns={MAPPING_PRODUCT_SKELETON} />
  </TableLayout>
);

export default ProductListSkeleton;
