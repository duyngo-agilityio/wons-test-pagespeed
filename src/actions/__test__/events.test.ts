import { revalidateTag } from 'next/cache';

// api
import {
  createEvent,
  deleteEvent,
  updateEvent,
  deleteCalendarTask,
} from '../event';

// services
import { httpClient } from '@/services';

// constants
import { API_PATH } from '@/constants';

// utils
import { formatErrorMessage } from '@/utils';

// Mocks
import { EVENT_MOCKS } from '@/mocks';

// Types
import { Method } from '@/types';

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

describe('createEvent', () => {
  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        ...EVENT_MOCKS,
        visibility: 'public',
        eventType: 'event',
        repeatSetting: 'no_repeat',
        notificationTime: 10,
      },
    });

    const result = await createEvent(EVENT_MOCKS);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Post,
      endpoint: API_PATH.EVENTS,
      body: {
        data: {
          ...EVENT_MOCKS,
          visibility: 'public',
          eventType: 'event',
          repeatSetting: 'no_repeat',
          notificationTime: 10,
        },
      },
    });

    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.EVENTS);
    expect(result).toEqual({ success: true });
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Request failed');
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await createEvent(EVENT_MOCKS);

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});

describe('deleteEvent', () => {
  const eventID = 7;

  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      endpoint: `${API_PATH.EVENTS}/${eventID}`,
    });

    await deleteEvent(eventID);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Delete,
      endpoint: `${API_PATH.EVENTS}/${eventID}`,
    });
    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.EVENTS);
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Request failed');
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await deleteEvent(eventID);

    expect(revalidateTag).not.toHaveBeenCalled();
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});

describe('updateEvent', () => {
  const eventID = 1;

  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      data: {
        id: eventID,
        ...EVENT_MOCKS,
      },
    });

    await updateEvent(eventID, EVENT_MOCKS);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Put,
      endpoint: `${API_PATH.EVENTS}/${eventID}`,
      body: { data: EVENT_MOCKS },
    });

    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.EVENTS);
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await updateEvent(eventID, EVENT_MOCKS);

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});

describe('delete calendar task', () => {
  const mockTaskId = 1;

  it('calls success', async () => {
    (httpClient.genericRequest as jest.Mock).mockResolvedValue({
      endpoint: `${API_PATH.CALENDAR_TASKS}/${mockTaskId}`,
    });

    await deleteCalendarTask(mockTaskId);

    expect(httpClient.genericRequest).toHaveBeenCalledWith({
      method: Method.Delete,
      endpoint: `${API_PATH.CALENDAR_TASKS}/${mockTaskId}`,
    });

    expect(revalidateTag).toHaveBeenCalledWith(API_PATH.EVENTS);
  });

  it('calls failed', async () => {
    const MOCK_ERROR = new Error('Delete failed');

    (httpClient.genericRequest as jest.Mock).mockRejectedValue(MOCK_ERROR);
    (formatErrorMessage as jest.Mock).mockReturnValue('Something went wrong.');

    const result = await deleteCalendarTask(mockTaskId);

    expect(formatErrorMessage).toHaveBeenCalledWith(MOCK_ERROR);
    expect(result).toEqual({ error: 'Something went wrong.' });
  });
});
