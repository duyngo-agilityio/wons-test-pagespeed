import { auth } from '@/configs';

// Actions
import { updateUser } from '@/actions';

// APIs
import { getUserById } from '@/api';

// Constants
import { API_PATH } from '@/constants';

// Components
import UserDetailClient from '../UserDetailClient';

const UserDetailContainer = async () => {
  const { user } = (await auth()) ?? {};
  const id = Number(user?.id);

  const data = await getUserById({
    id,
    nextOptions: {
      tags: [API_PATH.USERS],
    },
  });

  return <UserDetailClient user={data} onEdit={updateUser} />;
};

export default UserDetailContainer;
