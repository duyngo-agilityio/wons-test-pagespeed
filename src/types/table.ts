export type TTableAccessor<T> =
  | ((item: T, inputProps?: object) => React.ReactNode)
  | keyof T;

export interface TableColumnType<T> {
  accessor?: TTableAccessor<T>;
  header?: string | React.ReactNode;
  isSort?: boolean;
  value?: string;
  isCustomStyle?: boolean;
}
