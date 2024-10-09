'use server';

import { revalidateTag } from 'next/cache';

// Services
import { httpClient } from '@/services';

// Constants
import { API_PATH } from '@/constants';

// Types
import { StrapiModel, StrapiResponse, Task } from '@/types';

// Utils
import { formatErrorMessage } from '@/utils';

export const updateTask = async (id: number, data: Task) => {
  try {
    await httpClient.putRequest<
      { data: Task },
      StrapiResponse<StrapiModel<Task>>
    >({
      endpoint: `${API_PATH.TASKS}/${id}?populate=assignees`,
      body: { data },
      configOptions: {
        cache: 'no-store',
      },
    });

    revalidateTag(API_PATH.TASKS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
