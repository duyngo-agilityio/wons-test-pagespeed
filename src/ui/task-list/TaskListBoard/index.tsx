'use client';
import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

// types
import { TasksState, TaskStatus } from '@/types';

// utils
import { mapTaskStatusToStateKey } from '@/utils';

// components
import { Column } from '@/components';

// mocks
import { MOCK_TASKS } from '@/mocks';

const TaskListBoard = () => {
  const [tasks, setTasks] = useState<TasksState>(MOCK_TASKS);

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
        <Column status="ToDo" tasks={tasks.todo} />
        <Column status="In Progress" tasks={tasks.inProgress} />
        <Column status="In Review" tasks={tasks.inReview} />
        <Column status="Done" tasks={tasks.done} />
      </div>
    </DragDropContext>
  );
};

export default TaskListBoard;
