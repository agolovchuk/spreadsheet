import { WEIGHT, NUMBERS } from "./constants";
import { Operator, Paren } from "./types";

export function isOperator(a: string): [true, Operator] | [false, string] {
  if (a in WEIGHT) return [true, a as Operator];
  return [false, a];
}

export function isNumber(a: string): boolean {
  return NUMBERS.includes(a);
}

export function isParen(a: string): [true, Paren] | [false, string] {
  if (a === "(" || a === ")") return [true, a];
  return [false, a];
}

export function toNumber(n?: string | null): number {
  if (typeof n === "string") {
    const pn = parseInt(n, 10);
    if (!isNaN(pn)) return pn;
  }
  throw new Error("Can't cast to number");
}
