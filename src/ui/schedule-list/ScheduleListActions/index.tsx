// components
import { SearchInput, TaskDrawer } from '@/components';

// configs
import { auth } from '@/configs';

// models
import { TUser } from '@/models';

const ScheduleListActions = async (): Promise<JSX.Element> => {
  const { user = {} } = (await auth()) ?? {};

  return (
    <div className="flex items-center gap-5 mt-5 md:mt-0 base:flex-col md:flex-row">
      <SearchInput className="base:w-full md:w-fit" />

      <TaskDrawer user={user as TUser} />
    </div>
  );
};

export default ScheduleListActions;
