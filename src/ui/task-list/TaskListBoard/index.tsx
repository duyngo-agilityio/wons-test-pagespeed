// Api
import { getTasks } from '@/api';

// Types
import { ISearchParams, StrapiModel, Task } from '@/types';

// UI
import TaskListBoardClient from '../TaskListBoardClient';

// Utils
import { convertStringToArray } from '@/utils';

// Constants
import { API_PATH } from '@/constants';

interface ITaskListBoard {
  searchParams: ISearchParams;
}

const TaskListBoard = async ({ searchParams }: ITaskListBoard) => {
  const { filters = '', query = '' } = searchParams ?? {};

  const result = await getTasks({
    filters: filters ? convertStringToArray(filters) : [],
    cache: 'no-store',
    nextOptions: {
      tags: [API_PATH.TASKS],
    },
    query,
  });

  const data: StrapiModel<Task>[] = result.data ?? [];

  return <TaskListBoardClient data={data} />;
};

export default TaskListBoard;
