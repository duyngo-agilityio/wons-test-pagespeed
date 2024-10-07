'use client';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

// types
import { StrapiModel, Task } from '@/types';

// utils
import { convertTasksByStatus } from '@/utils';

// Constants
import { TASK_STATUS } from '@/constants';

// components
import { Column } from '@/components';

interface ITaskListBoardProps {
  data: StrapiModel<Task>[];
}

const TaskListBoardClient = ({ data }: ITaskListBoardProps) => {
  const tasks = convertTasksByStatus(data);

  // TODO: Update later
  const onDragEnd = (_: DropResult) => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full h-full mt-8">
        <Column status={TASK_STATUS.TODO} tasks={tasks.todo} />
        <Column status={TASK_STATUS.IN_PROGRESS} tasks={tasks.inProgress} />
        <Column status={TASK_STATUS.IN_REVIEW} tasks={tasks.inReview} />
        <Column status={TASK_STATUS.DONE} tasks={tasks.done} />
      </div>
    </DragDropContext>
  );
};

export default TaskListBoardClient;
