import { useState, useCallback, KeyboardEventHandler } from "react";
import { KeyName } from "@/lib/constants";

type Dimension = [number, number];
export enum KeyControlMode {
  normal = "normal",
  edit = "edit",
}

/**
 *
 * @param max type Dimension [row, col]
 * @returns
 */
export const useKeyControl = (
  [maxRow, maxColumn]: Dimension,
  updateData: (address: Dimension, value: string) => void
) => {
  const [active, setActive] = useState<Dimension>([0, 0]);
  const [mode, setMode] = useState<KeyControlMode>(KeyControlMode.normal);

  const goDown = useCallback(
    () => setActive((a) => a && [Math.min(a[0] + 1, maxRow), a[1]]),
    [maxRow]
  );

  const handleKeydown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      if (KeyControlMode.normal === mode) {
        // event.preventDefault();
        switch (event.code) {
          case KeyName.ArrowDown:
            goDown();
            break;
          case KeyName.ArrowLeft:
            setActive((a) => a && [a[0], Math.max(a[1] - 1, 0)]);
            break;
          case KeyName.ArrowRight:
            setActive((a) => a && [a[0], Math.min(a[1] + 1, maxColumn)]);
            break;
          case KeyName.ArrowUp:
            setActive((a) => a && [Math.max(a[0] - 1, 0), a[1]]);
            break;
          case KeyName.Enter:
            // TODO: Change status to edit cell
            break;
          case KeyName.Backspace:
            // TODO: Remove prev char
            break;
          default:
            updateData(active, event.key);
            setMode(KeyControlMode.edit);
            break;
        }
      } else if (KeyControlMode.edit === mode) {
        switch (event.code) {
          case KeyName.Enter:
            setMode(KeyControlMode.normal);
            goDown();
            break;
        }
      }
    },
    [active, goDown, maxColumn, mode, updateData]
  );

  const setActiveHandler = useCallback<(a: Dimension) => void>((a) => {
    setActive(a);
  }, []);

  const isActive = useCallback(
    (d: Dimension) =>
      Boolean(active && d[0] === active[0] && d[1] === active[1]),
    [active]
  );

  return {
    active,
    isActive,
    setActive: setActiveHandler,
    handleKeydown,
    mode,
  };
};
