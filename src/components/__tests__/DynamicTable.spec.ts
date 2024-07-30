import { SortDirection, type TableColumn, type TableRow } from "@/types";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DynamicTable, { type DynamicTableProps } from "../DynamicTable.vue";

// table data
const data: TableRow[] = [
  { id: 1, col1: "column 1", col2: "column 2", col3: "column 3" },
  { id: 2, col1: "column 4", col2: "column 5", col3: "column 6" }
];

// column structure
const columns: TableColumn<TableRow>[] = [
  { key: "col1", type: "string", label: "Column 1", sortable: true },
  { key: "col2", type: "string", label: "Column 2", sortable: false },
  { key: "col3", type: "string", label: "Column 3", sortable: false }
];

// arbitrarily hide the second column
const visibleColumns = columns.filter((column) => column.key !== "col2");

// props for DynamicTable
const baseProps: DynamicTableProps<TableRow> = {
  visibleColumns,
  tableData: data,
  selectedRows: [],
  sortColumn: null,
  sortDirection: SortDirection.ASC,
  columns
};

describe("DynamicTable", () => {
  it("should render a table when props are set", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps } });
    expect(wrapper.find("table[data-testid='dynamic-table']").exists()).toBe(true);
  });

  it("should render visible columns", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps } });
    const visibleColumns = wrapper.findAll(".table-header-cell>.flex-contents");
    expect(visibleColumns.length).toBe(baseProps.visibleColumns.length);
  });

  it("should render table data", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps } });
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(baseProps.tableData.length);
  });

  it("should apply sortable/unsortable class depending on sortable property in column", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps } });
    const sortableColumns = wrapper.findAll(".sortable");
    expect(sortableColumns.length).toBe(
      baseProps.columns.filter((column) => column.sortable === true).length
    );
    const unsortableColumns = wrapper.findAll(".unsortable");
    expect(unsortableColumns.length).toBe(baseProps.visibleColumns.length - sortableColumns.length);
  });

  it("should allow clicking on sortable table headers (will emit handleColumnHeaderClick)", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps } });
    const sortableColumns = wrapper.findAll(".sortable");
    sortableColumns[0].trigger("click");
    expect(wrapper.emitted().handleColumnHeaderClick).toBeDefined();
    expect(wrapper.emitted().handleColumnHeaderClick).toEqual([["col1"]]);
  });

  it("should not allow clicking on unsortable table headers (won't emit handleColumnHeaderClick)", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps } });
    const unsortableColumns = wrapper.findAll(".unsortable");
    unsortableColumns[0].trigger("click");
    expect(wrapper.emitted().handleColumnHeaderClick).not.toBeDefined();
  });

  // row select/deselect event
  it("should emit handleRowClick when a row is clicked", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps } });
    const rows = wrapper.findAll("tr.table-row");
    expect(rows.length).toBe(baseProps.tableData.length);
    rows[0].trigger("click");
    expect(wrapper.emitted().handleRowClick).toBeDefined();
    expect(wrapper.emitted().handleRowClick).toEqual([[1]]);
    rows[1].trigger("click");
    expect(wrapper.emitted().handleRowClick).toEqual([[1], [2]]);
  });

  it("should add active class to any rows with ids matching the selectedRows prop", () => {
    const wrapper = mount(DynamicTable, { props: { ...baseProps, selectedRows: [1] } });
    const rows = wrapper.findAll("tr.table-row");
    expect(rows[0].classes("active")).toBe(true);
    expect(rows[1].classes("active")).toBe(false);
  });

  it("should show an up arrow character for a column that is sorted in ascending order", () => {
    const wrapper = mount(DynamicTable, {
      props: { ...baseProps, sortColumn: "col1", sortDirection: SortDirection.ASC }
    });
    const sortIconContainer = wrapper.findAll("[data-testid='sort-icon-container']");
    expect(sortIconContainer.length).toBe(baseProps.visibleColumns.length);
    expect(sortIconContainer[0].text()).toBe("↑");
    expect(sortIconContainer[1].text()).toBe("");
  });

  it("should show a down arrow character for a column that is sorted in descending order", () => {
    const wrapper = mount(DynamicTable, {
      props: { ...baseProps, sortColumn: "col1", sortDirection: SortDirection.DESC }
    });
    const sortIconContainer = wrapper.findAll("[data-testid='sort-icon-container']");
    expect(sortIconContainer.length).toBe(baseProps.visibleColumns.length);
    expect(sortIconContainer[0].text()).toBe("↓");
    expect(sortIconContainer[1].text()).toBe("");
  });
});
