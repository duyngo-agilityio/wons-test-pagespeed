'use client';

import { useCallback } from 'react';
import {
  extendVariants,
  Pagination as NextUIPagination,
  PaginationProps as NextUIPaginationProps,
} from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// themes
import { colors } from '@/themes';

// Constants
import { DEFAULT_PAGE, SEARCH_QUERIES } from '@/constants';

export const CustomPagination = extendVariants(NextUIPagination, {
  variants: {
    color: {
      primary: {
        item: 'text-foreground hover:bg-primary hover:bg-opacity-25',
        wrapper: 'text-white',
        cursor: `bg-[${colors.blue[500]}]`,
      },
    },
  },

  defaultVariants: {
    color: 'primary',
  },
});

const Pagination = ({ ...props }: NextUIPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = searchParams?.get(SEARCH_QUERIES.PAGE) || DEFAULT_PAGE;

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);

      params.set(SEARCH_QUERIES.PAGE, page.toString());

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, replace, searchParams],
  );

  return (
    <CustomPagination
      page={+currentPage}
      onChange={handlePageChange}
      className="flex justify-center m-0"
      {...props}
    />
  );
};

export default Pagination;
