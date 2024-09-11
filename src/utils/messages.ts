// Constants
import { ERROR_MESSAGES, ErrorMapper } from '@/constants';

export type TStrapiErrorResponse = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: { [key: string]: string };
  };
};

export const isStrapiErrorResponse = (value: unknown): boolean => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    'error' in value &&
    typeof value.error === 'object' &&
    value.error !== null &&
    'status' in value.error &&
    'name' in value.error &&
    'message' in value.error &&
    'details' in value.error
  );
};

export const formatErrorMessage = (errorResponse: unknown): string => {
  let errorMessage = '';

  if (isStrapiErrorResponse(errorResponse)) {
    const strapiErrorResponse = errorResponse as TStrapiErrorResponse;

    const { message } = strapiErrorResponse?.error || {};

    errorMessage = ErrorMapper[message];
  }

  // Set default message if unknown error
  if (!errorMessage) {
    errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  return errorMessage;
};
