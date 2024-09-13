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
  Button,
} from '@nextui-org/react';

// Icons
import { IoCaretDown } from 'react-icons/io5';

// Types
import { TableColumnType, TTableAccessor } from '@/types';

// Constants
import { ORDER } from '@/constants';

type VariantTable = 'primary' | 'secondary';

interface CustomTableProps<T> {
  columns: TableColumnType<T>[];
  data: T[];
  variant?: VariantTable;
  isStriped?: boolean;
  selectionMode?: 'single' | 'multiple' | 'none';
  onSelectionChange?: (keys: string) => void;
  sortBy?: string;
  order?: string;
  onSort?: (value: string) => void;
}

const TableCustom = <T extends { id: string }>({
  columns,
  data,
  variant = 'primary',
  isStriped = false,
  selectionMode = 'none',
  order = ORDER.ASC,
  sortBy = '',
  onSort,
}: CustomTableProps<T>) => {
  const renderCell = (item: T, accessor: TTableAccessor<T>): ReactNode => {
    if (typeof accessor === 'string')
      return <div>{item[accessor] as ReactNode}</div>;

    if (typeof accessor === 'function') return accessor(item);
  };

  const TableClasses = {
    primary: {
      header: 'bg-gray-50 dark:bg-gray-600 px-[17px]',
      table:
        'border-separate border-spacing-x-0 border-spacing-y-[10px] bg-gray-50 dark:bg-gray-600',
      td: 'last:rounded-r-lg',
      cell: 'text-[10px] sm:text-[14px] leading-[18px] py-[17px] px-[17px]',
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
      selectionMode={selectionMode}
      checkboxesProps={{
        classNames: {
          wrapper: [
            'after:bg-blue-500 dark:after:bg-purple-600',
            'after:hover:bg-blue-500 dark:after:hover:bg-purple-600',
            'before:border-blue-800/30 dark:before:border-white/30',
            'rounded-sm',
            'before:rounded-sm',
            'after:rounded-sm',
            'w-5 h-5',
            'mx-4',
            'before:border',
          ],
          icon: 'text-white dark:text-gray-400',
        },
      }}
      classNames={{
        base: 'grid',
        wrapper: 'p-0 shadow-none dark:bg-gray-400',
        table: TableClasses[variant].table,
        td: clsx(
          'first:rounded-l-lg',
          TableClasses[variant].td,
          TableClasses[variant].cell,
        ),
        th: [
          clsx(
            'first:rounded-l-none last:rounded-r-none',
            TableClasses[variant].header,
          ),
        ],
      }}
    >
      <TableHeader className="border-spacing-y-0">
        {columns.map((columnConfig, index) => {
          const { value, header, isSort } = columnConfig;

          const handleSort = () => {
            onSort?.(value as string);
          };

          return (
            <TableColumn
              key={`${header}${index}`}
              className={clsx('py-0', TableClasses[variant].header)}
            >
              <Button
                value={value}
                className="justify-start p-0 !bg-transparent dark:!bg-transparent hover:!bg-transparent dark:hover:!bg-transparent flex opacity-70 gap-2 items-center text-blue-800 dark:text-white font-normal text-[13px] leading-[17px]"
                onClick={handleSort}
              >
                {header}
                {isSort && (
                  <IoCaretDown
                    className={clsx(
                      value === sortBy && order === ORDER.DESC && 'rotate-180',
                    )}
                  />
                )}
              </Button>
            </TableColumn>
          );
        })}
      </TableHeader>
      <TableBody emptyContent={'No rows to display.'}>
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
