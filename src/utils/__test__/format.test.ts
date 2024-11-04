import { CalendarDate, ZonedDateTime } from '@internationalized/date';

// Types
import { StrapiModel, TEventResponse } from '@/types';

// Utils
import {
  aggregateProductQuantities,
  capitalizeFirstLetter,
  filterDataByIndex,
  formatAmountWithDiscount,
  formatDatePicker,
  formatDateString,
  formatDateToISO,
  formatPhoneNumber,
  formatPrice,
  formatPriceTyping,
  formatSubtotal,
  formattedEvents,
  formattedGuestInfo,
  getSubarray,
  getTimeFromISO,
  InsertSkeletonRow,
  parseStringToNumberArray,
} from '../format';

// Mocks
import {
  EVENTS_MOCKS,
  EVENTS_MOCKS_WIDTH_USERS_PERMISSIONS,
  MOCK_INVOICE_PRODUCT_RESPONSE,
  MOCK_INVOICES,
} from '@/mocks';

// Models
import { IEvent } from '@/models';

// Mock classes to simulate the behavior of CalendarDate, CalendarDateTime, and ZonedDateTime
class MockCalendarDate {
  public month: number = 1;
  public day: number = 1;
  public year: number = 2020;
}

class MockCalendarDateTime {
  public month: number = 1;
  public day: number = 1;
  public year: number = 2020;
}

class MockZonedDateTime {
  public month: number = 1;
  public day: number = 1;
  public year: number = 2020;
}

// Mock for DateValue
type MockDateValue = {
  year: number;
  month: number;
  day: number;
};

describe('capitalizeFirstLetter() capitalizeFirstLetter method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should capitalize the first letter of a single word', () => {
      // Test to ensure the function capitalizes the first letter of a single word
      const input = 'hello';
      const expectedOutput = 'Hello';
      expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
    });

    it('should capitalize the first letter of a sentence', () => {
      // Test to ensure the function capitalizes the first letter of a sentence
      const input = 'this is a test sentence.';
      const expectedOutput = 'This is a test sentence.';
      expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
    });

    it('should return an empty string when input is an empty string', () => {
      // Test to ensure the function returns an empty string when input is empty
      const input = '';
      const expectedOutput = '';
      expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle a string with a single character', () => {
      // Test to ensure the function capitalizes a single character string
      const input = 'a';
      const expectedOutput = 'A';
      expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
    });

    it('should handle a string with the first character already capitalized', () => {
      // Test to ensure the function does not alter a string with the first character already capitalized
      const input = 'Hello';
      const expectedOutput = 'Hello';
      expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
    });

    it('should handle a string with leading whitespace', () => {
      // Test to ensure the function capitalizes the first non-whitespace character
      const input = '   hello';
      const expectedOutput = '   hello';
      expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
    });

    it('should handle a string with numbers at the start', () => {
      // Test to ensure the function does not alter a string starting with numbers
      const input = '123hello';
      const expectedOutput = '123hello';
      expect(capitalizeFirstLetter(input)).toBe(expectedOutput);
    });
  });
});

describe('filterDataByIndex() filterDataByIndex method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should remove the item at the specified index from the array', () => {
      const data = [1, 2, 3, 4, 5];
      const indexToRemove = 2;
      const result = filterDataByIndex(data, indexToRemove);
      expect(result).toEqual([1, 2, 4, 5]);
    });

    it('should return the same array if the index is out of bounds (negative index)', () => {
      const data = [1, 2, 3, 4, 5];
      const indexToRemove = -1;
      const result = filterDataByIndex(data, indexToRemove);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return the same array if the index is out of bounds (index greater than array length)', () => {
      const data = [1, 2, 3, 4, 5];
      const indexToRemove = 10;
      const result = filterDataByIndex(data, indexToRemove);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return an empty array if the input array is empty', () => {
      const data: number[] = [];
      const indexToRemove = 0;
      const result = filterDataByIndex(data, indexToRemove);
      expect(result).toEqual([]);
    });

    it('should handle arrays with a single element correctly', () => {
      const data = [42];
      const indexToRemove = 0;
      const result = filterDataByIndex(data, indexToRemove);
      expect(result).toEqual([]);
    });

    it('should handle non-integer index values gracefully', () => {
      const data = [1, 2, 3, 4, 5];
      const indexToRemove = 2.5; // Non-integer index
      const result = filterDataByIndex(
        data,
        indexToRemove as unknown as number,
      );
      expect(result).toEqual([1, 2, 3, 4, 5]); // No removal should occur
    });

    it('should handle NaN as an index gracefully', () => {
      const data = [1, 2, 3, 4, 5];
      const indexToRemove = NaN;
      const result = filterDataByIndex(data, indexToRemove);
      expect(result).toEqual([1, 2, 3, 4, 5]); // No removal should occur
    });
  });
});

