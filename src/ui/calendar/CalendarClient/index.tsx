'use client';

import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import {
  Calendar as CalendarBase,
  CalendarProps,
  dayjsLocalizer,
  Views,
} from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';

// Models
import { IEvent } from '@/models';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button, CustomCalendar } from '@/components';
import CustomToolBar from '../CustomToolBar';

const localizer = dayjsLocalizer(dayjs);

type ViewType = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

interface CalendarClientProps extends Omit<CalendarProps, 'localizer'> {
  events: (Event & IEvent)[];
}

const CalendarClient = ({ events, ...rest }: CalendarClientProps) => {
  const [view, setView] = useState<ViewType>(Views.MONTH);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-[37px] relative">
      <div className="bg-white dark:bg-gray-400 px-[28px] py-[32px] rounded-[5px] flex flex-col justify-between">
        <CustomCalendar />
        <Button color="secondary" as={Link} href={ROUTES.SCHEDULE}>
          My Schedule
        </Button>
      </div>
      <div className="flex-1">
        <CalendarBase
          {...rest}
          defaultView={Views.MONTH}
          onView={setView}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          view={view}
          events={events}
          components={{ toolbar: CustomToolBar }}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
};

export default CalendarClient;
