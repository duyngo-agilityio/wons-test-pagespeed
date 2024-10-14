import { auth } from '@/configs';

// Actions
import { updateUser } from '@/actions';

// APIs
import { getProfile } from '@/api';

// Constants
import { ROLES } from '@/constants';

// Components
import UserDetailClient from '../UserDetailClient';
import { IUserFormData } from '@/types';

const UserDetailContainer = async () => {
  const { user } = (await auth()) ?? {};
  const jwt: string = user?.token as string;
  const id = Number(user?.id);
  const data = await getProfile(jwt);
  const {
    avatar = '',
    email = '',
    role = ROLES[0],
    fullName = '',
    username = '',
  } = data ?? {};
  const newUser: IUserFormData = {
    avatar,
    fullName,
    email,
    username,
    role: role.name,
  };

  return <UserDetailClient user={newUser} id={id} onEdit={updateUser} />;
};

export default UserDetailContainer;
