'use server';

import { AuthError } from 'next-auth';

// Configs
import { signIn, signOut as signOutAuth } from '@/configs';

// Constants
import { AUTH_METHODS, ERROR_MESSAGES, ERROR_TYPES } from '@/constants';

// Types
import { SignInFormData } from '@/types';

export const authenticate = async (
  formData: SignInFormData,
): Promise<void | string> => {
  try {
    await signIn(AUTH_METHODS.CREDENTIALS, formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case ERROR_TYPES.CREDENTIALS_SIGN_IN:
          return ERROR_MESSAGES.EMAIL_PASSWORD_INVALID;
        default:
          return ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    }
    throw error;
  }
};

export const signOut = async () => {
  await signOutAuth();
};
