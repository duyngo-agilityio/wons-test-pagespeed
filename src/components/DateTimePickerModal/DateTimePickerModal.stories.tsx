import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

// Utils
import { formatToCalendarDate, formatDateString } from '@/utils';

// Components
import DateTimePickerModal from '.';
import { Button } from '../common';

const meta: Meta<typeof DateTimePickerModal> = {
  title: 'Components/DateTimePickerModal',
  component: DateTimePickerModal,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePickerModal>;

const BasicUsage = () => {
  const date = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(formatToCalendarDate(date));
  const [timeDate, setTimeDate] = useState('12:30am');

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

      <DateTimePickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedDate={formatDateString(calendarDate)}
        selectedTime={timeDate}
        onDateChange={(dateString) =>
          setCalendarDate(formatToCalendarDate(new Date(dateString)))
        }
        onTimeChange={setTimeDate}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <BasicUsage />,
};
