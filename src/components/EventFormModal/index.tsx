'use client';

import { memo, useState, useCallback } from 'react';

// Libraries
import isEqual from 'react-fast-compare';
import { CalendarDate } from '@internationalized/date';
import { Controller, useForm } from 'react-hook-form';

// Icons
import { IoClose } from 'react-icons/io5';

// Utils
import {
  formatToCalendarDate,
  formatToStandardDate,
  capitalizeFirstLetter,
  formatEventDate,
  clearErrorOnChange,
} from '@/utils';

// Components
import { Tabs } from '@/components';
import {
  ClockIcon,
  CalendarIcon,
  LocationIcon,
  PeopleIcon,
  Heading,
  Input,
  Button,
  Text,
} from '@/components/common';
import { Modal as NextModal, ModalContent, Calendar } from '@nextui-org/react';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Mocks
import { EVENT_TABS } from '@/mocks';

interface TimeRangeProps {
  start: string;
  end: string;
}

interface EventFormModalProps {
  title: string;
  type: 'event' | 'reminder' | 'task';
  eventTitle: string;
  date: Date;
  timeRange: TimeRangeProps;
  status: 'free' | 'busy';
  visibility: 'default' | 'public' | 'private';
  notificationTime: number;
  isOpen: boolean;
  onSubmit: (type: string, data: Pick<EventFormModalProps, 'title'>) => void;
  onClose: () => void;
  repeatSetting?: string;
  guests?: string[];
  location?: string;
}

const EventFormModal = ({
  title = '',
  type = 'event',
  eventTitle = '',
  date,
  timeRange,
  isOpen,
  onClose,
  onSubmit,
  repeatSetting = 'does not repeat',
}: EventFormModalProps): JSX.Element => {
  // States
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(formatToCalendarDate(date));

  const {
    handleSubmit,
    control,
    clearErrors,
    reset,
    formState: { errors, isValid },
    //!TODO: update type for data object when submit (* Pick "title" is not enough *)
  } = useForm<Pick<EventFormModalProps, 'title'>>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      title: eventTitle,
    },
  });

  // Helper functions
  const standardDate = formatToStandardDate(calendarDate);
  const formattedDate = formatEventDate(standardDate);

  const toggleCalendarVisibility = useCallback(() => {
    setIsOpenCalendar((prev) => !prev);
  }, [setIsOpenCalendar]);

  const handleDateChange = (newDate: CalendarDate) => {
    setIsOpenCalendar(false);
    setCalendarDate(newDate);
  };

  const handleFormSubmit = handleSubmit((data) => {
    // TODO: update logic or sideEffects
    onSubmit(type, data);
  });

  const handleModalClose = () => {
    reset({ title });
    onClose();
  };

  return (
    <NextModal
      className="!max-w-[467px]"
      isOpen={isOpen}
      hideCloseButton={true}
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

        <form onSubmit={handleFormSubmit}>
          <Heading className="mt-[12px]" size="md" title={title} />

          <Button
            className="absolute top-[30px] right-[30px] !bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
            data-testid="close-button"
            onClick={handleModalClose}
          >
            <IoClose size={20} />
          </Button>

          <Tabs
            style={{ padding: 0, margin: '40px 0 18px' }}
            tabs={EVENT_TABS}
          />

          <Controller
            name="title"
            control={control}
            rules={{
              required: ERROR_MESSAGES.FIELD_REQUIRED,
            }}
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                classNames={{
                  inputWrapper: 'w-full h-[42px] rounded-[10px] bg-gray-200/30',
                  input:
                    'placeholder:text-blue-800 placeholder:opacity-20 placeholder:font-medium placeholder:text-[16px]',
                }}
                type="text"
                isInvalid={!!error}
                placeholder="Add title"
                errorMessage={error?.message}
                onChange={(e) => {
                  onChange(e.target.value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
            )}
          />

          <div className="flex mt-[25px] gap-[0_15px]">
            <Button
              className="!bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
              data-testid="time-button"
              onClick={toggleCalendarVisibility}
            >
              <ClockIcon />
            </Button>

            <div className="grid grid-rows-2 grid-cols-2 max-w-[350px] gap-[0_30px]">
              <Text
                className="text-blue-800 text-[12px] font-normal leading-normal col-span-1"
                text={formattedDate} // Display date
              />
              <Text
                className="text-blue-800 text-[12px] font-normal leading-normal col-span-1"
                text={`${timeRange.start} - ${timeRange.end}`} // Display time
              />
              <Text
                className="text-[rgba(1, 13, 28, 0.50)] text-opacity-50 text-[12px] font-normal leading-normal col-span-2"
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
              className="!bg-white font-medium dark:!bg-white text-center !text-blue-500 dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] px-[25px] !rounded-[10px] font-DM-Sans text-[14.22px] font-normal leading-normal"
            >
              Add Location
            </Button>
          </div>

          <div className="m-[0_0_40px] flex gap-[0_15px]">
            <Button
              className="!bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
              data-testid="calendar-button"
            >
              <CalendarIcon width={15} height={15} color="pink-500" />
            </Button>

            <div className="flex flex-col gap-[0_30px]">
              <Text
                className="text-blue-800 text-[12px] font-normal leading-normal col-span-1"
                text="John Deo" // Display name
              />
              <Text
                className="text-[rgba(1, 13, 28, 0.50)] text-opacity-50 text-[12px] font-normal leading-normal"
                text="Busy - Default visibility - notify 30 minutes before" // Display status
              />
            </div>
          </div>

          <div className="flex flex-row-reverse gap-[0_20px]">
            <Button
              className="min-w-[93px] text-[15px] font-normal md:w-auto py-[10px] w-full mt-10 md:mt-0"
              type="submit"
              color="primary"
              isDisabled={!isValid}
            >
              Save
            </Button>

            <Button
              className="min-w-[93px] !bg-white font-normal dark:!bg-white text-center !text-blue-500 dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] !rounded-[10px] font-DM-Sans text-[15px] font-normal leading-normal"
              onClick={handleModalClose}
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
