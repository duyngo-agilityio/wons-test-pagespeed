import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import CalendarTaskForm from './index';

const meta: Meta<typeof CalendarTaskForm> = {
  title: 'Components/CalendarTaskForm',
  component: CalendarTaskForm,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof CalendarTaskForm>;

export const Default: Story = {
  args: {
    time: '01:30am',
    date: new Date(),
    onClose: fn(),
    onSubmit: fn(),
  },
};
