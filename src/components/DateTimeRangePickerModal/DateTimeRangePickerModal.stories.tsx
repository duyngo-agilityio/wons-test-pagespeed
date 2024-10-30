import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

// Utils
import { formatToCalendarDate, formatDateString } from '@/utils';

// Components
import DateTimeRangePickerModal from './index';
import { Button } from '../common';

const meta: Meta<typeof DateTimeRangePickerModal> = {
  title: 'Components/DateTimeRangePickerModal',
  component: DateTimeRangePickerModal,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimeRangePickerModal>;

const BasicUsage = () => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(formatToCalendarDate(date));
  const [startTime, setStartTime] = useState('12:00am');
  const [endTime, setEndTime] = useState('12:30am');

  return (
    <>
      <Button
        className="mt-4"
        color="primary"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Open modal
      </Button>

      <DateTimeRangePickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedDate={formatDateString(calendarDate)}
        onDateChange={(dateString) =>
          setCalendarDate(formatToCalendarDate(new Date(dateString)))
        }
        selectedStartTime={startTime}
        selectedEndTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <BasicUsage />,
};
