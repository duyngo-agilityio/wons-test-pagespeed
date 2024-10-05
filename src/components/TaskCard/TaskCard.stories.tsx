// Libs
import type { Meta, StoryObj } from '@storybook/react';

// components
import { TaskCard } from '@/components';

// Mocks
import { MOCK_TASKS } from '@/mocks';

const { todo, inProgress } = MOCK_TASKS;

const meta: Meta<typeof TaskCard> = {
  title: 'Components/TaskCard',
  component: TaskCard,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  args: {
    task: todo[0],
  },
};

export const CardWithNoImage: Story = {
  args: {
    task: inProgress[0],
  },
};
