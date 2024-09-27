// Constants
import { IMAGES, ROLES } from '@/constants';

// Components
import SidebarClient from './SidebarClient';
import { auth } from '@/configs';

const Sidebar = async () => {
  const { user } = (await auth()) ?? {};
  const {
    avatar = IMAGES.AVATAR_DEFAULT,
    fullName = '',
    role = ROLES[0],
  } = user ?? {};

  return <SidebarClient avatar={avatar} fullName={fullName} role={role.name} />;
};

export default Sidebar;
