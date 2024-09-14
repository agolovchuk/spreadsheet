import { lexer } from "./index";
import { firstAST, simpleExpression } from "../moke";

test("lexer", () => {
  const result = lexer("2 + 3");
  expect(result).toEqual(firstAST);
  expect(lexer(simpleExpression)).toEqual([
    { type: "number", value: "2" },
    { type: "operator", value: "+" },
    { type: "number", value: "3" },
    { type: "operator", value: "*" },
    { type: "paren", value: "(" },
    { type: "number", value: "4" },
    { type: "operator", value: "-" },
    { type: "number", value: "1" },
    { type: "paren", value: ")" },
  ]);
  expect(lexer("2.1 + 3.55")).toEqual([
    { type: "number", value: "2.1" },
    { type: "operator", value: "+" },
    { type: "number", value: "3.55" },
  ]);
});