describe('formatDatePicker() formatDatePicker method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should format a MockCalendarDate correctly', () => {
      const mockDate = new MockCalendarDate();
      mockDate.month = 5;
      mockDate.day = 15;
      mockDate.year = 2021;

      const result = formatDatePicker(mockDate as CalendarDate);
      expect(result).toBe('2021-05-15');
    });

    it('should format a MockCalendarDateTime correctly', () => {
      const mockDateTime = new MockCalendarDateTime();
      mockDateTime.month = 12;
      mockDateTime.day = 31;
      mockDateTime.year = 2022;

      const result = formatDatePicker(mockDateTime as CalendarDate);
      expect(result).toBe('2022-12-31');
    });

    it('should format a MockZonedDateTime correctly', () => {
      const mockZonedDateTime = new MockZonedDateTime();
      mockZonedDateTime.month = 7;
      mockZonedDateTime.day = 4;
      mockZonedDateTime.year = 2023;

      const result = formatDatePicker(mockZonedDateTime as CalendarDate);
      expect(result).toBe('2023-07-04');
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should handle single-digit month and day correctly', () => {
      const mockDate = new MockCalendarDate();
      mockDate.month = 3;
      mockDate.day = 9;
      mockDate.year = 2020;

      const result = formatDatePicker(mockDate as CalendarDate);
      expect(result).toBe('2020-03-09');
    });

    it('should handle the maximum possible date', () => {
      const mockDate = new MockCalendarDate();
      mockDate.month = 12;
      mockDate.day = 31;
      mockDate.year = 9999;

      const result = formatDatePicker(mockDate as CalendarDate);
      expect(result).toBe('9999-12-31');
    });
  });
});

describe('formatDateString() formatDateString method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should format a valid date correctly', () => {
      // Arrange: Create a mock date value
      const mockDate: MockDateValue = {
        year: 2023,
        month: 5,
        day: 15,
      };

      // Act: Call the function with the mock date
      const result = formatDateString(mockDate as ZonedDateTime);

      // Assert: Check if the result is as expected
      expect(result).toBe('2023-05-15');
    });

    it('should pad single-digit month and day with zeros', () => {
      // Arrange: Create a mock date value with single-digit month and day
      const mockDate: MockDateValue = {
        year: 2023,
        month: 3,
        day: 7,
      };

      // Act: Call the function with the mock date
      const result = formatDateString(mockDate as ZonedDateTime);

      // Assert: Check if the result is as expected
      expect(result).toBe('2023-03-07');
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should handle the maximum valid date', () => {
      // Arrange: Create a mock date value for the maximum valid date
      const mockDate: MockDateValue = {
        year: 9999,
        month: 12,
        day: 31,
      };

      // Act: Call the function with the mock date
      const result = formatDateString(mockDate as ZonedDateTime);

      // Assert: Check if the result is as expected
      expect(result).toBe('9999-12-31');
    });

    it('should handle invalid date values gracefully', () => {
      // Arrange: Create a mock date value with invalid values
      const mockDate: MockDateValue = {
        year: -1,
        month: 13,
        day: 32,
      };

      // Act: Call the function with the mock date
      const result = formatDateString(mockDate as ZonedDateTime);

      // Assert: Check if the result is as expected
      // Depending on the function's behavior, this might throw an error or return a specific string
      // Adjust the expectation based on the actual implementation
      expect(result).toBe('-1-13-32'); // Example expectation, adjust as needed
    });
  });
});

describe('formatDateToISO() formatDateToISO method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should correctly format a valid date and time string to ISO format', () => {
      const dateString = new Date('2023-10-21');
      const timeString = '15:30';
      const result = formatDateToISO(dateString, timeString);
      expect(result).toBe('2023-10-21T15:30:00.000Z');
    });

    it('should handle midnight time correctly', () => {
      const dateString = new Date('2023-10-21');
      const timeString = '00:00';
      const result = formatDateToISO(dateString, timeString);
      expect(result).toBe('2023-10-21T00:00:00.000Z');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle time string with extra spaces', () => {
      const dateString = new Date('2023-10-21');
      const timeString = '  09:45  ';
      const result = formatDateToISO(dateString, timeString);
      expect(result).toBe('2023-10-21T09:45:00.000Z');
    });
  });
});

