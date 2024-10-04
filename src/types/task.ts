export type TaskStatus = 'ToDo' | 'In Progress' | 'In Review' | 'Done';

export type Task = {
  id: number;
  title: string;
  description: string;
  images?: string[];
};

export type TasksState = {
  todo: Task[];
  inProgress: Task[];
  inReview: Task[];
  done: Task[];
};
