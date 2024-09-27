import { ROUTES } from '@/constants';
import { TRole } from '@/types';
import type {
  NextAuthConfig,
  Session as NextAuthSession,
  User as NextAuthUser,
} from 'next-auth';

export interface CustomUser extends NextAuthUser {
  id: string;
  avatar: string;
  email: string;
  username: string;
  fullName: string;
  password: string;
  role: TRole;
  token: string;
}

export interface CustomSession extends NextAuthSession {
  user: CustomUser;
  accessToken: string;
}

export const authConfig = {
  pages: {
    signIn: ROUTES.SIGN_IN,
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnLoginPage = nextUrl.pathname === ROUTES.SIGN_IN;
      const isOnRegisterPage = nextUrl.pathname === ROUTES.SIGN_UP;

      // If not logged in and not on login or register page, redirect to login page
      if (!isLoggedIn && !isOnLoginPage && !isOnRegisterPage) {
        return Response.redirect(new URL(ROUTES.SIGN_IN, nextUrl));
      }

      // If logged in and on login or register page, redirect to product page
      if (isLoggedIn && (isOnLoginPage || isOnRegisterPage)) {
        return Response.redirect(new URL(ROUTES.DASHBOARD, nextUrl));
      }

      // Allow access in all other cases
      return true;
    },
    async jwt({ user, token }) {
      if (token) Object.assign(token, user);
      return token;
    },

    async session({ session, token }) {
      Object.assign(session.user, token);
      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  providers: [],
} satisfies NextAuthConfig;
