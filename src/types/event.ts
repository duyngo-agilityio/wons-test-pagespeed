// Models
import { ICalendarTask, IEvent, TUser } from '@/models';

// Types
import { StrapiModel } from './strapi';

export type TEventResponse = Omit<IEvent, 'users_permissions_users'> &
  ICalendarTask & {
    users_permissions_users: { data: StrapiModel<TUser>[] };
  };
