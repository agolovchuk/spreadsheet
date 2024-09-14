import { TokensItem } from "./types";
import { TokensType } from "./constants";

export const firstAST: TokensItem[] = [
  { type: TokensType.number, value: "2" },
  { type: TokensType.operator, value: "+" },
  { type: TokensType.number, value: "3" },
];

export const simpleExpression = "2+3*(4-1)";
export const expression: string =
  "15/(7-(1+1))*3-(2+(1+1))*15/(7-(200+1))*3-(2+(1+1))*(15/(7-(1+1))*3-(2+(1+1))+15/(7-(1+1))*3-(2+(1+1)))";
