// Apis
import { getEvents } from '@/api';

// Utils
import { formattedEvents } from '@/utils';

// Components
import CalendarClient from './CalendarClient';

const Calendar = async () => {
  const { data: events = [] } = await getEvents();

  return <CalendarClient events={formattedEvents(events)} />;
};

export default Calendar;
