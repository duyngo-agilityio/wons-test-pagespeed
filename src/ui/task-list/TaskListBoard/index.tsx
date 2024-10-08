// Api
import { getTasks } from '@/api';

// Types
import { ISearchParams, StrapiModel, Task } from '@/types';

// UI
import TaskListBoardClient from '../TaskListBoardClient';
import { convertStringToArray } from '@/utils';

interface ITaskListBoard {
  searchParams: ISearchParams;
}

const TaskListBoard = async ({ searchParams }: ITaskListBoard) => {
  const { filters = '', query = '' } = searchParams ?? {};

  const result = await getTasks({
    filters: filters ? convertStringToArray(filters) : [],
    query,
  });

  const data: StrapiModel<Task>[] = result.data ?? [];

  return <TaskListBoardClient data={data} />;
};

export default TaskListBoard;
