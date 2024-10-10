'use client';
import { memo, useState } from 'react';
import isEqual from 'react-fast-compare';

// Constants
import { IMAGES, ROLES } from '@/constants';

// Components
import { UserDetailForm, UserDetail } from '@/components';

// Types
import { TUser } from '@/models';

interface UserDetailClientProps {
  user?: TUser;
}

const UserDetailClient = ({ user }: UserDetailClientProps) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const {
    avatar = IMAGES.AVATAR_DEFAULT,
    fullName = '',
    username = '',
    email = '',
    role = ROLES[0],
  } = user ?? {};

  const handleEditFormToggle = () => {
    setShowEditForm((prevValue) => !prevValue);
  };

  return (
    <div className="flex flex-col justify-center items-center pb-[60px] bg-white dark:bg-gray-800 rounded-lg">
      <div className="bg-blue-500 w-full h-20 rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-blue-500 to-blue-300" />
      {showEditForm ? (
        <UserDetailForm
          avatar={avatar}
          username={username}
          role={role.name}
          fullName={fullName}
          email={email}
          onCancel={handleEditFormToggle}
        />
      ) : (
        <UserDetail
          avatar={avatar}
          username={username}
          role={role.name}
          fullName={fullName}
          email={email}
          onClick={handleEditFormToggle}
        />
      )}
    </div>
  );
};

export default memo(UserDetailClient, isEqual);
