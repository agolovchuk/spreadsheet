import { simpleExpression, expression } from "./moke";
import { lexer, shuntingYard, evaluate } from "./index";
test("Parser", () => {
  const ast = lexer(simpleExpression);
  expect(evaluate(shuntingYard(ast))).toBe(11);
  expect(evaluate(shuntingYard(lexer(expression)))).toBe(-30.072164948453608);
});
