// Models
import { TUser } from '@/models';

// Constants
import { Level } from '@/constants';

// Types
import { StrapiModel, StrapiResponse } from './strapi';

export type TaskStatus = 'ToDo' | 'In Progress' | 'In Review' | 'Done';

export type TLabelStatus = 'todo' | 'inProgress' | 'inReview' | 'done';

export type Task = {
  title: string;
  label: TLabelStatus;
  level: Level;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images?: string[];
  assignees: { data: Array<StrapiModel<Omit<TUser, 'id'>>> };
};

export type TasksState = {
  todo: StrapiModel<Task>[];
  inProgress: StrapiModel<Task>[];
  inReview: StrapiModel<Task>[];
  done: StrapiModel<Task>[];
};

export type TTasksResponse = StrapiResponse<StrapiModel<Task>[]>;
