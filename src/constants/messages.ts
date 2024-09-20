export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required.`,
  FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}.`,
  INVALID_PASSWORD:
    'Password must be between 8 and 32 characters, and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  EMAIL_PASSWORD_INVALID:
    'Email or password invalid. Please help to try again!',

  EMAIL_OR_USERNAME_EXIST: 'Email or username already exists.',
  UNKNOWN_ERROR: 'Something went wrong.',
  INVALID_PHONE: 'Invalid phone number.',
  UPLOAD_IMAGE: 'Wrong image format. Only "jpg", "png" and "webp" are allowed',
  UPLOAD_IMAGE_SIZE: 'Image size should be less than 5MB',
  QUANTITY_INVALID: 'Quantity invalid.',

  UPDATE_INVOICE: 'Update invoice failed.',
  DELETE_INVOICE: 'Delete invoice failed.',
};

export const SUCCESS_MESSAGES = {
  SIGN_IN: 'Sign in successfully.',
  SIGN_OUT: 'Sign out successfully.',
  DELETE_INVOICE: 'Delete invoice successfully.',
  CREATE_INVOICE: 'Create invoice successfully.',
  UPDATE_INVOICE: 'Update invoice successfully.',
};

export const MESSAGE_STATUS: Record<string, string> = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const MESSAGE_SHOW_DURATION = 5000;

export const ERROR_API_MESSAGES = {
  EMAIL_OR_USERNAME_EXIST: 'Email or Username are already taken',
};

export const ErrorMapper: Record<string, string> = {
  [ERROR_API_MESSAGES.EMAIL_OR_USERNAME_EXIST]:
    ERROR_MESSAGES.EMAIL_OR_USERNAME_EXIST,
};
