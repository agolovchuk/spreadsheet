import { useCallback, useMemo, useState } from "react";
import pick from "lodash/fp/pick";
import update from "lodash/fp/update";
import {
  InputLine,
  Table,
  TableColumn,
  Paginator,
  createRange,
  CreateRow,
} from "@/components";
import { useKeyControl } from "./useKeycontrol";
import { FIRST_COLUMN, FIRST_ROW } from "./constants";
import { columnFactory, createColumnName, getCellName } from "./helpers";
import { RowItem } from "./RowItem";
import { Row } from "./RowData";
import Cell from "./Cell";

import type { DataRow } from "./types";
import styles from "./eTable.module.scss";

function ETable() {
  const [columnLast, setColumn] = useState<number>(FIRST_COLUMN);
  const [data, setData] = useState<ReadonlyArray<Row<DataRow>>>([
    new Row({ index: 0 }),
  ]);

  const changeRowCount = useCallback(
    (counter: number) => {
      if (counter > data.length) {
        setData((d) => d.concat(new Row({ index: counter })));
      } else {
        setData((d) => d.slice(0, -1));
      }
    },
    [data.length]
  );

  const updateData = useCallback(
    ([row, col]: [number, number], value: string) => {
      setData((d) => update(row)((e: Row<DataRow>) => e.set(col, value))(d));
    },
    []
  );

  const { handleKeydown, setActive, active, isActive } = useKeyControl(
    [data.length - FIRST_ROW, columnLast - FIRST_COLUMN],
    updateData
  );

  const currentValue = useMemo<string | undefined | number>(
    () => data[active[0]].get(active[1]),
    [active, data]
  );

  const getElement = useCallback(
    (data: Row<DataRow>, d: [number, number]) => (
      <Cell key={d[1]} isActive={isActive(d)} onSelect={() => setActive(d)}>
        {data.get(d[1])}
      </Cell>
    ),
    [isActive, setActive]
  );

  const columns = useMemo<TableColumn<Row<DataRow>>[]>(
    () => createRange(FIRST_COLUMN, columnLast).map(columnFactory(getElement)),
    [columnLast, getElement]
  );

  const bodyColumn = useMemo(
    () => columns.map(pick(["getKey", "getElement"])),
    [columns]
  );

  const createRow = useCallback<CreateRow<Row<DataRow>>>(
    (row, index) => (
      <RowItem key={row.hash} columns={bodyColumn} data={row} index={index} />
    ),
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
        current={data.length}
        onChange={changeRowCount}
        getElement={(i) => i.toString()}
        direction="vertical"
        className={styles.vertical}
      />
      <div className={styles.activeCell}>{getCellName(active)}</div>
      <InputLine
        className={styles.inputLine}
        value={currentValue}
        onChange={(v) => updateData(active, v)}
      />
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
