import type { KeyLabelPair, TableRow } from "@/types";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DetailPane from "../DetailPane.vue";

const row: TableRow = {
  id: 1,
  col1: "value1",
  col2: "value2",
  col3: ["value3", "value4", "value5", "value6"]
};
const headers: KeyLabelPair[] = [
  { key: "col1", label: "Column 1" },
  { key: "col2", label: "Column 2" },
  { key: "col3", label: "Column 3" }
];

describe("DetailPane", () => {
  it("should render default slot content as button text", () => {
    const wrapper = mount(DetailPane, { props: { row, headers } });
    const labels = wrapper.findAll("div.label");
    expect(labels.length).toBe(Object.keys(row).length);
    expect(labels[0].text()).toBe("id:");
    expect(labels[1].text()).toBe("Column 1:");
    expect(labels[2].text()).toBe("Column 2:");
    expect(labels[3].text()).toBe("Column 3:");
    const values = wrapper.findAll("div.value");
    expect(values[3].text()).toBe("value3, value4, value5, value6");
  });
});
