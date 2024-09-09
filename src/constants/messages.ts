export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required.`,
  FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}.`,
  INVALID_PASSWORD:
    'Password must be between 8 and 32 characters, and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  EMAIL_PASSWORD_INVALID:
    'Email or password invalid. Please help to try again!',
  UNKNOWN_ERROR: 'Something went wrong.',
};

export const SUCCESS_MESSAGES = {
  SIGN_IN: 'Sign In success!!',
  SIGN_OUT: 'Sign Out success!!',
};

export const MESSAGE_STATUS: Record<string, string> = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const MESSAGE_SHOW_DURATION = 5000;
