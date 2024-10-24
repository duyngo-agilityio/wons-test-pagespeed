// Apis
import { getCalendarEvents, getCalendarTasks } from '@/api';

import { formattedEvents, formattedTasks, isAdmin } from '@/utils';

// Configs
import { auth } from '@/configs';

// Models
import { TUser } from '@/models';

// Actions
import { createEvent, updateEvent } from '@/actions';

// Components
import CalendarClient from './CalendarClient';

const Calendar = async () => {
  const { data: events = [] } = await getCalendarEvents();
  const { data: tasks = [] } = await getCalendarTasks();
  const { user = {} } = (await auth()) ?? {};

  const isSuperAdmin = await isAdmin();

  return (
    <CalendarClient
      isAdmin={isSuperAdmin}
      user={user as TUser}
      events={[...formattedEvents(events), ...formattedTasks(tasks)]}
      createEvent={createEvent}
      updateEvent={updateEvent}
    />
  );
};

export default Calendar;
