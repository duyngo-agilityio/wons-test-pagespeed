'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import isEqual from 'react-fast-compare';
import dayjs from 'dayjs';

import { Select, SelectItem } from '@nextui-org/react';

// Constants
import { MESSAGES } from '@/constants';

// Types
import { TEventResponse } from '@/types';

// Utils
import {
  capitalizeFirstLetter,
  clearErrorOnChange,
  formatDateString,
  formatDateToISO,
  formatEventDate,
  formatToCalendarDate,
  formatToStandardDate,
  getUserIds,
  parseStringToNumberArray,
} from '@/utils';

// Api
import { getUsers } from '@/api'; // Import API to fetch users

// Models
import { IEvent, TUser } from '@/models';

// Components
import {
  ClockIcon,
  CalendarIcon,
  LocationIcon,
  PeopleIcon,
  Input,
  Button,
  Text,
  DateTimePickerModal,
  AddressInput,
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

interface CalendarEventFormProps {
  title: string;
  previewData?: EventForm | null;
  timeRange: TimeRangeProps;
  eventTitle: string;
  date: Date;
  user: TUser;
  repeatSetting?: string;
  onSubmit: (data: Partial<IEvent>) => void;
  onClose: () => void;
}

const CalendarEventForm = ({
  previewData,
  title = '',
  timeRange,
  eventTitle,
  date,
  user,
  repeatSetting = 'does not repeat',
  onClose,
  onSubmit,
}: CalendarEventFormProps) => {
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [users, setUsers] = useState<TUser[]>([]); // State to store user list
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(formatToCalendarDate(date));
  const [startTime, setStartTime] = useState(timeRange.start);
  const [endTime, setEndTime] = useState(timeRange.end);

  const {
    handleSubmit,
    control,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm<EventForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: previewData
      ? {
          title: previewData?.title || '',
          location: previewData?.location,
          people: getUserIds(previewData as TEventResponse) || '',
        }
      : {
          title: eventTitle,
          location: '',
          people: '',
        },
  });

  const standardDate = formatToStandardDate(calendarDate);
  const formattedDate = formatEventDate(standardDate);

  const toggleDateTimePicker = useCallback(() => {
    setIsDateTimePickerOpen((prev) => !prev);
  }, [setIsDateTimePickerOpen]);

  const handleFormSubmit = handleSubmit((data) => {
    const people = parseStringToNumberArray(data.people as string);

    const formattedStart = formatDateToISO(
      new Date(formatDateString(calendarDate)),
      dayjs(startTime, 'hh:mma').utc(true).format('HH:mm'),
    );
    const formattedEnd = formatDateToISO(
      new Date(formatDateString(calendarDate)),
      dayjs(endTime, 'hh:mma').utc(true).format('HH:mm'),
    );

    onSubmit({
      ...data,
      users_permissions_users: [Number(user.id), ...people],
      startTime: formattedStart,
      endTime: formattedEnd,
      date: new Date(formatDateString(calendarDate)),
    });
  });

  const handleModalClose = () => {
    reset({ title });
    onClose();
  };

  const toggleUserList = useCallback(async () => {
    const response = await getUsers(); // Call API to fetch users

    if (response) {
      setUsers(response);
    } else {
      console.error('No data found in the response');
    }
  }, []);

  useEffect(() => {
    toggleUserList(); // Automatically fetch users when component mounts
  }, [toggleUserList]);

  const [isOpenLocation, setIsOpenLocation] = useState(false);

  const usersOptions = users
    .filter((u) => u.id.toString() !== user.id.toString())
    .map((user) => ({
      label: user.username,
      key: user.id,
    }));

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: MESSAGES.ERROR.FIELD_REQUIRED,
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
                clearErrorOnChange(name, errors, clearErrors);
              }}
              {...rest}
            />
          )}
        />

        <div
          className="flex mt-[25px] gap-[0_15px]"
          onClick={toggleDateTimePicker}
        >
          <Button
            className="!bg-pink-50 dark:!bg-pink-600 text-pink-500 dark:text-pink-500 border-none rounded-full w-10 h-10 flex justify-center items-center cursor-pointer !px-0"
            data-testid="time-button"
            onClick={toggleDateTimePicker}
          >
            <ClockIcon />
          </Button>

          <div>
            <div className="flex gap-1">
              <Text
                className="text-blue-800 text-[12px] font-normal leading-normal col-span-1"
                text={`${formattedDate}`} // Display date
              />
              <Text as="span" text="-" />
              <Text
                className="text-blue-800 text-[12px] font-normal leading-normal col-span-1 uppercase"
                text={`${startTime} - ${endTime}`} // Display time
              />
            </div>

            <Text
              className="text-[rgba(1, 13, 28, 0.50)] text-opacity-50 text-[12px] font-normal leading-normal col-span-2"
              text={`Time zone - ${capitalizeFirstLetter(repeatSetting)}`}
            />
          </div>
        </div>

        {(isUserListOpen || previewData) && (
          <Controller
            name="people"
            control={control}
            render={({ field: { onChange, value, name, ...rest } }) => (
              <Select
                selectionMode="multiple"
                label="Add People"
                defaultSelectedKeys={value}
                placeholder=" "
                labelPlacement="outside"
                variant="flat"
                classNames={{
                  trigger:
                    'w-full bg-gray-50 dark:bg-gray-600 hover:!bg-gray-200/50 dark:hover:!bg-gray-900 focus:bg-gray-50 dark:focus:bg-gray-600 py-[26px] mt-5',
                  label: 'text-xl font-medium pb-1',
                }}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              >
                {usersOptions.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            )}
          />
        )}

        {(isOpenLocation || previewData?.location) && (
          <Controller
            name="location"
            control={control}
            render={({
              field: { name, onChange, ...rest },
              fieldState: { error },
            }) => (
              <AddressInput
                isInvalid={!!error}
                errorMessage={error?.message}
                label="Location"
                classNames={{ mainWrapper: 'mt-5' }}
                onChange={(value) => {
                  onChange(value);

                  // Clear error message on change
                  clearErrorOnChange(name, errors, clearErrors);
                }}
                {...rest}
              />
            )}
          />
        )}

        <div className="flex gap-[0_25px] m-[30px_0]">
          {!isUserListOpen && !previewData && (
            <Button
              color="primary"
              startContent={<PeopleIcon />}
              className="text-[15px] font-medium w-auto  py-[10px] px-[25px] mt-10 mt-0"
              onClick={() => setIsUserListOpen((prev) => !prev)}
            >
              Add People
            </Button>
          )}

          {!isOpenLocation && !previewData?.location && (
            <Button
              startContent={<LocationIcon />}
              className="!bg-white font-medium dark:!bg-white text-center !text-blue-500 dark:text-white/70 border border-[1px] border-[rgba(58, 54, 219, 0.1)] py-[10px] px-[25px] !rounded-[10px] font-DM-Sans text-[14.22px] font-normal leading-normal"
              onClick={() => setIsOpenLocation(true)}
            >
              Add Location
            </Button>
          )}
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
              text={user.fullName} // Display name
            />
            <Text
              className="text-[rgba(1, 13, 28, 0.50)] text-opacity-50 text-[12px] font-normal leading-normal"
              text="Busy - Default visibility - notify 30 minutes before" // Display status
            />
          </div>
        </div>

        <div className="flex flex-row-reverse gap-[0_20px]">
          <Button
            className="min-w-[93px] text-[15px] font-normal w-auto py-[10px] mt-10 mt-0"
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

      {/* DateTimePickerModal */}
      {isDateTimePickerOpen && (
        <DateTimePickerModal
          isOpen={isDateTimePickerOpen}
          onClose={toggleDateTimePicker}
          selectedDate={formatDateString(calendarDate)}
          selectedStartTime={startTime}
          selectedEndTime={endTime}
          onDateChange={(dateString) =>
            setCalendarDate(formatToCalendarDate(new Date(dateString)))
          }
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
        />
      )}
    </>
  );
};

export default memo(CalendarEventForm, isEqual);
