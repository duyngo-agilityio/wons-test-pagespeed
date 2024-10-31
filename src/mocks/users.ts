// Models
import { TUser } from '@/models';

// Types
import { StrapiModel, TRole, Role, IUserFormData } from '@/types';

const mockRoles: TRole[] = [
  { id: 1, name: Role.Admin },
  { id: 2, name: Role.User },
];
export const MOCK_USERS: TUser[] = [
  {
    id: '1',
    avatar:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    email: 'user1@example.com',
    username: 'user1',
    fullName: 'John Doe',
    password: 'password123',
    role: mockRoles[0], // Admin
    token: 'token_123',
  },
  {
    id: '2',
    avatar:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    email: 'user2@example.com',
    username: 'user2',
    fullName: 'Jane Smith',
    password: 'password123',
    role: mockRoles[1], // User
    token: 'token_456',
  },

  {
    id: '3',
    avatar:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    email: 'user4@example.com',
    username: 'user4',
    fullName: 'Emily Blunt',
    password: 'password123',
    role: mockRoles[1], // User
    token: 'token_101',
  },
];

export const MOCK_AVATAR_GROUP: StrapiModel<Omit<TUser, 'id'>>[] = [
  {
    id: 1,
    attributes: {
      ...MOCK_USERS[0],
    },
  },
  {
    id: 2,
    attributes: {
      ...MOCK_USERS[1],
    },
  },
  {
    id: 3,
    attributes: {
      ...MOCK_USERS[2],
    },
  },
];

export const MOCK_PROFILE = {
  id: '1',
  avatar:
    'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
  email: 'user1@example.com',
  username: 'user1',
  fullName: 'John Doe',
  role: mockRoles[0], // Admin
  token: 'token_123',
};

export const MOCK_ASSIGNEES_WITH_STRAPI_MODEL: Array<
  StrapiModel<Omit<TUser, 'id'>>
> = [
  {
    id: 1,
    attributes: {
      avatar:
        'https://watermark.lovepik.com/photo/20211209/large/lovepik-japanese-fresh-girl-park-photo-picture_501698500.jpg',
      email: 'example@gmail.com',
      fullName: 'Super Admin',
      username: 'superadmin',
      password: '',
      role: {
        id: 1,
        name: Role.Admin,
      },
      token: '',
    },
  },
  {
    id: 2,
    attributes: {
      avatar:
        'https://watermark.lovepik.com/photo/20211209/large/lovepik-japanese-fresh-girl-park-photo-picture_501698500.jpg',
      email: 'example2@gmail.com',
      fullName: 'User',
      username: 'user01',
      password: '',
      role: {
        id: 2,
        name: Role.User,
      },
      token: '',
    },
  },
];

export const MOCK_USER_DETAIL: IUserFormData = {
  avatar:
    'https://watermark.lovepik.com/photo/20211209/large/lovepik-japanese-fresh-girl-park-photo-picture_501698500.jpg',
  role: 'admin',
  email: 'admin@gmail.com',
  fullName: 'Super Admin',
  username: 'superadmin',
};
