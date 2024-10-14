// Services
import { httpClient } from '@/services';
import { getTaskById } from '../task';

// Mocks
import { MOCK_TASKS } from '@/mocks';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { formatErrorMessage } from '@/utils';

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

describe('getTaskById', () => {
  it('should get the task details successfully', async () => {
    const mockTaskDetails = MOCK_TASKS.todo[0];

    jest
      .spyOn(httpClient, 'getRequest')
      .mockResolvedValue({ data: mockTaskDetails });

    const response = await getTaskById({
      id: 1,
    });

    expect(response).toEqual({ data: mockTaskDetails });
  });

  it('should get the task details failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.getRequest as jest.Mock).mockRejectedValue({
      error: MOCK_ERROR,
    });
    (formatErrorMessage as jest.Mock).mockReturnValue(
      ERROR_MESSAGES.UNKNOWN_ERROR,
    );

    const result = await getTaskById({ id: 0 });

    expect(formatErrorMessage).toHaveBeenCalledWith({
      error: MOCK_ERROR,
    });
    expect(result).toEqual({ error: ERROR_MESSAGES.UNKNOWN_ERROR });
  });
});
