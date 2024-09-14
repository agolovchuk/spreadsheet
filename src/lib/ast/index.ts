import { Operator, TokensItem, Paren } from "../types";
import { TokensType, WEIGHT } from "../constants";

function getWeight<T extends string>(a: T): number {
  if (a in WEIGHT) return WEIGHT[a as Operator];
  throw new Error("Incorrect element for compare " + a);
}

function compareWeight<T extends Operator | Paren>(a: T, b: T): boolean {
  return getWeight(a) >= getWeight(b);
}

export function shuntingYard(tokens: TokensItem[]): Array<string | Operator> {
  const output: Array<string | Operator> = [];
  const stack: Array<Operator | Paren> = [];
  try {
    for (const { type, value } of tokens) {
      if (type === TokensType.number) {
        output.push(value);
      } else if (type === TokensType.operator) {
        while (
          stack.length &&
          // stack[stack.length - 1] !== "(" &&
          compareWeight(stack[stack.length - 1], value)
        ) {
          output.push(stack.pop() as Operator);
        }
        stack.push(value);
      } else if (value === "(") {
        stack.push(value);
      } else if (value === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop() as Operator);
        }
        stack.pop();
      }
    }
    while (stack.length) {
      output.push(stack.pop() as Operator);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message + " Stack:" + stack + " Output:" + output);
    }
  }
  return output;
}
