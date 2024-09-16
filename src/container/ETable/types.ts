export type RowValue = string | number;
export type RowData = Record<string, RowValue>;
export type Dimension = [number, number];

export interface Comparable<T> {
  is: (a: T) => boolean;
  hash: number;
}

export interface DataRow extends RowData {
  index: number;
}
