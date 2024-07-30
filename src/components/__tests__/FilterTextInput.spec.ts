import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FilterTextInput from "../FilterTextInput.vue";

describe("FilterTextInput", () => {
  it("should render FilterTextInput with value of modelValue prop", () => {
    const wrapper = mount(FilterTextInput, { props: { modelValue: "test" } });
    const filterTextInput = wrapper.find("input.filter-text-input");
    expect((filterTextInput.element as HTMLInputElement).value).toBe("test");
  });

  it("should emit update:modelValue when FilterTextInput is updated", () => {
    const wrapper = mount(FilterTextInput, { props: { modelValue: "test" } });
    const filterTextInput = wrapper.find("input.filter-text-input");
    filterTextInput.setValue("something new!");
    // wrapper.emitted('update:modelValue') returns an array of arrays, which is why the expect below is checking for a string wrapped in two arrays.
    expect(wrapper.emitted("update:modelValue")).toEqual([["something new!"]]);
  });
});
