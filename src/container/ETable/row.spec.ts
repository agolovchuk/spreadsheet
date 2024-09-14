import { Row } from "./helpers";

describe("Row structure", () => {
  test("Should compare same rows", () => {
    const obj = { a: 2, b: "cat" };
    const first = new Row(obj);
    const second = new Row(obj);
    const next = new Row({ b: "cat", a: 2 });
    expect(first.is(second)).toBeTruthy();
    expect(first.original === second.original).toBeTruthy();
    expect(first.is(next)).toBeTruthy();
    expect(first.original === next.original).toBeFalsy();
  });

  test("Should be the same after set data", () => {
    const first = new Row({ a: 2, b: "cat" });
    const second = new Row({ a: 2, b: "dog" });
    expect(second.is(first)).toBeFalsy();
    expect(second.is(first.set("b", "dog"))).toBeTruthy();
  });
});
