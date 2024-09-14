import {
  FC,
  RefObject,
  ReactNode,
  useRef,
  useCallback,
  DragEventHandler,
} from "react";
import {
  calculatePosition,
  getNeighbor,
  updateElements,
  getWidth,
} from "./helpers";

interface Props {
  index: number;
  colgroup: RefObject<HTMLTableColElement>;
  children: ReactNode;
}

const Item: FC<Props> = ({ children, index, colgroup }) => {
  const startPosition = useRef<[number, number, number]>([0, 0, 0]);
  const nextPosition = useRef<[number, number]>([0, 0]);

  const setPosition = useCallback(() => {
    updateElements(
      getNeighbor(index, colgroup.current?.children),
      nextPosition.current
    );
  }, [colgroup, index]);

  const handleStart = useCallback<DragEventHandler<HTMLDivElement>>(
    (event) => {
      const [current, next] = getNeighbor(index, colgroup.current?.children);
      startPosition.current = [
        event.clientX,
        getWidth(current),
        getWidth(next),
      ];
    },
    [colgroup, index]
  );

  const handleMove = useCallback<DragEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.clientX !== 0) {
        nextPosition.current = calculatePosition(
          event.clientX,
          startPosition.current
        );
        requestAnimationFrame(setPosition);
      }
    },
    [setPosition]
  );

  const handleEnd = useCallback<DragEventHandler<HTMLDivElement>>(
    (event) => {
      nextPosition.current = calculatePosition(
        event.clientX,
        startPosition.current
      );
      requestAnimationFrame(setPosition);
      startPosition.current = [0, 0, 0];
    },
    [setPosition]
  );

  return (
    <th className="table-header__cell">
      <div className="table-header__cell-wrapper">
        {children}
        <div
          className="table-header__control"
          draggable
          onDragStart={handleStart}
          onDrag={handleMove}
          onDragEnd={handleEnd}
        />
      </div>
    </th>
  );
};

export default Item;
