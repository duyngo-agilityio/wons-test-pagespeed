// Models
import { TUser } from '@/models';

export type TProfileResponse = Omit<TUser, 'password'>;
