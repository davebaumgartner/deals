import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SimpleButton from "../SimpleButton.vue";

describe("SimpleButton", () => {
  it("should render default slot content as button text", () => {
    const wrapper = mount(SimpleButton, { slots: { default: "Click Me" } });
    expect(wrapper.find("button").text()).toBe("Click Me");
  });

  it("should emit simpleButtonClick when clicked", () => {
    const wrapper = mount(SimpleButton, { slots: { default: "Click Me" } });
    expect(wrapper.find("button").text()).toBe("Click Me");
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted().simpleButtonClick).toBeDefined();
  });

  it("should disable button when disabled prop is true", () => {
    const wrapper = mount(SimpleButton, {
      props: { disabled: true },
      slots: { default: "Click Me" }
    });
    expect(wrapper.find("button").text()).toBe("Click Me");
    wrapper.find("button").trigger("click");
    // we shouldn't be able to click the button because it should be disabled
    expect(wrapper.emitted().simpleButtonClick).not.toBeDefined();
  });
});
