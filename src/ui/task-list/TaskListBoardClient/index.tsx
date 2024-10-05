'use client';
import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

// types
import { StrapiModel, Task, TasksState, TaskStatus } from '@/types';

// utils
import { convertTasksByStatus, mapTaskStatusToStateKey } from '@/utils';

// Constants
import { TASK_STATUS } from '@/constants';

// components
import { Column } from '@/components';

interface ITaskListBoardProps {
  data: StrapiModel<Task>[];
}

const TaskListBoardClient = ({ data }: ITaskListBoardProps) => {
  const [tasks, setTasks] = useState<TasksState>(convertTasksByStatus(data));

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = mapTaskStatusToStateKey(
      source.droppableId as TaskStatus,
    );

    const destinationColumn = mapTaskStatusToStateKey(
      destination.droppableId as TaskStatus,
    );

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const destinationTasks = Array.from(tasks[destinationColumn]);

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      destinationTasks.splice(destination.index, 0, movedTask);
    } else {
      sourceTasks.splice(destination.index, 0, movedTask);
    }

    setTasks({
      ...tasks,
      [sourceColumn]: sourceTasks,
      [destinationColumn]: destinationTasks,
    });
  };

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
