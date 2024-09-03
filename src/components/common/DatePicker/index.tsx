'use client';

// Libs
import React from 'react';
import {
  DatePicker as DatePickerNextUI,
  DatePickerProps,
} from '@nextui-org/react';

// Icons
import { CalendarIcon } from '@/icons';

const DatePicker = ({ ...props }: DatePickerProps) => {
  return (
    <DatePickerNextUI
      labelPlacement="outside"
      endContent={<CalendarIcon className="w-[18px] h-5" />}
      dateInputClassNames={{
        inputWrapper: [
          'px-5 pt-[17px] pb-[14px] h-12.5',
          'rounded-10',
          'bg-gray-50 dark:bg-gray-600',
        ],
        input: ['text-md font-dm-sans', 'color-blue-800 dark:color-white'],
        label: ['text-xl font-medium font-dm-sans'],
      }}
      {...props}
    />
  );
};

export default DatePicker;
