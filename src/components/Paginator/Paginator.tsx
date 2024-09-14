import { FC } from "react";
import cn from "classnames";
import "./paginator.scss";

import type { Direction } from "./types";

interface Props {
  direction?: Direction;
  current?: number;
  max?: number;
  min?: number;
  onChange: (index: number) => void;
  getElement: (index: number) => string;
  className?: string;
}

const Paginator: FC<Props> = ({
  direction = "horizontal",
  onChange,
  current = 1,
  max = 10,
  getElement,
  min = 1,
  className,
}) => {
  return (
    <div
      className={cn(
        "paginator__container",
        `paginator__container--${direction}`,
        className
      )}
    >
      <button
        title="prev"
        type="button"
        className="paginator__btn paginator__btn--prev"
        disabled={current === min}
        onClick={() => onChange(current - 1)}
      >
        -
      </button>
      <div className="paginator__current" title="current">
        {getElement(current)}
      </div>
      <button
        title="next"
        type="button"
        className="paginator__btn paginator__btn--next"
        disabled={current === max}
        onClick={() => onChange(current + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Paginator;
