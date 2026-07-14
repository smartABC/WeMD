import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPublishingPreference,
  setPublishingPreference,
  subscribePublishingPreference,
} from "../../store/publishingPreferences";

describe("发布偏好", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => values.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        values.set(key, String(value));
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("通过同一接口持久化并发布不同偏好", () => {
    const linkListener = vi.fn();
    const tableListener = vi.fn();
    const unsubscribeLink = subscribePublishingPreference(
      "linkToFootnote",
      linkListener,
    );
    const unsubscribeTable = subscribePublishingPreference(
      "tableWrap",
      tableListener,
    );

    setPublishingPreference("linkToFootnote", true);
    setPublishingPreference("tableWrap", true);
    unsubscribeLink();
    setPublishingPreference("linkToFootnote", false);
    unsubscribeTable();

    expect(getPublishingPreference("linkToFootnote")).toBe(false);
    expect(getPublishingPreference("tableWrap")).toBe(true);
    expect(localStorage.getItem("wemd-link-to-footnote")).toBe("false");
    expect(localStorage.getItem("wemd-table-wrap")).toBe("true");
    expect(linkListener).toHaveBeenCalledTimes(1);
    expect(linkListener).toHaveBeenCalledWith(true);
    expect(tableListener).toHaveBeenCalledOnce();
    expect(tableListener).toHaveBeenCalledWith(true);
  });
});
