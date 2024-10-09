'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH } from '@/constants';

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

    await httpClient.postRequest({
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
    await httpClient.deleteRequest({
      endpoint: `${API_PATH.EVENTS}/${id}`,
    });
    revalidateTag(API_PATH.EVENTS);
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
