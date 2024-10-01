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

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
  return (
    <div className="flex h-[calc(100vh-120px)] gap-[37px]">
      <div className="bg-white px-[28px] py-[32px] rounded-[5px] flex flex-col justify-between">
        <CustomCalendar />
        <Button color="secondary" as={Link} href={ROUTES.SCHEDULE}>
          My Schedule
        </Button>
      </div>
      <div>
        <CalendarBase
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
};

export default Calendar;
