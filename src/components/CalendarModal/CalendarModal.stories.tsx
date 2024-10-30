import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import CalendarModal from './index';
import { Button } from '../common';

const meta: Meta<typeof CalendarModal> = {
  title: 'Components/CalendarModal',
  component: CalendarModal,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarModal>;

const mockTimeRange = {
  start: '12:00am',
  end: '12:30am',
};

const BasicUsage = () => {
  const [isOpen, setIsOpen] = useState(false);

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

      <CalendarModal
        title="Create Event"
        eventTitle="Example title"
        date={new Date()}
        timeRange={mockTimeRange}
        isOpen={isOpen}
        onSubmit={fn()}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <BasicUsage />,
};