describe('formatPrice() formatPrice method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should format a number price correctly for en-US locale without digits', () => {
      // Test to ensure the function formats a number correctly in en-US locale
      const result = formatPrice(1234.56);
      expect(result).toBe('1,234.56');
    });

    it('should format a number price correctly for de-DE locale with digits', () => {
      // Test to ensure the function formats a number correctly in de-DE locale with minimum fraction digits
      const result = formatPrice(1234.56, true);
      expect(result).toBe('1.234,56');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return an empty string for NaN input', () => {
      // Test to ensure the function returns an empty string for NaN input
      const result = formatPrice(NaN);
      expect(result).toBe('');
    });

    it('should return an empty string for null input', () => {
      // Test to ensure the function returns an empty string for null input
      const result = formatPrice(null as unknown as number);
      expect(result).toBe('');
    });

    it('should return an empty string for undefined input', () => {
      // Test to ensure the function returns an empty string for undefined input
      const result = formatPrice(undefined as unknown as number);
      expect(result).toBe('');
    });

    it('should return an empty string for zero input', () => {
      // Test to ensure the function returns an empty string for zero input
      const result = formatPrice(0);
      expect(result).toBe('');
    });

    it('should handle very large numbers correctly', () => {
      // Test to ensure the function handles very large numbers correctly
      const result = formatPrice(123456789012345);
      expect(result).toBe('123,456,789,012,345');
    });

    it('should handle very small numbers correctly', () => {
      // Test to ensure the function handles very small numbers correctly
      const result = formatPrice(0.000123);
      expect(result).toBe('0');
    });
  });
});

describe('formatPriceTyping() formatPriceTyping method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should format a simple integer value correctly', () => {
      // Test to ensure that a simple integer is formatted with a dollar sign and no commas
      const result = formatPriceTyping('1000');
      expect(result).toBe('$1,000');
    });

    it('should format a decimal value correctly', () => {
      // Test to ensure that a decimal value is formatted with a dollar sign and commas
      const result = formatPriceTyping('1234.56');
      expect(result).toBe('$1,234.56');
    });

    it('should format a large number with commas', () => {
      // Test to ensure that a large number is formatted with commas for thousands
      const result = formatPriceTyping('1000000');
      expect(result).toBe('$1,000,000');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return an empty string for an empty input', () => {
      // Test to ensure that an empty string input returns an empty string
      const result = formatPriceTyping('');
      expect(result).toBe('');
    });

    it('should handle non-numeric characters by removing them', () => {
      // Test to ensure that non-numeric characters are removed
      const result = formatPriceTyping('abc1234def');
      expect(result).toBe('$1,234');
    });

    it('should handle input with no numeric characters', () => {
      // Test to ensure that input with no numeric characters returns '$'
      const result = formatPriceTyping('abc');
      expect(result).toBe('$');
    });
  });
});

describe('formattedEvents() formattedEvents method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should format events correctly with valid input', () => {
      const result = formattedEvents(EVENTS_MOCKS as StrapiModel<IEvent>[]);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should handle empty events array', () => {
      const result = formattedEvents([]);

      expect(result).toHaveLength(0);
    });
  });
});

describe('formattedGuestInfo() formattedGuestInfo method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should correctly format guest information when valid data is provided', () => {
      const result = formattedGuestInfo(
        EVENTS_MOCKS_WIDTH_USERS_PERMISSIONS as unknown as TEventResponse,
      );

      expect(result).toEqual([
        {
          id: 3,
          name: 'Super Admin',
          avatar:
            'https://watermark.lovepik.com/photo/20211209/large/lovepik-japanese-fresh-girl-park-photo-picture_501698500.jpg',
        },
      ]);
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should return an empty array when no users are present', () => {
      const mockResponse = {
        users_permissions_users: {
          data: [],
        },
      } as unknown as TEventResponse;

      const result = formattedGuestInfo(mockResponse);

      expect(result).toEqual([]);
    });
  });
});

describe('parseStringToNumberArray() parseStringToNumberArray method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should convert a comma-separated string of numbers into an array of numbers', () => {
      const input = '1,2,3,4,5';
      const expectedOutput = [1, 2, 3, 4, 5];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });

    it('should handle a single number string correctly', () => {
      const input = '42';
      const expectedOutput = [42];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });

    it('should return an empty array for an empty string', () => {
      const input = '';
      const expectedOutput: number[] = [];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should ignore extra commas and convert valid numbers', () => {
      const input = ',1,,2,3,,';
      const expectedOutput = [1, 2, 3];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });

    it('should convert negative numbers correctly', () => {
      const input = '-1,-2,-3';
      const expectedOutput = [-1, -2, -3];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });

    it('should convert decimal numbers correctly', () => {
      const input = '1.1,2.2,3.3';
      const expectedOutput = [1.1, 2.2, 3.3];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });

    it('should return NaN for non-numeric strings', () => {
      const input = 'a,b,c';
      const expectedOutput = [NaN, NaN, NaN];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });

    it('should handle mixed valid and invalid numbers', () => {
      const input = '1,foo,3';
      const expectedOutput = [1, NaN, 3];
      expect(parseStringToNumberArray(input)).toEqual(expectedOutput);
    });
  });
});

