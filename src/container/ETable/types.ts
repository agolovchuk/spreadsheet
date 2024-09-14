export type RowValue = string | number;
export type RowData = Record<string, RowValue>;

export interface Comparable<T> {
  is: (a: T) => boolean;
}
