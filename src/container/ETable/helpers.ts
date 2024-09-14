import type { RowData, Comparable } from "./types";

const CRCTable: number[] = (() => {
  let c;
  const table: number[] = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

function getCRC32(str: string) {
  let crc = 0 ^ -1;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    crc = (crc >>> 8) ^ CRCTable[(crc ^ char) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function getKeys<T extends RowData>(obj: T): string[] {
  return Object.keys(obj).sort();
}

function calculateHash<T extends RowData>(obj: T): number {
  const str = JSON.stringify(obj, getKeys(obj));
  return getCRC32(str);
}

export class Row<T extends RowData> implements Comparable<Row<T>> {
  #row: T;
  hash: number = 0;

  constructor(obj: T) {
    this.#row = obj;
    this.hash = calculateHash(obj);
  }

  keys(): string[] {
    return getKeys(this.#row);
  }

  set(key: keyof T, value: T[keyof T]): this {
    this.#row[key] = value;
    this.hash = calculateHash(this.#row);
    return this;
  }

  get(key: keyof T): T[keyof T] {
    return this.#row[key];
  }

  get original() {
    return this.#row;
  }

  is(row: Row<T>): boolean {
    if (this.#row === row.original) return true;
    return this.hash === row.hash;
  }
}
