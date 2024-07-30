import type { KeyLabelPair } from "@/types";
import { describe, expect, it } from "vitest";
import { getKeyLabelFromHeaders } from "../utils";

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
