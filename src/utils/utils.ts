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

// Convert JSON to CSV
export const jsonToCSV = <T extends TableRow>(jsonData: T[]): string => {
  const headers = Object.keys(jsonData[0]); // get headers from first row of data
  const csvContent = [];

  csvContent.push(headers);

  for (const row of jsonData) {
    const valuesArray = headers.map((header) => {
      const value = row[header];
      // If we don't handle array values, the CSV file will break on import
      if (value && Array.isArray(value) && value.length > 0) {
        // Separating values to make them more human-readable
        return JSON.stringify(value?.join(" | "));
      }
      return JSON.stringify(value);
    });
    csvContent.push(valuesArray.join(","));
  }

  return csvContent.join("\n");
};

// Download a CSV file from a string
export const downloadCsvFile = (csvData: string) => {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "data.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// convert JSON to CSV and download CSV file
export const convertJSONToCSVandDownload = (jsonData: TableRow[]) => {
  const csvData = jsonToCSV(jsonData);
  downloadCsvFile(csvData);
};
