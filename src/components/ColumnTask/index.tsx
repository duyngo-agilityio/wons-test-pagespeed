'use client';

import { memo } from 'react';
import isEqual from 'react-fast-compare';

// libs
import { Droppable } from '@hello-pangea/dnd';

// Constants
import { TASK_STATUS } from '@/constants';

// components
import { Heading, TaskCard } from '@/components';

// types
import { StrapiModel, Task } from '@/types';

type TColumnProps = {
  status: TASK_STATUS;
  tasks: StrapiModel<Task>[];
};

const Column = ({ status, tasks }: TColumnProps) => (
  <Droppable droppableId={status}>
    {(provided) => (
      <div
        className="w-full  md:w-1/4 flex-grow "
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <Heading
          className="text-base md:text-xl lg:text-2xl !text-blue-400 dark:!text-gray-850 font-bold mb-4"
          title={status}
        />
        <div className="space-y-4">
          {tasks.map((task, index) => {
            return <TaskCard key={task.id} index={index} task={task} />;
          })}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

export default memo(Column, isEqual) as <T>(
  props: TColumnProps & T,
) => JSX.Element;
