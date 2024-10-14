// Constants
import { IMAGES, ROLES } from '@/constants';

// APIs
import { getProfile } from '@/api';

// Components
import SidebarClient from './SidebarClient';
import { auth } from '@/configs';

const Sidebar = async () => {
  const { user } = (await auth()) ?? {};
  const jwt: string = user?.token as string;
  const data = await getProfile(jwt);
  const {
    avatar = IMAGES.AVATAR_DEFAULT,
    fullName = '',
    role = ROLES[0],
  } = data ?? {};
  return <SidebarClient avatar={avatar} fullName={fullName} role={role.name} />;
};

export default Sidebar;
