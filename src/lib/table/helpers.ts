import { FIRST_COLUMN, FIRST_ROW } from "./constant";

export function getCellName(address?: [number, number]): string {
  if (typeof address === "undefined") return "";
  const [column, row] = address;
  return [String.fromCharCode(FIRST_COLUMN + column), FIRST_ROW + row].join("");
}

export const createColumnName = String.fromCharCode;
