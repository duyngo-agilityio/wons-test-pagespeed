// Utils
import { formatFilterOptions } from '@/utils';

// Components
import { Filter } from '@/components';

// Constants
import { getUsers } from '@/api';

// models
import { TUser } from '@/models';

const ScheduleListFilter = async (): Promise<JSX.Element> => {
  const users: TUser[] = await getUsers();
  const filterOptions = formatFilterOptions(users);

  return (
    <div className="mb-1 flex items-center gap-5 base:mt-10 md:mt-0 base:flex-col md:flex-row">
      <Filter title="Filter" items={filterOptions} />
    </div>
  );
};

export default ScheduleListFilter;
