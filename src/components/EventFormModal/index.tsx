'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CalendarDate } from '@internationalized/date';
import { IoClose } from 'react-icons/io5';
import isEqual from 'react-fast-compare';
import {
  Modal as NextModal,
  ModalContent,
  Calendar,
  Select,
  SelectItem,
} from '@nextui-org/react';

// Constants
import { ERROR_MESSAGES, EVENT_TABS } from '@/constants';

// Types
import { TEventResponse } from '@/types';

// Utils
import {
  capitalizeFirstLetter,
  clearErrorOnChange,
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
  Heading,
  Input,
  Button,
  Text,
  DateTimePickerModal,
  Tabs,
  AddressInput,
} from '@/components';

interface TimeRangeProps {
  start: string;
  end: string;
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

interface EventForm {
  title: string;
  location?: string;
  people?: string | number[];
}

const EventFormModal = ({
  title = '',
  eventTitle = '',
  date,
  timeRange,
  isOpen,
  user,
  previewData = null,
  onClose,
  onSubmit,
  repeatSetting = 'does not repeat',
}: EventFormModalProps): JSX.Element => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [calendarDate, setCalendarDate] = useState(formatToCalendarDate(date));
  const [startTime, setStartTime] = useState(timeRange.start);
  const [endTime, setEndTime] = useState(timeRange.end);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [users, setUsers] = useState<TUser[]>([]); // State to store user list

  const usersOptions = users
    .filter((u) => u.id.toString() !== user.id.toString())
    .map((user) => ({
      label: user.username,
      key: user.id,
    }));

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

  const handleDateChange = (newDate: CalendarDate) => {
    setIsOpenCalendar(false);
    setCalendarDate(newDate);
  };

  const handleFormSubmit = handleSubmit((data) => {
    const people = parseStringToNumberArray(data.people as string);

    const formattedStart = formatDateToISO(date, startTime);
    const formattedEnd = formatDateToISO(date, endTime);

    onSubmit({
      ...data,
      users_permissions_users: [Number(user.id), ...people],
      startTime: formattedStart,
      endTime: formattedEnd,
      date: new Date(date),
    });
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

            <div className="grid grid-rows-2 grid-cols-2 max-w-[350px] gap-[0_30px]">
              <Text
                className="text-blue-800 text-[12px] font-normal leading-normal col-span-1"
                text={formattedDate} // Display date
              />
              <Text
                className="text-blue-800 text-[12px] font-normal leading-normal col-span-1"
                text={`${startTime} - ${endTime}`} // Display time
              />
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
                  onChange={(e) => {
                    onChange(e.target.value);

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
            selectedDate={calendarDate.toString().split('T')[0]}
            selectedStartTime={startTime}
            selectedEndTime={endTime}
            onDateChange={(dateString) =>
              setCalendarDate(formatToCalendarDate(new Date(dateString)))
            }
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        )}
      </ModalContent>
    </NextModal>
  );
};

export default memo(EventFormModal, isEqual);
