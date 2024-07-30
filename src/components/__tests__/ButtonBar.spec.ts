import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ButtonBar from "../ButtonBar.vue";

const allFalse = {
  clearFilterDisabled: false,
  resetSortDisabled: false,
  clearSelectedRowsDisabled: false,
  resetDisabled: false,
  exportCSVDisabled: false,
  columnSelectorVisible: false
};

describe("ButtonBar", () => {
  it("should render", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse } });
    const clearFilterButton = wrapper.find('button[data-testid="clear-filter-button"]');
    expect(clearFilterButton.text()).toBe("Clear filter");
  });

  it("should emit clickClearFilter if clearFilter button is clicked", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse } });
    const clearFilterButton = wrapper.find('button[data-testid="clear-filter-button"]');
    expect(clearFilterButton.text()).toBe("Clear filter");
    clearFilterButton.trigger("click");
    expect(wrapper.emitted().clickClearFilter).toBeDefined();
  });
  it("should disable clearFilter button if clearFilterDisabled is true", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse, clearFilterDisabled: true } });
    const clearFilterButton = wrapper.find('button[data-testid="clear-filter-button"]');
    clearFilterButton.trigger("click");
    expect(wrapper.emitted().clickClearFilter).toBeUndefined();
  });

  it("should emit clickResetSort if resetSort button is clicked", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse } });
    const resetSortButton = wrapper.find('button[data-testid="reset-sort-button"]');
    resetSortButton.trigger("click");
    expect(wrapper.emitted().clickResetSort).toBeDefined();
  });
  it("should disable resetSort button if resetSortDisabled is true", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse, resetSortDisabled: true } });
    const resetSortButton = wrapper.find('button[data-testid="reset-sort-button"]');
    resetSortButton.trigger("click");
    expect(wrapper.emitted().clickResetSort).toBeUndefined();
  });

  it("should emit clickClearSelectedRows if clearSelectedRows button is clicked", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse } });
    const clearSelectedRowsButton = wrapper.find(
      'button[data-testid="clear-selected-rows-button"]'
    );
    clearSelectedRowsButton.trigger("click");
    expect(wrapper.emitted().clickClearSelectedRows).toBeDefined();
  });
  it("should disable clearSelectedRows button if clearSelectedRowsDisabled is true", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse, clearSelectedRowsDisabled: true } });
    const clearSelectedRowsButton = wrapper.find(
      'button[data-testid="clear-selected-rows-button"]'
    );
    clearSelectedRowsButton.trigger("click");
    expect(wrapper.emitted().clickClearSelectedRows).toBeUndefined();
  });

  it("should emit clickReset if reset button is clicked", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse } });
    const resetButton = wrapper.find('button[data-testid="reset-button"]');
    resetButton.trigger("click");
    expect(wrapper.emitted().clickReset).toBeDefined();
  });
  it("should disable reset button if resetDisabled is true", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse, resetDisabled: true } });
    const resetButton = wrapper.find('button[data-testid="reset-button"]');
    resetButton.trigger("click");
    expect(wrapper.emitted().clickReset).toBeUndefined();
  });

  it("should emit toggleColumnEditVisibility if columnListToggle button is clicked", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse } });
    const columnListToggleButton = wrapper.find('button[data-testid="column-list-toggle-button"]');
    columnListToggleButton.trigger("click");
    expect(columnListToggleButton.text()).toBe("Show/hide columns");
    expect(wrapper.emitted().toggleColumnEditVisibility).toBeDefined();
  });

  it("should change text of columnListToggle button if columnSelectorVisible is true", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse, columnSelectorVisible: true } });
    const columnListToggleButton = wrapper.find('button[data-testid="column-list-toggle-button"]');
    expect(columnListToggleButton.text()).toBe("Close column selector");
  });

  it("should emit clickExportToCSV if exportToCSV button is clicked", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse } });
    const exportToCSVButton = wrapper.find('button[data-testid="export-to-csv-button"]');
    exportToCSVButton.trigger("click");
    expect(wrapper.emitted().clickExportToCSV).toBeDefined();
  });
  it("should disable exportToCSV button if exportCSVDisabled is true", () => {
    const wrapper = mount(ButtonBar, { props: { ...allFalse, exportCSVDisabled: true } });
    const exportToCSVButton = wrapper.find('button[data-testid="export-to-csv-button"]');
    exportToCSVButton.trigger("click");
    expect(wrapper.emitted().clickExportToCSV).toBeUndefined();
  });
});
