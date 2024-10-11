'use server';

import { revalidateTag } from 'next/cache';

// Services
import { httpClient } from '@/services';

// Constants
import { API_PATH } from '@/constants';

// Types
import {
  StrapiModel,
  StrapiResponse,
  Task,
  TaskWithStringAssignees,
} from '@/types';

// Utils
import { formatErrorMessage } from '@/utils';

// Apis
import { getTaskById } from '@/api';

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

export const getTaskDetails = async (id: number) => {
  try {
    const task = await getTaskById({
      id,
    });

    if (!task) {
      return { error: 'Task not found' };
    }

    return task;
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};

export const createTask = async (
  formData: Partial<TaskWithStringAssignees>,
) => {
  try {
    const { title, ...restFormData } = formData;

    const formattedData = {
      ...restFormData,
      title,
    };

    await httpClient.postRequest({
      endpoint: API_PATH.TASKS,
      body: { data: formattedData },
    });

    revalidateTag(API_PATH.TASKS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const deleteTask = async (
  id: number,
): Promise<{ error?: string } | void> => {
  try {
    await httpClient.deleteRequest({
      endpoint: `${API_PATH.TASKS}/${id}`,
    });

    revalidateTag(API_PATH.TASKS);
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};
