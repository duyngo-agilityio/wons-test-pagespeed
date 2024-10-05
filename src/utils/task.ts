import { StrapiModel, Task, TasksState, TaskStatus } from '@/types';

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

export const convertTasksByStatus = (data: StrapiModel<Task>[]) => {
  return {
    todo: data.filter(({ attributes }) => attributes?.label === 'todo'),
    inProgress: data.filter(
      ({ attributes }) => attributes?.label === 'inProgress',
    ),
    inReview: data.filter(({ attributes }) => attributes?.label === 'inReview'),
    done: data.filter(({ attributes }) => attributes?.label === 'done'),
  };
};
