export const API_BASE_URL = process.env.NEXT_API_BASE_URL || '';
export const API_LOCATION_URL = process.env.NEXT_API_LOCATION || '';

export const API_PATH = {
  SIGN_UP: '/auth/local/register',
  SIGN_IN: '/auth/local',
  USERS: '/users',
  PRODUCTS: '/products',
  LOCATION_SUGGESTION: '/api/location-suggestion',
  STATISTICS: '/statistics',
};
