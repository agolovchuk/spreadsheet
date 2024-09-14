import { useMemo } from "react";
import cn from "classnames";
import pick from "lodash/fp/pick";
import { TableHeader } from "./Header";
import { TableBody } from "./Body";
import "./table.scss";
import type { TableColumn, CreateCell } from "./types";

interface Props<T> {
  className?: string;
  columns: ReadonlyArray<TableColumn<T>>;
  data?: ReadonlyArray<T>;
  createCell: CreateCell;
}

const Table = <T,>({ className, columns, data, createCell }: Props<T>) => {
  const headerColumns = useMemo(
    () => columns.map(pick(["getKey", "getTitle", "width"])),
    [columns]
  );
  const bodyColumns = useMemo(
    () => columns.map(pick(["getKey", "getElement"])),
    [columns]
  );
  return (
    <table className={cn("table__container", className)}>
      <TableHeader columns={headerColumns} />
      <TableBody columns={bodyColumns} data={data} createCell={createCell} />
    </table>
  );
};

export default Table;
