'use client';
import { memo, useState } from 'react';

// Components
import { UserDetailForm, UserDetail } from '@/components';

// Mock data
// !TODO replace this mocked data with api response
const user = {
  avatar: '',
  username: 'admin1',
  role: 'Admin',
  fullName: 'Admin',
  email: 'admin1@gmail.com',
};

const UserDetailContainer = () => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditFormToggle = () => {
    setShowEditForm((prevValue) => !prevValue);
  };

  return (
    <div className="flex flex-col justify-center items-center p-[50px_30px] bg-white dark:bg-gray-800 rounded-lg">
      {showEditForm ? (
        <UserDetailForm
          avatar={user.avatar}
          username={user.username}
          role={user.role}
          fullName={user.fullName}
          email={user.email}
          onCancel={handleEditFormToggle}
        />
      ) : (
        <UserDetail
          avatar={user.avatar}
          username={user.username}
          role={user.role}
          fullName={user.fullName}
          email={user.email}
          onClick={handleEditFormToggle}
        />
      )}
    </div>
  );
};

export default memo(UserDetailContainer);
