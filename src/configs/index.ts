import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

// Services
import { httpClient } from '@/services';

// Models
import { ROLE, User } from '@/models';

// Api
import { getProfile } from '@/api';

// Types
import { AuthResponse } from '@/types';

declare module 'next-auth' {
  interface User {
    role: ROLE;
    token: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

export const CredentialsProvider = Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials) => {
    const parsedCredentials = z
      .object({
        identifier: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse(credentials);

    if (parsedCredentials.success) {
      const { identifier, password } = parsedCredentials.data;

      const data = await httpClient.postRequest({
        endpoint: 'auth/local',
        body: {
          identifier,
          password,
        },
      });

      const { jwt, user } = data as AuthResponse;

      const profile = (await getProfile(jwt)) as User;

      if (!user) return null;

      return { ...user, role: profile.role };
    }

    return null;
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
