'use client';

// Types
import { TableColumnType } from '@/types';

// Utils
import { InsertSkeletonRow } from '@/utils';

// Components
import { Table } from '@/components/common';

interface ITableSkeleton {
  columns: TableColumnType<Record<string, number>>[];
  quantity?: number;
  variant?: 'primary' | 'secondary';
  isStriped?: boolean;
}

const TableSkeleton = ({
  quantity = 4,
  variant = 'secondary',
  columns,
  isStriped = true,
}: ITableSkeleton) => (
  <Table
    isStriped={isStriped}
    variant={variant}
    columns={columns}
    data={InsertSkeletonRow(quantity)}
  />
);

export default TableSkeleton;
