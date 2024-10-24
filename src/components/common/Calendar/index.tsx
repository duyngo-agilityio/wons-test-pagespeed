'use client';

import { memo, useState } from 'react';
import { Calendar, CalendarProps, DateValue } from '@nextui-org/react';
import { getLocalTimeZone, today } from '@internationalized/date';

// Components
import { Text } from '@/components';

interface CalendarCustomProps extends CalendarProps {
  onDateSelect: (value: DateValue) => void;
}

const CalendarCustom = ({
  value = today(getLocalTimeZone()),
  onDateSelect,
  ...props
}: CalendarCustomProps) => {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(value);

  const [currentMonth, setCurrentMonth] = useState<number>(
    value?.month ?? today(getLocalTimeZone()).month,
  );
  const [currentYear, setCurrentYear] = useState<number>(
    value?.year ?? today(getLocalTimeZone()).year,
  );

  const todayDate = today(getLocalTimeZone());

  const handleDateChange = (date: DateValue) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  // Handler for focus changes to track the displayed month
  const handleFocusChange = (date: DateValue | null) => {
    if (date) {
      const { month, year } = date;
      if (month !== currentMonth || year !== currentYear) {
        setCurrentMonth(month);
        setCurrentYear(year);
      }
    }
  };

  const isCurrentMonth =
    currentMonth === todayDate.month && currentYear === todayDate.year;

  const displayDate = new Date(
    currentYear,
    currentMonth - 1,
    selectedDate?.day ?? 1,
  );

  const formattedDisplayDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(displayDate);

  return (
    <Calendar
      aria-label="Calendar"
      value={selectedDate}
      onChange={handleDateChange}
      onFocusChange={handleFocusChange}
      prevButtonProps={{ className: 'absolute right-10' }}
      nextButtonProps={{ className: 'dark:text-white' }}
      classNames={{
        base: `dark:bg-gray-400 bg-white border border-white solid overflow-hidden ${
          isCurrentMonth ? 'current-month' : 'other-month'
        }`,
        headerWrapper: 'dark:bg-gray-400',
        title: 'text-white dark:text-white/80 z-[-1]',
        gridBody: 'bg-white dark:bg-gray-400',
        cellButton: `
        data-[selected=true]:bg-blue-500
        dark:data-[selected=true]:bg-purple-600
        dark:data-[selected=true]:text-black
        data-[today=true]:bg-purple-500
        `,
        gridHeader: 'dark:bg-gray-400',
        header: 'z-[-1]',
        gridHeaderCell:
          'text-blue-800 dark:text-white/80 font-normal dark:bg-gray-400',
        cell: 'text-[12.64px] leading-[16.46px]',
      }}
      topContent={
        <div className="flex absolute w-4/5 justify-between top-[17px] right-[24px] z-100 bg-white dark:bg-gray-400">
          <Text text={formattedDisplayDate} className="z-100" />
        </div>
      }
      {...props}
    />
  );
};

export default memo(CalendarCustom);
