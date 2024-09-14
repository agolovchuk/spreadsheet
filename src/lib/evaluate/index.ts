export function evaluate(rpn: string[]): number {
  const stack: number[] = [];
  for (const token of rpn) {
    if (!isNaN(+token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      if (typeof a !== "number" || typeof b !== "number")
        throw new Error("Stack error " + stack.toString());
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
      }
    }
  }
  return stack[0];
}
