// Apis
import { getEvents } from '@/api';

// Components
import CalendarClient from './CalendarClient';
import dayjs from 'dayjs';
import { IEvent } from '@/models';

const Calendar = async () => {
  const { data: events = [] } = await getEvents();

  const formattedEvent = events.map(({ attributes }) => ({
    ...attributes,
    start: dayjs(attributes.startTime).toDate(),
    end: dayjs(attributes.endTime).toDate(),
  })) as unknown as (Event & IEvent)[]; // TODO: Update type later;

  return <CalendarClient events={formattedEvent} />;
};

export default Calendar;
