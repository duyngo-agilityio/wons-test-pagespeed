// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage, formatFilterMultipleUser } from '@/utils';

// Constants
import { API_PATH } from '@/constants';

// Types
import { TTasksResponse } from '@/types';

type TaskConfigs = {
  cache?: RequestCache;
  nextOptions?: NextFetchRequestConfig;
  filters?: string[];
};

export const getTasks = async ({
  cache,
  nextOptions,
  filters,
}: TaskConfigs): Promise<TTasksResponse> => {
  const filterQuery: string = formatFilterMultipleUser(filters ?? []);
  const endpoint = `${API_PATH.TASKS}?populate=assignees${filterQuery}`;

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
