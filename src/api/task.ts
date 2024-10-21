// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage, formatFilterMultipleUser } from '@/utils';

// Constants
import { API_PATH } from '@/constants';

// Types
import { StrapiModel, StrapiResponse, Task, TTasksResponse } from '@/types';

type TaskConfigs = {
  cache?: RequestCache;
  nextOptions?: NextFetchRequestConfig;
  filters?: string[];
  query?: string;
};

export const getTasks = async ({
  cache,
  nextOptions,
  filters,
  query,
}: TaskConfigs): Promise<TTasksResponse> => {
  const filterQuery: string = formatFilterMultipleUser(filters ?? []);
  const searchBy: string = query
    ? `&filters[$and][0][title][$contains]=${query}`
    : '';

  const endpoint = `${API_PATH.TASKS}?populate=assignees${filterQuery}${searchBy}`;

  try {
    const response = await httpClient.getRequest<TTasksResponse>({
      endpoint,
      configOptions: {
        cache: cache,
        next: nextOptions,
      },
    });

    return response;
  } catch (error) {
    const message = formatErrorMessage(error);

    throw new Error(message);
  }
};

export const getTaskById = async ({
  id,
  cache,
  nextOptions,
}: {
  id: number;
  cache?: RequestCache;
  nextOptions?: NextFetchRequestConfig;
}): Promise<{
  error?: string;
  data?: StrapiModel<Task>;
}> => {
  const endpoint = `${API_PATH.TASKS}/${id}?populate=assignees`;

  try {
    const response = await httpClient.getRequest<
      StrapiResponse<StrapiModel<Task>>
    >({
      endpoint,
      configOptions: {
        cache: cache,
        next: nextOptions,
      },
    });

    return { data: response.data };
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};
