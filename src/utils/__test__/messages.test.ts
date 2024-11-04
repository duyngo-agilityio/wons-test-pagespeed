import { ERROR_MAPPER, MESSAGES } from '@/constants';
import { formatErrorMessage, TStrapiErrorResponse } from '../messages';

describe('formatErrorMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns mapped error message for a known Strapi error response', () => {
    const errorResponse: TStrapiErrorResponse = {
      error: { status: 400, name: 'BadRequest', message: 'known_error_key' },
    };
    ERROR_MAPPER['known_error_key'] = 'Something went wrong.';

    const result = formatErrorMessage(errorResponse);

    expect(result).toBe('Something went wrong.');
  });

  it('returns default unknown error message for an unknown error key', () => {
    const errorResponse: TStrapiErrorResponse = {
      error: { status: 404, name: 'NotFound', message: 'unknown_error_key' },
    };

    const result = formatErrorMessage(errorResponse);

    expect(result).toBe(MESSAGES.ERROR.UNKNOWN_ERROR);
  });

  it('returns default unknown error message for an invalid error response', () => {
    const invalidErrorResponse = { invalidKey: 'invalidValue' };

    const result = formatErrorMessage(invalidErrorResponse);

    expect(result).toBe(MESSAGES.ERROR.UNKNOWN_ERROR);
  });

  it('returns default unknown error message when errorResponse is undefined', () => {
    const result = formatErrorMessage(undefined);

    expect(result).toBe(MESSAGES.ERROR.UNKNOWN_ERROR);
  });

  it('returns default unknown error message when errorResponse is null', () => {
    const result = formatErrorMessage(null);

    expect(result).toBe(MESSAGES.ERROR.UNKNOWN_ERROR);
  });
});
