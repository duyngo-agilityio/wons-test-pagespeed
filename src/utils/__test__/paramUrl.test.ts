// Utils
import {
  convertStringToArray,
  formatFilterIntervalDate,
  formatFilterMultipleUser,
  formatOptionsSelection,
  formatQuery,
} from '../paramUrl';

describe('formatQuery', () => {
  it('should format a query object into a URL query string', () => {
    const query = { search: 'test', page: '2' };
    const result = formatQuery(query);
    expect(result).toBe('search=test&page=2');
  });

  it('should ignore undefined values in the query object', () => {
    const query = { search: 'test', page: undefined };
    const result = formatQuery(query);
    expect(result).toBe('search=test');
  });

  it('should return an empty string if the query object is empty', () => {
    const query = {};
    const result = formatQuery(query);
    expect(result).toBe('');
  });

  it('should handle special characters in query values', () => {
    const query = { search: 'test & more', category: 'A&B' };
    const result = formatQuery(query);
    expect(result).toBe('search=test+%26+more&category=A%26B');
  });

  it('should handle multiple keys with valid values', () => {
    const query = { search: 'test', page: '1', sort: 'asc' };
    const result = formatQuery(query);
    expect(result).toBe('search=test&page=1&sort=asc');
  });
});

describe('formatFilterIntervalDate', () => {
  it('should format filters with field and operator correctly', () => {
    const value = { 'date[gte]': '2023-01-01', 'date[lte]': '2023-12-31' };
    const result = formatFilterIntervalDate(value);
    expect(result).toBe(
      '&filters[$and][0][date][gte]=2023-01-01&&filters[$and][1][date][lte]=2023-12-31',
    );
  });

  it('should ignore empty values', () => {
    const value = { 'date[gte]': '2023-01-01', 'date[lte]': '' };
    const result = formatFilterIntervalDate(value);
    expect(result).toBe('&filters[$and][0][date][gte]=2023-01-01');
  });

  it('should skip keys without the correct field[operator] format', () => {
    const value = { 'date[gte]': '2023-01-01', invalidFormat: 'ignored' };
    const result = formatFilterIntervalDate(value);
    expect(result).toBe(
      '&filters[$and][0][date][gte]=2023-01-01&&filters[$and][1][undefined][undefined]=ignored',
    );
  });

  it('should return an empty string if the input object is empty', () => {
    const value = {};
    const result = formatFilterIntervalDate(value);
    expect(result).toBe('');
  });

  it('should handle multiple filters with various operators', () => {
    const value = {
      'date[gte]': '2023-01-01',
      'date[lte]': '2023-12-31',
      'amount[gt]': '100',
      'amount[lt]': '500',
    };
    const result = formatFilterIntervalDate(value);
    expect(result).toBe(
      '&filters[$and][0][date][gte]=2023-01-01&&filters[$and][1][date][lte]=2023-12-31&&filters[$and][2][amount][gt]=100&&filters[$and][3][amount][lt]=500',
    );
  });
});

describe('formatFilterMultipleUser', () => {
  it('should format filters for multiple users correctly', () => {
    const values = ['user1', 'user2', 'user3'];
    const result = formatFilterMultipleUser(values);
    expect(result).toBe(
      '&filters[$and][0][assignees][username][$eq]=user1&filters[$and][1][assignees][username][$eq]=user2&filters[$and][2][assignees][username][$eq]=user3',
    );
  });

  it('should return an empty string if values array is empty', () => {
    const values: string[] = [];
    const result = formatFilterMultipleUser(values);
    expect(result).toBe('');
  });

  it('should trim whitespace from usernames in the values array', () => {
    const values = ['  user1  ', 'user2 ', '  user3'];
    const result = formatFilterMultipleUser(values);
    expect(result).toBe(
      '&filters[$and][0][assignees][username][$eq]=user1&filters[$and][1][assignees][username][$eq]=user2&filters[$and][2][assignees][username][$eq]=user3',
    );
  });

  it('should handle a single username correctly', () => {
    const values = ['user1'];
    const result = formatFilterMultipleUser(values);
    expect(result).toBe('&filters[$and][0][assignees][username][$eq]=user1');
  });
});

describe('convertStringToArray', () => {
  it('should convert a comma-separated string into an array', () => {
    const value = 'apple,banana,orange';
    const result = convertStringToArray(value);
    expect(result).toEqual(['apple', 'banana', 'orange']);
  });

  it('should return an array with a single empty string for an empty input', () => {
    const value = '';
    const result = convertStringToArray(value);
    expect(result).toEqual(['']);
  });

  it('should handle leading, trailing, and multiple consecutive commas', () => {
    const value = ',apple,,banana,orange,';
    const result = convertStringToArray(value);
    expect(result).toEqual(['', 'apple', '', 'banana', 'orange', '']);
  });

  it('should return an array with a single item if there are no commas', () => {
    const value = 'apple';
    const result = convertStringToArray(value);
    expect(result).toEqual(['apple']);
  });

  it('should handle spaces around items correctly', () => {
    const value = '  apple , banana ,  orange  ';
    const result = convertStringToArray(value);
    expect(result).toEqual(['  apple ', ' banana ', '  orange  ']);
  });
});

describe('formatOptionsSelection', () => {
  it('should format a Selection object with multiple items correctly', () => {
    const object = new Set(['option1', 'option2', 'option3']);
    const result = formatOptionsSelection(object);
    expect(result).toBe('option1, option2, option3');
  });

  it('should handle a Selection object with a single item', () => {
    const object = new Set(['option1']);
    const result = formatOptionsSelection(object);
    expect(result).toBe('option1');
  });

  it('should handle items with spaces or special characters', () => {
    const object = new Set(['option 1', 'option-2', 'option&3']);
    const result = formatOptionsSelection(object);
    expect(result).toBe('option 1, option-2, option&3');
  });
});
