import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';
import { DateValue } from '@nextui-org/react';

// Types
import { DateRangeState } from '@/types';

// Constants
import { DAYJS_PATTERN } from '@/constants';

dayjs.extend(utc);

/***
 * Function format date
 */
export const formatDate = (date: string | Date, pattern: string) =>
  dayjs(date).utc(true).format(pattern);

/**
 * Function get start time for DatePicker
 */
export const getStartTimeDatePicker = (
  date: number,
  startTime: string,
  endTime: string,
): DateRangeState => {
  // Get the current date in the local timezone
  const currentDate = today(getLocalTimeZone());
  const defaultStartTime = currentDate.add({
    days: -date,
  });
  const defaultStartTimeIso = `${defaultStartTime.year}-${String(
    defaultStartTime.month,
  ).padStart(2, '0')}-${String(defaultStartTime.day).padStart(2, '0')}`;

  return {
    start: parseDate(
      startTime
        ? formatDate(new Date(startTime), DAYJS_PATTERN['YYYY-MM-DD'])
        : defaultStartTimeIso,
    ),

    end: endTime
      ? parseDate(formatDate(new Date(endTime), DAYJS_PATTERN['YYYY-MM-DD']))
      : currentDate,
  };
};

/**
 * Function Get current date
 */
export const currentDate = today(getLocalTimeZone());

export const formatDateByISO = (date: string): string =>
  dayjs(date).utc(true).format();

export const convertToCalendarDate = (
  date?: string,
): CalendarDate | undefined => {
  if (!date) {
    return undefined;
  }

  const [year, month, day] = date.split('-');

  return new CalendarDate(Number(year), Number(month), Number(day));
};

// Function to convert the custom date object to a JavaScript Date object
const convertToDate = (calendarDate: DateValue) => {
  const { day, month, year } = calendarDate;

  // JavaScript Date's month is 0-indexed, so subtract 1 from month
  return new Date(year, month - 1, day);
};

// Function to format the date as "Month Day, Year"
export const formatDateCalendar = (calendarDate: DateValue) => {
  const date = convertToDate(calendarDate);

  // Using JavaScript's Intl.DateTimeFormat API to format the date
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
