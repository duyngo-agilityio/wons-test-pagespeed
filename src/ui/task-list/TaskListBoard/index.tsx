// Api
import { getTasks } from '@/api';

// Types
import { StrapiModel, Task } from '@/types';

// UI
import TaskListBoardClient from '../TaskListBoardClient';

const TaskListBoard = async () => {
  const result = await getTasks({});

  const data: StrapiModel<Task>[] = result.data ?? [];

  return <TaskListBoardClient data={data} />;
};

export default TaskListBoard;
