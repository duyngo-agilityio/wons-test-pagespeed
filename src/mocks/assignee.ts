import { TRole } from '@/types';

export const MOCK_ASSIGNEES = {
  data: [
    {
      id: 1,
      attributes: {
        name: 'John Doe',
        avatar: '/avatar1.jpg',
        email: 'john@example.com',
        username: 'john_doe',
        fullName: 'John Doe',
        password: 'password123',
        role: 'User' as unknown as TRole,
        token: 'token123',
      },
    },
    {
      id: 2,
      attributes: {
        name: 'Jane Smith',
        avatar: '/avatar2.jpg',
        email: 'jane@example.com',
        username: 'jane_smith',
        fullName: 'Jane Smith',
        password: 'password123',
        role: 'User' as unknown as TRole,
        token: 'token123',
      },
    },
  ],
};
