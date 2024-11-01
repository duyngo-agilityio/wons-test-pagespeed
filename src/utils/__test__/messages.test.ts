// Unit tests for: formatErrorMessage

import { formatErrorMessage } from '../messages';

// Import necessary modules and constants
// Mock the constants
jest.mock('@/constants', () => ({
  ERROR_MAPPER: {
    'Known error message': 'Mapped error message',
  },
  MESSAGES: {
    ERROR: {
      UNKNOWN_ERROR: 'An unknown error occurred',
    },
  },
}));

describe('formatErrorMessage() formatErrorMessage method', () => {
  // Happy path tests
  describe('Happy Path', () => {
    it('should return the mapped error message for a known error', () => {
      // Arrange: Create a valid error response with a known error message
      const errorResponse = {
        data: null,
        error: {
          status: 400,
          name: 'BadRequest',
          message: 'Known error message',
        },
      };

      // Act: Call the function with the error response
      const result = formatErrorMessage(errorResponse);

      // Assert: Verify that the mapped error message is returned
      expect(result).toBe('Mapped error message');
    });

    it('should return the unknown error message for an unknown error', () => {
      // Arrange: Create a valid error response with an unknown error message
      const errorResponse = {
        data: null,
        error: {
          status: 500,
          name: 'InternalServerError',
          message: 'Unknown error message',
        },
      };

      // Act: Call the function with the error response
      const result = formatErrorMessage(errorResponse);

      // Assert: Verify that the unknown error message is returned
      expect(result).toBe('An unknown error occurred');
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should return the unknown error message for an invalid error response structure', () => {
      // Arrange: Create an invalid error response
      const errorResponse = {
        data: null,
        error: {
          status: 'not-a-number', // Invalid status type
          name: 'BadRequest',
          message: 'Known error message',
        },
      };

      // Act: Call the function with the invalid error response
      const result = formatErrorMessage(errorResponse);

      // Assert: Verify that the unknown error message is returned
      expect(result).toBe('An unknown error occurred');
    });

    it('should return the unknown error message when errorResponse is null', () => {
      // Arrange: Set errorResponse to null
      const errorResponse = null;

      // Act: Call the function with null
      const result = formatErrorMessage(errorResponse);

      // Assert: Verify that the unknown error message is returned
      expect(result).toBe('An unknown error occurred');
    });

    it('should return the unknown error message when errorResponse is undefined', () => {
      // Arrange: Set errorResponse to undefined
      const errorResponse = undefined;

      // Act: Call the function with undefined
      const result = formatErrorMessage(errorResponse);

      // Assert: Verify that the unknown error message is returned
      expect(result).toBe('An unknown error occurred');
    });

    it('should return the unknown error message when errorResponse is an empty object', () => {
      // Arrange: Set errorResponse to an empty object
      const errorResponse = {};

      // Act: Call the function with an empty object
      const result = formatErrorMessage(errorResponse);

      // Assert: Verify that the unknown error message is returned
      expect(result).toBe('An unknown error occurred');
    });
  });
});

// End of unit tests for: formatErrorMessage
