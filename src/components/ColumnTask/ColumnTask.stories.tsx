import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Libraries
import { DragDropContext } from '@hello-pangea/dnd';

// Mocks
import { MOCK_TASKS } from '@/mocks';

// Components
import ColumnTask from './index';

// Types
import { TaskStatus } from '@/types';

const meta: Meta<typeof ColumnTask> = {
  title: 'Components/ColumnTask',
  component: ColumnTask,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <DragDropContext onDragEnd={fn}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full h-full mt-8">
          <Story />
        </div>
      </DragDropContext>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ColumnTask>;

export const Default: Story = {
  args: {
    status: TaskStatus.Todo,
    tasks: MOCK_TASKS.todo,
  },
};
