export const MESSAGE_STATUS: Record<string, string> = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const MESSAGE_SHOW_DURATION = 5000;

export const MESSAGES = {
  ERROR: {
    EMAIL_INVALID: 'Invalid email address format.',
    FIELD_REQUIRED: 'This field is required.',
    FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}.`,
    GENERAL_INVALID_PASSWORD: 'Invalid password',
    INVALID_PASSWORD:
      'Password must be between 8 and 32 characters, and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    EMAIL_PASSWORD_INVALID:
      'Incorrect email and password. Please help to try again.',
    EMAIL_OR_USERNAME_EXIST: 'Email or username already exists.',
    UNKNOWN_ERROR: 'Something went wrong.',
    INVALID_PHONE: 'Invalid phone number.',
    UPLOAD_IMAGE:
      'Wrong image format. Only "jpg", "png" and "webp" are allowed',
    UPLOAD_IMAGE_SIZE: 'Image size should be less than 5MB',
    UPDATE_INVOICE: 'Update invoice failed.',
    DELETE_INVOICE: 'Delete invoice failed.',
    MAX_IMAGE: 'Maximum number of images is 2.',
  },
  ERROR_API: {
    EMAIL_OR_USERNAME_EXIST: 'Email or Username are already taken',
  },
  SUCCESS: {
    DELETE_INVOICE: 'Delete invoice successfully.',
    CREATE_INVOICE: 'Create invoice successfully.',
    CREATE_PRODUCT: 'Create product successfully.',
    CREATE_TASK: 'Create task successfully.',
    UPDATE_INVOICE: 'Update invoice successfully.',
    CREATE_CUSTOMER: 'Create customer successfully.',
    DELETE_CUSTOMER: 'Delete customer successfully.',
    UPDATE_CUSTOMER: 'Update customer successfully.',
    UPDATE_PRODUCT: 'Update product successfully.',
    UPDATE_TASK: 'Update task successfully.',
    DELETE_TASK: 'Delete task successfully.',
    DELETE_EVENT: 'Delete event successfully.',
    UPDATE_EVENT: 'Update event successfully.',
    CREATE_EVENT: 'Create event successfully.',
    UPDATE_PROFILE: 'Update profile successfully.',
  },
};

export const ErrorMapper: Record<string, string> = {
  [MESSAGES.ERROR_API.EMAIL_OR_USERNAME_EXIST]:
    MESSAGES.ERROR.EMAIL_OR_USERNAME_EXIST,
};
