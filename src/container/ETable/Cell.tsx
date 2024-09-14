import { FC, memo, MouseEventHandler } from "react";
import cn from "classnames";
import { TKey } from "@/components/Table";

interface Props {
  onSelect: MouseEventHandler;
  isActive: boolean;
  getKey: () => TKey;
  row: TKey;
  col: TKey;
}

const Cell: FC<Props> = ({ getKey, onSelect, isActive, row, col }) => {
  return (
    <td
      key={getKey()}
      data-row={row}
      data-col={col}
      className={cn("table-body__cell", {
        "table-body__cell--active": isActive,
      })}
      onClick={onSelect}
    ></td>
  );
};

export default memo(Cell);
