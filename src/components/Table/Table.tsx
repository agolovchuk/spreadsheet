import { useMemo } from "react";
import cn from "classnames";
import pick from "lodash/fp/pick";
import { TableHeader } from "./Header";
import { TableBody } from "./Body";

import type { TableColumn, CreateRow } from "./types";
import "./table.scss";

interface Props<T> {
  className?: string;
  columns: ReadonlyArray<TableColumn<T>>;
  data?: ReadonlyArray<T>;
  createRow: CreateRow<T>;
}

const Table = <T,>({ className, columns, data, createRow }: Props<T>) => {
  const headerColumns = useMemo(
    () => columns.map(pick(["getKey", "getTitle", "width"])),
    [columns]
  );

  return (
    <table className={cn("table__container", className)}>
      <TableHeader columns={headerColumns} />
      <TableBody data={data} createRow={createRow} />
    </table>
  );
};

export default Table;
