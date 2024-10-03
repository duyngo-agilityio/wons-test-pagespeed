'use client';

import Image from 'next/image';

// Mocks
import { MOCK_USERS } from '@/mocks';

// Components
import LevelCardComponent from '../LevelCard';
import DropdownActions from '../DropdownActions';
import AvatarGroup from '../AvatarGroup';

// Constants
import { BLUR_SRC } from '@/constants';

type TTaskCardProps = {
  title: string;
  images?: string[];
  description?: string;
};

const TaskCard = ({ title, images, description }: TTaskCardProps) => {
  // TODO:: Handle later
  const handleDelete = () => {};

  // TODO:: Handle later
  const handleEdit = () => {};

  return (
    <div className="w-[275px] bg-white dark:bg-gray-400 p-[20px] rounded-5">
      <div className="flex flex-row items-center justify-between mb-[15px]">
        <div className="text-md">{title}</div>
        <DropdownActions
          id={1}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isIconOnly
          disableAnimation
          customClassName="w-[15px] min-w-[15px]"
        />
      </div>
      <LevelCardComponent />
      <div className="mt-[20px] text-sm">{description}</div>
      {/* If images exists and has exactly one item */}
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
      {/* If images exists and has exactly two items */}
      {images && images.length === 2 && (
        <div className="flex flex-row justify-between w-[235px] mt-[20px]">
          {images.map((item, index) => (
            <Image
              key={index}
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
  );
};

export default TaskCard;
