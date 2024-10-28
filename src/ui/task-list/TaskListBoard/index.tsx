// Api
import { getTasks } from '@/api';

// Types
import { ISearchParams } from '@/types';

// UI
import TaskListBoardClient from '../TaskListBoardClient';

// Utils
import { convertStringToArray } from '@/utils';

interface ITaskListBoard {
  searchParams: ISearchParams;
}

const TaskListBoard = async ({ searchParams }: ITaskListBoard) => {
  const { filters = '', query = '' } = searchParams ?? {};

  const { data = [] } = await getTasks({
    filters: filters ? convertStringToArray(filters) : [],
    query,
  });

  return <TaskListBoardClient data={data} />;
};

export default TaskListBoard;
