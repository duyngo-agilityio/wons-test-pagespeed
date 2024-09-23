// Types
import { TRole } from '@/types';

export type TUser = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  password: string;
  role: TRole;
  token: string;
};
