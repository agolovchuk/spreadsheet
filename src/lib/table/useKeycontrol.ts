import { useState, useCallback, KeyboardEventHandler } from "react";
import { KeyName } from "../constants";

type Dimension = [number, number];

export const useKeyControl = (max: Dimension) => {
  const [active, setActive] = useState<Dimension>();

  const handleKeydown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      const [maxColumn, maxRow] = max;
      event.preventDefault();
      switch (event.code) {
        case KeyName.ArrowDown:
          setActive((a) => a && [a[0], Math.min(a[1] + 1, maxRow)]);
          break;
        case KeyName.ArrowLeft:
          setActive((a) => a && [Math.max(a[0] - 1, 0), a[1]]);
          break;
        case KeyName.ArrowRight:
          setActive((a) => a && [Math.min(a[0] + 1, maxColumn), a[1]]);
          break;
        case KeyName.ArrowUp:
          setActive((a) => a && [a[0], Math.max(a[1] - 1, 0)]);
          break;
        default:
          break;
      }
    },
    [max]
  );
  return {
    active,
    setActive,
    handleKeydown,
  };
};
