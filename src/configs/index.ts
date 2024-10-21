import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

// Services
import { httpClient } from '@/services';

// Models
import { TUser } from '@/models';

// Api
import { getProfile } from '@/api';

// Types
import { AuthResponse, Method } from '@/types';

// Constants
import { API_PATH } from '@/constants';

declare module 'next-auth' {
  interface Session {
    user: TUser & DefaultSession['user'];
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

      const data = await httpClient.genericRequest({
        method: Method.Post,
        endpoint: API_PATH.SIGN_IN,
        body: {
          identifier,
          password,
        },
      });

      const { jwt, user } = data as AuthResponse;

      const profile = await getProfile(jwt);

      if (!user) return null;

      const { role } = profile || {};

      return { ...user, token: jwt, role: role };
    }

    return null;
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
