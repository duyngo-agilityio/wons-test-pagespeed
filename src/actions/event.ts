'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH } from '@/constants';

// Models
import { ICalendarTask, IEvent } from '@/models';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

// Types
import { Method } from '@/types';

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
      method: Method.Post,
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
      method: Method.Delete,
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
      method: Method.Put,
      endpoint: `${API_PATH.EVENTS}/${id}`,
      body: { data },
    });

    revalidateTag(API_PATH.EVENTS);
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const updateCalendarTask = async (
  id: number,
  data: Partial<ICalendarTask>,
): Promise<{ error?: string } | void> => {
  try {
    await httpClient.genericRequest({
      method: Method.Put,
      endpoint: `${API_PATH.CALENDAR_TASKS}/${id}`,
      body: { data },
    });

    revalidateTag(API_PATH.EVENTS);
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const createCalenderTask = async (formData: Partial<ICalendarTask>) => {
  try {
    await httpClient.genericRequest({
      method: Method.Post,
      endpoint: API_PATH.CALENDAR_TASKS,
      body: { data: formData },
    });

    revalidateTag(API_PATH.EVENTS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const deleteCalendarTask = async (
  id: number,
): Promise<{ error?: string } | void> => {
  try {
    await httpClient.genericRequest({
      method: Method.Delete,
      endpoint: `${API_PATH.CALENDAR_TASKS}/${id}`,
    });

    revalidateTag(API_PATH.EVENTS);
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};
