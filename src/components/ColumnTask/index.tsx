'use client';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

// libs
import { Droppable } from '@hello-pangea/dnd';

// components
import { Heading, TaskCard } from '@/components';

// types
import { Task, TaskStatus } from '@/types';

type TColumnProps = {
  status: TaskStatus;
  tasks: Task[];
};

const Column = ({ status, tasks }: TColumnProps) => {
  return (
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
          <div className="space-y-6">
            {tasks.map(({ id, title, description }, index) => (
              <TaskCard
                key={id}
                id={id}
                index={index}
                title={title}
                description={description}
                status={status}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default memo(Column, isEqual) as <T>(
  props: TColumnProps & T,
) => JSX.Element;
