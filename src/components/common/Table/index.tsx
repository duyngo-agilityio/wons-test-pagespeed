'use client';

import { memo, ReactNode } from 'react';
import { clsx } from 'clsx';
import isEqual from 'react-fast-compare';
import {
  Table as BaseTable,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';

// Icons
import { IoCaretDown } from 'react-icons/io5';

// Types
import { TableColumnType, TTableAccessor } from '@/types';

type VariantTable = 'primary' | 'secondary';

interface CustomTableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  variant?: VariantTable;
  isStriped?: boolean;
}

const TableCustom = <T extends { id: string }>({
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

  const TableClasses = {
    primary: {
      header: 'bg-gray-50 dark:bg-gray-600 px-[25px]',
      table:
        'border-separate border-spacing-x-0 border-spacing-y-[10px] bg-gray-50 dark:bg-gray-600',
      td: 'last:rounded-r-lg',
      cell: 'text-[10px] sm:text-[14px] leading-[18px] py-[25px] px-[25px]',
    },
    secondary: {
      header: 'bg-white dark:bg-gray-400 border-b-[1px] px-[21px]',
      table:
        'px-0 dark:[&>tbody>*:nth-child(odd)]:bg-gray-400 dark:[&>tbody>*:nth-child(even)]:bg-gray-600',
      td: 'last:rounded-r-lg',
      cell: 'leading-[17px] py-[17px] px-[21px]',
    },
  };

  return (
    <BaseTable
      {...(isStriped && { isStriped: true })}
      classNames={{
        wrapper: 'p-0 shadow-none dark:bg-gray-400',
        table: TableClasses[variant].table,
        td: clsx('first:rounded-l-lg', TableClasses[variant].td),
        th: ['first:rounded-l-none last:rounded-r-none'],
      }}
    >
      <TableHeader className="border-spacing-y-0">
        {columns.map((columnConfig, index) => {
          const { header, isSort } = columnConfig;

          return (
            <TableColumn
              key={`${header}${index}`}
              className={clsx('py-0', TableClasses[variant].header)}
            >
              <div className="flex opacity-70 gap-2 items-center text-blue-800 dark:text-white font-normal text-[13px] leading-[17px]">
                {header}
                {isSort && <IoCaretDown />}
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
            className={
              isStriped ? 'rounded-[5px]' : 'bg-white dark:bg-gray-400 '
            }
          >
            {columns.map((columnConfig, indexColumn) => (
              <TableCell
                key={`table-cell-${indexColumn}`}
                className={TableClasses[variant].cell}
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

export const Table = memo(TableCustom, isEqual) as <T>(
  props: CustomTableProps<T>,
) => JSX.Element;
