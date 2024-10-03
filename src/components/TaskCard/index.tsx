'use client';
import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';

// Mocks
import { MOCK_USERS } from '@/mocks';

// Components
import { LevelCardComponent, DropdownActions, AvatarGroup } from '@/components';

// Constants
import { BLUR_SRC } from '@/constants';

type TTaskCardProps = {
  id: number;
  title: string;
  images?: string[];
  description?: string;
  status: string;
  index: number;
};

const TaskCard = ({
  id,
  title,
  images,
  description,
  index,
}: TTaskCardProps) => {
  // TODO:: Handle later
  const handleDelete = () => {};

  // TODO:: Handle later
  const handleEdit = () => {};

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
            <div className="text-md">{title}</div>
            <DropdownActions
              id={id}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isIconOnly
              disableAnimation
              customClassName="w-[15px] min-w-[15px]"
            />
          </div>
          <LevelCardComponent />
          <div className="mt-[20px] text-sm">{description}</div>
          {/* If images exist and has exactly one item */}
          {images && images.length === 1 && (
            <div className="mt-[20px]">
              <Image
                alt={MOCK_USERS[0].fullName}
                src={images[0]}
                width={235}
                height={176}
                placeholder="blur"
                blurDataURL={BLUR_SRC.DEFAULT}
              />
            </div>
          )}
          {/* If images exist and has exactly two items */}
          {images && images.length === 2 && (
            <div className="flex flex-row justify-between w-[235px] mt-[20px]">
              {images.map((item, idx) => (
                <Image
                  key={idx}
                  alt="Image Task"
                  src={item}
                  width={107}
                  height={90}
                  style={{ borderRadius: '10px' }}
                  placeholder="blur"
                  blurDataURL={BLUR_SRC.DEFAULT}
                />
              ))}
            </div>
          )}
          <div className="mt-[20px]">
            <AvatarGroup users={MOCK_USERS} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
