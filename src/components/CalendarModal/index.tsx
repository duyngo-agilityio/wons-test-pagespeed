'use client';

import { memo, useState } from 'react';
import { CalendarDate } from '@internationalized/date';
import { IoClose } from 'react-icons/io5';
import isEqual from 'react-fast-compare';

import { Modal as NextModal, ModalContent, Calendar } from '@nextui-org/react';

// Utils
import { formatToCalendarDate } from '@/utils';

// Models
import { IEvent, TUser } from '@/models';

// Components
import {
  Heading,
  Button,
  Tabs,
  CalendarEventForm,
  CalendarTaskForm,
} from '@/components';

interface TimeRangeProps {
  start: string;
  end: string;
}

interface EventForm {
  title: string;
  location?: string;
  people?: string | number[];
}

interface EventFormModalProps {
  title: string;
  eventTitle: string;
  date: Date;
  timeRange: TimeRangeProps;
  isOpen: boolean;
  repeatSetting?: string;
  guests?: string[];
  location?: string;
  user: TUser;
  previewData?: EventForm | null;
  onSubmit: (data: Partial<IEvent>) => void;
  onClose: () => void;
}

const CalendarModal = ({
  title = '',
  eventTitle = '',
  date,
  timeRange,
  isOpen,
  user,
  previewData = null,
  onClose,
  onSubmit,
}: EventFormModalProps): JSX.Element => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(formatToCalendarDate(date));

  const handleDateChange = (newDate: CalendarDate) => {
    setIsOpenCalendar(false);
    setCalendarDate(newDate);
  };

  const handleModalClose = () => {
    onClose();
  };

  const EVENT_TABS = [
    {
      key: 'event',
      label: 'Event',
      content: (
        <CalendarEventForm
          previewData={previewData}
          timeRange={timeRange}
          eventTitle={eventTitle}
          date={date}
          user={user}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      ),
      isDisable: false,
    },
    {
      key: 'task',
      label: 'Task',
      content: (
        <CalendarTaskForm
          date={date}
          onClose={onClose}
          time={timeRange.start}
        />
      ),
      isDisable: false,
    },
    {
      key: 'reminder',
      label: 'Reminder',
      content: 'This is the reminder content',
      isDisable: true,
    },
  ];

  return (
    <NextModal
      className="!max-w-[467px]"
      isOpen={isOpen}
      size="xl"
      hideCloseButton={true}
      placement="center"
    >
      <ModalContent className="relative top-0 left-0 p-[30px_30px_40px] bg-white bg-white dark:bg-gray-800 rounded-[10px] shadow-[ -14px_30px_20px_0px_rgba(0,0,0,0.05)] w-[467px]">
        {isOpenCalendar && (
          <Calendar
            className="absolute top-[240px] left-[80px] z-10"
            aria-label="Date"
            value={calendarDate}
            onChange={handleDateChange}
          />
        )}

        <Heading className="mt-[12px]" size="md" title={title} />

        <Button
          className="absolute top-[30px] right-[30px] !bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
          data-testid="close-button"
          onClick={handleModalClose}
        >
          <IoClose size={20} />
        </Button>

        <Tabs style={{ padding: 0, margin: '40px 0 18px' }} tabs={EVENT_TABS} />
      </ModalContent>
    </NextModal>
  );
};

export default memo(CalendarModal, isEqual);
