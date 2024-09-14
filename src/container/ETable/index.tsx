import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import compose from "lodash/fp/compose";
import cn from "classnames";
import {
  InputLine,
  Table,
  TableColumn,
  Paginator,
  createRange,
  CreateCell,
} from "@/components";
import { toNumber } from "@/lib/helpers";
import {
  useKeyControl,
  getCellName,
  createColumnName,
  FIRST_COLUMN,
  FIRST_ROW,
} from "@/lib/table";
import styles from "./eTable.module.scss";

function createColumn<T>(name: string): TableColumn<T> {
  const getName = () => name;
  return {
    getTitle: getName,
    getKey: getName,
    getElement: () => <></>,
    width: 150,
  };
}

const createColumnFactory = (i: number) =>
  compose(createColumn, createColumnName)(i);

const getIndexFactory = (el: Element) => (attr: string) =>
  toNumber(el.getAttribute(attr));

function ETable() {
  const [columnLast, setColumn] = useState<number>(FIRST_COLUMN);
  const [rowLast, setRow] = useState<number>(FIRST_ROW);

  const { handleKeydown, setActive, active } = useKeyControl([
    columnLast - FIRST_COLUMN,
    rowLast - FIRST_ROW,
  ]);

  const columns = useMemo<TableColumn<unknown>[]>(
    () => createRange(FIRST_COLUMN, columnLast).map(createColumnFactory),
    [columnLast]
  );

  const data = useMemo(() => createRange(FIRST_ROW, rowLast), [rowLast]);

  const handleSelect = useCallback<MouseEventHandler<HTMLTableCellElement>>(
    ({ currentTarget }) => {
      const getIndex = getIndexFactory(currentTarget);
      setActive([getIndex("data-col"), getIndex("data-row")]);
    },
    [setActive]
  );

  const createColumn = useCallback<CreateCell>(
    (_, ri) => (c, ci) =>
      (
        <td
          key={c.getKey()}
          data-row={ri}
          data-col={ci}
          className={cn("table-body__cell", {
            "table-body__cell--active":
              active && ci === active[0] && ri === active[1],
          })}
          onClick={handleSelect}
        ></td>
      ),
    [active, handleSelect]
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
        <Table columns={columns} data={data} createCell={createColumn} />
      </div>
    </section>
  );
}

export default ETable;
