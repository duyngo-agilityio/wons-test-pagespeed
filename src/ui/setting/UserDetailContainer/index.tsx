'use client';

import { useSession } from 'next-auth/react';

// Types
import { IUserFormData } from '@/types';

// Actions
import { updateUser } from '@/actions';

// Constants
import { IMAGES, ROLES } from '@/constants';

// Components
import UserDetailClient from '../UserDetailClient';

const UserDetailContainer = () => {
  const { data: session } = useSession();

  const { user } = session || {};

  const {
    id,
    avatar = IMAGES.AVATAR_DEFAULT,
    email = '',
    role = ROLES[0],
    fullName = '',
    username = '',
  } = user ?? {};

  const newUser: IUserFormData = {
    avatar,
    fullName,
    email,
    username,
    role: role.name,
  };

  return (
    <UserDetailClient user={newUser} id={Number(id)} onEdit={updateUser} />
  );
};

export default UserDetailContainer;
