import type { KeyLabelPair, TableColumn, TableRow } from "@/types";

// get a table column by key
export const getColumnByKey = (
  key: string,
  columns: TableColumn<TableRow>[]
): TableColumn<TableRow> | undefined => columns.find((column) => column.key === key);

export function getKeyLabelFromHeaders(key: string | number, headers: KeyLabelPair[]) {
  const match = headers.find((header) => header.key === key.toString());
  return match ? match.label : key;
}
