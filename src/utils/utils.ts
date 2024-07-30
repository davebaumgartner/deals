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

// debounce (so we don't have to import lodash)
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  // type of NodeJS.Timeout throws a typescript error: `Cannot find namespace 'NodeJS'`
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
