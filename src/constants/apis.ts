export const API_BASE_URL = process.env.NEXT_API_BASE_URL || '';
export const API_LOCATION_URL = process.env.NEXT_API_LOCATION || '';

export const API_PATH = {
  INVOICE_PRODUCTS: '/invoice-products',
  LOCATION_SUGGESTION: '/api/location-suggestion',
  PRODUCTS: '/products',
  SIGN_IN: '/auth/local',
  SIGN_UP: '/auth/local/register',
  STATISTICS: '/statistics',
  USERS: '/users',
  INVOICES: '/invoices',
  INVOICE: '/invoice',
  CUSTOMERS: '/customers',
  CUSTOMER: '/customer',
  TASKS: '/tasks',
  EVENTS: '/events',
};

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  INVALID_PARAM: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
