export function getWidth(el: Element): number {
  const { width } = el.getBoundingClientRect();
  return width;
}

export function getNeighbor(index: number, list?: HTMLCollection): Element[] {
  if (list) {
    const current = list.item(index);
    const next = list.item(index + 1);
    if (current && next) {
      return [current, next];
    }
    throw new Error("No elements or neighbor");
  }
  throw new Error("No list of elements");
}

export function calculatePosition(
  x: number,
  start: [number, number, number]
): [number, number] {
  const delta = x - start[0];
  return [start[1] + delta, start[2] - delta];
}

export function updateElements(elements: Element[], values: number[]) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute("width", values[i].toString());
  }
}
