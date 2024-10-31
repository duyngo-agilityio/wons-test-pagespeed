import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import {
  getLocalTimeZone,
  parseDate,
  today,
  CalendarDate,
  DateValue,
} from '@internationalized/date';

// Utils
import {
  convertToCalendarDate,
  formatDate,
  formatDateByISO,
  formatDateCalendar,
  formatEventDate,
  formatTo12HourTime,
  formatToCalendarDate,
  getDayOfMonth,
  getStartTimeDatePicker,
} from '../date';

// Mocking the DateValue type
type MockDateValue = {
  day: number;
  month: number;
  year: number;
};

jest.mock('@internationalized/date', () => ({
  ...jest.requireActual('@internationalized/date'),
  today: jest.fn(),
  getLocalTimeZone: jest.fn(),
  parseDate: jest.fn(),
}));

dayjs.extend(utc);

describe('formatDate() formatDate method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should format a Date object correctly with a given pattern', () => {
      // Arrange
      const date = new Date('2023-10-01T00:00:00Z');
      const pattern = 'YYYY-MM-DD';

      // Act
      const result = formatDate(date, pattern);

      // Assert
      expect(result).toBe('2023-10-01');
    });

    it('should format a date string correctly with a given pattern', () => {
      // Arrange
      const date = '2023-10-01T00:00:00Z';
      const pattern = 'YYYY-MM-DD';

      // Act
      const result = formatDate(date, pattern);

      // Assert
      expect(result).toBe('2023-10-01');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle an invalid date string gracefully', () => {
      // Arrange
      const date = 'invalid-date';
      const pattern = 'YYYY-MM-DD';

      // Act
      const result = formatDate(date, pattern);

      // Assert
      expect(result).toBe('Invalid Date');
    });

    it('should handle an empty date string gracefully', () => {
      // Arrange
      const date = '';
      const pattern = 'YYYY-MM-DD';

      // Act
      const result = formatDate(date, pattern);

      // Assert
      expect(result).toBe('Invalid Date');
    });

    it('should handle a null date input gracefully', () => {
      // Arrange
      const date = null as unknown as string; // TypeScript requires a type assertion here
      const pattern = 'YYYY-MM-DD';

      // Act
      const result = formatDate(date, pattern);

      // Assert
      expect(result).toBe('Invalid Date');
    });

    it('should handle a date object with an invalid pattern gracefully', () => {
      // Arrange
      const date = new Date('2023-10-01T00:00:00Z');
      const pattern = 'INVALID_PATTERN';

      // Act
      const result = formatDate(date, pattern);

      // Assert
      expect(result).toBe('INVAMLI1_PAMTTERN');
    });
  });
});

describe('getStartTimeDatePicker() getStartTimeDatePicker method', () => {
  const mockToday = today as jest.Mock;
  const mockGetLocalTimeZone = getLocalTimeZone as jest.Mock;
  const mockParseDate = parseDate as jest.Mock;

  beforeEach(() => {
    mockGetLocalTimeZone.mockReturnValue('UTC');
    mockToday.mockReturnValue({
      year: 2023,
      month: 10,
      day: 10,
      add: jest.fn().mockReturnValue({
        year: 2023,
        month: 10,
        day: 9,
      }),
    });
    mockParseDate.mockImplementation((dateString: string) => dateString);
  });

  describe('Happy Path', () => {
    it('should return correct start and end dates when startTime and endTime are provided', () => {
      const startTime = '2023-10-01';
      const endTime = '2023-10-05';
      const result = getStartTimeDatePicker(1, startTime, endTime);

      expect(result.start).toBe('2023-10-01');
      expect(result.end).toBe('2023-10-05');
    });

    it('should return default start date when startTime is not provided', () => {
      const endTime = '2023-10-05';
      const result = getStartTimeDatePicker(1, '', endTime);

      expect(result.start).toBe('2023-10-09'); // Default start date
      expect(result.end).toBe('2023-10-05');
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative date offset correctly', () => {
      const startTime = '2023-10-01';
      const endTime = '2023-10-05';
      const result = getStartTimeDatePicker(-1, startTime, endTime);

      expect(result.start).toBe('2023-10-01');
      expect(result.end).toBe('2023-10-05');
    });

    it('should handle zero date offset correctly', () => {
      const startTime = '2023-10-01';
      const endTime = '2023-10-05';
      const result = getStartTimeDatePicker(0, startTime, endTime);

      expect(result.start).toBe('2023-10-01');
      expect(result.end).toBe('2023-10-05');
    });
  });
});

