'use client';

import React, { memo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input, InputProps } from '@nextui-org/react';

// Constants
import { SEARCH_PARAMS } from '@/constants';

// Components
import { CiSearch } from '@/components';

const SearchInput = ({ ...props }: InputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const defaultValueSearch: string = searchParams
    ?.get(SEARCH_PARAMS.QUERY)
    ?.toString() as string;

  const { NUMBER_PAGE, PAGE, QUERY } = SEARCH_PARAMS;

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      const params = new URLSearchParams(searchParams);

      params.set(PAGE, NUMBER_PAGE[1]);

      if (term) {
        params.set(QUERY, term);
      } else {
        params.delete(QUERY);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    2000,
  );

  return (
    <Input
      classNames={{
        input: [
          'bg-white dark:bg-gray-400',
          '!text-blue-800/70',
          'placeholder:text-sm placeholder:text-blue-800/50',
        ],
        inputWrapper: ['pl-5 pr-3.5 py-3', 'max-w-[230px]'],
      }}
      placeholder="Search"
      defaultValue={defaultValueSearch}
      onChange={handleSearch}
      endContent={<CiSearch className="w-3 h-3 text-blue-800/60" />}
      {...props}
    />
  );
};

export default memo(SearchInput);
