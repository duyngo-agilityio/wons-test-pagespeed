// Types
import { TRole } from '@/types';

export const AUTH_METHODS = {
  CREDENTIALS: 'credentials',
};

export const ERROR_TYPES = {
  CREDENTIALS_SIGN_IN: 'CallbackRouteError',
};

export const ROLES: TRole[] = [
  {
    id: 3,
    name: 'Admin',
  },
  {
    id: 4,
    name: 'User',
  },
];
