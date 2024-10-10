'use client';

import { memo, useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import isEqual from 'react-fast-compare';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
  ButtonProps,
  PopoverProps,
  PopoverTriggerProps,
  ListboxProps,
  ListboxItemProps,
  PopoverContentProps,
  Selection,
} from '@nextui-org/react';

// Types
import { IFilter } from '@/types';

// Icons
import { FilterIcon } from '../icons';

// Utils
import { formatOptionsSelection } from '@/utils';

// Constants
import { SEARCH_QUERIES } from '@/constants';

// Components
import { Text } from '@/components/common';

interface IFilterProps {
  items: IFilter[];
  title?: string;
  buttonProps?: ButtonProps;
  popoverProps?: PopoverProps;
  popoverTriggerProps?: PopoverTriggerProps;
  popoverContentProps?: PopoverContentProps;
  listboxProps?: ListboxProps;
  listboxItemProps?: ListboxItemProps;
  className?: string;
}

const Filter = ({
  items,
  title = '',
  buttonProps,
  popoverProps,
  popoverTriggerProps,
  popoverContentProps,
  listboxProps,
  listboxItemProps,
  className,
}: IFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [values, setValues] = useState<Selection>(new Set([]));

  const { FILTERS } = SEARCH_QUERIES;

  const handleSelect = useCallback(
    (keys: Selection) => {
      setValues(keys);
      const params = new URLSearchParams(searchParams);
      const value = formatOptionsSelection(keys);

      if (value) {
        params.set(FILTERS, value);
      } else {
        params.delete(FILTERS);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, replace, pathname, FILTERS],
  );

  return (
    <Popover {...popoverProps} className={className}>
      <PopoverTrigger {...popoverTriggerProps}>
        {title && (
          <Button
            className=" w-full bg-blue-500 border-transparent dark:bg-purple-600 text-white hover:bg-blue-100 px-5 py-3 text-md rounded-[10px] border-[1px] h-auto min-w-max font-medium"
            endContent={<FilterIcon />}
            {...buttonProps}
          >
            {title}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-3" {...popoverContentProps}>
        {items.map(({ id, title, items }) => (
          <div className="w-full" key={id}>
            <Text
              text={title}
              className="font-medium border-b-1 border-blue-800/50 pb-1"
            />
            <Listbox
              selectionMode="multiple"
              selectedKeys={values}
              onSelectionChange={handleSelect}
              {...listboxProps}
            >
              {items.map(({ id, content, customElement }) => (
                <ListboxItem key={id} className="px-0" {...listboxItemProps}>
                  {customElement || content}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default memo(Filter, isEqual);
