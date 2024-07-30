import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ToggleColumns from "../ToggleColumns.vue";

const columns = [
  {
    key: "col1",
    type: "string",
    label: "Column 1",
    sortable: true
  },
  {
    key: "col2",
    type: "string",
    label: "Column 2",
    sortable: true
  },
  {
    key: "col3",
    type: "string",
    label: "Column 3",
    sortable: true
  },
  {
    key: "col4",
    type: "string",
    label: "Column 4",
    sortable: true
  },
  {
    key: "col5",
    type: "string",
    label: "Column 5",
    sortable: true
  }
];

const visibleColumns = [
  {
    key: "col1",
    label: "Column 1"
  },
  {
    key: "col3",
    label: "Column 3"
  },
  {
    key: "col4",
    label: "Column 4"
  }
];

describe("ToggleColumns", () => {
  it("should render", () => {
    const wrapper = mount(ToggleColumns, { props: { columns, visibleColumns } });
    const columnElements = wrapper.findAll("div.column");
    expect(columnElements.length).toBe(columns.length + 1); // + 1 column for the reset button
    const visibleColumnElements = wrapper.findAll("div.column.visible");
    expect(visibleColumnElements.length).toBe(visibleColumns.length);
    const hiddenColumnElements = wrapper.findAll("div.column.hidden");
    expect(hiddenColumnElements.length).toBe(columns.length + 1 - visibleColumns.length); // + 1 column for the reset button
  });

  it("should emit columnToggle when a visible column is clicked", () => {
    const wrapper = mount(ToggleColumns, { props: { columns, visibleColumns } });
    const visibleColumnElements = wrapper.findAll("div.column.visible");
    expect(visibleColumnElements.length).toBe(visibleColumns.length);
    visibleColumnElements[0].trigger("click");
    expect(wrapper.emitted().columnToggle).toEqual([["col1"]]);
  });

  it("should emit columnToggle when a hidden column is clicked", () => {
    const wrapper = mount(ToggleColumns, { props: { columns, visibleColumns } });
    const hiddenColumnElements = wrapper.findAll("div.column.hidden");
    expect(hiddenColumnElements.length).toBe(columns.length + 1 - visibleColumns.length);
    hiddenColumnElements[0].trigger("click");
    expect(wrapper.emitted().columnToggle).toEqual([["col2"]]);
  });

  it("should emit resetColumn when reset button is clicked", () => {
    const wrapper = mount(ToggleColumns, { props: { columns, visibleColumns } });
    const columnElements = wrapper.findAll("div.column");
    expect(columnElements.length).toBe(columns.length + 1);
    columnElements[5].trigger("click");
    expect(wrapper.emitted().resetColumns).toBeDefined();
  });
});
