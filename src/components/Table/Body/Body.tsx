import { ReactNode, useCallback, memo } from "react";
import type { TableBodyColumn, CreateCell } from "../types";

interface Props<T> {
  columns: ReadonlyArray<TableBodyColumn<T>>;
  data?: ReadonlyArray<T>;
  createCell: CreateCell;
}

export const Body = <T,>({ data, columns, createCell }: Props<T>) => {
  const createRow = useCallback<(row: T, index: number) => ReactNode>(
    (row, index) => (
      <tr key={index} className="table-body__row">
        {columns.map(createCell(row, index))}
      </tr>
    ),
    [columns, createCell]
  );
  return <tbody className="table-body">{data?.map(createRow)}</tbody>;
};

export default memo(Body) as <T>(props: Props<T>) => ReturnType<typeof Body>;
