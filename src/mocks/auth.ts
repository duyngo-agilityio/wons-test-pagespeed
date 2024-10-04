import { User } from 'next-auth';

// Types
import { TUser } from '@/models';

// Constants
import { IMAGES, ROLE } from '@/constants';

export const SIGN_UP_FORM_DATA_MOCK = {
  avatar: IMAGES.AVATAR_DEFAULT,
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  password: 'Abcd@0987',
};

export const MOCK_SUCCESS_SIGN_UP_RES = {
  data: { user: { ...SIGN_UP_FORM_DATA_MOCK, id: '1' } },
  totalCount: 0,
};

export const MOCK_AUTH: Array<TUser & User> = [
  {
    id: '1',
    fullName: 'Super Admin',
    username: 'admin',
    email: 'admin+100@example.com',
    password: 'Abcd@0987',
    avatar:
      'https://t3.ftcdn.net/jpg/01/26/91/78/360_F_126917812_XlWgkaV9f81Hde4wvmvJWM3huJRvy5EM.webp',
    name: 'Super Admin',
    role: {
      id: 1,
      name: ROLE.ADMIN,
    },
    image:
      'https://t3.ftcdn.net/jpg/01/26/91/78/360_F_126917812_XlWgkaV9f81Hde4wvmvJWM3huJRvy5EM.webp',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: '2',
    fullName: 'User',
    username: 'user',
    email: 'user+100@example.com',
    password: 'Abcd@0987',
    avatar:
      'https://t3.ftcdn.net/jpg/01/26/91/78/360_F_126917812_XlWgkaV9f81Hde4wvmvJWM3huJRvy5EM.webp',
    name: 'User',
    role: {
      id: 2,
      name: ROLE.USER,
    },
    image:
      'https://t3.ftcdn.net/jpg/01/26/91/78/360_F_126917812_XlWgkaV9f81Hde4wvmvJWM3huJRvy5EM.webp',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
];
