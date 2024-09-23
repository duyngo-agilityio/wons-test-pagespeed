// Configs
import { auth } from '@/configs';

// Constants
import { ROLES } from '@/constants';

export const isAdmin = async (): Promise<boolean> => {
  const session = await auth();

  const { user } = session || {};
  const { role } = user || {};
  const { id: userId } = role || {};

  return ROLES[0].id === userId;
};
