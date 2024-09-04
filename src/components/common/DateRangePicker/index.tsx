'use client';

import React, { useState, useCallback } from 'react';
import { getLocalTimeZone } from '@internationalized/date';
import {
  DateRangePicker as DateRangePickerBase,
  DateRangePickerProps,
  DateValue,
  RangeValue,
} from '@nextui-org/react';

// Utils
import { currentDate, formatDate, getStartTimeDatePicker } from '@/utils';

// Types
import { DateRangeState } from '@/types';

// Icons
import { FaChevronDown } from 'react-icons/fa6';

interface DateRangePickerBaseProps extends DateRangePickerProps {}

const DateRangePicker = ({
  minValue,
  maxValue,
  ...rest
}: DateRangePickerBaseProps) => {
  const [dateRange, setDateRange] = useState<DateRangeState | null>(
    getStartTimeDatePicker(6),
  );

  const [isOpenRangePicker, setIsOpenRangePicker] = useState(false);

  const handleOpenDatePicker = useCallback(
    () => setIsOpenRangePicker((prev) => !prev),
    [setIsOpenRangePicker],
  );

  const handleOnChangeDateRangePicker = useCallback(
    (value: RangeValue<DateValue>) => {
      setIsOpenRangePicker(false);
      setDateRange(value);
    },
    [setDateRange, setIsOpenRangePicker],
  );

  return (
    <div className="max-w-[290.5px] relative">
      <div className="flex gap-[15.85px]">
        {dateRange &&
          Object.keys(dateRange).map((key) => (
            <div
              key={key}
              className="flex w-full relative bg-white dark:bg-gray-400 : rounded-[5.28px] h-[42.25px] items-center"
            >
              <p className="text-[15.02px] ml-[17.96px]">
                {formatDate(
                  dateRange?.[key as keyof typeof dateRange].toDate(
                    getLocalTimeZone(),
                  ),
                )}
              </p>
              <div className="absolute flex items-center h-full right-0 px-2">
                <button
                  className="flex h-[15px] w-[15px] justify-center items-center rounded-full hover:bg-gray-100"
                  onClick={handleOpenDatePicker}
                >
                  <FaChevronDown className="w-[8.43px]" />
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="absolute z-[-1] w-full top-0">
        <DateRangePickerBase
          classNames={{
            innerWrapper: 'z-[-1]',
          }}
          className="h-[42.25px]"
          isOpen={isOpenRangePicker}
          value={dateRange}
          label="Date Range Picker"
          minValue={minValue}
          maxValue={maxValue ?? currentDate}
          onChange={handleOnChangeDateRangePicker}
          {...rest}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
