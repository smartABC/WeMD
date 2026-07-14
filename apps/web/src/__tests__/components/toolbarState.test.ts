import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getTableWrapEnabled,
  setTableWrapEnabled,
  TABLE_WRAP_EVENT,
} from "../../components/Editor/ToolbarState";

describe("ToolbarState 表格自动换行偏好", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key: string) => store.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store.set(key, String(value));
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("持久化偏好并广播实时预览事件", () => {
    const listener = vi.fn();
    window.addEventListener(TABLE_WRAP_EVENT, listener);

    setTableWrapEnabled(true);

    expect(getTableWrapEnabled()).toBe(true);
    expect(localStorage.getItem("wemd-table-wrap")).toBe("true");
    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent<boolean>).detail).toBe(
      true,
    );

    window.removeEventListener(TABLE_WRAP_EVENT, listener);
  });
});
