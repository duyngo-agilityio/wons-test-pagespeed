// Actions
import { updateUser } from '@/actions';

// Components
import UserDetailClient from '../UserDetailClient';

import { auth } from '@/configs';

const UserDetailContainer = async () => {
  const { user } = (await auth()) ?? {};

  return <UserDetailClient user={user} onEdit={updateUser} />;
};

export default UserDetailContainer;
