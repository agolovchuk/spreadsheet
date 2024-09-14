import { memo } from "react";
import type { CreateRow } from "../types";

interface Props<T> {
  data?: ReadonlyArray<T>;
  createRow: CreateRow<T>;
}

export const Body = <T,>({ data, createRow }: Props<T>) => {
  return <tbody className="table-body">{data?.map(createRow)}</tbody>;
};

export default memo(Body) as <T>(props: Props<T>) => ReturnType<typeof Body>;
