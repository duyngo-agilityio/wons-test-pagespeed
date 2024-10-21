// Models
import { TUser } from '@/models';

// Types
import { StrapiModel, StrapiResponse } from './strapi';
import { Level } from './card';

export type TLabelStatus = 'todo' | 'inProgress' | 'inReview' | 'done';

export type Task = {
  title: string;
  label: TLabelStatus;
  level: Level;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  images?: string[];
  assignees: { data: Array<StrapiModel<Omit<TUser, 'id'>>> };
};

export type TaskWithStringAssignees = Omit<Task, 'assignees'> & {
  assignees: string | number[];
};

export type TasksState = {
  todo: StrapiModel<Task>[];
  inProgress: StrapiModel<Task>[];
  inReview: StrapiModel<Task>[];
  done: StrapiModel<Task>[];
};

export type TTasksResponse = StrapiResponse<StrapiModel<Task>[]>;

export const enum TaskStatus {
  Todo = 'ToDo',
  InProgress = 'In Progress',
  InReview = 'In Review',
  Done = 'Done',
}
