import { ReactNode } from "react";

export interface TableColumn<T> extends TableHeaderColumn, TableBodyColumn<T> {}

export interface TableHeaderColumn extends TableColumnBase {
  getTitle: () => ReactNode;
  width: number;
}

export interface TableBodyColumn<T> extends TableColumnBase {
  getElement: (data: T) => ReactNode;
}

interface TableColumnBase {
  getKey: () => string | number;
}

export type CreateRow = <R>(row: R, index: number) => ReactNode;

export type CreateCell = <R>(
  row: R,
  rowIndex: number
) => (col: TableBodyColumn<R>, columnIndex: number) => ReactNode;
