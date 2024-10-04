import { TasksState, TaskStatus } from '@/types';

export const mapTaskStatusToStateKey = (
  status: TaskStatus,
): keyof TasksState => {
  switch (status) {
    case 'ToDo':
      return 'todo';
    case 'In Progress':
      return 'inProgress';
    case 'In Review':
      return 'inReview';
    case 'Done':
      return 'done';
    default:
      throw new Error('Unknown TaskStatus');
  }
};
