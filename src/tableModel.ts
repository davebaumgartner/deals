import type { TableModel, TableRow } from "@/types";
import { SortDirection } from "@/types";

// This is a custom row type for the mock data, and would need to be updated if the mock data shape changes.
// We could build the table model without this, but then we'd need to add a bunch of type checks for each column.
interface MockTableRow extends TableRow {
  id: number;
  issuer_name: string;
  deal_name: string;
  // This is listed in the spec with a key of "bloomber_id", but I'm assuming that's a typo.
  bloomberg_id: string;
  total: number;
  industry: string;
  status: string;
  analysts: string[];
  doc_count: number;
  custom_deal_identifiers: string[];
}

enum RATINGS {
  Bad = 1,
  Ok = 2,
  Good = 3,
  Great = 4,
  Excellent = 5
}

// Custom table model to match the mock data.
// If the mock data shape changes, this will need to be updated or a new model will need to be created.
export const TABLE_MODEL: TableModel<MockTableRow> = {
  defaultSort: (a: MockTableRow, b: MockTableRow) => a.id - b.id,
  // These columns are hidden by default to make the table easier to read.
  defaultHiddenColumns: ["bloomberg_id", "analysts", "custom_deal_identifiers", "doc_count"],
  columns: [
    {
      key: "id",
      type: "int",
      label: "ID",
      sortable: true,
      sortFunction: (a: MockTableRow, b: MockTableRow, sortDirection: SortDirection) => {
        const difference = a.id - b.id;
        return sortDirection === SortDirection.ASC ? difference : -difference;
      }
    },
    {
      key: "issuer_name",
      type: "string",
      label: "Issuer",
      sortable: true,
      sortFunction: (a: MockTableRow, b: MockTableRow, sortDirection: SortDirection) => {
        const difference = a.issuer_name.localeCompare(b.issuer_name);
        return sortDirection === SortDirection.ASC ? difference : -difference;
      }
    },
    {
      key: "deal_name",
      type: "string",
      label: "Deal",
      sortable: true,
      sortFunction: (a: MockTableRow, b: MockTableRow, sortDirection: SortDirection) => {
        const difference = a.deal_name.localeCompare(b.deal_name);
        return sortDirection === SortDirection.ASC ? difference : -difference;
      }
    },
    {
      key: "bloomberg_id",
      type: "string",
      label: "Bloomberg ID",
      sortable: false,
      displayFormatFunction: (unformattedValue) =>
        `${(unformattedValue as string)?.substring(0, 8)}...`
    },
    {
      key: "total",
      type: "decimal",
      label: "Total",
      sortable: true,
      sortFunction: (a: MockTableRow, b: MockTableRow, sortDirection: SortDirection) => {
        const difference = a.total - b.total;
        return sortDirection === SortDirection.ASC ? difference : -difference;
      },
      displayFormatFunction: (unformattedValue) => Number(unformattedValue)?.toFixed(2)
    },
    {
      key: "industry",
      type: "string",
      label: "Industry",
      sortable: true,
      sortFunction: (a: MockTableRow, b: MockTableRow, sortDirection: SortDirection) => {
        const difference = a.industry.localeCompare(b.industry);
        return sortDirection === SortDirection.ASC ? difference : -difference;
      }
    },
    {
      key: "status",
      type: "string",
      label: "Status",
      sortable: true,
      sortFunction: (a: MockTableRow, b: MockTableRow, sortDirection: SortDirection) => {
        const difference =
          RATINGS[a.status as keyof typeof RATINGS] - RATINGS[b.status as keyof typeof RATINGS];
        return sortDirection === SortDirection.ASC ? difference : -difference;
      }
    },
    {
      key: "analysts",
      type: "string[]",
      label: "Analysts",
      sortable: false,
      displayFormatFunction: (unformattedValue) => {
        if (typeof unformattedValue === "object" && Array.isArray(unformattedValue)) {
          return `${(unformattedValue as string[]).join(", ").substring(0, 20)}...`;
        }
        return unformattedValue.toString();
      }
    },
    {
      key: "doc_count",
      type: "int",
      label: "Docs",
      sortable: true,
      sortFunction: (a: MockTableRow, b: MockTableRow, sortDirection: SortDirection) => {
        const difference = a.doc_count - b.doc_count;
        return sortDirection === SortDirection.ASC ? difference : -difference;
      }
    },
    {
      key: "custom_deal_identifiers",
      type: "string[]",
      label: "Identifiers",
      sortable: false,
      displayFormatFunction: (unformattedValue) => {
        if (typeof unformattedValue === "object" && Array.isArray(unformattedValue)) {
          return `${(unformattedValue as string[]).join(", ").substring(0, 20)}...`;
        }
        return unformattedValue.toString();
      }
    }
  ]
};
