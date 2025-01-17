import { memo } from "react";
import { TableBodyColumn } from "@/components/Table";
import type { Comparable } from "./types";

interface Props<T> {
  index: number;
  data: T;
  columns: ReadonlyArray<TableBodyColumn<T>>;
}

export const RowItem = <T extends Comparable<T>>({
  index,
  columns,
  data,
}: Props<T>) => {
  return (
    <tr className="table-body__row">
      {columns.map((e, ci) => e.getElement(data, [index, ci]))}
    </tr>
  );
};

export default memo(RowItem, (prev, next) => {
  return prev.data.is(next.data);
});
