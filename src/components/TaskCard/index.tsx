'use client';

import { memo } from 'react';
import { Draggable } from '@hello-pangea/dnd';

// Types
import { StrapiModel, Task } from '@/types';

// Components
import {
  LevelChip,
  DropdownActions,
  AvatarGroup,
  Text,
  ImageFallback,
} from '@/components';
import { Level } from '@/constants';

type TTaskCardProps = {
  index: number;
  task: StrapiModel<Task>;
};

const TaskCard = ({ index, task }: TTaskCardProps) => {
  const { id, attributes } = task ?? {};
  const {
    title = '',
    level = Level.LOW,
    assignees = { data: [] },
    images = [],
    description = '',
  } = attributes ?? {};

  // TODO:: Handle later
  const handleDelete = () => {};

  // TODO:: Handle later
  const handleEdit = () => {};

  const renderImageTask = () => {
    const hasTwoImages = images.length === 2;

    if (!images) return <></>;

    // If images exist and has exactly two items
    if (hasTwoImages)
      return (
        <div className="flex flex-row justify-between w-[235px] mt-[20px]">
          {images.map((image, indexImage) => (
            <ImageFallback
              key={`imageTask_${indexImage}`}
              alt={`imageTask_${indexImage}`}
              src={image}
              width={107}
              height={90}
              style={{ borderRadius: '10px' }}
            />
          ))}
        </div>
      );

    // If images exist and has exactly one item
    return (
      <div className="mt-[20px]">
        <ImageFallback
          alt={`imageTask_${id}`}
          src={images[0]}
          width={235}
          height={176}
        />
      </div>
    );
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`w-full bg-white dark:bg-gray-400 p-[20px] rounded-5 shadow-md ${
            snapshot.isDragging ? 'opacity-50' : ''
          }`}
        >
          <div className="flex flex-row items-center justify-between mb-[15px]">
            <Text className="text-md" text={title} />
            <DropdownActions
              id={id}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isIconOnly
              disableAnimation
              customClassName="w-[15px] min-w-[15px]"
            />
          </div>
          <LevelChip level={level} />
          <Text className="mt-[20px] text-sm" text={description} />
          {renderImageTask()}
          <div className="mt-[20px]">
            <AvatarGroup users={assignees.data} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(TaskCard);
