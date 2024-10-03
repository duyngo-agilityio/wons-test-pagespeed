'use client';

import { memo, useState, useCallback, FormEvent } from 'react';

// Libraries
import isEqual from 'react-fast-compare';
import { CalendarDate } from '@internationalized/date';

// Icons
import { IoClose } from 'react-icons/io5';
import { ClockIcon, CalendarIcon, LocationIcon, PeopleIcon } from '../common';

// Utils
import {
  formatToCalendarDate,
  formatToJsDate,
  capitalizeFirstLetter,
  formatEventDate,
} from '@/utils';

// Components
import { Heading, Input, Button, Text } from '@/components/common';
import { Tabs } from '@/components';
import { Modal as NextModal, ModalContent, Calendar } from '@nextui-org/react';

// Constants
import { EVENT_MODAL_TITLES } from '@/constants';

// Mocks
import { EVENT_TABS } from '@/mocks';

type TimeRangeProps = {
  start: string;
  end: string;
};

type EventFormModalProps = {
  type: 'event' | 'reminder' | 'task';
  date: Date;
  timeRange: TimeRangeProps;
  repeatSetting: string;
  status: 'free' | 'busy';
  visibility: 'default visibility' | 'public' | 'private';
  notificationTime: number;
  isOpen: boolean;
  onSubmit: (data: FormEvent) => void;
  onClose: () => void;
  guests?: string[];
  location?: string;
};

const EventFormModal = ({
  type = 'event',
  date,
  timeRange,
  repeatSetting = 'does not repeat',
  // status = 'free',
  // visibility = 'default visibility',
  // notificationTime = 0,
  isOpen,
  onClose,
  onSubmit,
  // guests,
  // location,
}: EventFormModalProps): JSX.Element => {
  // States
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(formatToCalendarDate(date));

  // Helper functions
  const modalTitle = EVENT_MODAL_TITLES[type] || EVENT_MODAL_TITLES.EVENT;
  const jsDate = formatToJsDate(calendarDate);
  const formattedDate = formatEventDate(jsDate);

  const toggleCalendarVisibility = useCallback(() => {
    setIsOpenCalendar((prev) => !prev);
  }, [setIsOpenCalendar]);

  const handleDateChange = (newDate: CalendarDate) => {
    setIsOpenCalendar(false);
    setCalendarDate(newDate);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    // TODO: update logic or side effects
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <NextModal
      className="!max-w-[467px]"
      isOpen={isOpen}
      hideCloseButton={true}
    >
      <ModalContent className="relative top-0 left-0 p-[30px_30px_40px] bg-white rounded-[10px] shadow-[ -14px_30px_20px_0px_rgba(0,0,0,0.05)] w-[467px]">
        {isOpenCalendar && (
          <Calendar
            className="absolute top-[240px] left-[80px] z-10"
            aria-label="Date"
            value={calendarDate}
            onChange={handleDateChange}
          />
        )}

        <form onSubmit={handleFormSubmit}>
          <Heading className="mt-[12px]" size="md" title={modalTitle} />

          <Button
            className="absolute top-[30px] right-[30px] !bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
            data-testid="close-button"
            onClick={onClose}
          >
            <IoClose size={20} />
          </Button>

          <Tabs
            style={{ padding: 0, margin: '40px 0 18px' }}
            tabs={EVENT_TABS}
          />

          <Input
            classNames={{
              inputWrapper:
                'w-full h-[42px] rounded-[10px] bg-[#99B2C6]/30 m-[0_0_25px]',
              input:
                'placeholder:text-[#06152B] placeholder:opacity-20 placeholder:font-medium placeholder:text-[16px]',
            }}
            placeholder="Add title"
          />

          <div className="flex gap-[0_15px]">
            <Button
              className="!bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
              data-testid="time-button"
              onClick={toggleCalendarVisibility}
            >
              <ClockIcon />
            </Button>

            <div className="grid grid-rows-2 grid-cols-2 max-w-[350px] gap-[0_30px]">
              <Text
                className="text-[#06152B] text-[12px] font-normal leading-normal col-span-1"
                text={formattedDate} // Display date
              />
              <Text
                className="text-[#06152B] text-[12px] font-normal leading-normal col-span-1"
                text={`${timeRange.start} - ${timeRange.end}`} // Display time
              />
              <Text
                className="text-[#010d1c] text-opacity-50 text-[12px] font-normal leading-normal col-span-2"
                text={`Time zone - ${capitalizeFirstLetter(repeatSetting)}`}
              />
            </div>
          </div>

          <div className="flex gap-[0_25px] m-[30px_0]">
            <Button
              color="primary"
              startContent={<PeopleIcon />}
              className="text-[15px] font-medium md:w-auto py-[10px] px-[25px] w-full mt-10 md:mt-0"
            >
              Add People
            </Button>

            <Button
              startContent={<LocationIcon />}
              className="!bg-white font-medium dark:!bg-white text-center !text-[#3A36DB] dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] px-[25px] !rounded-[10px] font-DM-Sans text-[14.22px] font-normal leading-normal"
            >
              Add Location
            </Button>
          </div>

          <div className="m-[0_0_40px] flex gap-[0_15px]">
            <Button
              className="!bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
              data-testid="calendar-button"
            >
              <CalendarIcon width={15} height={15} color="#FF69B4" />
            </Button>

            <div className="flex flex-col gap-[0_30px]">
              <Text
                className="text-[#06152B] text-[12px] font-normal leading-normal col-span-1"
                text="John Deo" // Display name
              />
              <Text
                className="text-[#010d1c] text-opacity-50 text-[12px] font-normal leading-normal"
                text="Busy - Default visibility - notify 30 minutes before" // Display status
              />
            </div>
          </div>

          <div className="flex flex-row-reverse gap-[0_20px]">
            <Button
              className="min-w-[93px] text-[15px] font-normal md:w-auto py-[10px] w-full mt-10 md:mt-0"
              type="submit"
              color="primary"
            >
              Save
            </Button>

            <Button
              className="min-w-[93px] !bg-white font-normal dark:!bg-white text-center !text-[#3A36DB] dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] !rounded-[10px] font-DM-Sans text-[15px] font-normal leading-normal"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </form>
      </ModalContent>
    </NextModal>
  );
};

export default memo(EventFormModal, isEqual);
