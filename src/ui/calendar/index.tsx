// Apis
import { getEvents } from '@/api';

import { formattedEvents } from '@/utils';

// Configs
import { auth } from '@/configs';

// Models
import { TUser } from '@/models';

// Actions
import { createEvent } from '@/actions';

// Components
import CalendarClient from './CalendarClient';

const Calendar = async () => {
  const { data: events = [] } = await getEvents();
  const { user = {} } = (await auth()) ?? {};

  return (
    <CalendarClient
      user={user as TUser}
      events={formattedEvents(events)}
      createEvent={createEvent}
    />
  );
};

export default Calendar;
