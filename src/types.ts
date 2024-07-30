export type KeyLabelPair = {
  key: string;
  label: string;
};

export interface TableRow {
  id: number;
  [key: string]: string | number | boolean | string[];
}

// This isn't technically a type, but it's used to define the shape of the table data.
export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type TableColumn<T> = {
  key: string;
  type: string;
  label: string;
  sortable: boolean;
  sortFunction?: (a: T, b: T, sortDirection: SortDirection) => number;
  displayFormatFunction?: (unformattedValue: string | number | string[] | boolean) => string;
};

export type TableModel<T> = {
  columns: TableColumn<T>[];
  defaultHiddenColumns?: string[];
  defaultSort?: (a: T, b: T) => number;
};
