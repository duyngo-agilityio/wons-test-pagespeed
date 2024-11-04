// Libs
import { z } from 'zod';

// Constants
import { ERROR_MAPPER, MESSAGES } from '@/constants';

export type TStrapiErrorResponse = {
  error: {
    status: number;
    name: string;
    message: string;
  };
};

const TStrapiErrorResponseSchema = z.object({
  error: z.object({
    status: z.number(),
    name: z.string(),
    message: z.string(),
  }),
});

export const formatErrorMessage = (errorResponse: unknown): string => {
  let errorMessage = '';

  const parseResult = TStrapiErrorResponseSchema.safeParse(errorResponse);

  if (parseResult.success) {
    const strapiErrorResponse = errorResponse as TStrapiErrorResponse;

    const { message } = strapiErrorResponse.error;

    errorMessage = ERROR_MAPPER[message] || MESSAGES.ERROR.UNKNOWN_ERROR;
  }

  // Set default message if unknown error
  if (!errorMessage) {
    errorMessage = MESSAGES.ERROR.UNKNOWN_ERROR;
  }

  return errorMessage;
};
