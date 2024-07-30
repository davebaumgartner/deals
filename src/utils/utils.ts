import type { TableColumn, TableRow } from "@/types";

// get a table column by key
export const getColumnByKey = (
  key: string,
  columns: TableColumn<TableRow>[]
): TableColumn<TableRow> | undefined => columns.find((column) => column.key === key);
