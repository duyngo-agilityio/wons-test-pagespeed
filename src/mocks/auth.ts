// Types
import { ISignUpFormData } from '@/types';

export const SIGN_UP_FORM_DATA_MOCK: ISignUpFormData = {
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  password: 'Abcd@0987',
};

export const MOCK_SUCCESS_SIGN_UP_RES = {
  data: { user: { ...SIGN_UP_FORM_DATA_MOCK, id: '1' } },
  totalCount: 0,
};
