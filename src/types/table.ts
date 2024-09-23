import { ReactNode } from 'react';

export type TTableAccessor<T> =
  | ((item: T, inputProps?: object) => ReactNode)
  | keyof T;

export interface TableColumnType<T> {
  accessor?: TTableAccessor<T>;
  header?: string | ReactNode;
  isSort?: boolean;
  value?: string;
}
