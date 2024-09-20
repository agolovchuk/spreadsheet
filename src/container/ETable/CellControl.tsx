import { FC, ChangeEventHandler, useCallback } from "react";

interface Props {
  isActive: boolean;
  children?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const CellControl: FC<Props> = ({ isActive, children, onChange }) => {
  const refProxy = useCallback((el: HTMLInputElement) => {
    if (el) el.focus();
  }, []);

  return isActive ? (
    <input
      ref={refProxy}
      value={children}
      title="table cell"
      onChange={onChange}
    />
  ) : (
    children
  );
};

export default CellControl;
