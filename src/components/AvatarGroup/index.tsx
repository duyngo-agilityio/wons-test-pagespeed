import { memo } from 'react';
import isEqual from 'react-fast-compare';

// components
import { Button, ImageFallback } from '@/components';

// models
import { TUser } from '@/models';

// icons
import { FiPlus } from 'react-icons/fi';
import { StrapiModel } from '@/types';
import { getSubarray } from '@/utils';

type AvatarGroupProps = {
  users: StrapiModel<Omit<TUser, 'id'>>[];
};

const AvatarGroup = ({ users }: AvatarGroupProps) => {
  return (
    <div className="flex items-center">
      {getSubarray<StrapiModel<Omit<TUser, 'id'>>>(users, 0, 4).map(
        ({ id, attributes }, index) => {
          const { avatar = '', username = '' } = attributes ?? {};

          return (
            <div
              key={id}
              className={`relative w-7 h-7 rounded-full ${index === 0 ? '' : '-ml-3'}`}
            >
              <ImageFallback
                src={avatar}
                alt={username}
                width={28}
                height={28}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          );
        },
      )}

      <Button className="!px-0 relative flex w-7 h-7 items-center justify-center !rounded-full !bg-teal-500 dark:!bg-teal-300 text-white -ml-3 border-2 hover:!bg-teal-600 dark:hover:!bg-teal-400 transition duration-300 ease-in-out">
        <FiPlus />
      </Button>
    </div>
  );
};

export default memo(AvatarGroup, isEqual) as <T>(
  props: AvatarGroupProps & T,
) => JSX.Element;
