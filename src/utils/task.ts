import { TUser } from '@/models';
import { IFilter, StrapiModel, Task, TasksState, TaskStatus } from '@/types';

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

export const formatFilterOptions = (data: TUser[]): IFilter[] => {
  if (!data) return [];

  const userOptions = data.map(({ username, fullName }) => ({
    id: username,
    content: fullName,
  }));

  return [
    {
      id: 'list_1',
      title: 'User',
      items: userOptions,
    },
  ];
};