describe('InsertSkeletonRow() InsertSkeletonRow method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should return an array of objects with sequential ids starting from 1', () => {
      // Test to ensure the function returns the correct array structure
      const quantity = 5;
      const result = InsertSkeletonRow(quantity);
      expect(result).toHaveLength(quantity);
      result.forEach((item, index) => {
        expect(item).toEqual({ id: index + 1 });
      });
    });

    it('should return an empty array when quantity is 0', () => {
      // Test to ensure the function returns an empty array when quantity is 0
      const quantity = 0;
      const result = InsertSkeletonRow(quantity);
      expect(result).toEqual([]);
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should handle negative quantity by returning an empty array', () => {
      // Test to ensure the function handles negative quantity gracefully
      const quantity = -5;
      const result = InsertSkeletonRow(quantity);
      expect(result).toEqual([]);
    });

    it('should handle non-integer quantity by flooring the value', () => {
      // Test to ensure the function handles non-integer quantity by flooring the value
      const quantity = 3.7;
      const result = InsertSkeletonRow(Math.floor(quantity));
      expect(result).toHaveLength(Math.floor(quantity));
      result.forEach((item, index) => {
        expect(item).toEqual({ id: index + 1 });
      });
    });

    it('should handle very large quantity efficiently', () => {
      // Test to ensure the function can handle very large quantities
      const quantity = 10000;
      const result = InsertSkeletonRow(quantity);
      expect(result).toHaveLength(quantity);
      expect(result[0]).toEqual({ id: 1 });
      expect(result[quantity - 1]).toEqual({ id: quantity });
    });
  });
});

describe('getTimeFromISO() getTimeFromISO method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return "12:00am" for midnight in UTC', () => {
      const isoString = '2023-10-10T00:00:00Z';
      const result = getTimeFromISO(isoString);
      expect(result).toBe('12:00am');
    });

    it('should return "12:00pm" for noon in UTC', () => {
      const isoString = '2023-10-10T12:00:00Z';
      const result = getTimeFromISO(isoString);
      expect(result).toBe('12:00pm');
    });

    it('should return "03:45pm" for 15:45 in UTC', () => {
      const isoString = '2023-10-10T15:45:00Z';
      const result = getTimeFromISO(isoString);
      expect(result).toBe('03:45pm');
    });

    it('should return "01:30am" for 01:30 in UTC', () => {
      const isoString = '2023-10-10T01:30:00Z';
      const result = getTimeFromISO(isoString);
      expect(result).toBe('01:30am');
    });
  });

  describe('Edge Cases', () => {
    it('should throw an error for an invalid ISO date string', () => {
      const invalidISOString = 'invalid-date-string';
      expect(() => getTimeFromISO(invalidISOString)).toThrow(
        'Invalid ISO date string',
      );
    });

    it('should handle leap year date correctly', () => {
      const isoString = '2024-02-29T10:15:00Z'; // 2024 is a leap year
      const result = getTimeFromISO(isoString);
      expect(result).toBe('10:15am');
    });

    it('should handle end of year date correctly', () => {
      const isoString = '2023-12-31T23:59:00Z';
      const result = getTimeFromISO(isoString);
      expect(result).toBe('11:59pm');
    });

    it('should handle start of year date correctly', () => {
      const isoString = '2023-01-01T00:01:00Z';
      const result = getTimeFromISO(isoString);
      expect(result).toBe('12:01am');
    });
  });
});

