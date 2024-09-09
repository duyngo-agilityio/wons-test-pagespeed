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
