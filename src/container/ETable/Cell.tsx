import { FC, memo, MouseEventHandler, ReactNode } from "react";
import cn from "classnames";

interface Props {
  onSelect: MouseEventHandler;
  isActive: boolean;
  children?: ReactNode;
}

export const Cell: FC<Props> = ({ onSelect, isActive, children }) => {
  return (
    <td
      className={cn("table-body__cell", {
        "table-body__cell--active": isActive,
      })}
      onClick={onSelect}
    >
      {children}
    </td>
  );
};

export default memo(Cell);
