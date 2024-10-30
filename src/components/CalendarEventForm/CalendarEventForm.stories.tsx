import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import CalendarEventForm from './index';

const meta: Meta<typeof CalendarEventForm> = {
  title: 'Components/CalendarEventForm',
  component: CalendarEventForm,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarEventForm>;

const mockTimeRange = {
  start: '12:00am',
  end: '12:30am',
};

export const Default: Story = {
  args: {
    eventTitle: '',
    timeRange: mockTimeRange,
    date: new Date(),
    onSubmit: fn(),
    onClose: fn(),
  },
};
