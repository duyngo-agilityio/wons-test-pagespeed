import { ROLE } from '@/constants';
import { TUser } from '@/models';
import { StrapiModel, TRole } from '@/types';

const mockRoles: TRole[] = [
  { id: 1, name: ROLE.ADMIN },
  { id: 2, name: ROLE.USER },
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