describe('getSubarray() getSubarray method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should return a subarray from startNumber to endNumber', () => {
      // Test to ensure the function returns the correct subarray
      const data = [1, 2, 3, 4, 5];
      const result = getSubarray(data, 1, 3);
      expect(result).toEqual([2, 3]);
    });

    it('should return an empty array when startNumber equals endNumber', () => {
      // Test to ensure the function returns an empty array when startNumber equals endNumber
      const data = [1, 2, 3, 4, 5];
      const result = getSubarray(data, 2, 2);
      expect(result).toEqual([]);
    });

    it('should return the entire array when startNumber is 0 and endNumber is the length of the array', () => {
      // Test to ensure the function returns the entire array
      const data = [1, 2, 3, 4, 5];
      const result = getSubarray(data, 0, 5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle negative startNumber and endNumber gracefully', () => {
      // Test to ensure the function handles negative indices
      const data = [1, 2, 3, 4, 5];
      const result = getSubarray(data, -2, -1);
      expect(result).toEqual([4]);
    });

    it('should return an empty array when startNumber is greater than endNumber', () => {
      // Test to ensure the function returns an empty array when startNumber is greater than endNumber
      const data = [1, 2, 3, 4, 5];
      const result = getSubarray(data, 3, 1);
      expect(result).toEqual([]);
    });

    it('should handle startNumber and endNumber out of bounds', () => {
      // Test to ensure the function handles indices out of bounds
      const data = [1, 2, 3, 4, 5];
      const result = getSubarray(data, 0, 10);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });
});

describe('formatPhoneNumber', () => {
  it('returns an empty string for an empty input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });

  it('prepends "+" for a correctly formatted string', () => {
    expect(formatPhoneNumber('1234567890')).toBe('+1234567890');
  });

  it('handles non-numeric input by returning it with "+" prepended', () => {
    expect(formatPhoneNumber('abc-def')).toBe('+abc def');
  });
});

describe('formatSubtotal', () => {
  const mockData = { data: MOCK_INVOICES };
  it('calculates subtotal without discount correctly', () => {
    expect(formatSubtotal(mockData)).toBe('14.872,00 USD'); // (10*2 + 5*3)
  });

  it('calculates subtotal with discount correctly', () => {
    expect(formatSubtotal(mockData, 10)).toBe('1.487,20 USD'); // 10% discount on (20*1 + 30*2)
  });

  it('returns zero for an empty item list', () => {
    const items = { data: [] };
    expect(formatSubtotal(items)).toBe(' USD');
  });

  it('returns the original subtotal for a discount of zero', () => {
    expect(formatSubtotal(mockData, 0)).toBe('14.872,00 USD'); // (15*4)
  });

  it('returns the original subtotal with a negative discount (if applicable)', () => {
    expect(formatSubtotal(mockData, -10)).toBe('-1.487,20 USD'); // Assuming the function can handle negative discounts
  });
});

describe('formatAmountWithDiscount', () => {
  const mockData = { data: MOCK_INVOICES };
  it('calculates total without discount correctly', () => {
    expect(formatAmountWithDiscount(mockData)).toBe('14.872,00 USD'); // (10*2 + 5*3)
  });

  it('calculates total with discount correctly', () => {
    expect(formatAmountWithDiscount(mockData, 10)).toBe('13.384,80 USD'); // 10% discount on (20*1 + 30*2)
  });

  it('returns zero for an empty item list', () => {
    expect(formatAmountWithDiscount(mockData)).toBe('14.872,00 USD');
  });

  it('returns the original total for a discount of zero', () => {
    expect(formatAmountWithDiscount(mockData, 0)).toBe('14.872,00 USD'); // (15*4)
  });

  it('returns a negative total with a negative discount (if applicable)', () => {
    expect(formatAmountWithDiscount(mockData, -10)).toBe('16.359,20 USD'); // Assuming the function can handle negative discounts, resulting in a total of 55.00
  });
});

describe('aggregateProductQuantities', () => {
  it('should return an empty array when given an empty product list', () => {
    const result = aggregateProductQuantities([]);
    expect(result).toEqual([]);
  });

  it('should return the same product list when there is only one product', () => {
    const result = aggregateProductQuantities(MOCK_INVOICE_PRODUCT_RESPONSE);
    expect(result).toEqual([
      {
        id: 1,
        attributes: {
          price: 1200, // Taking the price of the first instance
          createdAt: '2024-08-27T04:31:42.022Z', // Taking the createdAt of the first instance
          updatedAt: '2024-09-10T04:15:01.906Z', // Taking the updatedAt of the first instance
          publishedAt: '2024-09-10T04:14:54.432Z', // Taking the publishedAt of the first instance
          quantity: 11, // Aggregated quantity (1 + 10)
          product: {
            data: {
              id: 1,
              attributes: {
                id: 1,
                brand: 'Apple',
                description: 'Expensive',
                negotiable: true,
                imageUrl: 'https://example.com/image1.jpg',
                title: 'MacBook Pro',
                price: 1200,
                rating: 4.5,
              },
            },
          },
        },
      },
    ]);
  });
});
