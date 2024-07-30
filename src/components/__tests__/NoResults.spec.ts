import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NoResults from "../NoResults.vue";

describe("NoResults", () => {
  it("should render NoResults", () => {
    const wrapper = mount(NoResults);
    const noResults = wrapper.find("div.mb-10");
    expect(noResults.text()).toBe("No results found for current display settings.");
  });

  it("should emit resetClicked when reset link is clicked", () => {
    const wrapper = mount(NoResults);
    const resetLink = wrapper.find("a.reset-link");
    resetLink.trigger("click");
    expect(wrapper.emitted("resetClicked")).toBeTruthy();
  });
});
