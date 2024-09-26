'use client';

import { useState } from 'react';
import { Calendar, CalendarProps, DateValue } from '@nextui-org/react';
import { getLocalTimeZone, today } from '@internationalized/date';

// Utils
import { formatDateCalendar } from '@/utils';

// Components
import { Text } from '@/components';

const CalendarCustom = ({
  value = today(getLocalTimeZone()),
  ...props
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(value);

  return (
    <Calendar
      aria-label="Calendar"
      value={selectedDate}
      onFocusChange={setSelectedDate}
      prevButtonProps={{ className: 'absolute right-10' }}
      nextButtonProps={{ className: 'dark:text-white' }}
      classNames={{
        base: 'dark:bg-gray-400 border border-white solid overflow-hidden',
        headerWrapper: 'dark:bg-gray-400',
        title: 'text-white dark:text-white/80 z-[-1]',
        gridBody: 'bg-white dark:bg-gray-400',
        cellButton:
          'data-[selected=true]:bg-blue-500 dark:data-[selected=true]:bg-purple-600 dark:data-[selected=true]:text-black',
        gridHeader: 'dark:bg-gray-400',
        header: 'z-[-1]',
        gridHeaderCell:
          'text-blue-800 dark:text-white/80 font-normal dark:bg-gray-400',
      }}
      topContent={
        <div className="flex absolute w-4/5 flex justify-between top-[17px] right-[24px] z-100 bg-white dark:bg-gray-400">
          <Text
            text={formatDateCalendar(selectedDate ?? today(getLocalTimeZone()))}
            className="z-100"
          />
        </div>
      }
      {...props}
    />
  );
};

export default CalendarCustom;
