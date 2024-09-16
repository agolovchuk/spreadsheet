import { useState, useCallback, KeyboardEventHandler } from "react";
import { KeyName } from "@/lib/constants";

type Dimension = [number, number];
enum KeyControlMode {
  normal = "normal",
}

/**
 *
 * @param max type Dimension [row, col]
 * @returns
 */
export const useKeyControl = (
  max: Dimension,
  updateData: (address: Dimension, value: string) => void
) => {
  const [active, setActive] = useState<Dimension>([0, 0]);
  const [value, setValue] = useState<string>("");
  const [mode] = useState<KeyControlMode>(KeyControlMode.normal);

  const handleKeydown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      if (KeyControlMode.normal === mode) {
        const [maxRow, maxColumn] = max;
        switch (event.code) {
          case KeyName.ArrowDown:
            setActive((a) => a && [Math.min(a[0] + 1, maxRow), a[1]]);
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
            setValue((c) => c + event.key);
            updateData(active, event.key);
            break;
        }
      }
    },
    [active, max, mode, updateData]
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
    currentValue: value,
    setCurrentValue: setValue,
  };
};
