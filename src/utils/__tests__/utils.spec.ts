import type { KeyLabelPair, TableColumn, TableRow } from "@/types";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
  convertJSONToCSVandDownload,
  debounce,
  downloadCsvFile,
  getColumnByKey,
  getKeyLabelFromHeaders,
  jsonToCSV
} from "../utils";

describe("getColumnByKey", () => {
  it("should return the correct column when the key exists", () => {
    const columns: TableColumn<TableRow>[] = [
      { key: "col1", label: "Column 1", type: "string", sortable: false },
      { key: "col2", label: "Column 2", type: "string", sortable: false },
      { key: "col3", label: "Column 3", type: "string", sortable: false }
    ];
    const key = "col2";
    expect(getColumnByKey(key, columns)).toEqual({
      key: "col2",
      label: "Column 2",
      type: "string",
      sortable: false
    });
  });
});

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

describe("jsonToCSV", () => {
  it("should convert a JSON array to a CSV string", () => {
    const jsonVersion = [
      { id: 1, col1: "value1", col2: "value2", col3: "value3" },
      { id: 2, col1: "value4", col2: "value5", col3: "value6" },
      { id: 3, col1: "value7", col2: "value8", col3: ["value9", "value10", "value 11"] }
    ];
    const expectedCSV =
      'id,col1,col2,col3\n1,"value1","value2","value3"\n2,"value4","value5","value6"\n3,"value7","value8","value9 | value10 | value 11"';
    const actualCSV = jsonToCSV(jsonVersion);
    expect(actualCSV).toBe(expectedCSV);
  });
});

describe("downloadCsvFile", () => {
  it("should trigger a CSV file download", () => {
    const jsonVersion = [
      { id: 1, col1: "value1", col2: "value2", col3: "value3" },
      { id: 2, col1: "value4", col2: "value5", col3: "value6" }
    ];
    const expectedCSV =
      'id,col1,col2,col3\n1,"value1","value2","value3"\n2,"value4","value5","value6"';
    const actualCSV = jsonToCSV(jsonVersion);
    expect(actualCSV).toBe(expectedCSV);

    // Mock URL.createObjectURL
    const createObjectURL = vi.fn().mockReturnValue("http://example.com");
    URL.createObjectURL = createObjectURL;

    // Mock appendChild/removeChild
    const appendChild = vi.fn();
    const removeChild = vi.fn();
    const linkClick = vi.fn();

    // Mock link element
    const mockLink = {
      setAttribute: vi.fn(),
      style: { visibility: "hidden" },
      click: linkClick
    };

    // Override default document.createElement and appendChild/removeChild
    vi.spyOn(document, "createElement").mockReturnValue(mockLink as any);
    vi.spyOn(document.body, "appendChild").mockImplementation(appendChild);
    vi.spyOn(document.body, "removeChild").mockImplementation(removeChild);

    // call the function we're testing
    downloadCsvFile(actualCSV);

    // Assert that URL.createObjectURL was called
    expect(createObjectURL).toHaveBeenCalled();

    // Assert that createElement was called with 'a'
    expect(document.createElement).toHaveBeenCalledWith("a");

    // Assert that the link has the correct attributes set
    expect(mockLink.setAttribute).toHaveBeenNthCalledWith(1, "href", "http://example.com");
    expect(mockLink.setAttribute).toHaveBeenNthCalledWith(2, "download", "data.csv");

    // Assert that appendChild and click were called
    expect(appendChild).toHaveBeenCalledWith(mockLink);
    expect(linkClick).toHaveBeenCalled();

    // Assert that removeChild was called with the link
    expect(removeChild).toHaveBeenCalledWith(mockLink);
  });
});

describe("convertJSONToCSVandDownload", () => {
  it("convert json to CSV and download the csv file", () => {
    const jsonVersion = [
      { id: 1, col1: "value1", col2: "value2", col3: "value3" },
      { id: 2, col1: "value4", col2: "value5", col3: "value6" }
    ];

    // Mock URL.createObjectURL
    const createObjectURL = vi.fn().mockReturnValue("http://example.com");
    URL.createObjectURL = createObjectURL;

    // Mock appendChild/removeChild
    const appendChild = vi.fn();
    const removeChild = vi.fn();
    const linkClick = vi.fn();

    // Mock link element
    const mockLink = {
      setAttribute: vi.fn(),
      style: { visibility: "hidden" },
      click: linkClick
    };

    // Override default document.createElement and appendChild/removeChild
    vi.spyOn(document, "createElement").mockReturnValue(mockLink as any);
    vi.spyOn(document.body, "appendChild").mockImplementation(appendChild);
    vi.spyOn(document.body, "removeChild").mockImplementation(removeChild);

    // call the function we're testing
    convertJSONToCSVandDownload(jsonVersion);

    // Assert that URL.createObjectURL was called
    expect(createObjectURL).toHaveBeenCalled();

    // Assert that createElement was called with 'a'
    expect(document.createElement).toHaveBeenCalledWith("a");

    // Assert that the link has the correct attributes set
    expect(mockLink.setAttribute).toHaveBeenNthCalledWith(1, "href", "http://example.com");
    expect(mockLink.setAttribute).toHaveBeenNthCalledWith(2, "download", "data.csv");

    // Assert that appendChild and click were called
    expect(appendChild).toHaveBeenCalledWith(mockLink);
    expect(linkClick).toHaveBeenCalled();

    // Assert that removeChild was called with the link
    expect(removeChild).toHaveBeenCalledWith(mockLink);
  });
});
