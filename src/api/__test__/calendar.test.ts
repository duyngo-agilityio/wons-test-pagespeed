// Services
import { httpClient } from '@/services';

// Mocks
import { CALENDAR_TASKS_MOCK, EVENTS_MOCKS } from '@/mocks';

// Constants
import { MESSAGES } from '@/constants';

// Utils
import { formatErrorMessage } from '@/utils';

// Api
import { getCalendarEvents, getCalendarTasks } from '../calendar';

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

jest.mock('@/services', () => ({
  httpClient: {
    getRequest: jest.fn(),
  },
}));

describe('getCalendarEvents', () => {
  it('should get the event list successfully', async () => {
    const mocksEvents = EVENTS_MOCKS;

    jest
      .spyOn(httpClient, 'getRequest')
      .mockResolvedValue({ data: mocksEvents });

    const response = await getCalendarEvents();

    expect(response).toEqual({ data: mocksEvents });
  });

  it('should get the task list undefined', async () => {
    jest.spyOn(httpClient, 'getRequest').mockResolvedValue({});

    const response = await getCalendarEvents();

    expect(response).toEqual({ data: [] });
  });

  it('should get the event list failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.getRequest as jest.Mock).mockRejectedValue({
      error: MOCK_ERROR,
    });
    (formatErrorMessage as jest.Mock).mockReturnValue(
      MESSAGES.ERROR.UNKNOWN_ERROR,
    );

    const result = await getCalendarEvents();

    expect(formatErrorMessage).toHaveBeenCalledWith({
      error: MOCK_ERROR,
    });
    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});

describe('getCalendarTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get the task list successfully', async () => {
    jest.spyOn(httpClient, 'getRequest').mockResolvedValue(CALENDAR_TASKS_MOCK);

    const response = await getCalendarTasks();

    expect(response).toEqual(CALENDAR_TASKS_MOCK);
  });

  it('should get the task list undefined', async () => {
    jest.spyOn(httpClient, 'getRequest').mockResolvedValue({});

    const response = await getCalendarTasks();

    expect(response).toEqual({ data: [] });
  });

  it('should get the task list failed', async () => {
    const MOCK_ERROR = new Error('Update failed');
    (httpClient.getRequest as jest.Mock).mockRejectedValue({
      error: MOCK_ERROR,
    });
    (formatErrorMessage as jest.Mock).mockReturnValue(
      MESSAGES.ERROR.UNKNOWN_ERROR,
    );

    const result = await getCalendarTasks();

    expect(formatErrorMessage).toHaveBeenCalledWith({
      error: MOCK_ERROR,
    });
    expect(result).toEqual({ error: MESSAGES.ERROR.UNKNOWN_ERROR });
  });
});
