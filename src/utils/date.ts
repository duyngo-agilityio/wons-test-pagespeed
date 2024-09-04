import { DateRangeState } from '@/types';
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';

const customDateFormatter = new DateFormatter('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/***
 * Function format date dd-mm-yyyy
 */
export const formatDate = (date: Date | undefined) => {
  const formattedDate = customDateFormatter.format(date ?? new Date());
  return formattedDate.replace(/\//g, '-');
};

/**
 * Function get start time for DatePicker
 */
export const getStartTimeDatePicker = (date: number) => {
  // Get the current date in the local timezone
  const currentDate = today(getLocalTimeZone());

  // Default start date is three days before the current date
  const defaultStartTime = currentDate.add({
    days: -date,
  });

  const defaultStartTimeIso = `${defaultStartTime.year}-${String(defaultStartTime.month).padStart(2, '0')}-${String(defaultStartTime.day).padStart(2, '0')}`;

  const defaultValue: DateRangeState = {
    start: parseDate(defaultStartTimeIso),
    end: currentDate,
  };

  return defaultValue;
};

/**
 * Function Get current date
 */
export const currentDate = today(getLocalTimeZone());
