'use client';

import {
  extendVariants,
  Pagination as NextUIPagination,
  PaginationProps as NextUIPaginationProps,
} from '@nextui-org/react';

import { useSearchParams } from 'next/navigation';

// themes
import { colors } from '@/themes';

export const CustomPagination = extendVariants(NextUIPagination, {
  variants: {
    color: {
      primary: {
        item: 'text-foreground hover:bg-primary hover:bg-opacity-25  ',
        wrapper: 'text-white',
        cursor: `bg-[${colors.blue[500]}]`,
      },
    },
  },

  defaultVariants: {
    color: 'primary',
  },
});

export type PaginationProps = {
  handlePageChange: (page: number) => void;
} & NextUIPaginationProps;

const Pagination = ({ handlePageChange, ...props }: PaginationProps) => {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams?.get('page')) || 1;

  return (
    <CustomPagination
      page={currentPage}
      onChange={handlePageChange}
      className="flex justify-center m-0"
      {...props}
    />
  );
};

export default Pagination;
