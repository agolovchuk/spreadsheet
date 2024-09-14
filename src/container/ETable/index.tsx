import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import pick from "lodash/fp/pick";
import {
  InputLine,
  Table,
  TableColumn,
  Paginator,
  createRange,
  CreateRow,
  TKey,
} from "@/components";
import { toNumber } from "@/lib/helpers";
import {
  useKeyControl,
  getCellName,
  createColumnName,
  FIRST_COLUMN,
  FIRST_ROW,
} from "@/lib/table";
import { Row } from "./helpers";
import { RowItem } from "./RowItem";
import Cell from "./Cell";

import type { DataRow } from "./types";
import styles from "./eTable.module.scss";
// TableColumn<T>
// : () => <td key={name} className={cn("table-body__cell")}></td>

// function createColumn<T>(getElement: (data: T) => ReactNode) {
//   return (name: string): TableColumn<T> => {
//     const getName = () => name;
//     return {
//       getTitle: getName,
//       getKey: getName,
//       getElement,
//       width: 150,
//     };
//   };
// }

// const createColumnFactory = (i: number) =>
//   compose(createColumn, createColumnName)(i);

const getIndexFactory = (el: Element) => (attr: string) =>
  toNumber(el.getAttribute(attr));

function ETable() {
  const [columnLast, setColumn] = useState<number>(FIRST_COLUMN);
  const [rowLast, setRow] = useState<number>(FIRST_ROW);

  const { handleKeydown, setActive, active, isActive } = useKeyControl([
    columnLast - FIRST_COLUMN,
    rowLast - FIRST_ROW,
  ]);

  const handleSelect = useCallback<MouseEventHandler<HTMLTableCellElement>>(
    ({ currentTarget }) => {
      const getIndex = getIndexFactory(currentTarget);
      setActive([getIndex("data-col"), getIndex("data-row")]);
    },
    [setActive]
  );

  const getElement = useCallback(
    (data: Row<DataRow>, rKey: TKey, cKey: TKey) => (
      <Cell
        key={cKey}
        isActive={isActive(rKey, cKey)}
        row={rKey}
        col={cKey}
        onSelect={handleSelect}
        getKey={() => data.hash}
      />
    ),
    [handleSelect, isActive]
  );

  const columns = useMemo<TableColumn<Row<DataRow>>[]>(
    () =>
      createRange(FIRST_COLUMN, columnLast).map((e) => ({
        getTitle: () => createColumnName(e),
        getKey: () => createColumnName(e),
        getElement,
        width: 150,
      })),
    [columnLast, getElement]
  );

  const data = useMemo<ReadonlyArray<Row<DataRow>>>(
    () => createRange(FIRST_ROW, rowLast).map((index) => new Row({ index })),
    [rowLast]
  );

  // const createColumn = useCallback<CreateCell>(
  //   (_, ri) => (c, ci) =>
  //     (
  //       <td
  //         key={c.getKey()}
  //         data-row={ri}
  //         data-col={ci}
  //         className={cn("table-body__cell", {
  //           "table-body__cell--active":
  //             active && ci === active[0] && ri === active[1],
  //         })}
  //         onClick={handleSelect}
  //       ></td>
  //     ),
  //   [active, handleSelect]
  // );

  const bodyColumn = useMemo(
    () => columns.map(pick(["getKey", "getElement"])),
    [columns]
  );

  const createRow = useCallback<CreateRow<Row<DataRow>>>(
    (row, index) => <RowItem columns={bodyColumn} data={row} index={index} />,
    [bodyColumn]
  );

  return (
    <section className={styles.container}>
      <Paginator
        current={columnLast}
        onChange={setColumn}
        getElement={createColumnName}
        className={styles.horizon}
      />
      <Paginator
        current={rowLast}
        onChange={setRow}
        getElement={(i) => i.toString()}
        direction="vertical"
        className={styles.vertical}
      />
      <div className={styles.activeCell}>{getCellName(active)}</div>
      <InputLine className={styles.inputLine} />
      <div
        tabIndex={1}
        className={styles.table}
        onKeyDownCapture={handleKeydown}
      >
        <Table columns={columns} data={data} createRow={createRow} />
      </div>
    </section>
  );
}

export default ETable;
