'use client';

import { memo } from 'react';
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
} from '@nextui-org/react';

// Types
import { IFilter } from '@/types';

// Icons
import { FilterIcon } from '../icons';

// Components
import { Checkbox, Text } from '@/components/common';

interface IFilterProps {
  items: IFilter[];
  title?: string;
  buttonProps?: ButtonProps;
  popoverProps?: PopoverProps;
  popoverTriggerProps?: PopoverTriggerProps;
  popoverContentProps?: PopoverContentProps;
  listboxProps?: ListboxProps;
  listboxItemProps?: ListboxItemProps;
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
}: IFilterProps) => {
  return (
    <Popover {...popoverProps}>
      <PopoverTrigger {...popoverTriggerProps}>
        {title && (
          <Button
            className="bg-blue-500 border-transparent dark:bg-purple-600 text-white hover:bg-blue-100 px-5 py-3 text-md rounded-[10px] border-[1px] h-auto min-w-max font-medium"
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
            <Listbox {...listboxProps}>
              {items.map(({ id, content, customElement }) => (
                <ListboxItem key={id} className="px-0" {...listboxItemProps}>
                  {customElement || <Checkbox>{content}</Checkbox>}
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
