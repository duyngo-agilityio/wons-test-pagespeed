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
  isStripedRow?: boolean;
}

const TableSkeleton = ({
  quantity = 6,
  variant = 'secondary',
  columns,
  isStriped = true,
  isStripedRow = false,
}: ITableSkeleton) => (
  <Table
    isStriped={isStriped}
    isStripedRow={isStripedRow}
    variant={variant}
    columns={columns}
    data={InsertSkeletonRow(quantity)}
  />
);

export default TableSkeleton;