describe('formatDateByISO() formatDateByISO method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should format a valid date string to ISO format', () => {
      // Test description: This test checks if a valid date string is correctly formatted to ISO format.
      const date = '2023-10-05T14:48:00.000Z';
      const expected = dayjs(date).utc(true).format();
      expect(formatDateByISO(date)).toBe(expected);
    });

    it('should handle a date string without time and format it to ISO', () => {
      // Test description: This test checks if a date string without time is correctly formatted to ISO format.
      const date = '2023-10-05';
      const expected = dayjs(date).utc(true).format();
      expect(formatDateByISO(date)).toBe(expected);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return "Invalid Date" for an invalid date string', () => {
      // Test description: This test checks if an invalid date string returns "Invalid Date".
      const date = 'invalid-date';
      const expected = 'Invalid Date';
      expect(formatDateByISO(date)).toBe(expected);
    });

    it('should handle an empty string and return "Invalid Date"', () => {
      // Test description: This test checks if an empty string returns "Invalid Date".
      const date = '';
      const expected = 'Invalid Date';
      expect(formatDateByISO(date)).toBe(expected);
    });

    it('should handle a null input gracefully', () => {
      // Test description: This test checks if a null input is handled gracefully and returns "Invalid Date".
      const date = null as unknown as string;
      const expected = 'Invalid Date';
      expect(formatDateByISO(date)).toBe(expected);
    });

    it('should handle a date string with timezone offset', () => {
      // Test description: This test checks if a date string with timezone offset is correctly formatted to ISO format.
      const date = '2023-10-05T14:48:00+02:00';
      const expected = dayjs(date).utc(true).format();
      expect(formatDateByISO(date)).toBe(expected);
    });
  });
});

describe('convertToCalendarDate() convertToCalendarDate method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should convert a valid date string to a CalendarDate object', () => {
      // Arrange
      const dateString = '2023-10-15';

      // Act
      const result = convertToCalendarDate(dateString);

      // Assert
      expect(result).toBeInstanceOf(CalendarDate);
      expect(result?.year).toBe(2023);
      expect(result?.month).toBe(10);
      expect(result?.day).toBe(15);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return undefined for an undefined input', () => {
      // Arrange
      const dateString = undefined;

      // Act
      const result = convertToCalendarDate(dateString);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should return undefined for an empty string input', () => {
      // Arrange
      const dateString = '';

      // Act
      const result = convertToCalendarDate(dateString);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should handle invalid date format gracefully', () => {
      // Arrange
      const dateString = '2023/10/15';

      // Act
      const result = convertToCalendarDate(dateString);

      // Assert
      expect(result).toBeInstanceOf(CalendarDate);
      expect(result?.year).toBeNaN();
      expect(result?.month).toBeNaN();
      expect(result?.day).toBeNaN();
    });

    it('should handle incomplete date strings gracefully', () => {
      // Arrange
      const dateString = '2023-10';

      // Act
      const result = convertToCalendarDate(dateString);

      // Assert
      expect(result).toBeInstanceOf(CalendarDate);
      expect(result?.year).toBe(2023);
      expect(result?.month).toBe(10);
      expect(result?.day).toBeNaN();
    });
  });
});

describe('formatDateCalendar() formatDateCalendar method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should format a valid date correctly', () => {
      // Arrange: Create a mock date value
      const mockDate: MockDateValue = { day: 15, month: 8, year: 2023 };

      // Act: Call the function with the mock date
      const formattedDate = formatDateCalendar(mockDate as DateValue);

      // Assert: Check if the formatted date is as expected
      expect(formattedDate).toBe('August 15, 2023');
    });

    it('should format another valid date correctly', () => {
      // Arrange: Create a mock date value
      const mockDate: MockDateValue = { day: 1, month: 1, year: 2020 };

      // Act: Call the function with the mock date
      const formattedDate = formatDateCalendar(mockDate as DateValue);

      // Assert: Check if the formatted date is as expected
      expect(formattedDate).toBe('January 1, 2020');
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should handle leap year date correctly', () => {
      // Arrange: Create a mock date value for a leap year
      const mockDate: MockDateValue = { day: 29, month: 2, year: 2020 };

      // Act: Call the function with the mock date
      const formattedDate = formatDateCalendar(mockDate as DateValue);

      // Assert: Check if the formatted date is as expected
      expect(formattedDate).toBe('February 29, 2020');
    });

    it('should handle end of year date correctly', () => {
      // Arrange: Create a mock date value for the end of the year
      const mockDate: MockDateValue = { day: 31, month: 12, year: 2021 };

      // Act: Call the function with the mock date
      const formattedDate = formatDateCalendar(mockDate as DateValue);

      // Assert: Check if the formatted date is as expected
      expect(formattedDate).toBe('December 31, 2021');
    });

    it('should handle start of year date correctly', () => {
      // Arrange: Create a mock date value for the start of the year
      const mockDate: MockDateValue = { day: 1, month: 1, year: 2021 };

      // Act: Call the function with the mock date
      const formattedDate = formatDateCalendar(mockDate as DateValue);

      // Assert: Check if the formatted date is as expected
      expect(formattedDate).toBe('January 1, 2021');
    });

    it('should handle invalid date gracefully', () => {
      // Arrange: Create a mock date value with an invalid date
      const mockDate: MockDateValue = { day: 31, month: 2, year: 2021 };

      // Act: Call the function with the mock date
      const formattedDate = formatDateCalendar(mockDate as DateValue);

      // Assert: Check if the formatted date is as expected
      expect(formattedDate).toBe('March 3, 2021'); // JavaScript Date auto-corrects invalid dates
    });
  });
});

