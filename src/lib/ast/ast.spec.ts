import { shuntingYard } from "./index";
import { firstAST } from "../moke";

test("shuntingYard", () => {
  expect(shuntingYard(firstAST)).toEqual(["2", "3", "+"]);
});
