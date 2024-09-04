'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import {
  Table as BaseTable,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';

// Icons
import { ArrowDownIcon } from '@/icons';

export type TTableAccessor<T> =
  | ((item: T, inputProps?: object) => ReactNode)
  | keyof T;

export interface TableColumnType<T> {
  accessor: TTableAccessor<T>;
  header?: string | ReactNode;
  isSort?: boolean;
}

type VariantTable = 'primary' | 'secondary';

interface CustomTableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  variant?: VariantTable;
  isStriped?: boolean;
}

const Table = <T extends { id: string }>({
  columns,
  data,
  variant = 'primary',
  isStriped = false,
}: CustomTableProps<T>) => {
  const renderCell = (item: T, accessor: TTableAccessor<T>): ReactNode => {
    if (typeof accessor === 'string')
      return <div>{item[accessor] as ReactNode}</div>;

    if (typeof accessor === 'function') return accessor(item);
  };

  const TableHeaderClass =
    variant === 'primary'
      ? 'bg-gray-50 px-[25px]'
      : 'bg-white border-b-[1px] px-[21px]';

  const TableClass =
    variant === 'primary'
      ? 'border-separate border-spacing-x-0 border-spacing-y-[10px] bg-gray-50'
      : 'px-0';

  const TableTdClass =
    variant === 'primary'
      ? 'last:rounded-r-lg'
      : 'group-data-[odd=true]:before:bg-gray-50';

  const TableCellClass =
    variant === 'primary'
      ? 'leading-[18px] py-[25px] px-[25px]'
      : 'leading-[17px] py-[17px] px-[21px]';

  return (
    <BaseTable
      {...(isStriped && { isStriped: true })}
      classNames={{
        wrapper: 'p-0 shadow-none',
        table: TableClass,
        td: clsx('first:rounded-l-lg', TableTdClass),
        th: ['first:rounded-l-none last:rounded-r-none'],
      }}
    >
      <TableHeader className="border-spacing-y-0">
        {columns.map((columnConfig, index) => {
          const { header, isSort } = columnConfig;

          return (
            <TableColumn
              key={`${header}${index}`}
              className={clsx('py-0', TableHeaderClass)}
            >
              <div className="flex gap-2 items-center text-blue-800 font-normal text-[13px] leading-[17px]">
                {header}
                {isSort && <ArrowDownIcon />}
              </div>
            </TableColumn>
          );
        })}
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={`table-row-${item.id}`}
            data-id={item.id}
            className={isStriped ? 'rounded-[5px]' : 'bg-white'}
          >
            {columns.map((columnConfig, indexColumn) => (
              <TableCell
                key={`table-cell-${indexColumn}`}
                className={TableCellClass}
              >
                {renderCell(item, columnConfig.accessor)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </BaseTable>
  );
};

export default Table;
