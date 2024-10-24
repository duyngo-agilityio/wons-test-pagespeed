'use client';

import { memo, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';

// libs
import Link from 'next/link';
import dayjs from 'dayjs';
import { DateValue, useDisclosure } from '@nextui-org/react';
import {
  Calendar as CalendarBase,
  CalendarProps,
  dayjsLocalizer,
  SlotInfo,
  Views,
} from 'react-big-calendar';
import { getLocalTimeZone, today, CalendarDate } from '@internationalized/date';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';

// Models
import { ICalendarTask, IEvent, TUser } from '@/models';

// Constants
import { MESSAGES, ROUTES } from '@/constants';

// Utils
import { formattedGuestInfo, getTimeFromISO } from '@/utils';

// Types
import { TEventResponse } from '@/types';

// Components
import {
  Button,
  ConfirmModal,
  CustomCalendar,
  EventDetail,
  CalendarModal,
  LoadingIndicator,
} from '@/components';
import CustomToolBar from '../CustomToolBar';

// actions
import {
  createCalenderTask,
  deleteCalendarTask,
  deleteEvent,
  updateCalendarTask,
} from '@/actions';

// hooks
import { useToast } from '@/hooks';

const localizer = dayjsLocalizer(dayjs);

type ViewType = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

interface CalendarClientProps extends Omit<CalendarProps, 'localizer'> {
  events: (Event & IEvent & ICalendarTask)[];
  isAdmin: boolean;
  user: TUser;
  createEvent: (data: Partial<IEvent>) => Promise<{ error?: string } | void>;
  updateEvent: (
    id: number,
    data: Partial<IEvent>,
  ) => Promise<{ error?: string } | void>;
}

interface Slot {
  start: Date;
  end: Date;
}

const CalendarClient = ({
  user,
  events,
  isAdmin,
  createEvent,
  updateEvent,
  ...rest
}: CalendarClientProps) => {
  const [view, setView] = useState<ViewType>(Views.MONTH);
  const { isOpen: isOpenEventFormModal, onOpenChange: onToggleEventFormModal } =
    useDisclosure();
  const [previewData, setPreviewData] = useState<TEventResponse | null>();
  const [slot, setSlot] = useState<Slot | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TEventResponse | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const timeZone = getLocalTimeZone();
  const [isTask, setIsTask] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onCloseFormModal = () => {
    onToggleEventFormModal();
    setPreviewData(null);
    setIsEdit(false);
    setIsTask(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setIsTask(false);
    setIsEdit(false);
  }, []);

  const handleSelectSlot = useCallback(
    (slotInfo: SlotInfo) => {
      if (dayjs(slotInfo.start).isBefore(dayjs(), 'day')) {
        return;
      }

      setSlot({
        start: slotInfo.start,
        end: slotInfo.end,
      });

      // Open the Add event form modal
      onToggleEventFormModal();
    },
    [onToggleEventFormModal],
  );

  const handleSelectEvent = (event: unknown) => {
    const selectedEvent = event as TEventResponse;

    if (selectedEvent.time) {
      setIsTask(true);
    }

    setSelectedEvent(selectedEvent);

    setIsModalOpen(true);
  };

  const handleFormSubmitEvent = async (data: Partial<IEvent>) => {
    onToggleEventFormModal();

    if (previewData) {
      if (selectedEvent && selectedEvent.id !== undefined) {
        setIsLoading(true);

        const response = await updateEvent(selectedEvent.id, data);

        setIsLoading(false);

        const { error } = response || {};
        showToast({
          description: error || MESSAGES.SUCCESS.UPDATE_EVENT,
          status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
        });

        if (!error) {
          setSelectedEvent(null);
          setIsModalOpen(false);
        }
      }
    } else {
      setIsLoading(true);

      const response = await createEvent(data);

      setIsLoading(false);

      const { error } = response || {};
      showToast({
        description: error || MESSAGES.SUCCESS.CREATE_EVENT,
        status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
      });
    }

    setIsTask(false);
    setIsEdit(false);
  };

  const handleFormSubmitTask = async (data: Partial<IEvent>) => {
    onToggleEventFormModal();

    if (previewData) {
      if (selectedEvent && selectedEvent.id !== undefined) {
        setIsLoading(true);

        const response = await updateCalendarTask(selectedEvent.id, data);

        setIsLoading(false);

        const { error } = response || {};
        showToast({
          description: error || MESSAGES.SUCCESS.UPDATE_TASK,
          status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
        });

        if (!error) {
          setSelectedEvent(null);
          setIsModalOpen(false);
          setPreviewData(null);
        }
      }
    } else {
      setIsLoading(true);

      const response = await createCalenderTask(data);

      setIsLoading(false);

      const { error } = response || {};
      showToast({
        description: error || MESSAGES.SUCCESS.CREATE_TASK,
        status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
      });
    }

    setIsTask(false);
    setIsEdit(false);
  };

  const handleDeleteEvent = () => {
    setIsConfirmModalOpen(true);
  };

  const handleDeleteTask = () => {
    setIsConfirmModalOpen(true);
    setIsTask(true);
  };

  const handleEditEvent = async () => {
    setIsModalOpen(false);
    setIsEdit(true);
    setPreviewData(selectedEvent);

    onToggleEventFormModal();
  };

  const handleEditTask = async () => {
    setIsModalOpen(false);
    setPreviewData(selectedEvent);
    setIsEdit(true);
    setIsTask(true);

    onToggleEventFormModal();
  };

  const confirmDeleteEvent = useCallback(async () => {
    if (selectedEvent && selectedEvent.id !== undefined) {
      setIsLoading(true);

      if (!isTask) {
        const response = await deleteEvent(selectedEvent.id);

        setIsLoading(false);
        const { error } = response || {};
        showToast({
          description: error || MESSAGES.SUCCESS.DELETE_EVENT,
          status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
        });

        if (!error) {
          setPreviewData(null);
          setSelectedEvent(null);
          setIsModalOpen(false);
          setIsConfirmModalOpen(false);
        }
      } else {
        const response = await deleteCalendarTask(selectedEvent.id);

        setIsTask(false);
        setIsLoading(false);
        const { error } = response || {};
        showToast({
          description: error || MESSAGES.SUCCESS.DELETE_TASK,
          status: error ? MESSAGES.STATUS.ERROR : MESSAGES.STATUS.SUCCESS,
        });

        if (!error) {
          setPreviewData(null);
          setSelectedEvent(null);
          setIsModalOpen(false);
          setIsConfirmModalOpen(false);
        }
      }
    } else {
      setIsConfirmModalOpen(false);
    }
  }, [selectedEvent, showToast]);

  const handleDateSelect = (date: DateValue) => {
    const calendarDate = new CalendarDate(date.year, date.month, date.day);
    setSelectedDate(calendarDate);
    setView(Views.DAY);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setIsTask(false);
    setIsEdit(false);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-[37px] relative">
      <div className="hidden md:flex bg-white dark:bg-gray-400 px-[18px] md:px-[28px] py-3 md:py-[32px] rounded-[5px] md:flex-col justify-between">
        <CustomCalendar onDateSelect={handleDateSelect} />
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
          selectable
          onSelectSlot={isAdmin ? handleSelectSlot : undefined}
          onSelectEvent={handleSelectEvent}
          date={selectedDate.toDate(timeZone)}
        />
      </div>

      {selectedEvent && (
        <div className="event-detail-container">
          {isLoading && <LoadingIndicator />}
          {selectedEvent.startTime ? (
            <EventDetail
              title={selectedEvent.title}
              time={`${dayjs(selectedEvent.date).format('YYYY-MM-DD')} ${getTimeFromISO(selectedEvent.startTime)} - ${getTimeFromISO(selectedEvent.endTime)}`}
              location={selectedEvent.location || 'No location specified'}
              isOpen={isModalOpen}
              onCloseModal={handleCloseModal}
              guests={formattedGuestInfo(selectedEvent)}
              id={selectedEvent.id}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          ) : (
            <EventDetail
              title={selectedEvent?.title || ''}
              time={`${dayjs(selectedEvent?.date).format('YYYY-MM-DD')} ${getTimeFromISO(selectedEvent?.time || '')}`}
              description={selectedEvent?.descriptions}
              isOpen={isModalOpen}
              onCloseModal={handleCloseModal}
              id={selectedEvent?.id || 0}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          )}
        </div>
      )}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onCancel={handleCloseConfirmModal}
        title={isTask ? 'Delete Task' : 'Delete Event'}
        content="Are you sure you want to delete this item?"
        onConfirm={confirmDeleteEvent}
      />

      {isOpenEventFormModal &&
        (!isTask ? (
          <CalendarModal
            user={user}
            title={previewData ? 'Update Event' : 'Create Event'}
            eventTitle=""
            date={
              previewData
                ? new Date(previewData.date)
                : slot?.start || new Date()
            }
            timeRange={{
              start: previewData
                ? dayjs(previewData.startTime).utc().format('hh:mma')
                : dayjs(slot?.start).add(5, 'hour').format('hh:mma'),
              end: previewData
                ? dayjs(previewData.endTime).utc().format('hh:mma')
                : dayjs(slot?.end).add(7, 'hour').format('hh:mma'),
            }}
            time={
              previewData
                ? dayjs(previewData.time).utc().format('hh:mma')
                : dayjs().format('hh:mma')
            }
            previewData={previewData}
            isTask={isTask}
            isEdit={isEdit}
            isOpen={isOpenEventFormModal}
            onSubmit={isTask ? handleFormSubmitTask : handleFormSubmitEvent}
            onClose={onCloseFormModal}
            setIsTask={setIsTask}
          />
        ) : (
          <CalendarModal
            title={previewData ? 'Update Task' : 'Create Task'}
            eventTitle=""
            date={
              previewData
                ? new Date(previewData.date)
                : slot?.start || new Date()
            }
            previewData={previewData}
            time={
              previewData
                ? dayjs(previewData.time).utc().format('hh:mma')
                : dayjs().format('hh:mma')
            }
            timeRange={{
              start: previewData
                ? dayjs(previewData.startTime).utc().format('hh:mma')
                : dayjs(slot?.start).add(5, 'hour').format('hh:mma'),
              end: previewData
                ? dayjs(previewData.endTime).utc().format('hh:mma')
                : dayjs(slot?.end).add(7, 'hour').format('hh:mma'),
            }}
            isTask={isTask}
            isEdit={isEdit}
            isOpen={isOpenEventFormModal}
            onSubmit={handleFormSubmitTask}
            onClose={onCloseFormModal}
          />
        ))}
    </div>
  );
};

export default memo(CalendarClient, isEqual);
