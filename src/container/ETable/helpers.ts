import type { GetElement } from "@/components/Table";
import { FIRST_COLUMN, FIRST_ROW } from "./constants";

export const createColumnName = String.fromCharCode;

export function columnFactory<T>(getElement: GetElement<T>) {
  return (i: number) => {
    const name = () => createColumnName(i);
    return {
      getTitle: name,
      getKey: name,
      getElement,
      width: 150,
    };
  };
}

export function getCellName(address?: [number, number]): string {
  if (typeof address === "undefined") return "";
  const [column, row] = address;
  return [createColumnName(FIRST_COLUMN + column), FIRST_ROW + row].join("");
}
