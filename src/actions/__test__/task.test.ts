import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH, MESSAGES } from '@/constants';

// Mocks
import {
  MOCK_DATA_TASKS_WITHOUT_STRAPI_MODEL,
  MOCK_TASK_WITH_STRING_ASSIGNEES,
  MOCK_TASKS,
} from '@/mocks';

// Services
import { httpClient } from '@/services';

// Actions
import {
  createTask,
  deleteTask,
  getTaskDetails,
  updateTask,
  updateTaskWithAssignees,
} from '../task';

// Utils
import { formatErrorMessage } from '@/utils';

// Types
import { Method, TaskWithStringAssignees } from '@/types';

// Api
import { getTaskById } from '@/api';

jest.mock('@/services', () => ({
  httpClient: {
    genericRequest: jest.fn(),
  },
}));

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

jest.mock('@/api', () => ({
  getTaskById: jest.fn(),
}));

describe('deleteTask', () => {
  const taskID = MOCK_TASKS.todo[0].id;

  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      method: Method.Delete,
      endpoint: `${API_PATH.TASKS}/${taskID}`,
    });

    await deleteTask(taskID);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Delete,
      endpoint: `${API_PATH.TASKS}/${taskID}`,
    });
    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.TASKS);
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Request failed');
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await deleteTask(taskID);

    expect(revalidateTag).not.toHaveBeenCalled();
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});

describe('createTask', () => {
  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        ...MOCK_TASK_WITH_STRING_ASSIGNEES,
      },
    });

    const result = await createTask(MOCK_TASK_WITH_STRING_ASSIGNEES);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Post,
      endpoint: API_PATH.TASKS,
      body: { data: MOCK_TASK_WITH_STRING_ASSIGNEES },
    });

    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.TASKS);
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Request failed');
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await createTask(MOCK_TASK_WITH_STRING_ASSIGNEES);

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});

describe('updateTask', () => {
  const taskID = 1;

  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      data: {
        id: taskID,
        ...MOCK_DATA_TASKS_WITHOUT_STRAPI_MODEL,
      },
    });

    const result = await updateTask(
      taskID,
      MOCK_DATA_TASKS_WITHOUT_STRAPI_MODEL,
    );

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Put,
      endpoint: `${API_PATH.TASKS}/${taskID}?populate=assignees`,
      body: { data: MOCK_DATA_TASKS_WITHOUT_STRAPI_MODEL },
      configOptions: {
        cache: 'no-store',
      },
    });

    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.TASKS);
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await updateTask(
      taskID,
      MOCK_DATA_TASKS_WITHOUT_STRAPI_MODEL,
    );

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});

describe('Get task details', () => {
  const mockTaskID = 1;
  it('Calls success', async () => {
    (getTaskById as jest.Mock).mockResolvedValue({
      data: MOCK_TASKS.todo[0],
    });

    const result = await getTaskDetails(mockTaskID);

    expect(result).toEqual({
      data: MOCK_TASKS.todo[0],
    });
  });

  it('Calls success with undefined', async () => {
    (getTaskById as jest.Mock).mockResolvedValue({ error: 'Task not found' });

    const result = await getTaskDetails(mockTaskID);

    expect(result).toEqual({ error: 'Task not found' });
  });

  it('Calls failed', async () => {
    const mockError = new Error(MESSAGES.ERROR.UNKNOWN_ERROR);
    (getTaskById as jest.Mock).mockRejectedValue(mockError);

    const result = await getTaskDetails(mockTaskID);

    expect(formatErrorMessage).toHaveBeenCalledWith(mockError);
    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});

describe('Update task with assignees', () => {
  const mockTaskID = 1;
  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      success: true,
    });

    const result = await updateTaskWithAssignees(
      mockTaskID,
      MOCK_TASK_WITH_STRING_ASSIGNEES as TaskWithStringAssignees,
    );

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Put,
      endpoint: `${API_PATH.TASKS}/${mockTaskID}?populate=assignees`,
      configOptions: {
        cache: 'no-store',
      },
      body: { data: MOCK_TASK_WITH_STRING_ASSIGNEES },
    });

    expect(revalidateTag).toHaveBeenLastCalledWith(API_PATH.TASKS);
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    const mockError = new Error(MESSAGES.ERROR.UNKNOWN_ERROR);
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(mockError);

    const result = await updateTaskWithAssignees(
      mockTaskID,
      MOCK_TASK_WITH_STRING_ASSIGNEES as TaskWithStringAssignees,
    );

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Put,
      endpoint: `${API_PATH.TASKS}/${mockTaskID}?populate=assignees`,
      configOptions: {
        cache: 'no-store',
      },
      body: { data: MOCK_TASK_WITH_STRING_ASSIGNEES },
    });

    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});
