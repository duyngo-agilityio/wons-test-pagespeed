'use client';

import { memo, useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import dynamic from 'next/dynamic';

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

// Constants
import { Level } from '@/constants';

// Actions
import { getTaskDetails } from '@/actions';

const DynamicTaskDetails = dynamic(() => import('../TaskDetail'));

type TTaskCardProps = {
  index: number;
  task: StrapiModel<Task>;
};

const TaskCard = ({ index, task }: TTaskCardProps) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [taskByID, setTaskByID] = useState({});

  const { id, attributes } = task ?? {};
  const {
    title = '',
    level = Level.LOW,
    assignees = { data: [] },
    images = [],
    description = '',
    label = 'todo',
  } = attributes ?? {};

  // TODO:: Handle later
  const handleDelete = () => {};

  // TODO:: Handle later
  const handleEdit = () => {};

  const renderImageTask = () => {
    const hasTwoImages = images?.length === 2;

    if (!images) return <></>;

    // If images exist and has exactly two items
    if (hasTwoImages)
      return (
        <div className="flex flex-row justify-between w-[235px]">
          {images.map((image, indexImage) => (
            <div
              className="w-[107px] h-[90px] relative"
              key={`imageTask_${indexImage}`}
            >
              <ImageFallback
                alt={title}
                src={image}
                fill
                className="rounded-[10px] object-cover"
              />
            </div>
          ))}
        </div>
      );

    // If images exist and has exactly one item
    return (
      <div className="w-[235px] h-[176px] relative">
        <ImageFallback
          alt={title}
          src={images[0]}
          fill
          className="object-cover"
        />
      </div>
    );
  };

  const handleOpenModal = async () => {
    if (id) {
      const task = await getTaskDetails(id);
      setTaskByID(task);
    }

    if (taskByID) {
      setIsShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`w-full bg-white dark:bg-gray-400 p-[20px] rounded-5 shadow-md ${
              snapshot.isDragging ? 'opacity-50' : ''
            }`}
            onClick={handleOpenModal}
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
            <Text
              className="mt-[20px] text-sm text-justify"
              text={description}
            />
            <div className="mt-[20px]">{renderImageTask()}</div>
            <div className="mt-[20px]">
              <AvatarGroup users={assignees.data} />
            </div>
          </div>
          {taskByID && (
            <DynamicTaskDetails
              title={title}
              level={level}
              description={description}
              assignees={assignees}
              renderImages={renderImageTask}
              label={label}
              isOpen={isShowModal}
              onCloseModal={handleCloseModal}
              imageCount={images?.length}
            />
          )}
        </>
      )}
    </Draggable>
  );
};

export default memo(TaskCard);
