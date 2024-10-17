// Constants
import { ERROR_MESSAGES } from '@/constants';

// Services
import { httpClient } from '@/services';
import { getProfile } from '../user';

// Mocks
import { MOCK_ERROR_RESPONSE, MOCK_PROFILE } from '@/mocks';

describe('getProfile', () => {
  const mockJWT = 'mockjwtcode';

  it('should get the user list successfully', async () => {
    jest.spyOn(httpClient, 'getRequest').mockResolvedValue(MOCK_PROFILE);

    const res = await getProfile(mockJWT);

    expect(res).toEqual(MOCK_PROFILE);
  });

  it('should get the profile list failed', async () => {
    jest.spyOn(httpClient, 'getRequest').mockRejectedValue(MOCK_ERROR_RESPONSE);

    await expect(getProfile(mockJWT)).rejects.toThrow(
      ERROR_MESSAGES.UNKNOWN_ERROR,
    );
  });
});
