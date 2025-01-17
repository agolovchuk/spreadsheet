import { useCallback, useMemo, useRef, useState } from "react";
import cn from "classnames";
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
import { useKeyControl, KeyControlMode } from "./useKeycontrol";
import { FIRST_COLUMN, FIRST_ROW } from "./constants";
import { columnFactory, createColumnName, getCellName } from "./helpers";
import { RowItem } from "./RowItem";
import { Row } from "./RowData";
import { CellControl } from "./CellControl";
import Cell from "./Cell";

import type { DataRow } from "./types";
import styles from "./eTable.module.scss";

interface Props {
  className?: string;
}

function ETable({ className }: Props) {
  const tableRef = useRef<HTMLDivElement>(null);
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

  const { handleKeydown, setActive, active, isActive, mode } = useKeyControl(
    tableRef,
    [data.length - FIRST_ROW, columnLast - FIRST_COLUMN]
  );

  const currentValue = useMemo<string | undefined | number>(
    () => data[active[0]].get(active[1]),
    [active, data]
  );

  const getElement = useCallback(
    (data: Row<DataRow>, d: [number, number]) => (
      <Cell key={d[1]} isActive={isActive(d)} onSelect={() => setActive(d)}>
        <CellControl
          onChange={(event) => updateData(active, event.target.value)}
          isActive={isActive(d) && mode === KeyControlMode.edit}
        >
          {data.get(d[1])}
        </CellControl>
      </Cell>
    ),
    [active, isActive, mode, setActive, updateData]
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
    <section className={cn(styles.container, className)}>
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
        ref={tableRef}
        className={styles.table}
        onKeyDownCapture={handleKeydown}
      >
        <Table columns={columns} data={data} createRow={createRow} />
      </div>
    </section>
  );
}

export default ETable;
