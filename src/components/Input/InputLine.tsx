import { FC, useState, useCallback, ChangeEventHandler, useMemo } from "react";
import cn from "classnames";
import { calculate } from "../../lib";
import "./input-line.scss";

interface Props {
  className?: string;
}

const InputLine: FC<Props> = ({ className }) => {
  const [state, setState] = useState<string>("");

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setState(event.currentTarget.value);
    },
    []
  );

  const result = useMemo(() => calculate(state), [state]);
  return (
    <div className={cn("input-line__container", className)}>
      <label className="input-line__label">
        <span className="input-line__title">f(x)</span>
        <input
          className="input-line__control"
          value={state}
          type="text"
          name="expression"
          onChange={handleChange}
        />
      </label>
      <div>{result}</div>
    </div>
  );
};

export default InputLine;
