import type { Meta, StoryObj } from '@storybook/react';

// components
import Tabs from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Common/CustomTabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    tabs: {
      description: 'Array of tabs with dynamic key, label, and content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      { key: 'event', label: 'Event', content: 'This is the event content' },
      {
        key: 'reminder',
        label: 'Reminder',
        content: 'This is the reminder content',
      },
      { key: 'task', label: 'Task', content: 'This is the task content' },
    ],
  },
};
