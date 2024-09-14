import { TokensType } from "./constants";

export type Operator = "+" | "-" | "*" | "/";
export type Paren = "(" | ")";

export type TokensItem =
  | {
      type: TokensType.number;
      value: string;
    }
  | {
      type: TokensType.operator;
      value: Operator;
    }
  | {
      type: TokensType.paren;
      value: Paren;
    };
