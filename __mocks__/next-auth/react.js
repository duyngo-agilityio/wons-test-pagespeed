export const useSession = () => ({
  data: {
    user: {
      token: 'access-token',
      email: 'user@gmail.com',
      id: '1',
      name: 'User',
      role: 'admin',
    },
    expires: Date.now().toString(),
  },
  status: 'authenticated',
  update: async () => null,
});
