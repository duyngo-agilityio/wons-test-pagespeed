'use server';

import { AuthError } from 'next-auth';

// Configs
import { signIn, signOut as signOutAuth } from '@/configs';

// Constants
import {
  API_PATH,
  AUTH_METHODS,
  ERROR_TYPES,
  MESSAGES,
  METHOD,
} from '@/constants';

// Types
import { SignInFormData, TSignUpPayload, TSignUpResponse } from '@/types';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

export const authenticate = async (
  formData: SignInFormData,
): Promise<void | string> => {
  try {
    await signIn(AUTH_METHODS.CREDENTIALS, formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case ERROR_TYPES.CREDENTIALS_SIGN_IN:
          return MESSAGES.ERROR.EMAIL_PASSWORD_INVALID;
        default:
          return MESSAGES.ERROR.UNKNOWN_ERROR;
      }
    }
    throw error;
  }
};

export const signOut = async () => {
  await signOutAuth();
};

export const signUp = async (
  payload: TSignUpPayload,
): Promise<{ error?: string; data?: TSignUpResponse }> => {
  try {
    const res = await httpClient.genericRequest<
      TSignUpPayload,
      TSignUpResponse
    >({
      method: METHOD.POST,
      endpoint: API_PATH.SIGN_UP,
      body: payload,
    });

    return { data: res };
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};
