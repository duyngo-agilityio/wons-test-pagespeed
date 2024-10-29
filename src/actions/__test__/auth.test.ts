import { AuthError } from 'next-auth';

// Auth
import { authenticate, signOut as signOutAuth, signUp } from '../auth';

// Configs
import { signIn, signOut } from '@/configs';

// Constants
import { API_PATH, AUTH_METHODS, MESSAGES } from '@/constants';
import { SIGN_UP_FORM_DATA_MOCK } from '@/mocks';
import { httpClient } from '@/services';

// Types
import { Method, SignInFormData } from '@/types';

jest.mock('next-auth', () => ({
  AuthError: jest.fn(),
}));

// Mock the signIn function
jest.mock('@/configs', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    genericRequest: jest.fn(),
  },
}));

const validFormData: SignInFormData = {
  identifier: 'user@example.com',
  password: 'securePassword123',
};

describe('authenticate() authenticate method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should call signIn with correct parameters', async () => {
      // Arrange
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);
      // Act
      await authenticate(validFormData);
      // Assert
      expect(signIn).toHaveBeenCalledWith(
        AUTH_METHODS.CREDENTIALS,
        validFormData,
      );
    });

    it('should return an error message when AuthError is thrown', async () => {
      (signIn as jest.Mock).mockRejectedValue(
        new AuthError(MESSAGES.ERROR.EMAIL_PASSWORD_INVALID),
      );

      const result = await authenticate(validFormData);

      expect(result).toBe(MESSAGES.ERROR.UNKNOWN_ERROR);
    });

    it('throw error', async () => {
      (signIn as jest.Mock).mockRejectedValue(
        new Error(MESSAGES.ERROR.EMAIL_PASSWORD_INVALID),
      );

      await expect(authenticate(validFormData)).rejects.toThrow(
        MESSAGES.ERROR.EMAIL_PASSWORD_INVALID,
      );
    });
  });
});

describe('signOut', () => {
  it('calls signOut', async () => {
    // Arrange
    (signIn as jest.Mock).mockResolvedValueOnce(undefined);

    // Act
    await authenticate(validFormData);

    await signOutAuth();

    expect(signOut).toHaveBeenCalled();
  });
});

describe('signUp', () => {
  it('calls signUp', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue(
      SIGN_UP_FORM_DATA_MOCK,
    );

    const result = await signUp(SIGN_UP_FORM_DATA_MOCK);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Post,
      endpoint: API_PATH.SIGN_UP,
      body: SIGN_UP_FORM_DATA_MOCK,
    });

    expect(result).toEqual({ data: SIGN_UP_FORM_DATA_MOCK });
  });
});
