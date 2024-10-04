import { TasksState } from '@/types';

export const MOCK_TASKS: TasksState = {
  todo: [
    {
      id: 1,
      title: 'Dashboard Design',
      description: 'Discussion for UI',
      images: ['/image1.jpg'],
    },
  ],
  inProgress: [
    {
      id: 2,
      title: 'API Development',
      description: 'Create APIs',
      images: ['/image1.jpg'],
    },
  ],
  inReview: [],
  done: [],
};
