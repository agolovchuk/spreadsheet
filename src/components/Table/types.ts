import { ReactNode } from "react";

export interface TableColumn<T> extends TableHeaderColumn, TableBodyColumn<T> {}

export interface TableHeaderColumn extends TableColumnBase {
  getTitle: () => ReactNode;
  width: number;
}

export type TKey = string | number;
export type GetElement<T> = (data: T, d: [number, number]) => ReactNode;
export interface TableBodyColumn<T> extends TableColumnBase {
  getElement: GetElement<T>;
}

interface TableColumnBase {
  getKey: () => TKey;
}

export type CreateRow<R> = (row: R, index: number) => ReactNode;

export type CreateCell = <R>(
  row: R,
  rowIndex: number
) => (col: TableBodyColumn<R>, columnIndex: number) => ReactNode;
