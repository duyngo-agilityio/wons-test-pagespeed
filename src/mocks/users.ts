import { TUser } from '@/models';
import { TRole } from '@/types';

const mockRoles: TRole[] = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'Manager' },
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
    email: 'user3@example.com',
    username: 'user3',
    fullName: 'Samuel Jackson',
    password: 'password123',
    role: mockRoles[2], // Manager
    token: 'token_789',
  },
  {
    id: '4',
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
