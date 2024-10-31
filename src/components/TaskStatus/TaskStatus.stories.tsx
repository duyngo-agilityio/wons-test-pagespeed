import type { Meta, StoryObj } from '@storybook/react';

// Components
import TaskStatusComponent from '.';

const meta: Meta<typeof TaskStatusComponent> = {
  title: 'Components/TaskStatusComponent',
  component: TaskStatusComponent,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof TaskStatusComponent>;

export const ToDo: Story = {
  args: {
    status: 'todo',
  },
};

export const InProgress: Story = {
  args: {
    status: 'inProgress',
  },
};

export const InReview: Story = {
  args: {
    status: 'inReview',
  },
};

export const Done: Story = {
  args: {
    status: 'done',
  },
};
