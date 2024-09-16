import { FC, useCallback, ChangeEventHandler, useMemo } from "react";
import cn from "classnames";
import { calculate } from "../../lib";
import "./input-line.scss";

interface Props {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputLine: FC<Props> = ({
  className,
  value = "",
  onChange = () => null,
}) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange(event.currentTarget.value);
    },
    [onChange]
  );

  const result = useMemo(() => calculate(value), [value]);

  return (
    <div className={cn("input-line__container", className)}>
      <label className="input-line__label">
        <span className="input-line__title">f(x)</span>
        <input
          className="input-line__control"
          value={value}
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
