import { ReactNode } from 'react';

export interface IOptions {
  label: string;
  value: string;
}

export interface IFilter {
  id: string;
  title: string;
  items: Array<{
    id: string;
    content?: string;
    customElement?: ReactNode;
  }>;
}
