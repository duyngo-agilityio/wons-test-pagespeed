// With next-auth: 5.0.0-beta.18 current yet support for testing with jest when import

export const MOCK_USER_SESSION = {
  token: 'access-token',
  email: 'user@gmail.com',
  id: '1',
  name: 'User',
  role: 'admin',
};

const NextAuth = () => ({
  signIn: () => {},
  signOut: () => {},
  auth: async () => ({ user: MOCK_USER_SESSION }),
  handlers: () => {},
});

export default NextAuth;
