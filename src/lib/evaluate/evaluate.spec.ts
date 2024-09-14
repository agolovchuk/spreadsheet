import { evaluate } from "./index";

test("Should evaluate correctly", () => {
  expect(evaluate(["2", "3", "4", "1", "-", "*", "+"])).toBe(11);
  expect(evaluate(["1", "2", "3", "*", "+", "4", "-"])).toBe(3);
});

test("Should throw a error", () => {
  expect(() => {
    evaluate(["2", "-"]);
  }).toThrow(Error);
});
