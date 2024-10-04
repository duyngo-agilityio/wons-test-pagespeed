'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import { Calendar as CalendarBase, dayjsLocalizer } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button, CustomCalendar } from '@/components';
import CustomToolBar from './CustomToolBar';

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
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
          components={{ toolbar: CustomToolBar }}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
};

export default Calendar;
