// Services
import { httpClient } from '@/services';

// Mocks
import { EVENTS_MOCKS } from '@/mocks';

// Constants
import { MESSAGES } from '@/constants';

// Utils
import { formatErrorMessage } from '@/utils';

// Api
import { getEvents } from '../event';

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
  },
}));

describe('Events', () => {
  it('should get the event list successfully', async () => {
    const mocksEvents = EVENTS_MOCKS;

    jest
      .spyOn(httpClient, 'getRequest')
      .mockResolvedValue({ data: mocksEvents });

    const response = await getEvents();

    expect(response).toEqual({ data: mocksEvents });
  });

  it('should get the event list failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.getRequest as jest.Mock).mockRejectedValue({
      error: MOCK_ERROR,
    });
    (formatErrorMessage as jest.Mock).mockReturnValue(
      MESSAGES.ERROR.UNKNOWN_ERROR,
    );

    const result = await getEvents();

    expect(formatErrorMessage).toHaveBeenCalledWith({
      error: MOCK_ERROR,
    });
    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});
