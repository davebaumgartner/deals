import type { KeyLabelPair } from "@/types";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce, getKeyLabelFromHeaders } from "../utils";

describe("getKeyLabelFromHeaders", () => {
  it("should get the label for a given key when that key exists in the headers", () => {
    const headers: KeyLabelPair[] = [
      { key: "col1", label: "Column 1" },
      { key: "col2", label: "Column 2" }
    ];
    const key = "col2";
    expect(getKeyLabelFromHeaders(key, headers)).toBe("Column 2");
  });
  it("should return the original key when that key does not exist in the headers", () => {
    const headers: KeyLabelPair[] = [
      { key: "col1", label: "Column 1" },
      { key: "col2", label: "Column 2" }
    ];
    const key = "col3";
    expect(getKeyLabelFromHeaders(key, headers)).toBe("col3");
  });
});

describe("debounce", () => {
  let clock: any;

  beforeEach(() => {
    clock = vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should execute the debounced function after the specified delay", () => {
    const mockFunc = vi.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc("test");
    expect(mockFunc).not.toHaveBeenCalled();

    // Fast-forward by 1000ms
    clock.advanceTimersByTime(1000);
    expect(mockFunc).toHaveBeenCalledWith("test");
  });

  it("should not execute the debounced function if called again within the delay period", () => {
    const mockFunc = vi.fn();
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc("first");
    debouncedFunc("second");
    expect(mockFunc).not.toHaveBeenCalled();

    // Fast-forward by 500ms
    clock.advanceTimersByTime(500);
    expect(mockFunc).not.toHaveBeenCalled();

    // Fast-forward another 500ms to complete the debounce period
    clock.advanceTimersByTime(500);
    expect(mockFunc).toHaveBeenCalledWith("second");
  });

  it("should handle multiple rapid calls and execute only once after the delay", () => {
    const mockFunc = vi.fn();
    const debouncedFunc = debounce(mockFunc, 500);

    debouncedFunc("call1");
    debouncedFunc("call2");
    debouncedFunc("call3");

    expect(mockFunc).not.toHaveBeenCalled();

    // Fast-forward by 500ms
    clock.advanceTimersByTime(500);
    expect(mockFunc).toHaveBeenCalledWith("call3");
  });

  it("should handle no calls without error", () => {
    const mockFunc = vi.fn();
    // we're intentionally defining but not using this function, so let's turn off the warning it throws in eslint:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const debouncedFunc = debounce(mockFunc, 500);

    // Fast-forward without calling the debounced function
    clock.advanceTimersByTime(500);
    expect(mockFunc).not.toHaveBeenCalled();
  });
});
