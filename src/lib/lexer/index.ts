import { TokensType } from "../constants";
import { isNumber } from "../helpers";
import type { Operator, TokensItem } from "../types";
enum STATE {
  start = "start",
  number = "number",
}

export function lexer(input: string): TokensItem[] {
  let state = STATE.start;
  let buffer = "";
  const tokens: TokensItem[] = [];
  for (const char of input) {
    switch (state) {
      case STATE.start:
        if (isNumber(char)) {
          state = STATE.number;
          buffer += char;
        } else if (/[+\-*/]/.test(char)) {
          tokens.push({ type: TokensType.operator, value: char as Operator });
        } else if (char === "(" || char === ")") {
          tokens.push({ type: TokensType.paren, value: char });
        }
        break;

      case STATE.number:
        if (isNumber(char)) {
          buffer += char;
        } else {
          tokens.push({ type: TokensType.number, value: buffer });
          buffer = "";
          state = STATE.start;
          if (/[+\-*/]/.test(char)) {
            tokens.push({ type: TokensType.operator, value: char as Operator });
          }
          if (char === "(" || char === ")") {
            tokens.push({ type: TokensType.paren, value: char });
          }
        }
        break;
    }
  }
  if (buffer.length) {
    tokens.push({ type: TokensType.number, value: buffer });
  }
  return tokens;
}
