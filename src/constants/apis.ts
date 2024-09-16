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
  CUSTOMERS: '/customers',
};
