import { Operator } from "./types";

export enum TokensType {
  number = "number",
  operator = "operator",
  paren = "paren",
}

export const OPERATORS: Set<Operator> = new Set(["+", "-", "*", "/"]);
export const NUMBERS = ".0123456789";

export const WEIGHT = {
  "(": 0,
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

export enum KeyName {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Enter = "Enter",
  Backspace = "Backspace",
}
