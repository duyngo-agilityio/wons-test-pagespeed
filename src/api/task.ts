// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

// Constants
import { API_PATH } from '@/constants';

// Types
import { TTasksResponse } from '@/types';

type TaskConfigs = {
  cache?: RequestCache;
  nextOptions?: NextFetchRequestConfig;
};

export const getTasks = async ({
  cache,
  nextOptions,
}: TaskConfigs): Promise<TTasksResponse> => {
  const endpoint = `${API_PATH.TASKS}?populate=assignees`;

  try {
    const response = await httpClient.getRequest<TTasksResponse>({
      endpoint,
      configOptions: {
        cache: cache ?? 'force-cache',
        next: nextOptions,
      },
    });

    return response;
  } catch (error) {
    const message = formatErrorMessage(error);

    throw new Error(message);
  }
};
