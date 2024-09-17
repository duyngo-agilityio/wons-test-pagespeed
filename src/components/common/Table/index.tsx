'use client';

import { Key, memo, ReactNode, useCallback } from 'react';
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
  Selection,
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
  isStripedRow?: boolean;
  selectionMode?: 'single' | 'multiple' | 'none';
  onSelectionChange?: (keys: string) => void;
  sortBy?: string;
  order?: string;
  onSort?: (value: string) => void;
  newData?: T;
  onSelectChange?: (keys: Selection) => void;
  onRowAction?: (key: Key) => void;
}

const TableCustom = <T extends { id: string }>({
  columns,
  data,
  newData,
  variant = 'primary',
  isStriped = false,
  isStripedRow = false,
  selectionMode = 'none',
  order = ORDER.ASC,
  sortBy = '',
  onSort,
  onSelectChange = () => {},
  onRowAction,
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
      header:
        'bg-white dark:bg-gray-400 border-b-[1px] border-blue-800/5 px-[21px]',
      table:
        'px-0 dark:[&>tbody>*:nth-child(odd)]:bg-gray-400 [&>tbody>*:nth-child(even)]:bg-gray-50/50 dark:[&>tbody>*:nth-child(even)]:bg-gray-600',
      td: 'last:rounded-r-lg',
      cell: 'leading-[17px] py-[17px] px-[21px]',
    },
  };

  const dataTable = data.length === 0 && newData ? [newData] : data;

  const handleSelectChange = useCallback(
    (keys: Selection) => onSelectChange(keys),

    [onSelectChange],
  );

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
        wrapper: clsx(
          'p-0 shadow-none dark:bg-gray-400',
          isStripedRow && 'rounded-none',
        ),
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
      onSelectionChange={handleSelectChange}
      onRowAction={onRowAction}
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
              className={clsx(
                'py-0',
                TableClasses[variant].header,
                isStripedRow && 'border-none',
              )}
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
      <TableBody emptyContent={'No Records found.'}>
        {dataTable.map((item) => (
          <TableRow
            key={item.id}
            data-id={item.id}
            className={clsx(
              isStripedRow &&
                'border-b-1 border-gray-50 dark:border-gray-50/50 dark:!bg-gray-400',
              isStriped ? 'rounded-[5px]' : 'bg-white dark:bg-gray-400',
            )}
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
