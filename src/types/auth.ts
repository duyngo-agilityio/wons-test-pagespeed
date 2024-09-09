// Models
import { User } from '@/models';

export interface SignInFormData {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: User | null;
  error: string;
}

export type TSignUpPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type TSignUpResponse = { jwt: string; user: Omit<User, 'password'> };
