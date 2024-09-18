import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';

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
