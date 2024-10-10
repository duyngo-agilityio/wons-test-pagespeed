import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH } from '@/constants';

// Mocks
import { MOCK_TASKS } from '@/mocks';

// Services
import { httpClient } from '@/services';

// Apis
import { deleteTask } from '../task';

// Utils
import { formatErrorMessage } from '@/utils';

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
    deleteRequest: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

describe('deleteTask', () => {
  const taskID = MOCK_TASKS.todo[0].id;

  it('calls success', async () => {
    (httpClient.deleteRequest as jest.Mock).mockResolvedValue({
      endpoint: `${API_PATH.TASKS}/${taskID}`,
    });

    await deleteTask(taskID);

    expect(httpClient.deleteRequest).toHaveBeenCalledWith({
      endpoint: `${API_PATH.TASKS}/${taskID}`,
    });
    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.TASKS);
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Request failed');
    (httpClient.deleteRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await deleteTask(taskID);

    expect(revalidateTag).not.toHaveBeenCalled();
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});
