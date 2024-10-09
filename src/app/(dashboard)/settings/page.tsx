'use client';
import { memo, useState } from 'react';

// Components
import { Heading, UserDetailForm, UserDetail } from '@/components';

const SettingsPage = async () => {
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleUserProfileForm = () => {
    setShowEditForm((prevValue) => !prevValue);
  };

  return (
    <div className="flex flex-col justify-center items-center p-[50px_30px] bg-white dark:bg-gray-800 rounded-lg">
      <Heading size="lg" title="Profile Settings" className="self-start" />
      {showEditForm ? (
        <UserDetailForm onCancel={toggleUserProfileForm} />
      ) : (
        <UserDetail onClick={toggleUserProfileForm} />
      )}
    </div>
  );
};

export default memo(SettingsPage);
