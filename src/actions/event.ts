'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH, METHOD } from '@/constants';

// Models
import { IEvent } from '@/models';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

export const createEvent = async (formData: Partial<IEvent>) => {
  try {
    const formattedData = {
      ...formData,
      visibility: 'public',
      eventType: 'event',
      repeatSetting: 'no_repeat',
      notificationTime: 10,
    };

    await httpClient.genericRequest({
      method: METHOD.POST,
      endpoint: API_PATH.EVENTS,
      body: { data: formattedData },
    });

    revalidateTag(API_PATH.EVENTS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const deleteEvent = async (
  id: number,
): Promise<{ error?: string } | void> => {
  try {
    await httpClient.genericRequest({
      method: METHOD.DELETE,
      endpoint: `${API_PATH.EVENTS}/${id}`,
    });
    revalidateTag(API_PATH.EVENTS);
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const updateEvent = async (
  id: number,
  data: Partial<IEvent>,
): Promise<{ error?: string } | void> => {
  try {
    await httpClient.genericRequest({
      method: METHOD.PUT,
      endpoint: `${API_PATH.EVENTS}/${id}`,
      body: { data },
    });

    revalidateTag(API_PATH.EVENTS);
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
