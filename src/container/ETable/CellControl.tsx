import { FC, ChangeEventHandler, useCallback, useMemo } from "react";
import { calculate } from "@/lib";

interface Props {
  isActive: boolean;
  children?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const CellControl: FC<Props> = ({ isActive, children, onChange }) => {
  const refProxy = useCallback((el: HTMLInputElement) => {
    if (el) el.focus();
  }, []);

  const result = useMemo(() => {
    if (typeof children === "string" && children.charCodeAt(0) === 61) {
      return calculate(children);
    }
    return children;
  }, [children]);

  return isActive ? (
    <input
      ref={refProxy}
      value={children}
      title="table cell"
      onChange={onChange}
      className="table-cell__input"
    />
  ) : (
    <div className="table-cell__result">{result}</div>
  );
};

export default CellControl;
