import { memo } from 'react';
import isEqual from 'react-fast-compare';
import clsx from 'clsx';

// components
import { Button, ImageFallback } from '@/components';

// models
import { TUser } from '@/models';

// icons
import { FiPlus } from 'react-icons/fi';

// Types
import { StrapiModel } from '@/types';

// Utils
import { getSubarray } from '@/utils';

type AvatarGroupProps = {
  users: StrapiModel<Omit<TUser, 'id'>>[];
};

const AvatarGroup = ({ users }: AvatarGroupProps) => (
  <div className="flex items-center">
    {getSubarray<StrapiModel<Omit<TUser, 'id'>>>(users, 0, 4).map(
      ({ id, attributes }, index) => {
        const { avatar = '', username = '' } = attributes ?? {};

        return (
          <div key={id} className={clsx('w-7 h-7', index !== 0 && '-ml-3')}>
            <ImageFallback
              src={avatar}
              alt={username}
              placeholder={null}
              width={28}
              height={28}
              className="h-full rounded-full object-cover"
            />
          </div>
        );
      },
    )}

    <Button
      isIconOnly
      color="success"
      aria-label="Plus Button"
      className="w-7 h-7 p-0 -ml-3 rounded-full border-0"
    >
      <FiPlus />
    </Button>
  </div>
);

export default memo(AvatarGroup, isEqual);
