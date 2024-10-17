import { revalidateTag } from 'next/cache';

// Services
import { httpClient } from '@/services';
import { updateUser } from '../user';

// Constants
import { API_PATH } from '@/constants';

// Utils
import { formatErrorMessage } from '@/utils';

// Mocks
import { MOCK_USERS } from '@/mocks';

jest.mock('@/services', () => ({
  httpClient: {
    putRequest: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

describe('updateUser', () => {
  const userID = 1;

  it('calls success', async () => {
    (httpClient.putRequest as jest.Mock).mockResolvedValue(MOCK_USERS[0]);

    const result = await updateUser(MOCK_USERS[0], userID);

    expect(httpClient.putRequest).toHaveBeenCalledWith({
      endpoint: `${API_PATH.USERS}/${userID}`,
      body: MOCK_USERS[0],
    });

    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.USERS);
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.putRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await updateUser(MOCK_USERS[0], userID);

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});
