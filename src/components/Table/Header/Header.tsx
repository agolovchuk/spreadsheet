import { FC, memo, useRef } from "react";
import HeaderItem from "./Item";
import type { TableHeaderColumn } from "../types";

interface Props {
  columns: ReadonlyArray<TableHeaderColumn>;
}

const TableHeader: FC<Props> = ({ columns }) => {
  const colRef = useRef<HTMLTableColElement>(null);

  return (
    <>
      <colgroup ref={colRef}>
        {columns.map((e) => (
          <col key={e.getKey()} width={e.width} />
        ))}
      </colgroup>
      <thead className="table-header">
        <tr className="table-header__row">
          {columns.map((e, i) => (
            <HeaderItem index={i} colgroup={colRef} key={e.getKey()}>
              {e.getTitle()}
            </HeaderItem>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default memo(TableHeader);