describe('formatToCalendarDate() formatToCalendarDate method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should correctly format a valid Date object to a CalendarDate', () => {
      // Arrange: Create a valid Date object
      const date = new Date('2023-10-15T00:00:00Z');

      // Act: Call the function with the valid Date object
      const result = formatToCalendarDate(date);

      // Assert: Verify the result is correctly formatted
      expect(result).toEqual(parseDate('2023-10-15'));
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle a Date object at the start of the epoch (1970-01-01)', () => {
      // Arrange: Create a Date object at the start of the epoch
      const date = new Date('1970-01-01T00:00:00Z');

      // Act: Call the function with the epoch Date object
      const result = formatToCalendarDate(date);

      // Assert: Verify the result is correctly formatted
      expect(result).toEqual(parseDate('1970-01-01'));
    });

    it('should handle a Date object with a time component', () => {
      // Arrange: Create a Date object with a specific time
      const date = new Date('2023-10-15T15:30:00Z');

      // Act: Call the function with the Date object
      const result = formatToCalendarDate(date);

      // Assert: Verify the result ignores the time component
      expect(result).toEqual(parseDate('2023-10-15'));
    });

    it('should handle a Date object in a different timezone', () => {
      // Arrange: Create a Date object in a different timezone
      const date = new Date('2023-10-15T00:00:00-05:00');

      // Act: Call the function with the Date object
      const result = formatToCalendarDate(date);

      // Assert: Verify the result is correctly formatted to UTC
      expect(result).toEqual(parseDate('2023-10-15'));
    });
  });
});

describe('formatEventDate() formatEventDate method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should format a typical date correctly', () => {
      // Test description: This test checks if a typical date is formatted correctly.
      const date = new Date('2023-10-15T00:00:00Z'); // October 15, 2023
      const formattedDate = formatEventDate(date);
      expect(formattedDate).toBe('Sunday, October 15, 2023');
    });

    it('should format a leap year date correctly', () => {
      // Test description: This test checks if a date in a leap year is formatted correctly.
      const date = new Date('2024-02-29T00:00:00Z'); // February 29, 2024
      const formattedDate = formatEventDate(date);
      expect(formattedDate).toBe('Thursday, February 29, 2024');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle the end of the year correctly', () => {
      // Test description: This test checks if the last day of the year is formatted correctly.
      const date = new Date('2023-12-31T00:00:00Z'); // December 31, 2023
      const formattedDate = formatEventDate(date);
      expect(formattedDate).toBe('Sunday, December 31, 2023');
    });

    it('should handle the start of the year correctly', () => {
      // Test description: This test checks if the first day of the year is formatted correctly.
      const date = new Date('2023-01-01T00:00:00Z'); // January 1, 2023
      const formattedDate = formatEventDate(date);
      expect(formattedDate).toBe('Sunday, January 1, 2023');
    });

    it('should handle a date with a different timezone correctly', () => {
      // Test description: This test checks if a date with a different timezone is formatted correctly.
      const date = new Date('2023-10-15T12:00:00+05:00'); // October 15, 2023, with a timezone offset
      const formattedDate = formatEventDate(date);
      expect(formattedDate).toBe('Sunday, October 15, 2023');
    });
  });
});

describe('formatTo12HourTime() formatTo12HourTime method', () => {
  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return "Invalid Date" for an invalid time string "25:00"', () => {
      const input = '25:00';
      const expectedOutput = 'Invalid Date';
      expect(formatTo12HourTime(input)).toBe(expectedOutput);
    });

    it('should return "Invalid Date" for an empty string', () => {
      const input = '';
      const expectedOutput = 'Invalid Date';
      expect(formatTo12HourTime(input)).toBe(expectedOutput);
    });

    it('should return "Invalid Date" for a non-time string "hello"', () => {
      const input = 'hello';
      const expectedOutput = 'Invalid Date';
      expect(formatTo12HourTime(input)).toBe(expectedOutput);
    });
  });
});

describe('getDayOfMonth() getDayOfMonth method', () => {
  describe('Happy Path', () => {
    it('should return the day of the month using dayjs when localizer is not provided', () => {
      // Arrange
      const date = new Date(2023, 9, 15); // October 15, 2023

      // Act
      const result = getDayOfMonth(date, undefined, undefined);

      // Assert
      expect(result).toBe(dayjs(date).format('DD'));
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid date gracefully', () => {
      // Arrange
      const date = new Date('invalid-date');
      const culture = 'en-US';

      // Act
      const result = getDayOfMonth(date, culture, undefined);

      // Assert
      expect(result).toBe('Invalid Date');
    });
  });
});
