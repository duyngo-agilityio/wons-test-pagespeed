import type { Meta, StoryObj } from '@storybook/react';

// components
import EventDetail from './index';

const meta: Meta<typeof EventDetail> = {
  title: 'Components/EventDetail',
  component: EventDetail,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  args: {
    title: 'Event Title',
    time: '10:00 AM',
    location: '123 Main St',
    guests: [
      { name: 'John Doe', avatar: '/avatars/john.png' },
      { name: 'Jane Doe', avatar: '/avatars/jane.png' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof EventDetail>;

export const Default: Story = {};
