import { authenticate } from '../auth';

// Configs
import { signIn } from '@/configs';

// Constants
import { AUTH_METHODS } from '@/constants';

// Types
import { SignInFormData } from '@/types';

// Mock the signIn function
jest.mock('@/configs', () => ({
  signIn: jest.fn(),
}));

describe('authenticate() authenticate method', () => {
  const validFormData: SignInFormData = {
    identifier: 'user@example.com',
    password: 'securePassword123',
  };

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

    it('should not return an error message on successful signIn', async () => {
      // Arrange
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);

      // Act
      const result = await authenticate(validFormData);

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
