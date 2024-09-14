export function createRange(from: number, to: number): ReadonlyArray<number> {
  const output: number[] = [];
  for (const item of Array(to - from + 1).keys()) {
    output.push(item + from);
  }
  return output.slice();
}
