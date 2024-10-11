import { StrapiModel, StrapiResponse } from '@/types';

// Models
import { TUser } from '@/models';

export type TProfileResponse = Omit<TUser, 'password'>;

export type TUserDataResponse = StrapiModel<TUser>;

export type TUserListResponse = StrapiResponse<TUserDataResponse[]>;

export interface UserProfileData
  extends Pick<TUser, 'id' | 'avatar' | 'username' | 'fullName' | 'email'> {
  imageUrl: string;
  role: string;
}
